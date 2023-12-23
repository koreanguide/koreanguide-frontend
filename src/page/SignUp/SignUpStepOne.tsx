import React, { useState } from "react";
import "./SignUpStepOne.css";
import { useNavigate } from "react-router-dom";
import FooterBottomComponent from "../Footer/FooterBottom";

function SignUpStepOne() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleNextStep = () => {
    if (selectedButton) {
      navigate("/SignUp/StepTwo");
    } else {
      setShowMessage(true);
    }
  };

  return (
    <div className="SignUpStepOnePage">
      <div className="SignUpFrame">
        <div className="PurpleBox">
          <div className="LogoText">KOREAN GUIDE</div>
          <img className="LogoImg" src="../img/Logo1.png" alt="오류"></img>
        </div>
        <div className="TextOne">어떤 사용자로 가입하시겠어요?</div>
        <div className="TextTwo">한 번 선택하면, 되돌릴 수 없어요.</div>
        <div className="ButtonContainer">
          <button
            className={`SelectGuide ${
              selectedButton === "guide" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("guide")}
          >
            <img src="../img/hand-solid 1.svg" alt="" className="HandImg"></img>
            <div className="SelectGuideTextOne">가이드</div>
          </button>
          <button
            className={`SelectTourist ${
              selectedButton === "tourist" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("tourist")}
          >
            <img src="../img/jet.svg" alt="" className="JetImg"></img>
            <div className="SelectGuideTextTwo">관광객</div>
          </button>
          <div className="NextStepButtonLink">
            <button className="NextStepButton" onClick={handleNextStep}>
              다음 단계로 이동하기
            </button>
            {showMessage && (
              <div className="NotionText">
                가이드 또는 관광객 중 하나를 선택해주세요.
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterBottomComponent></FooterBottomComponent>
    </div>
  );
}
export default SignUpStepOne;
