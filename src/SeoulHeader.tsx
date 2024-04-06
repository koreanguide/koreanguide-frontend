import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SeoulHeader.css";

function SeoulHeader() {
  const token = sessionStorage.getItem("access-token");

  const [minTemp, setminTemp] = useState("");
  const [maxTemp, setmaxTemp] = useState("");
  const [nowTemp, setnowTemp] = useState("");
  const [ultrafineDust, setultrafineDust] = useState("");
  const [fineDust, setfineDust] = useState("");
  const [sky, setsky] = useState("");

  useEffect(() => {
    const WeatherInformation = async () => {
      try {
        const response = await axios.get("/v1/seoul/weather", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("헤더 날씨 정보: ", response.data);
        setminTemp(response.data.minTemp);
        setmaxTemp(response.data.maxTemp);
        setnowTemp(response.data.nowTemp);
        setultrafineDust(response.data.ultrafineDust);
        setfineDust(response.data.findDust);
        setsky(response.data.sky);
        console.log(response.data.findDust);
      } catch (error) {
        console.error(error);
      }
    };

    WeatherInformation();
  }, [token]);

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
            미세<span className="FineStateText"> {fineDust}</span>
          </div>
          <div className="UltraFineState">
            초미세<span className="FineStateText"> 좋음</span>
          </div>
          <div className="SeoulHeaderBoundary">|</div>
          <div className="SeoulTemperatureBox">
            <div className="LowestTemperature">4°</div>
            <div className="SeoulTemperatureBoxDash">/</div>
            <div className="NowTemperature">5°</div>
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
        <img src="/img/IimgTwo.svg" alt="none" className="IimgTwo"></img>

        {/* <div className="SeoulHeaderNewNotificationBox">
          <div className="SeoulHeaderNewNotificationNew">NEW</div>
          <div className="SeoulHeaderNewNotificationText">
            수도 서울 컨텐츠를 선택하여 트랙을 만들어 보세요!
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SeoulHeader;
