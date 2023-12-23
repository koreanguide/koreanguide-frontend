import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpLastStep.css";
import FooterBottomComponent from "../Footer/FooterBottom";

function SignUpLastStep() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div className="SignUpStepThreePage">
      <div className="SignUpFrame">
        <div className="PurpleBox">
          <div className="LogoText">KOREAN GUIDE</div>
          <img className="LogoImg" src="../img/Logo1.png" alt="오류"></img>
        </div>
        <div className="SignUpLastStepFrame">
          <img className="CheckImg" src="../img/check.svg" alt="오류"></img>
          <div className="TextCompleted">모든 과정이 완료되었어요!</div>
          <div className="TextThree">3초 뒤 메인 페이지로 이동됩니다.</div>
        </div>
      </div>
      <FooterBottomComponent></FooterBottomComponent>
    </div>
  );
}
export default SignUpLastStep;
