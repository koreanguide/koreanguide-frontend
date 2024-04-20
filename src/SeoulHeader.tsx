import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SeoulHeader.css";

function SeoulHeader() {
  const token = sessionStorage.getItem("access-token");
  const [isLoading, setIsLoading] = useState(true);
  const [minTemp, setminTemp] = useState<number>(0);
  const [maxTemp, setmaxTemp] = useState<number>(0);
  const [nowTemp, setnowTemp] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [ultrafineDust, setultrafineDust] = useState("---");
  const [fineDust, setfineDust] = useState("---");

  const [fineDustColor, setfineDustColor] = useState("");
  const [ultrafineDustColor, setultrafineDustColor] = useState("");
  const [skyImg, setskyImg] = useState("");
  const [weatherText, setweatherText] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchWeatherInformation = async () => {
      try {
        const response = await axios.get("/v1/seoul/weather", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });

        setminTemp(response.data.minTemp);
        setmaxTemp(response.data.maxTemp);
        setnowTemp(response.data.nowTemp);
        setUserCountry(response.data.country);

        if (response.data.findDust === "BAD") {
          setfineDust("나쁨");
          setfineDustColor("#FD3D3D");
        } else if (response.data.findDust === "NORMAL") {
          setfineDust("보통");
          setfineDustColor("#FFD400");
        } else if (response.data.findDust === "WORST") {
          setfineDust("매우나쁨");
          setfineDustColor("#FD3D3D");
        } else if (response.data.findDust === "UNKNOWN") {
          setfineDust("알 수 없음");
          setfineDustColor("#616161");
        } else if (response.data.findDust === "GOOD") {
          setfineDust("좋음");
          setfineDustColor("#0074FF");
        }

        if (response.data.sky === "NORMAL") {
          setskyImg("NORMAL");
          setweatherText("보통");
        } else if (response.data.sky === "RAIN") {
          setskyImg("RAIN");
          setweatherText("비");
        } else if (response.data.sky === "RAIN_AND_SNOW") {
          setskyImg("RAIN_AND_SNOW");
          setweatherText("눈비");
        } else if (response.data.sky === "SNOW") {
          setskyImg("SNOW");
          setweatherText("눈");
        } else if (response.data.sky === "RAINDROP") {
          setskyImg("RAIN");
          setweatherText("비날림");
        } else if (response.data.sky === "RAINDROP_AND_SNOWFALL") {
          setskyImg("RAIN_AND_SNOW");
          setweatherText("눈비날림");
        } else if (response.data.sky === "SNOWFALL") {
          setskyImg("SNOW");
          setweatherText("눈날림");
        } else if (response.data.sky === "UNKNOWN") {
          setweatherText("알수없음");
          setskyImg("UNKNOWN");
        } else {
          setweatherText("알수없음");
          setskyImg("UNKNOWN");
        }

        if (response.data.ultrafineDust === "BAD") {
          setultrafineDust("나쁨");
          setultrafineDustColor("#FD3D3D");
        } else if (response.data.ultrafineDust === "NORMAL") {
          setultrafineDust("보통");
          setultrafineDustColor("#FFD400");
        } else if (response.data.ultrafineDust === "WORST") {
          setultrafineDust("매우나쁨");
          setultrafineDustColor("#FD3D3D");
        } else if (response.data.ultrafineDust === "UNKNOWN") {
          setultrafineDust("알 수 없음");
          setultrafineDustColor("#616161");
        } else if (response.data.ultrafineDust === "GOOD") {
          setultrafineDust("좋음");
          setultrafineDustColor("#0074FF");
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherInformation();
  }, [token]);

  return (
    <div className="SeoulHeaderBoxFrame">
      <div className="SeoulBox">
        <div className="SeoulHeaderBoxOne">
          <img
            src="/img/SeoulSloganHeaderImg.svg"
            alt="none"
            className="SeoulSloganHeaderImg"
          />
          <div className="SeoulHeaderLocation">{userCountry}</div>
        </div>
        <div className="SeoulHeaderWeatherBox">
          {isLoading ? (
            <div>불러오는 중...</div>
          ) : (
            <>
              <div className="TextFineState">
                미세
                <span
                  className="FineStateText"
                  style={{ color: fineDustColor }}
                >
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
                />
                <div className="SeoulWeatherStateText">{weatherText}</div>
              </div>
            </>
          )}
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
            <img src="/img/Balloon.svg" alt="none" className="Balloon" />
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
