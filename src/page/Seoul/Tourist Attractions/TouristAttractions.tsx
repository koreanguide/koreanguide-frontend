import React, { useEffect } from "react";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import "./TouristAttractions.css";

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
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=4b97895fdc79dc6d392b38a5ada0f7e5&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        new window.kakao.maps.Map(container, options);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ width: "510px", height: "268px" }}></div>;
};

interface SeoulMapSightComponentProps {
  latitude: number;
  longitude: number;
}

const SeoulMapSightComponent: React.FC<SeoulMapSightComponentProps> = ({
  latitude,
  longitude,
}) => {
  return (
    <div className="SeoulMapSightComponent">
      <div className="SeoulMapSightComponentInner">
        <KakaoMap latitude={longitude} longitude={latitude} />
        <div className="SeoulMapSightComponentBoxFrame">
          <div className="SeoulMapSightComponentBoxOne">
            <div className="ShopListBoxContainmentFrame">
              <img
                src="/img/BasketTwo.svg"
                alt="오류"
                className="BasketTwo"
              ></img>
              <div className="TextContainment">담기</div>
            </div>
            <div className="SeoulMapSightComponentTag">휘경 1동</div>
          </div>
          <div className="SeoulMapSightComponentBoxTwo">경희대파전거리</div>
          <div className="SeoulMapSightComponentBoxThree">
            서울특별시 동대문구 휘경1동 일대
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
  return (
    <div className="TrackViewPageFrame">
      <HeaderTwo></HeaderTwo>
      <SeoulHeader></SeoulHeader>
      <div className="TrackViewPageInner">
        <div className="SeoulMainBoxOne">
          <div className="SeoulMainTextBox">
            <div className="SeoulMainTextOne">현재 선택된 카테고리: 쇼핑몰</div>
            <div className="SeoulMainTextTwo">
              동대문구에서 5개의 쇼핑몰이 발견되었어요!
            </div>
          </div>
          <div className="SeoulCategoryBasketBox">
            <div className="BasketRemoveButton">비우기</div>
            <div className="BasketNumFrame">
              <div className="BasketNumInner">
                <img
                  src="/img/BasketTwo.svg"
                  alt="none"
                  className="BasketTwo"
                ></img>
                <div className="TextBasket">장바구니</div>
                <div className="TextBasketNumFrame">
                  <div className="TextBasketNum">0</div>
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
        <SeoulMapSightComponent
          latitude={127.0311957909}
          longitude={37.5136359848}
        ></SeoulMapSightComponent>
      </div>
    </div>
  );
}

export default SeoulSightsPage;
