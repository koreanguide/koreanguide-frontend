import React from "react";
import "./MainFifth.css";
import { InnerBox } from "./MainFirst";
import { useNavigate } from "react-router-dom";

function MainFifth() {
  const navigate = useNavigate();
  const goToStart = () => {
    navigate("/signin");
    window.scrollTo(0, 0);
  };

  return (
    <div className="MainFifth">
      <InnerBox>
        <div className="MainFifthFrame">
          <p className="MainFifthBigText">이제 시작해 볼까요?</p>
          <p className="MainFifthLitleText">
            {" "}
            몇 단계만 더 진행하면, 나도 가이드가 될 수 있어요!
          </p>
          <div>
            <button className="GetStartButton" onClick={goToStart}>
              <p>지금 시작하기</p>
            </button>
          </div>
        </div>
      </InnerBox>
    </div>
  );
}

export default MainFifth;
