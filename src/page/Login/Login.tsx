import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import FooterBottomComponent from "../Footer/FooterBottom";

function LoginPage() {
  return (
    <div className="LoginPageFrame">
      <div className="LoginBoxOne">
        <button className="LoginLanguage">
          <img
            className="GlobeTwoImg"
            src="../img/globe-solid 1.svg"
            alt="오류"
          ></img>
          <div className="LoginLanguageText">Language</div>
          <img
            className="LoginLanguageArrowImg"
            src="../img/Vector 215.svg"
            alt="오류"
          ></img>
        </button>
        <div className="LoginBoxTwo">
          <div className="LoginComment">많은 사람이 기다리고 있어요!</div>
          <div className="PurpleBox">
            <div className="SocialLogin">소셜 로그인으로 빠른 시작</div>
            <div className="SocialLoginCircleFrame">
              <div className="SocialLoginCircle">
                <img src="../img/LogoOne.png" alt=""></img>
              </div>
              <div className="SocialLoginCircle"></div>
              <div className="SocialLoginCircle"></div>
              <div className="SocialLoginCircle"></div>
            </div>
            <div className="LogoText">KOREAN GUIDE</div>
            <img className="LogoImg" src="../img/Logo1.png" alt="오류"></img>
          </div>
          <div className="EmailText">이메일 주소</div>
          <input
            className="EmailInput"
            type="email"
            placeholder="abc@example.com"
          ></input>
          <div className="PasswordText">비밀번호</div>
          <input
            className="PasswordInput"
            type="password"
            placeholder="passwd123@"
          ></input>
          <button className="FindIDButton">비밀번호를 잊어버리셨나요?</button>
          <Link to="/SignUp/StepOne">
            <button className="SignInButton">회원이 아니신가요?</button>
          </Link>
          <button className="LoginButton">로그인</button>
        </div>
      </div>
      <FooterBottomComponent></FooterBottomComponent>
    </div>
  );
}
export default LoginPage;
