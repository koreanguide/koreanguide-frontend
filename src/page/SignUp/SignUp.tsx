import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import Footer from "../Footer/Footer";

function SignUpPage() {
  interface AlertBoxProps {
    message: string;
  }

  const [AlertBoxShow, setAlertBoxShow] = useState(false);

  const AlertBox = ({ message }: AlertBoxProps) => {
    return (
      <div className="alertContainer">
        <img className="alertImg" src="../img/alertImg.svg" alt="오류"></img>
        <div className="alertText">{message}</div>
      </div>
    );
  };

  const [PositiveAlertBoxShow, setPositiveAlertBoxShow] = useState(false);

  const PositiveAlertBox = () => {
    return (
      <div className="alertContainerP">
        <img className="alertImgP" src="../img/alertImgP.svg" alt="오류"></img>
        <div className="alertTextP">{message}</div>
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

  interface emailCertifiedClickData {
    email: string;
    key: string;
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authKey, setAuthKey] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [country, setcountry] = useState<string>("");
  const [message, setmessage] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadBox, setloadBox] = useState(false);
  const [sendBox, setsendBox] = useState(true);
  const [reSendBox, setreSendBox] = useState(false);
  const [sendFailBox, setsendFailBox] = useState(false);

  const CertifiedNumberSendClick = async () => {
    setloadBox(true);
    setsendBox(false);
    setreSendBox(false);
    setsendFailBox(false);
    setAlertBoxShow(false);
    const data: CertifiedNumberData = {
      email: email,
    };

    try {
      const response = await axios.post("/v1/verify/request", data);

      if (response.status === 200) {
        setmessage(response.data.ko);
        setreSendBox(true);
        setloadBox(false);
        setsendBox(false);
        setsendFailBox(false);
        setAlertBoxShow(false);
        setPositiveAlertBoxShow(true);
      }
    } catch (error: any) {
      setsendFailBox(false);
      setreSendBox(true);
      setloadBox(false);
      setsendBox(false);
      setmessage(error.response.data.ko);
      setAlertBoxShow(true);
      setPositiveAlertBoxShow(false);
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setmessage("유효한 이메일 형식이 아닙니다.");
      setAlertBoxShow(true);
    }
  };

  const [emailCertifiedButtonShow, setemailCertifiedButtonShow] =
    useState(true);
  const [emailCheckedBoxShow, setemailCheckedBoxShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const emailCertifiedClick = async () => {
    const data: emailCertifiedClickData = {
      email: email,
      key: authKey,
    };

    try {
      const response = await axios.post("/v1/verify/validate", data);

      if (response.status === 200) {
        setreSendBox(false);
        setloadBox(false);
        setsendBox(false);
        setsendFailBox(true);
        setemailCertifiedButtonShow(false);
        setemailCheckedBoxShow(true);
        setPositiveAlertBoxShow(false);
        setAlertBoxShow(false);
        setIsDisabled(true);
      }
    } catch (error: any) {
      setmessage(error.response.data.ko);
      setAlertBoxShow(true);
      setPositiveAlertBoxShow(false);
    }
  };

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/signin");
    window.scrollTo(0, 0);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setmessage("비밀번호 입력이 서로 일치하지 않습니다");
      setAlertBoxShow(true);
      return;
    }

    const data: SignUpData = {
      authKey: authKey,
      country: country,
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
        navigate("/");
      }
    } catch (error: any) {
      if (error.response?.data) {
        setmessage(error.response.data.ko);
        setAlertBoxShow(true);
      }
    }

    if (!userRole) {
      setmessage("가이드와 관광객 중 하나를 선택하세요");
      setAlertBoxShow(true);
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
    setUserRole("VISITOR");
  };

  const [showCityList, setShowCityList] = useState(false);
  const [countryShow, setCountryShow] = useState<string>("강동구");

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
          setcountry(CityNameEn);
          setCountryShow(CityName);
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
            <div className="boxOne" onClick={goToLoginPage}>
              <div className="textBackToLogin">로그인 페이지로 돌아가기</div>
              <img className="arrowImg" src="../img/arrow.svg" alt="오류"></img>
            </div>
          </div>
          {PositiveAlertBoxShow && <PositiveAlertBox></PositiveAlertBox>}
          {AlertBoxShow && <AlertBox message={message}></AlertBox>}
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
                  disabled={isDisabled}
                ></input>
                {sendBox && (
                  <button
                    className="CertifiedNumberSendButton"
                    onClick={CertifiedNumberSendClick}
                  >
                    인증 보내기
                  </button>
                )}
                {loadBox && (
                  <button className="CertifiedNumberSendButtonLoad">
                    <img
                      className="loadImg"
                      src="../img/load2.svg"
                      alt="오류"
                    ></img>
                  </button>
                )}
                {reSendBox && (
                  <button
                    className="CertifiedNumbeReSendButton"
                    onClick={CertifiedNumberSendClick}
                  >
                    재전송
                  </button>
                )}
                {sendFailBox && (
                  <button className="CertifiedNumbeReSendfail">완료</button>
                )}
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
                  disabled={isDisabled}
                ></input>
                {emailCertifiedButtonShow && (
                  <button
                    className="emailCertifiedButton"
                    onClick={emailCertifiedClick}
                  >
                    인증하기
                  </button>
                )}
                {emailCheckedBoxShow && (
                  <button className="emailCheckedBox">인증됨</button>
                )}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="rePasswordContainer">
              <div className="containerText">비밀번호 재입력</div>
              <input
                className="repasswordInput"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="nickNameContainer">
              <div className="containerText">닉네임</div>
              <input
                className="nickNameInput"
                type="string"
                disabled={false}
                onChange={(e) => setNickname(e.target.value)}
              ></input>
            </div>
            <div className="locationContainer">
              <div className="containerText">활동 선호 지역</div>
              <div className="locationContainerThree">
                <div className="SoulBox">서울특별시</div>
                <div className="locationContainerTwo">
                  <div
                    className="CitySelectFrame"
                    onClick={() => setShowCityList(!showCityList)}
                  >
                    <div className="CitySelectFrameTwo">
                      <div className="CityText">{countryShow}</div>
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
                        setSelectedCity={setcountry}
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
