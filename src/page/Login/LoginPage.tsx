import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

  window.scrollTo(0, 0);
  const goToPasswordReset = () => {
    navigate("/portal/reset_password");
    window.scrollTo(0, 0);
  };
  const goToSignUpPage = () => {
    navigate("/portal/signup");
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
      <div className="signinframe">
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
            <div className="textWelcome">환영합니다!</div>
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
            <div className="textLogin">
              포털에 접근하려면 로그인이 필요합니다.
            </div>
          </div>
          <div className="LoginSecondContainer">
            <div className="LoginThirdContainer">
              <div className="textEmailAddress">이메일 주소</div>
              <input
                type="email"
                className="loginEmailInput"
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              ></input>
              <div className="textPassword">비밀번호</div>
              <input
                type="password"
                className="loginPasswordInput"
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              ></input>
              <button className="complishmentButton" onClick={handleLogin}>
                완료하기
              </button>
            </div>
            <div className="fourthContainer">
              <div className="textAnotherLogin">
                또는 다음의 로그인 방법을 사용할 수 있습니다.
              </div>
              <div className="iconContainer">
                <LoginIcon imageName="Logo-1"></LoginIcon>
                <LoginIcon imageName="Logo-2"></LoginIcon>
                <LoginIcon imageName="Logo-3"></LoginIcon>
                <LoginIcon imageName="Logo-4"></LoginIcon>
                <LoginIcon imageName="Logo-5"></LoginIcon>
              </div>
              <div className="textAnotherOption">다른 옵션이 필요하신가요?</div>
              <div className="findPasswordBox" onClick={goToPasswordReset}>
                <img
                  className="AnotherOptionImg"
                  src="../img/AnotherOptionImg.svg"
                  alt="오류"
                ></img>
                <div className="textLostPassword">
                  비밀번호를 잊어버리셨나요?
                </div>
              </div>
              <div className="gotoSignUpBox" onClick={goToSignUpPage}>
                <img
                  className="AnotherOptionImg"
                  src="../img/AnotherOptionImg.svg"
                  alt="오류"
                ></img>
                <div className="textLostPassword">회원이 아니신가요?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
