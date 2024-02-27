import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import GlobalFooter from "../Footer/GlobalFooter";

interface LoginData {
  email: string;
  password: string;
}

function GlobalLogin() {
  const navigate = useNavigate();

  window.scrollTo(0, 0);
  const goToPasswordReset = () => {
    navigate("/portal/reset_password?lang=en");
    window.scrollTo(0, 0);
  };
  const goToSignUpPage = () => {
    navigate("/portal/signup?lang=en");
    window.scrollTo(0, 0);
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

  const handleLogin = async () => {
    const data: LoginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("/v1/signin", data);

      if (response.status === 200) {
        sessionStorage.setItem("access-token", response.data.accessToken);
        sessionStorage.setItem("refresh-token", response.data.refreshToken);
        sessionStorage.setItem("email", response.data.email);
        console.log("로그인 성공");
        console.log(response.data.accessToken);
        navigate("/portal");
        window.scrollTo(0, 0);
        setLoginFailed(false);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setLoginFailed(true);
    }
  };

  interface LoginIconProps {
    imageName: string;
  }

  const LoginIcon = ({ imageName }: LoginIconProps) => {
    return (
      <div className="LoginIconFrame">
        <img
          className="signinCompanyLogoImg"
          src={`../img/${imageName}.svg`}
          alt="오류"
        ></img>
      </div>
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="mainFrame">
      <div className="signinframeEn">
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
            <div className="textWelcome useUrbanist">👋 Welcome back!</div>
          </div>
          {loginFailed && (
            <div className="alertContainer">
              <img
                className="alertImg"
                src="../img/alertImg.svg"
                alt="오류"
              ></img>
              <div className="alertText">
                등록되지 않은 회원입니다, 비밀번호와 아이디를 확인해주세요
              </div>
            </div>
          )}
          <div className="textLoginBox">
            <div className="textLogin useUrbanist">
            Sign-in is required to access the portal.
            </div>
          </div>
          <div className="LoginSecondContainer">
            <div className="LoginThirdContainer">
              <div className="textEmailAddress">E-mail Address</div>
              <input
                type="email"
                className="loginEmailInput"
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              ></input>
              <div className="textPassword">Password</div>
              <input
                type="password"
                className="loginPasswordInput"
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              ></input>
              <button className="complishmentButton" onClick={handleLogin}>
                Continue
              </button>
            </div>
            <div className="fourthContainer">
              <div className="textAnotherLogin">
                Alternatively, you can use the following login methods.
              </div>
              <div className="iconContainer">
                <LoginIcon imageName="Logo-1"></LoginIcon>
                <LoginIcon imageName="Logo-2"></LoginIcon>
                <LoginIcon imageName="Logo-3"></LoginIcon>
                <LoginIcon imageName="Logo-4"></LoginIcon>
                <LoginIcon imageName="Logo-5"></LoginIcon>
              </div>
              <div className="textAnotherOption">Do you need any other options?</div>
              <div className="findPasswordBox" onClick={goToPasswordReset}>
                <img
                  className="AnotherOptionImg"
                  src="../img/AnotherOptionImg.svg"
                  alt="오류"
                ></img>
                <div className="textLostPassword">
                  Did you forget your password?
                </div>
              </div>
              <div className="gotoSignUpBox" onClick={goToSignUpPage}>
                <img
                  className="AnotherOptionImg"
                  src="../img/AnotherOptionImg.svg"
                  alt="오류"
                ></img>
                <div className="textLostPassword">Aren't you a member?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlobalFooter></GlobalFooter>
    </div>
  );
}

export default GlobalLogin;
