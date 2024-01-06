import React, { useState } from "react";
import "./PasswordReset.css";
import Footer from "../Footer/Footer";

function PasswordReset() {
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
          <div className="logoContainer">
            <img
              className="signinLogoImg"
              src="../img/PurpleAirplain.svg"
              alt="오류"
            ></img>
            <div className="textLogo">KOREAN GUIDE</div>
          </div>
          <div className="firstContainer">
            <div className="textWelcome">비밀번호 재설정</div>
            <div className="boxOne">
              <div className="textBackToLogin">로그인 페이지로 돌아가기</div>
              <img className="arrowImg" src="../img/arrow.svg" alt="오류"></img>
            </div>
          </div>
          {PositiveAlertBoxShow && <PositiveAlertBox></PositiveAlertBox>}
          {AlertBoxShow && <AlertBox message={message}></AlertBox>}
          {/* <AlertBox message={message}></AlertBox> */}
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
                  //   onChange={(e) => setEmail(e.target.value)}
                  //   disabled={isDisabled}
                ></input>
                <button
                  className="CertifiedNumberSendButton"
                  //   onClick={CertifiedNumberSendClick}
                >
                  인증 보내기
                </button>
                {/* {sendBox && (
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
                )} */}
              </div>
            </div>
            <div className="emailCertifiedContainer">
              <div className="containerText">인증 번호</div>
              <div className="emailCertifiedInputBox">
                <input
                  type="string"
                  className="emailCertifiedInput"
                  placeholder=""
                  //   onChange={(e) => setAuthKey(e.target.value)}
                  //   disabled={isDisabled}
                ></input>
                <button
                  className="emailCertifiedButton"
                  //   onClick={emailCertifiedClick}
                >
                  인증하기
                </button>
                {/* {emailCertifiedButtonShow && (
                      <button
                        className="emailCertifiedButton"
                        onClick={emailCertifiedClick}
                      >
                        인증하기
                      </button>
                    )}
                    {emailCheckedBoxShow && (
                      <button className="emailCheckedBox">인증됨</button>
                    )} */}
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
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="rePasswordContainer">
              <div className="containerText">비밀번호 재입력</div>
              <input
                className="repasswordInput"
                type="password"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <button
              className="passwordResetButton"
              //  onClick={handleSignUp}
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
