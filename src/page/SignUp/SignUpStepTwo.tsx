import React, { useState } from "react";
import "./SignUpStepOne.css";
import "./SignUpStepTwo.css";
import { Link } from "react-router-dom";
import FooterBottomComponent from "../Footer/FooterBottom";

function SignUpStepTwo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordText, setPasswordText] = useState(
    "8자리, 특수문자, 대문자, 숫자 포함"
  );
  const [passwordTextColor, setPasswordTextColor] = useState("darkgray");
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [showCityList, setShowCityList] = useState(false);
  const [selectedCity, setSelectedCity] = useState("강동구");

  const isPasswordMatch = () => {
    if (rePassword) {
      return password === rePassword;
    }
  };

  const getPasswordMatchClass = () => {
    return isPasswordMatch() ? "PasswordMatch" : "PasswordMismatch";
  };

  const isValidEmail = () => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isValidPassword = () => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return re.test(password);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isValidEmail() && !isValidPassword()) {
      e.preventDefault();
      setShowEmailWarning(true);
      setPasswordText("비밀번호 형식이 잘못되었습니다.");
      setPasswordTextColor("red");
    } else if (!isValidEmail()) {
      e.preventDefault();
      setShowEmailWarning(true);
      setPasswordText("8자리, 특수문자, 대문자, 숫자 포함");
      setPasswordTextColor("green");
    } else if (!isValidPassword()) {
      e.preventDefault();
      setPasswordText("비밀번호 형식이 잘못되었습니다.");
      setShowEmailWarning(false);
      setPasswordTextColor("red");
    } else if (!isPasswordMatch()) {
      e.preventDefault();
    }
  };

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
    <div className="SignUpStepOnePage">
      <div className="SignUpFrame">
        <div className="PurpleBox">
          <div className="LogoText">KOREAN GUIDE</div>
          <img className="LogoImg" src="../img/Logo1.png" alt="오류"></img>
        </div>
        <div className="STTextOne">기본 정보를 알려주세요.</div>
        <div className="STTextTwo">
          변경하기 어려운 정보이니, 신중히 입력해주세요.
        </div>
        <div className="InputFrame">
          <div className="EmailInputFrame">
            <div className="EmailAdressText">이메일 주소</div>
            <input
              type="email"
              className="SignUpEmail"
              placeholder="abc@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <div
              className="EmailWarning"
              style={{ display: showEmailWarning ? "block" : "none" }}
            >
              이메일 형식이 잘못되었습니다.
            </div>
          </div>
          <div className="PasswordFrame">
            <div className="SignUpPasswordFrame">
              <div className="EmailAdressText">비밀번호</div>
              <input
                type="password"
                className="SignUpPassword"
                placeholder="password123!@#"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <div
                className="PasswordGuide"
                style={{ color: passwordTextColor }}
              >
                {passwordText}
              </div>
            </div>
            <div className="SignUpRepasswordFrame">
              <div className="EmailAdressText">비밀번호 재입력</div>
              <input
                type="password"
                className="SignUpPassword"
                placeholder="password123!@#"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              ></input>
              <div className={`PasswordCheckText ${getPasswordMatchClass()}`}>
                {isPasswordMatch() ? "일치합니다." : "일치하지 않습니다."}
              </div>
            </div>
          </div>
          <div className="SelectLocationFrame">
            <div className="SelectLocationFrameText">선호 활동 지역 선택</div>
            <div className="listFrame">
              <div className="SoulSelectFrame">
                <div className="SoulSelectFrameText">서울특별시</div>
              </div>
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
        <Link to="/SignUp/StepThree" onClick={handleClick}>
          <button className="StepThreeButton">다음 단계로 이동하기</button>
        </Link>
      </div>
      <FooterBottomComponent></FooterBottomComponent>
    </div>
  );
}
export default SignUpStepTwo;