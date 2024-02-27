import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PasswordReset.css";
import GlobalFooter from "../Footer/GlobalFooter";

function GlobalPasswordReset() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [validateKey, setvalidateKey] = useState<string>("");

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/portal/signin?lang=en");
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
      setmessage("This is not a valid email format.");
      setAlertBoxShow(true);
      return;
    }

    if (password !== confirmPassword) {
      setmessage("Password input does not match each other.");
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
        setmessage(response.data.en);
        setPositiveAlertBoxShow(true);
        setAlertBoxShow(false);
      }
    } catch (error: any) {
      if (error.response?.data) {
        setmessage(error.response.data.en);
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
        setmessage(response.data.en);
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
      setmessage(error.response.data.en);
      setAlertBoxShow(true);
      setPositiveAlertBoxShow(false);
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setmessage("This is not a valid email format.");
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
      setmessage(error.response.data.en);
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
        <div className="alertText useUrbanist">{message}</div>
      </div>
    );
  };

  const [PositiveAlertBoxShow, setPositiveAlertBoxShow] = useState(false);
  const PositiveAlertBox = () => {
    return (
      <div className="alertContainerP">
        <img className="alertImgP" src="../img/alertImgP.svg" alt="오류"></img>
        <div className="alertTextP useUrbanist">{message}</div>
      </div>
    );
  };

  const [message, setmessage] = useState<string>("");

  return (
    <div className="mainFrame">
      <div className="passwordResetFrameEn">
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
            <div className="textWelcome useUrbanist">Reset password</div>
            <div className="boxOne" onClick={goToLoginPage}>
              <div className="textBackToLogin useUrbanist">Back to Sign-in page</div>
              <img className="arrowImg" src="../img/arrow.svg" alt="오류"></img>
            </div>
          </div>
          {PositiveAlertBoxShow && <PositiveAlertBox></PositiveAlertBox>}
          {AlertBoxShow && <AlertBox message={message}></AlertBox>}
          <div className="rePasswordTextOne">
            You can reset your password through email authentication.
          </div>
          <div className="rePasswordInputFrame">
            <div className="emailContainer">
              <div className="containerText useUrbanist">E-mail Address</div>
              <div className="emailInputBox">
                <input
                  type="email"
                  className="emailInput useUrbanist"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isDisabled}
                ></input>
                {sendBox && (
                  <button
                    className="CertifiedNumberSendButton"
                    onClick={CertifiedNumberSendClick}
                  >
                    Send
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
                    className="CertifiedNumbeReSendButton useUrbanist"
                    onClick={CertifiedNumberSendClick}
                  >
                    Resend
                  </button>
                )}
                {sendFailBox && (
                  <button className="CertifiedNumbeReSendfail useUrbanist">Done</button>
                )}
              </div>
            </div>
            <div className="emailCertifiedContainer">
              <div className="containerText useUrbanist">Authentication Number</div>
              <div className="emailCertifiedInputBox">
                <input
                  type="string"
                  className="emailCertifiedInput useUrbanist"
                  placeholder=""
                  onChange={(e) => setvalidateKey(e.target.value)}
                  disabled={isDisabled}
                ></input>
                {emailCertifiedButtonShow && (
                  <button
                    className="emailCertifiedButton useUrbanist"
                    onClick={emailCertifiedClick}
                  >
                    Validate
                  </button>
                )}
                {emailCheckedBoxShow && (
                  <button className="emailCheckedBox useUrbanist">Done</button>
                )}
              </div>
            </div>
            <div className="passwordContainer">
              <div className="passwordSecondContainer">
                <div className="containerText useUrbanist">New Password</div>
                <div className="passwordNotion useUrbanist">
                  8 or more digits, special characters, capital letters, numbers
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
              <div className="containerText useUrbanist">Re-enter New Password</div>
              <input
                className="repasswordInput useUrbanist"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <button
              className="passwordResetButton useUrbanist"
              onClick={handlepasswordReset}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <GlobalFooter></GlobalFooter>
    </div>
  );
}
export default GlobalPasswordReset;
