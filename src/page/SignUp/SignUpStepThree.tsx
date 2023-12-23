import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpStepThree.css";
import FooterBottomComponent from "../Footer/FooterBottom";

function SignUpStepThree() {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate("/SignUp/Last");
  };

  return (
    <div className="SignUpStepThreePage">
      <div className="SignUpFrame">
        <div className="PurpleBox">
          <div className="LogoText">KOREAN GUIDE</div>
          <img className="LogoImg" src="../img/Logo1.png" alt="오류"></img>
        </div>
        <div className="SignUpStepThreeFrame">
          <img className="ImgPoint" src="../img/point.svg" alt="오류"></img>
          <div className="SignUpStepThreeTextBoxOne">
            <div className="TextSend">이메일로 인증번호를 발송했어요.</div>
            <div className="TextSendTwo">
              이메일로 발송된 인증번호를 확인하고 아래에 인증번호를 입력한 후,
              시작하기 버튼을 눌러주세요.
            </div>
          </div>
          <div className="SignUpStepThreeButtonBoxOne">
            <div className="TextMissingNum">인증번호가 도착하지 않았나요?</div>
            <div className="SignUpStepThreeButtonBoxTwo">
              <input className="NumInput" placeholder="인증번호 입력"></input>
              <button
                className="SignUpStepThreeStartButton"
                onClick={handleNextStep}
              >
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterBottomComponent></FooterBottomComponent>
    </div>
  );
}
export default SignUpStepThree;
