import React, { useState } from "react";
import "./SignUpStepOne.css";
import "./SignUpStepTwo.css";
import { Link } from "react-router-dom";
import FooterBottomComponent from "../Footer/FooterBottom";

function SignUpStepTwo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

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
      alert("이메일 혹은 비밀번호 형식이 잘못되었습니다.");
    } else if (!isValidEmail()) {
      e.preventDefault();
      alert("이메일 형식이 잘못되었습니다.");
    } else if (!isValidPassword()) {
      e.preventDefault();
      alert("비밀번호 형식이 잘못되었습니다.");
    }
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
            </div>
          </div>
          <div className="LocationFrame">
            <div className="EmailAdressText">거주 지역</div>
            <div className="LocationSelectBox"></div>
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
