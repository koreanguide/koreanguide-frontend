import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PasswordReset.css";
import Footer from "../Footer/Footer";

function PasswordReset() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [validateKey, setvalidateKey] = useState<string>("");

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/portal/signin");
    window.scrollTo(0, 0);
  };

  const navigateToMain = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  interface passwordResetData {
    email: string;
    password: string;
    validateKey: string;
  }

  const handlepasswordReset = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setmessage("유효한 이메일 형식이 아닙니다.");
      setAlertBoxShow(true);
      return;
    }

    if (password !== confirmPassword) {
      setmessage("비밀번호 입력이 서로 일치하지 않습니다");
      setAlertBoxShow(true);
      return;
    }

    const data: passwordResetData = {
      validateKey: validateKey,
      email: email,
      password: password,
    };

    try {
      const response = await axios.put("/v1/reset/password", data);

      if (response.status === 200) {
        console.log("put 성공");
        setmessage(response.data.ko);
        setPositiveAlertBoxShow(true);
        setAlertBoxShow(false);
      }
    } catch (error: any) {
      if (error.response?.data) {
        setmessage(error.response.data.ko);
        setPositiveAlertBoxShow(false);
        setAlertBoxShow(true);
      }
    }
  };

  interface RePasswoCertifiedNumberData {
    email: string;
  }

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
    const data: RePasswoCertifiedNumberData = {
      email: email,
    };

    try {
      const response = await axios.post("/v1/verify/request/pw", data);

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

  interface RePasswordEmailCertifiedClickData {
    email: string;
    key: string;
  }

  const [emailCertifiedButtonShow, setemailCertifiedButtonShow] =
    useState(true);
  const [emailCheckedBoxShow, setemailCheckedBoxShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const emailCertifiedClick = async () => {
    const data: RePasswordEmailCertifiedClickData = {
      email: email,
      key: validateKey,
    };

    try {
      const response = await axios.post("/v1/verify/validate/pw", data);

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

  const [message, setmessage] = useState<string>("");

  return (
    <div className="mainFrame">
      <div className="passwordResetFrame">
        <div className="passwordResetInner">
          <div className="logoContainer" onClick={navigateToMain}>
            <img
              className="signinLogoImgNLSC"
              src="../img/NLSC.svg"
              alt="오류"
            ></img>
          </div>
          <div className="firstContainer">
            <div className="textWelcome">비밀번호 재설정</div>
            <div className="boxOne" onClick={goToLoginPage}>
              <div className="textBackToLogin">로그인 페이지로 돌아가기</div>
              <img className="arrowImg" src="../img/arrow.svg" alt="오류"></img>
            </div>
          </div>
          {PositiveAlertBoxShow && <PositiveAlertBox></PositiveAlertBox>}
          {AlertBoxShow && <AlertBox message={message}></AlertBox>}
          <div className="rePasswordTextOne">
            이메일 인증을 통해 비밀번호를 재설정할 수 있습니다.
          </div>
          <div className="rePasswordInputFrame">
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
                  onChange={(e) => setvalidateKey(e.target.value)}
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
            <button
              className="passwordResetButton"
              onClick={handlepasswordReset}
            >
              완료하기
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default PasswordReset;
