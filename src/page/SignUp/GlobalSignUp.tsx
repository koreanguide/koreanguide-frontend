import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import GlobalFooter from "../Footer/GlobalFooter";

function GlobalSignUpPage() {
  interface AlertBoxProps {
    message: string;
  }

  const [AlertBoxShow, setAlertBoxShow] = useState(false);

  const AlertBox = ({ message }: AlertBoxProps) => {
    return (
      <div className="alertContainer">
        <img className="alertImg" src="../img/alertImg.svg" alt="오류"></img>
        <div className="alertText useUrbanist">{message}</div>
      </div>
    );
  };

  const [PositiveAlertBoxShow, setPositiveAlertBoxShow] = useState(false);

  const PositiveAlertBox = () => {
    return (
      <div className="alertContainerP">
        <img className="alertImgP" src="../img/alertImgP.svg" alt="오류"></img>
        <div className="alertTextP useUrbanist">{message}</div>
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
        setmessage(response.data.en);
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
      setmessage(error.response.data.en);
      setAlertBoxShow(true);
      setPositiveAlertBoxShow(false);
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setmessage("This is not a valid email format.");
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
      setmessage(error.response.data.en);
      setAlertBoxShow(true);
      setPositiveAlertBoxShow(false);
    }
  };

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/portal/signin?lang=en");
    window.scrollTo(0, 0);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setmessage("Password input and password re-entry do not match each other.");
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
        setmessage(error.response.data.en);
        setAlertBoxShow(true);
      }
    }

    if (!userRole) {
      setmessage("Choose between a guide and a tourist.");
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
  const [countryShow, setCountryShow] = useState<string>("Gangdong-gu");

  const cityData = [
    { kr: "Gangseo-gu", en: "GANGSEO" },
    { kr: "Yangcheon-gu", en: "YANGCHEON" },
    { kr: "Guro-gu", en: "GURO" },
    { kr: "Yongdengpo-gu", en: "YONGDENGPO" },
    { kr: "Geumcheon-gu", en: "GEUMCHEON" },
    { kr: "Gwanak-gu", en: "GWANAK" },
    { kr: "Dongjak-gu", en: "DONGJAK" },
    { kr: "Seocho-gu", en: "SEOCHO" },
    { kr: "Gangnam-gu", en: "GANGNAM" },
    { kr: "Songpa-gu", en: "SONGPA" },
    { kr: "Gangdong-gu", en: "GANGDONG" },
    { kr: "Eunpyeong-gu", en: "EUNPYEONG" },
    { kr: "Seodaemun-gu", en: "SEODAEMUN" },
    { kr: "Mapo-gu", en: "MAPO" },
    { kr: "Jongno-gu", en: "JONGNO" },
    { kr: "Jung-gu", en: "JUNG" },
    { kr: "Yongsan-gu", en: "YONGSAN" },
    { kr: "Gangbuk-gu", en: "GANGBUK" },
    { kr: "Seongbuk-gu", en: "SEONGBUK" },
    { kr: "Dongdaemun-gu", en: "DONGDAEMUN" },
    { kr: "Seongdong-gu", en: "SEONGDONG" },
    { kr: "Dobong-gu", en: "DOBONG" },
    { kr: "Nowon-gu", en: "NOWON" },
    { kr: "Jungnang-gu", en: "JUNGNANG" },
    { kr: "Gwangjin-gu", en: "GWANGJIN" },
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
        className="CityListBox useUrbanist"
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
            <div className="textWelcome useUrbanist">Create An Account</div>
            <div className="boxOne" onClick={goToLoginPage}>
              <div className="textBackToLogin useUrbanist">Back to Sign-in page</div>
              <img className="arrowImg" src="../img/arrow.svg" alt="오류"></img>
            </div>
          </div>
          {PositiveAlertBoxShow && <PositiveAlertBox></PositiveAlertBox>}
          {AlertBoxShow && <AlertBox message={message}></AlertBox>}
          <div className="textLoginBox">
            <div className="textLogin useUrbanist">Select user type.</div>
            <div className="selectText useUrbanist">
              If you are a foreigner visiting Korea, please register with the 'Visitor' type.
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
              <div className="textRoll useUrbanist">Guide</div>
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
              <div className="textRoll useUrbanist">Visitor</div>
            </button>
          </div>
          <div className="thirdContainer">
            <div className="textEssentialInfo useUrbanist">Let me know about you.</div>
            <div className="textEssentialInfoTwo useUrbanist">
              This information can be changed later.
            </div>
          </div>
          <div className="inputFrame">
            <div className="emailContainer">
              <div className="containerText useUrbanist">E-mail Address</div>
              <div className="emailInputBox">
                <input
                  type="email"
                  className="emailInput useUrbanist"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isDisabled}
                ></input>
                {sendBox && (
                  <button
                    className="CertifiedNumberSendButton useUrbanist"
                    onClick={CertifiedNumberSendClick}
                  >
                    Send
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
                    className="CertifiedNumbeReSendButton useUrbanist"
                    onClick={CertifiedNumberSendClick}
                  >
                    Resend
                  </button>
                )}
                {sendFailBox && (
                  <button className="CertifiedNumbeReSendfail useUrbanist">Done</button>
                )}
              </div>
            </div>
            <div className="emailCertifiedContainer">
              <div className="containerText useUrbanist">Authentication Number</div>
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
                    className="emailCertifiedButton useUrbanist"
                    onClick={emailCertifiedClick}
                  >
                    Validate
                  </button>
                )}
                {emailCheckedBoxShow && (
                  <button className="emailCheckedBox useUrbanist">Done</button>
                )}
              </div>
            </div>
            <div className="passwordContainer">
              <div className="passwordSecondContainer">
                <div className="containerText useUrbanist">Password</div>
                <div className="passwordNotion useUrbanist">
                  8 or more digits, special characters, capital letters, numbers
                </div>
              </div>
              <input
                className="passwordInput useUrbanist"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="rePasswordContainer">
              <div className="containerText useUrbanist">Re-enter Password</div>
              <input
                className="repasswordInput useUrbanist"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="nickNameContainer">
              <div className="containerText useUrbanist">Nickname</div>
              <input
                className="nickNameInput useUrbanist"
                type="string"
                disabled={false}
                onChange={(e) => setNickname(e.target.value)}
              ></input>
            </div>
            <div className="locationContainer">
              <div className="containerText useUrbanist">Areas to visit</div>
              <div className="locationContainerThree">
                <div className="SoulBox useUrbanist">Seoul, Korea</div>
                <div className="locationContainerTwo useUrbanist">
                  <div
                    className="CitySelectFrame"
                    onClick={() => setShowCityList(!showCityList)}
                  >
                    <div className="CitySelectFrameTwo">
                      <div className="CityText useUrbanist">{countryShow}</div>
                      <button
                        className="CitySelectButton useUrbanist"
                        onClick={() => setShowCityList(!showCityList)}
                      >
                        <img src="../img/ListButton.svg" alt="오류"></img>
                      </button>
                    </div>
                  </div>
                  <div
                    className="CitySelectListFrame useUrbanist"
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
          <button className="SignupButton useUrbanist" onClick={handleSignUp}>
            Complete
          </button>
        </div>
      </div>
      <GlobalFooter></GlobalFooter>
    </div>
  );
}
export default GlobalSignUpPage;
