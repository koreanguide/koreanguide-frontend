import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import { useLocation, useNavigate } from "react-router-dom";
import "./HanRiver.css";
import Footer from "../../Footer/Footer";

function SeoulHanRiverPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access-token");

  const { selectedDistrict } = location.state || {};

  const goToSeoulCategory = () => {
    navigate("/portal/seoul/select", { state: { selectedDistrict } });
    window.scrollTo(0, 0);
  };

  const gotoSeoulBasket = () => {
    navigate("/portal/seoul/saved");
    window.scrollTo(0, 0);
  };

  const [shops, setShops] = useState<Array<any>>([]);
  const [SeoulShopBasketNum, setSeoulShopBasketNum] = useState("");

  const [ShowMainRiver, setShowMainRiver] = useState(false);

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

  const [parks, setParks] = useState<Array<any>>([]);

  interface SeoulMainRiverComponentProps {
    name: string;
    address: string;
    riverPark: string;
  }

  const SeoulMainRiverComponent = ({
    park,
  }: {
    park: SeoulMainRiverComponentProps;
  }) => {
    const navigate = useNavigate();

    const goToSeoulRiverDetail = () => {
      navigate("/portal/seoul/detail", {
        state: { riverPark: park.riverPark },
      });
      window.scrollTo(0, 0);
    };

    return (
      <div
        className="SeoulMainRiverComponentFrame"
        onClick={goToSeoulRiverDetail}
      >
        <div className="SeoulMainRiverComponentImgbox">
          <img
            src={`/img/${park.riverPark}.svg`}
            alt="none"
            className="NanGiRiver"
          ></img>
        </div>
        <div className="SeoulMainRiverComponentTextbox">
          <div className="SeoulMainRiverComponentTitle">
            {park.name} 한강공원
          </div>
          <div className="SeoulMainRiverComponentContent">{park.address}</div>
        </div>
      </div>
    );
  };

  const [subParks, setSubParks] = useState<Array<any>>([]);

  interface SeoulSubRiverComponentProps {
    name: string;
    address: string;
    riverPark: string;
  }

  const SeoulSubRiverComponent = ({
    subPark,
  }: {
    subPark: SeoulSubRiverComponentProps;
  }) => {
    const goToSeoulRiverDetail = () => {
      navigate("/portal/seoul/detail", {
        state: { riverPark: subPark.riverPark },
      });
      window.scrollTo(0, 0);
    };
    return (
      <div
        className="SeoulSubRiverComponentFrame"
        onClick={goToSeoulRiverDetail}
      >
        <div className="subParkImgFrame">
          <img
            src={`/img/${subPark.riverPark}.svg`}
            alt="none"
            className="subParkImg"
          ></img>
        </div>
        <div className="SeoulSubRiverComponentTextBox">
          <div className="SeoulSubRiverComponentTextOne">
            {subPark.name} 한강공원
          </div>
          <div className="SeoulSubRiverComponentTextTwo">{subPark.address}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const SeoulShopList = async () => {
      try {
        const response = await axios.get("/v1/seoul/park", {
          params: { seoulCountry: englishDistrict },
        });
        console.log("한강공원 정보", response.data);
        console.log("한강공원 정보 22", response.data.data.length);
        setParks(response.data.data);
        setSubParks(response.data.recommend);
        setShops(response.data.data.length);
        if (response.data.data.length === 0) {
          setShowMainRiver(false);
        } else {
          setShowMainRiver(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    SeoulShopList();
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

  return (
    <>
      <div className="TrackViewPageFrame">
        <div className="SeoulMainHeaderBox">
          <SeoulHeader></SeoulHeader>
          <HeaderTwo></HeaderTwo>
        </div>
        <div className="TrackViewPageInner">
          <div className="SeoulMainBoxOne">
            <div className="SeoulMainTextBox">
              <div className="SeoulMainTextOne">
                현재 선택된 카테고리: 한강공원
              </div>
              <div className="SeoulMainTextTwo">
                {selectedDistrict}에는 {shops}개의 한강공원이 있어요.
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
          {
            <>
              {ShowMainRiver && (
                <div className="SeoulMainRiverFrame">
                  {parks.map((park) => (
                    <SeoulMainRiverComponent park={park} />
                  ))}
                </div>
              )}
              <div className="SeoulRiverPageTextBox">
                <div className="SeoulRiverPageTextOne">
                  서울의 다른 자치구의 한강공원도 확인해 보세요!
                </div>
                <div className="SeoulRiverPageTextTwo">
                  한강공원은 서울 전역에 넓게 퍼져있기 때문에 위치에 따라 같은
                  자치구여도, 다른 자치구의 한강 공원이 더 가까울 수도 있어요.
                </div>
              </div>
              <div className="SeoulSubRiverFrame">
                {subParks.map((subPark) => (
                  <SeoulSubRiverComponent subPark={subPark} />
                ))}
              </div>
            </>
          }
          <div
            className="BackToIntorButtonContainer"
            onClick={goToSeoulCategory}
          >
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
      <div className="FooterSpaceDiv"></div>
      <Footer></Footer>
    </>
  );
}

export default SeoulHanRiverPage;
