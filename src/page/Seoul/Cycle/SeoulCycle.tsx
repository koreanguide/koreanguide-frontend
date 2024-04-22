import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import { useLocation, useNavigate } from "react-router-dom";
import LoadPage from "../../LoadPage/LoadPage";
import "./SeoulCycle.css";

function SeoulCyclePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access-token");
  const [loading, setLoading] = useState(true);

  const { selectedDistrict } = location.state || {};

  const goToSeoulCategory = () => {
    navigate("/portal/seoul/select", { state: { selectedDistrict } });
    window.scrollTo(0, 0);
  };

  const gotoSeoulBasket = () => {
    navigate("/portal/seoul/saved");
    window.scrollTo(0, 0);
  };

  const [cycles, setCycles] = useState<Array<any>>([]);

  const [SeoulShopBasketNum, setSeoulShopBasketNum] = useState("");

  type DistrictKey =
    | "강남구"
    | "강동구"
    | "강북구"
    | "강서구"
    | "관악구"
    | "광진구"
    | "구로구"
    | "금천구"
    | "노원구"
    | "도봉구"
    | "동대문구"
    | "동작구"
    | "마포구"
    | "서대문구"
    | "서초구"
    | "성동구"
    | "성북구"
    | "송파구"
    | "양천구"
    | "영등포구"
    | "용산구"
    | "은평구"
    | "종로구"
    | "중구"
    | "중랑구";
  type DistrictEnglish =
    | "GANGNAM"
    | "GANGDONG"
    | "GANGBUK"
    | "GANGSEO"
    | "GWANAK"
    | "GWANGJIN"
    | "GURO"
    | "GEUMCHEON"
    | "NOWON"
    | "DOBONG"
    | "DONGDAEMUN"
    | "DONGJAK"
    | "MAPO"
    | "SEODAEMUN"
    | "SEOCHO"
    | "SEONGDONG"
    | "SEONGBUK"
    | "SONGPA"
    | "YANGCHEON"
    | "YEONGDEUNGPO"
    | "YONGSAN"
    | "EUNPYEONG"
    | "JONGNO"
    | "JUNG"
    | "JUNGNANG";

  function convertDistrictToEnglish(
    district: DistrictKey
  ): DistrictEnglish | "UNKNOWN" {
    const districtMap: { [key in DistrictKey]: DistrictEnglish } = {
      강남구: "GANGNAM",
      강동구: "GANGDONG",
      강북구: "GANGBUK",
      강서구: "GANGSEO",
      관악구: "GWANAK",
      광진구: "GWANGJIN",
      구로구: "GURO",
      금천구: "GEUMCHEON",
      노원구: "NOWON",
      도봉구: "DOBONG",
      동대문구: "DONGDAEMUN",
      동작구: "DONGJAK",
      마포구: "MAPO",
      서대문구: "SEODAEMUN",
      서초구: "SEOCHO",
      성동구: "SEONGDONG",
      성북구: "SEONGBUK",
      송파구: "SONGPA",
      양천구: "YANGCHEON",
      영등포구: "YEONGDEUNGPO",
      용산구: "YONGSAN",
      은평구: "EUNPYEONG",
      종로구: "JONGNO",
      중구: "JUNG",
      중랑구: "JUNGNANG",
    };

    return districtMap[district] || "UNKNOWN";
  }

  const englishDistrict: DistrictEnglish | "UNKNOWN" =
    convertDistrictToEnglish(selectedDistrict);

  useEffect(() => {
    const SeoulCycleList = async () => {
      try {
        const response = await axios.get("/v1/seoul/bicycle", {
          params: { seoulCountry: englishDistrict },
        });
        console.log("공공자전거 데이터", response.data);
        setCycles(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    SeoulCycleList();
  }, [englishDistrict]);

  useEffect(() => {
    const SeoulShopBasket = async () => {
      try {
        const response = await axios.get("/v1/saved/count", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("장바구니 갯수", response.data);
        setSeoulShopBasketNum(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    SeoulShopBasket();
  }, [SeoulShopBasketNum, token]);

  const SeoulBasketDelete = async () => {
    try {
      const response = await axios.delete("/v1/saved/reset", {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });
      console.log("장바구니 비우기 성공", response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  interface SeoulCycleComponentProps {
    code: string;
    count: number;
    name: string;
    address: string;
    kakaoMapUrl: string;
  }

  if (loading) {
    return <LoadPage />;
  }

  const SeoulCycleComponent = ({
    cycle,
  }: {
    cycle: SeoulCycleComponentProps;
  }) => {
    const SeoulCycleOnClick = () => {
      console.log("공공자전거 클릭", cycle.kakaoMapUrl);
      navigate(cycle.kakaoMapUrl);
      window.scrollTo(0, 0);
    };
    return (
      <div className="SeoulCycleComponentFrame">
        <div className="SeoulCycleComponentInner">
          <div className="SeoulCycleComponentBoxOne">
            <div className="SeoulCycleComponentTagBox">
              <div className="SeoulCycleComponentTagText">{cycle.code}</div>
            </div>
            <div className="SeoulCycleComponentTagBox">
              <div className="SeoulCycleComponentTagText">
                {cycle.count}개의 거치대
              </div>
            </div>
          </div>
          <div className="SeoulCycleComponentBoxTwo">{cycle.name}</div>
          <div className="SeoulCycleComponentBoxThree">{cycle.address}</div>
            <a 
              href={`${cycle.kakaoMapUrl}`}
              target='_blank'
              rel="noopener noreferrer"
            >
              <div className="SeoulCycleComponentBoxFour">
                <div
                  className="SeoulCycleComponentBoxFourInner"
                  onClick={SeoulCycleOnClick}
                >
                  <img
                    src="/img/SeoulCycleImg-1.svg"
                    alt="none"
                    className="SeoulCycleImg-1"
                  ></img>
                  <div className="SeoulCycleComponentBoxFourText">장소 탐색</div>
                </div>
              </div>
            </a>
        </div>
      </div>
    );
  };

  return (
    <div className="TrackViewPageFrame">
      <div className="SeoulMainHeaderBox">
        <SeoulHeader></SeoulHeader>
        <HeaderTwo></HeaderTwo>
      </div>
      <div className="TrackViewPageInner">
        <div className="SeoulMainBoxOne">
          <div className="SeoulMainTextBox">
            <div className="SeoulMainTextOne">
              현재 선택된 카테고리: 따릉이(공공자전거)
            </div>
            <div className="SeoulMainTextTwo">
              {selectedDistrict}에서 {cycles.length}개의 따릉이가 발견되었어요!
            </div>
          </div>
          <div className="SeoulCategoryBasketBox">
            <div className="BasketRemoveButton" onClick={SeoulBasketDelete}>
              비우기
            </div>
            <div className="BasketNumFrame" onClick={gotoSeoulBasket}>
              <div className="BasketNumInner">
                <img
                  src="/img/BasketTwo.svg"
                  alt="none"
                  className="BasketTwo"
                ></img>
                <div className="TextBasket">장바구니</div>
                <div className="TextBasketNumFrame">
                  <div className="TextBasketNum">{SeoulShopBasketNum}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="SeoulShopInformationBox">
          <img
            src="/img/ShopAlertImg.svg"
            alt="오류"
            className="ShopAlertImg"
          ></img>
          <div className="SeoulShopInformationText">
            정보제공: 서울 열린데이터광장
          </div>
        </div>
        <div className="SeoulCycleFrame">
          {cycles.map((cycle) => (
            <SeoulCycleComponent cycle={cycle} />
          ))}
        </div>
        <div className="SeoulMoreButtonFrame">
          <div className="SeoulMoreButton">더 보기</div>
        </div>
        <div className="BackToIntorButtonContainer" onClick={goToSeoulCategory}>
          <div className="BackToIntorButtonFrame">
            <div className="BackToIntorButtonCircle">
              <img
                src="/img/SeoulBackIcon.svg"
                alt="none"
                className="SeoulBackIcon"
              />
            </div>
            <div className="SeoulBackText">카테고리 선택</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulCyclePage;
