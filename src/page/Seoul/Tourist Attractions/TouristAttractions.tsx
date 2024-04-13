import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import "./TouristAttractions.css";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
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

  return <div id={uniqueId} style={{ width: "510px", height: "268px" }}></div>;
};

interface SeoulMapSightComponentProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  tag: string;
  id: any;
}

const SeoulMapSightComponent = ({
  attraction,
}: {
  attraction: SeoulMapSightComponentProps;
}) => {
  interface SeoulAttractionData {
    address: string;
    category: string;
    value: string;
  }

  const token = sessionStorage.getItem("access-token");

  const SeoulAttractionSaveButton = async () => {
    const data: SeoulAttractionData = {
      address: attraction.address,
      value: attraction.title,
      category: "관광거리",
    };
    try {
      const response = await axios.post("/v1/saved/add", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });
      console.log("장바구니 담기 성공", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="SeoulMapSightComponentFrame">
      <div className="SeoulMapSightComponentInner">
        <div className="SeoulKakaoMap">
          <KakaoMap
            latitude={attraction.longitude}
            longitude={attraction.latitude}
            key={attraction.id}
          />
        </div>
        <div className="SeoulMapSightComponentBoxFrame">
          <div className="SeoulMapSightComponentBoxOne">
            <div
              className="ShopListBoxContainmentFrame"
              onClick={() => SeoulAttractionSaveButton()}
            >
              <img
                src="/img/BasketTwo.svg"
                alt="오류"
                className="BasketTwo"
              ></img>
              <div className="TextContainment">담기</div>
            </div>
            <div className="SeoulMapSightComponentTag">{attraction.tag}</div>
          </div>
          <div className="SeoulMapSightComponentBoxTwo">{attraction.title}</div>
          <div className="SeoulMapSightComponentBoxThree">
            {attraction.address}
          </div>
          <div className="SeoulMapSightComponentBoxFour">
            <div className="PortalSearchButton">
              <div className="PortalSearchButtonInner">
                <img
                  src="/img/SeoulNaver.svg"
                  alt="오류"
                  className="SeoulNaver"
                ></img>
                <div className="PortalSearchButtonText">포털 검색</div>
              </div>
            </div>
            <div className="PortalKakaoSearchButton">
              <div className="PortalSearchButtonInner">
                <img
                  src="/img/SeoulKakaoMap.svg"
                  alt="오류"
                  className="SeoulKakaoMap"
                ></img>
                <div className="PortalSearchButtonText">장소 탐색</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SeoulSightsPage() {
  const location = useLocation();
  const token = sessionStorage.getItem("access-token");

  const { selectedDistrict } = location.state || {};

  const [attractions, setAttractions] = useState<Array<any>>([]);
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
    const SeoulShopList = async () => {
      try {
        const response = await axios.get("/v1/seoul/attractions", {
          params: { seoulCountry: englishDistrict },
        });
        console.log("관광거리 데이터========================", response.data);
        setAttractions(response.data);
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

  const navigate = useNavigate();

  const gotoSeoulBasket = () => {
    navigate("/portal/seoul/saved");
    window.scrollTo(0, 0);
  };

  return (
    <div className="TrackViewPageFrame">
      <HeaderTwo></HeaderTwo>
      <SeoulHeader></SeoulHeader>
      <div className="TrackViewPageInner">
        <div className="SeoulMainBoxOne">
          <div className="SeoulMainTextBox">
            <div className="SeoulMainTextOne">
              현재 선택된 카테고리: 관광거리
            </div>
            <div className="SeoulMainTextTwo">
              {selectedDistrict}에서 {attractions.length}개의 관광거리가
              발견되었어요!
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
        {attractions.map((attraction) => (
          <SeoulMapSightComponent key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
}

export default SeoulSightsPage;
