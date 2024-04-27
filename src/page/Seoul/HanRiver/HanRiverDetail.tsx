import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./HanRiverDetail.css";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  latitude: any;
  longitude: any;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {
  const [uniqueId, setUniqueId] = useState(``);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=4b97895fdc79dc6d392b38a5ada0f7e5&autoload=false";
    document.head.appendChild(script);

    const id = `map-${uuidv4()}`;
    setUniqueId(id);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById(id);
        if (container) {
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);

          const markerPosition = new window.kakao.maps.LatLng(
            latitude,
            longitude
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return <div id={uniqueId} style={{ width: "480px", height: "353px" }}></div>;
};

function SeoulHanRiverDetailPage() {
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

  const SeoulMainRiverComponent = () => {
    return (
      <div className="SeoulMainRiverComponentFrame">
        <div className="SeoulMainRiverComponentImgbox">
          <img
            src="/img/NanGiRiver.svg"
            alt="none"
            className="NanGiRiver"
          ></img>
        </div>
        <div className="SeoulMainRiverComponentTextbox">
          <div className="SeoulMainRiverComponentTitle">난지 한강공원</div>
          <div className="SeoulMainRiverComponentContent">
            서울특별시 마포구 한강난지로 162
          </div>
        </div>
      </div>
    );
  };

  const SeoulSubRiverComponent = () => {
    return (
      <div className="SeoulSubRiverComponentFrame">
        <img
          src="/img/GwangnaruRiver.svg"
          alt="none"
          className="GwangnaruRiver"
        ></img>
        <div className="SeoulSubRiverComponentTextBox">
          <div className="SeoulSubRiverComponentTextOne">광나루 한강공원</div>
          <div className="SeoulSubRiverComponentTextTwo">
            서울특별시 강동구 선사로 83-106
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const SeoulShopList = async () => {
      try {
        const response = await axios.get("/v1/seoul/shop", {
          params: { seoulCountry: englishDistrict },
        });
        console.log(response.data);
        setShops(response.data);
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
              {selectedDistrict}에는 {shops.length}개의 한강공원이 있어요.
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
        <div className="SeoulDetailFrameOne">
          <div className="SeoulDetailMapFrame">
            <KakaoMap latitude="37.5487859" longitude="127.1200384"></KakaoMap>
          </div>
          <SeoulMainRiverComponent></SeoulMainRiverComponent>
        </div>
        <div className="SeoulRiverPageTextBox">
          <div className="SeoulRiverPageTextOne">
            망원한강공원 정보를 알려드려요!
          </div>
          <div className="SeoulRiverPageTextTwo">
            최종 업데이트: 2024년 04월 10일
          </div>
        </div>
        <div className="SeoulDetailFrameTwo">
          <div className="SeoulDetailBoxOne">
            <div className="SeoulDetailBoxTwo">
              <div className="SeoulDetailTextBox">
                <div className="SeoulDetailTextOne">안내센터</div>
                <div className="SeoulDetailTextTwo">02-3780-0501~4</div>
              </div>
              <div className="SeoulDetailTextBox">
                <div className="SeoulDetailTextOne">길이</div>
                <div className="SeoulDetailTextTwo">12km</div>
              </div>
            </div>
            <div className="SeoulDetailBoxTwo">
              <div className="SeoulDetailTextBox">
                <div className="SeoulDetailTextOne">면적</div>
                <div className="SeoulDetailTextTwo">1,554,810㎡</div>
              </div>
              <div className="SeoulDetailTextBoxTwo">
                <div className="SeoulDetailTextOne">주소</div>
                <div className="SeoulDetailTextTwo">
                  서울특별시 마포구 마포나루길 467
                </div>
              </div>
            </div>
          </div>
          <div className="SeoulDetailBoxThree">
            <div className="SeoulDetailIconFrame">
              <div className="SeoulDetailIconBox">
                <img
                  src="/img/SDIcon-1.svg"
                  alt="오류"
                  className="SDIcon-1"
                ></img>
                <div className="SeoulDetailIconBoxText">주차장</div>
              </div>
            </div>
            <div className="SeoulDetailIconFrame">
              <div className="SeoulDetailIconBox">
                <img
                  src="/img/SDIcon-2.svg"
                  alt="오류"
                  className="SDIcon-2"
                ></img>
                <div className="SeoulDetailIconBoxText">화장실</div>
              </div>
            </div>
            <div className="SeoulDetailIconFrame">
              <div className="SeoulDetailIconBox">
                <img
                  src="/img/SDIcon-3.svg"
                  alt="오류"
                  className="SDIcon-3"
                ></img>
                <div className="SeoulDetailIconBoxText">음수대</div>
              </div>
            </div>
            <div className="SeoulDetailIconFrame">
              <div className="SeoulDetailIconBox">
                <img
                  src="/img/SDIcon-4.svg"
                  alt="오류"
                  className="SDIcon-4"
                ></img>
                <div className="SeoulDetailIconBoxText">매점</div>
              </div>
            </div>
          </div>
        </div>
        <div className="SeoulRiverPageTextBox">
          <div className="SeoulRiverPageTextOne">
            3개의 주차장 정보가 발견되었어요!
          </div>
          <div className="SeoulRiverPageTextTwo">
            이용 시간 및 요금은 수시로 변동될 수 있으니 해당 주차장으로 문의하여
            정확한 정보를 확인하시기 바랍니다.
          </div>
        </div>
        <div className="SeoulDetailFrameThree">
          <div className="SeoulDetailFrameThreeInner">
            <div className="SeoulDetailFrameThreeTextOne">주차장</div>
            <div className="SeoulDetailFrameThreeTextTwo">주소</div>
            <div className="SeoulDetailFrameThreeTextThree">주차면수</div>
            <div className="SeoulDetailFrameThreeTextFour">이용시간(주중)</div>
            <div className="SeoulDetailFrameThreeTextFive">이용시간(주말)</div>
            <div className="SeoulDetailFrameThreeTextSix">기본요금</div>
            <div className="SeoulDetailFrameThreeTextSeven">추가(10분)</div>
            <div className="SeoulDetailFrameThreeTextEight">전화번호</div>
          </div>
        </div>
        <div className="SeoulDetailInformationBox">
          <div className="SeoulDetailInformationBoxInner"></div>
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

export default SeoulHanRiverDetailPage;
