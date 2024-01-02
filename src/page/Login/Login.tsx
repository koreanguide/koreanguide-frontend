import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import FooterBottomComponent from "../Footer/FooterBottom";

interface LoginData {
  email: string;
  password: string;
}

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const data: LoginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('/v1/signin', data);

      if (response.status === 200) {
        sessionStorage.setItem("access-token", response.data.accessToken);
        sessionStorage.setItem("refresh-token", response.data.refreshToken);
        sessionStorage.setItem("email", response.data.email);
        console.log("로그인 성공");
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleCreditTest = async () => {
    try {
      const token = sessionStorage.getItem("access-token");
      const response = await axios.get('/v1/credit/', {
        headers: {
          'X-AUTH-TOKEN': token
        }
      })

      if (response.status === 200) {
        console.log(response.data.amount);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <div className="PasswordText">비밀번호</div>
          <input
            className="PasswordInput"
            type="password"
            placeholder="passwd123@"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="FindIDButton">비밀번호를 잊어버리셨나요?</button>
          <Link to="/SignUp/StepOne">
            <button className="SignInButton">회원이 아니신가요?</button>
          </Link>
          <button className="LoginButton" onClick={handleLogin}>로그인</button>
          <button onClick={handleCreditTest}>크레딧 불러오기</button>
        </div>
      </div>
      <FooterBottomComponent></FooterBottomComponent>
    </div>
  );
}
export default LoginPage;
