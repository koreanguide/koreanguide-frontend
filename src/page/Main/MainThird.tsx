import React from "react";
import "./MainThird.css";

function MainThird() {
  return (
    <div className="MainThirdFrame">
      <img src="../img/Space.svg" alt="" className="Space"></img>
      <div className="MainThirdBox">
        <div className="MainThirdTextBox">
          <p className="MTPT1">
            가이드, 평험하지만
            <br /> 특별한 기회.
          </p>
          <p className="MTPT2">왜 가이드가 되는 일이 특별할까요?</p>
          <p className="MTPT3">
            일반적으로 가이드라고 하면, 전문적인 직업을 예상하지만
            <br />
            코리안가이드에서는 한국 문화를 가장 잘 이해하고
            <br />
            있는 누구나, 한국에 관광 온 외국인의 가이드가 될 수 있어요.
          </p>
          <p className="MTPT2">더 넓은 생각</p>
          <p className="MTPT3">
            세계에는 우리나라 뿐만 아니라 다른 나라도 엄청 많죠.
            <br />
            세계 다른 외국인과 소통하며 시야를 넓히고, 더 깊은 생각을
            <br />
            하게 될 수 있는 좋은 기회에요.
          </p>
          <p className="MTPT2">언어 능력 향상 기회</p>
          <p className="MTPT3">
            한국어를 사용하지 않는 세계 각지 외국인과 소통하며,
            <br />
            언어 능력을 자연스럽게 향상시킬 수 있어요.
          </p>
        </div>
        <div className="MainThirdImgBox">
          <img src="../img/Earth.svg" alt="" className="Earth"></img>
        </div>
      </div>
    </div>
  );
}

export default MainThird;
