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
  const [MobileLoginError, setMobileLoginError] = useState<boolean>(true);
  const [MobilePopUpShow, setMobilePopUpShow] = useState<boolean>(true);

  const Rest_api_key = '309a47548b21aa409474a400b62810b3';
  const protocol = window.location.protocol; // 현재 페이지의 프로토콜 확인
  let redirect_uri;
  
  if (protocol === 'http:') {
      redirect_uri = 'http://localhost:3000/'; // 개발 환경일 경우
  } else if (protocol === 'https:') {
      redirect_uri = 'https://koreanguide-frontend.vercel.app/'; // 실제 서비스 환경일 경우
  }

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL
  }

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
        sessionStorage.setItem("name", response.data.name);
        console.log("로그인 성공");
        console.log(response.data.accessToken);
        navigate("/portal");
        window.scrollTo(0, 0);
        setLoginFailed(false);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setLoginFailed(true);
      setMobileLoginError(false);
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
          onClick={handleKakaoLogin}
        ></img>
      </div>
    );
  };

  const MobileLoginIcon = ({ imageName }: LoginIconProps) => {
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

  const MobilePopUp = () => {
    setMobilePopUpShow(false);
  };

  return (
    <div className="signinframe">
      <div className="Logininner">
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
              <div className="textLostPassword">비밀번호를 잊어버리셨나요?</div>
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
      <div className="MobileLoginPageFrame">
        <div className="MobileLoginPageFrameInner">
          <div className="MobileLoginPageLogoFrame">
            <img
              className="KGMoblieLoginLogoImg"
              src="../img/KGMoblieLoginLogo.svg"
              alt="오류"
            ></img>
            <div className="MobileLoginPageLogoText">KOREAN GUIDE</div>
          </div>
          {MobileLoginError && (
            <div className="MobileLoginPageSubText">
              이메일 로그인 또는 소셜 로그인이 필요합니다.
            </div>
          )}
          {!MobileLoginError && (
            <div className="MobileLoginPageSubTextError">
              등록되지 않은 회원입니다, 비밀번호와 아이디를 확인해주세요
            </div>
          )}
          <div className="MobileLoginPageEmailInputBox">
            <img
              className="EmailIcon"
              src="../img/EmailIcon.svg"
              alt="오류"
            ></img>
            <input
              type="email"
              className="MobileLoginPageEmailInput"
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="이메일 주소"
            ></input>
          </div>
          <div className="MobileLoginPagePasswordInputBox">
            <img
              className="EmailIcon"
              src="../img/PasswordIcon.svg"
              alt="오류"
            ></img>
            <input
              type="password"
              className="MobileLoginPageEmailInput"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="비밀번호"
            ></input>
          </div>
          <div className="MobileLoginPageStartButton" onClick={handleLogin}>
            시작하기
          </div>
          <div className="MobileLoginPageSubTextTwo">
            소셜 로그인으로 시작하기
          </div>
          <div className="MobileLoginPageSocialLoginBox">
            <MobileLoginIcon imageName="Logo-1"></MobileLoginIcon>
            <MobileLoginIcon imageName="Logo-2"></MobileLoginIcon>
            <MobileLoginIcon imageName="Logo-3"></MobileLoginIcon>
            <MobileLoginIcon imageName="Logo-4"></MobileLoginIcon>
            <MobileLoginIcon imageName="Logo-5"></MobileLoginIcon>
          </div>
        </div>
      </div>
      {MobilePopUpShow && (
        <div className="MobilePopUpFrame" onClick={MobilePopUp}>
          <div className="MobilePopUpButton"></div>
          <div className="MobilePopUpLogoFrame">
            <img
              className="MobilePopUpLogoImg"
              src="../img/MobilePopUpLogoImg.svg"
              alt="오류"
            ></img>
          </div>
          <div className="MobilePopUpTextOne">
            더 편하게 가이드 활동을 진행해 보세요.
          </div>
          <div className="MobilePopUpTextTwo">
            코리안 가이드 앱은 다양한 이벤트 진행 중!
          </div>
          <div className="MobilePopUpAppButton">앱 이용하기</div>
          <div className="MobilePopUpTextThree">
            괜찮아요, 모바일 웹도 충분해요!
          </div>
        </div>
      )}
      {/* <Footer></Footer> */}
    </div>
  );
}

export default Login;
