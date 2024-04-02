import React from "react";
import "./SeoulHeader.css";

function SeoulHeader() {
  return (
    <div className="SeoulHeaderBoxFrame">
      <div className="SeoulBox">
        <div className="SeoulHeaderBoxOne">
          <img
            src="/img/SeoulSloganHeaderImg.svg"
            alt="none"
            className="SeoulSloganHeaderImg"
          ></img>
          <div className="SeoulHeaderLocation">동작구</div>
        </div>
        <div className="SeoulHeaderWeatherBox">
          <div className="TextFineState">
            미세<span className="FineStateText"> 좋음</span>
          </div>
          <div className="UltraFineState">
            초미세<span className="FineStateText"> 좋음</span>
          </div>
          <div className="SeoulHeaderBoundary">|</div>
          <div className="SeoulTemperatureBox">
            <div className="LowestTemperature">4°</div>
            <div className="SeoulTemperatureBoxDash">/</div>
            <div className="HighestTemperature">18°</div>
          </div>
          <div className="SeoulHeaderBoundary">|</div>
          <div className="SeoulHeaderWeatherStateBox">
            <img
              src="/img/SeoulWeatherCloudIMg.svg"
              alt="none"
              className="SeoulWeatherCloudIMg"
            ></img>
            <div className="SeoulWeatherStateText">구름</div>
          </div>
        </div>
        <div className="SeoulHeaderNewNotificationBox">
          <div className="SeoulHeaderNewNotificationNew">NEW</div>
          <div className="SeoulHeaderNewNotificationText">
            수도 서울 컨텐츠를 선택하여 트랙을 만들어 보세요!
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulHeader;
