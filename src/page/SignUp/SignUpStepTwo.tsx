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

  interface CityListBoxProps {
    CityName: string;
    setSelectedCity: any;
    setShowCityList: (show: boolean) => void;
  }

  const CityListBox: React.FC<CityListBoxProps> = ({
    CityName,
    setSelectedCity,
  }) => {
    return (
      <div
        className="CityListBox"
        onClick={() => {
          setSelectedCity(CityName);
          setShowCityList(false);
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
                <CityListBox
                  CityName="강서구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="양천구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="구로구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="영등포구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="금천구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="관악구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="동작구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="서초구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="강남구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="송파구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="강동구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="은평구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="서대문구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="마포구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="종로구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="종구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="용산구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="강북구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="성북구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="동대문구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="성동구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="도봉구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="노원구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="중량구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
                <CityListBox
                  CityName="광진구"
                  setSelectedCity={setSelectedCity}
                  setShowCityList={setShowCityList}
                ></CityListBox>
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
