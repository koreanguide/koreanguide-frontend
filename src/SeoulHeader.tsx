import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SeoulHeader.css";

function SeoulHeader() {
  const token = sessionStorage.getItem("access-token");

  const [minTemp, setminTemp] = useState<number>(0);
  const [maxTemp, setmaxTemp] = useState<number>(0);
  const [nowTemp, setnowTemp] = useState("");
  const [ultrafineDust, setultrafineDust] = useState("---");
  const [fineDust, setfineDust] = useState("---");
  const [sky, setsky] = useState("-");

  const [fineDustColor, setfineDustColor] = useState("");
  const [ultrafineDustColor, setultrafineDustColor] = useState("");
  const [skyImg, setskyImg] = useState("");
  const [weatherText, setweatherText] = useState("");

  const [isHovered, setIsHovered] = useState(false);

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
      } catch (error) {
        console.error(error);
      }
    };

    const FineDustFunction = () => {
      if (fineDust === "BAD") {
        console.log("미세먼지 나쁨");
        setfineDust("나쁨");
        setfineDustColor("#FD3D3D");
      } else if (fineDust === "NORMAL") {
        console.log("미세먼지 보통");
        setfineDust("보통");
        setfineDustColor("#FFD400");
      } else if (fineDust === "WORST") {
        console.log("미세먼지 매우나쁨");
        setfineDust("매우나쁨");
        setfineDustColor("#FD3D3D");
      } else if (fineDust === "UNKNOWN") {
        console.log("미세먼지 알수 없음");
        setfineDust("알 수 없음");
        setfineDustColor("#616161");
      } else if (fineDust === "GOOD") {
        console.log("미세먼지 좋음");
        setfineDust("좋음");
        setfineDustColor("#0074FF");
      }
    };

    const SkyFunction = () => {
      if (sky === "NORMAL") {
        setskyImg("NORMAL");
        setweatherText("보통");
      } else if (sky === "RAIN") {
        setskyImg("RAIN");
        setweatherText("비");
      } else if (sky === "RAIN_AND_SNOW") {
        setskyImg("RAIN_AND_SNOW");
        setweatherText("눈비");
      } else if (sky === "SNOW") {
        setskyImg("SNOW");
        setweatherText("눈");
      } else if (sky === "RAINDROP") {
        setskyImg("RAIN");
        setweatherText("비날림");
      } else if (sky === "RAINDROP_AND_SNOWFALL") {
        setskyImg("RAIN_AND_SNOW");
        setweatherText("눈비날림");
      } else if (sky === "SNOWFALL") {
        setskyImg("SNOW");
        setweatherText("눈날림");
      } else if (sky === "UNKNOWN") {
        setweatherText("알수없음");
        setskyImg("UNKNOWN");
      } else {
        setweatherText("알수없음");
        setskyImg("UNKNOWN");
      }
    };

    const UltraFineDustFunction = () => {
      if (ultrafineDust === "BAD") {
        console.log("초미세먼지 나쁨");
        setultrafineDust("나쁨");
        setultrafineDustColor("#FD3D3D");
      } else if (ultrafineDust === "NORMAL") {
        console.log("초미세먼지 보통");
        setultrafineDust("보통");
        setultrafineDustColor("#FFD400");
      } else if (ultrafineDust === "WORST") {
        console.log("초미세먼지 매우나쁨");
        setultrafineDust("매우나쁨");
        setultrafineDustColor("#FD3D3D");
      } else if (ultrafineDust === "UNKNOWN") {
        console.log("초미세먼지 알수 없음");
        setultrafineDust("알 수 없음");
        setultrafineDustColor("#616161");
      } else if (ultrafineDust === "GOOD") {
        console.log("초미세먼지 좋음");
        setultrafineDust("좋음");
        setultrafineDustColor("#0074FF");
      }
    };

    WeatherInformation();
    FineDustFunction();
    UltraFineDustFunction();
    SkyFunction();
  }, [fineDust, sky, token, ultrafineDust]);

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
            미세
            <span className="FineStateText" style={{ color: fineDustColor }}>
              {" "}
              {fineDust}
            </span>
          </div>
          <div className="UltraFineState">
            초미세
            <span
              className="FineStateText"
              style={{ color: ultrafineDustColor }}
            >
              {" "}
              {ultrafineDust}
            </span>
          </div>
          <div className="SeoulHeaderBoundary">|</div>
          <div className="SeoulTemperatureBox">
            <div className="LowestTemperature">{Math.floor(minTemp)}°</div>
            <div className="SeoulTemperatureBoxDash">/</div>
            <div className="NowTemperature">{nowTemp}°</div>
            <div className="SeoulTemperatureBoxDash">/</div>
            <div className="HighestTemperature">{Math.floor(maxTemp)}°</div>
          </div>
          <div className="SeoulHeaderBoundary">|</div>
          <div className="SeoulHeaderWeatherStateBox">
            <img
              src={`/img/${skyImg}.svg`}
              alt="none"
              className="SeoulWeatherCloudIMg"
            ></img>
            <div className="SeoulWeatherStateText">{weatherText}</div>
          </div>
        </div>
        <img
          src="/img/IimgTwo.svg"
          alt="none"
          className="IimgTwo"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        {isHovered && (
          <div className="BalloonFrame">
            <img src="/img/Balloon.svg" alt="none" className="Balloon"></img>
            <div className="BalloonText">
              데이터는 실시간 관측된 자료이며, 측정소 현지 사정이나
              <br /> 데이터의 수신 상태에 따라 미수신 될 수 있어요.
              <br />
              <span className="BalloonTextTwo">
                출처: 환경부 / 한국 환경공단 / 기상청
              </span>
            </div>
          </div>
        )}
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
