import React from "react";
import "./MainSecond.css";
import { InnerBox } from "./MainFirst";

function MainSecond() {
  return (
    <div className="MainSecond">
      <InnerBox>
        <div className="Frame">
          <div className="KpopBox">
            <img src="../img/KpopImg.svg" alt="" className="KpopImgOne" />
            <img src="../img/KpopImg.svg" alt="" className="KpopImgTwo" />
            <img src="../img/KpopImg.svg" alt="" className="KpopImgThree" />
          </div>
          <div className="TextFrame">
            <p className="BigText">
              한국에 방문하는 한 관광객의, 친구같은 한 가이드로.
            </p>
            <p className="LitleText">
              한국 관광 명소를 여행하는 것도 좋지만,
              <br /> 한국에 여행 온 젊은 사람들은 한국의 문화를 몸소 경험하고
              싶을 거예요.
            </p>
          </div>
        </div>
      </InnerBox>
    </div>
  );
}

export default MainSecond;
