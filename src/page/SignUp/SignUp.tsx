import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import Footer from "../Footer/Footer";

function SignUpPage() {
  interface AlertBoxProps {
    message: string;
  }

  const AlertBox = ({ message }: AlertBoxProps) => {
    return (
      <div className="alertContainer">
        <img className="alertImg" src="../img/alertImg.svg" alt="오류"></img>
        <div className="alertText">{message}</div>
      </div>
    );
  };
  interface SignUpData {
    email: string;
    password: string;
    authKey: string;
    country: string;
    nickname: string;
    userRole: string;
  }

  interface CertifiedNumberData {
    email: string;
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authKey, setAuthKey] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [country, setcountry] = useState<string>("");
  const [SignUpFailed, setSignUpFailed] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("");

  const CertifiedNumberSendClick = async () => {
    try {
      const response = await axios.post("/api/v1/verify/request", email);

      if (response.status === 200) {
        console.log("인증번호 전송 성공");
        setmessage(response.data.ko);
      }
    } catch (error: any) {
      console.log("인증전송 실패");
    }
  };

  const handleSignUp = async () => {
    const data: SignUpData = {
      authKey: authKey,
      country: "GANGNAM",
      email: email,
      nickname: nickname,
      password: password,
      userRole: userRole,
    };

    try {
      const response = await axios.post("/v1/signup", data);

      if (response.status === 200) {
        sessionStorage.setItem("access-token", response.data.accessToken);
        sessionStorage.setItem("refresh-token", response.data.refreshToken);
        console.log("회원가입 성공");
        setSignUpFailed(false);
      }
    } catch (error: any) {
      if (error.response?.data) {
        console.log("--------------------------------");
        console.log(error.response.data.ko);
        console.error("회원가입 실패:", error);
        setmessage(error.response.data.ko);
        setSignUpFailed(true);
      }
    }
  };

  const [hoverGuide, setHoverGuide] = useState(false);
  const [hoverTourist, setHoverTourist] = useState(false);
  const [activeGuide, setActiveGuide] = useState(false);
  const [activeTourist, setActiveTourist] = useState(false);

  const handleMouseEnterGuide = () => {
    setHoverGuide(true);
  };

  const handleMouseLeaveGuide = () => {
    setHoverGuide(false);
  };

  const handleClickGuide = () => {
    setActiveGuide(!activeGuide);
    setActiveTourist(false);
    setUserRole("GUIDE");
    console.log("가이드");
  };

  const handleMouseEnterTourist = () => {
    setHoverTourist(true);
  };

  const handleMouseLeaveTourist = () => {
    setHoverTourist(false);
  };

  const handleClickTourist = () => {
    setActiveTourist(!activeTourist);
    setActiveGuide(false);
    console.log("관광객");
    setUserRole("VISITOR");
  };

  const [showCityList, setShowCityList] = useState(false);
  const [selectedCity, setSelectedCity] = useState("강동구");

  const cityData = [
    { kr: "강서구", en: "GANGSEO" },
    { kr: "양천구", en: "YANGCHEON" },
    { kr: "구로구", en: "GURO" },
    { kr: "영등포구", en: "YONGDENGPO" },
    { kr: "금천구", en: "GEUMCHEON" },
    { kr: "관악구", en: "GWANAK" },
    { kr: "동작구", en: "DONGJAK" },
    { kr: "서초구", en: "SEOCHO" },
    { kr: "강남구", en: "GANGNAM" },
    { kr: "송파구", en: "SONGPA" },
    { kr: "강동구", en: "GANGDONG" },
    { kr: "은평구", en: "EUNPYEONG" },
    { kr: "서대문구", en: "SEODAEMUN" },
    { kr: "마포구", en: "MAPO" },
    { kr: "종로구", en: "JONGNO" },
    { kr: "중구", en: "JUNG" },
    { kr: "용산구", en: "YONGSAN" },
    { kr: "강북구", en: "GANGBUK" },
    { kr: "성북구", en: "SEONGBUK" },
    { kr: "동대문구", en: "DONGDAEMUN" },
    { kr: "성동구", en: "SEONGDONG" },
    { kr: "도봉구", en: "DOBONG" },
    { kr: "노원구", en: "NOWON" },
    { kr: "중랑구", en: "JUNGNANG" },
    { kr: "광진구", en: "GWANGJIN" },
  ];

  interface CityListBoxProps {
    CityName: string;
    CityNameEn: string;
    setSelectedCity: any;
    setShowCityList: (show: boolean) => void;
  }

  const CityListBox: React.FC<CityListBoxProps> = ({
    CityName,
    CityNameEn,
    setSelectedCity,
    setShowCityList,
  }) => {
    return (
      <div
        className="CityListBox"
        onClick={() => {
          setSelectedCity(CityName);
          setShowCityList(false);
          console.log(`선택된 도시: ${CityNameEn}`);
        }}
      >
        <div className="ListBoxCityName">{CityName}</div>
      </div>
    );
  };

  return (
    <div className="mainFrame">
      <div className="frame">
        <div className="inner">
          <div className="logoContainer">
            <img
              className="signinLogoImg"
              src="../img/PurpleAirplain.svg"
              alt="오류"
            ></img>
            <div className="textLogo">KOREAN GUIDE</div>
          </div>
          <div className="firstContainer">
            <div className="textWelcome">회원가입</div>
            <div className="boxOne">
              <div className="textBackToLogin">로그인 페이지로 돌아가기</div>
              <img className="arrowImg" src="../img/arrow.svg" alt="오류"></img>
            </div>
          </div>
          <AlertBox message={message}></AlertBox>
          <div className="textLoginBox">
            <div className="textLogin">어떤 사용자로 가입하시겠어요?</div>
            <div className="selectText">
              한국에서 가이드를 진행하는 내국인이라면, '가이드' 유형으로
              가입하세요.
            </div>
          </div>
          <div className="secondContainer">
            <button
              className={`selectBox ${activeGuide ? "active" : ""}`}
              onMouseEnter={handleMouseEnterGuide}
              onMouseLeave={handleMouseLeaveGuide}
              onClick={handleClickGuide}
            >
              <img
                className="selectImg"
                src={
                  hoverGuide || activeGuide
                    ? `../img/handPurple.svg`
                    : `../img/handBlack.svg`
                }
                alt="오류"
              />
              <div className="textRoll">가이드</div>
            </button>
            <button
              className={`selectBox ${activeTourist ? "active" : ""}`}
              onMouseEnter={handleMouseEnterTourist}
              onMouseLeave={handleMouseLeaveTourist}
              onClick={handleClickTourist}
            >
              <img
                className="selectImg"
                src={
                  hoverTourist || activeTourist
                    ? `../img/jetPurple.svg`
                    : `../img/jetBlack.svg`
                }
                alt="오류"
              />
              <div className="textRoll">관광객</div>
            </button>
          </div>
          <div className="thirdContainer">
            <div className="textEssentialInfo">필수 정보를 입력해 주세요.</div>
            <div className="textEssentialInfoTwo">
              이 정보는 추후 변경할 수 있어요.
            </div>
          </div>
          <div className="inputFrame">
            <div className="emailContainer">
              <div className="containerText">이메일 주소</div>
              <div className="emailInputBox">
                <input
                  type="email"
                  className="emailInput"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <button
                  className="CertifiedNumberSendButton"
                  onClick={CertifiedNumberSendClick}
                >
                  인증 보내기
                </button>
              </div>
            </div>
            <div className="emailCertifiedContainer">
              <div className="containerText">인증 번호</div>
              <div className="emailCertifiedInputBox">
                <input
                  type="string"
                  className="emailCertifiedInput"
                  placeholder=""
                  onChange={(e) => setAuthKey(e.target.value)}
                ></input>
                <button className="emailCertifiedButton">인증하기</button>
              </div>
            </div>
            <div className="passwordContainer">
              <div className="passwordSecondContainer">
                <div className="containerText">비밀번호</div>
                <div className="passwordNotion">
                  8자리 이상, 특수문자, 대문자, 숫자 포함
                </div>
              </div>
              <input
                className="passwordInput"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="rePasswordContainer">
              <div className="containerText">비밀번호 재입력</div>
              <input className="repasswordInput" type="password"></input>
            </div>
            <div className="nickNameContainer">
              <div className="containerText">닉네임</div>
              <input
                className="nickNameInput"
                type="string"
                onChange={(e) => setNickname(e.target.value)}
              ></input>
            </div>
            <div className="locationContainer">
              <div className="containerText">활동 선호 지역</div>
              <div className="locationContainerThree">
                <div className="SoulBox">서울특별시</div>
                <div className="locationContainerTwo">
                  <div className="CitySelectFrame">
                    <div className="CitySelectFrameTwo">
                      <div className="CityText">{selectedCity}</div>
                      <button
                        className="CitySelectButton"
                        onClick={() => setShowCityList(!showCityList)}
                      >
                        <img src="../img/ListButton.svg" alt="오류"></img>
                      </button>
                    </div>
                  </div>
                  <div
                    className="CitySelectListFrame"
                    style={{ display: showCityList ? "block" : "none" }}
                  >
                    {cityData.map((city) => (
                      <CityListBox
                        key={city.en}
                        CityName={city.kr}
                        CityNameEn={city.en}
                        setSelectedCity={setSelectedCity}
                        setShowCityList={setShowCityList}
                      ></CityListBox>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="SignupButton" onClick={handleSignUp}>
            완료하기
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default SignUpPage;
