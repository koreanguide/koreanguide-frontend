import React from "react";
import "./MainFourth.css";
import { InnerBox } from "./MainFirst";

function MainFourth() {
  return (
    <div className="MainFourth">
      <InnerBox>
        <div className="MainFourthFrame">
          <div className="MainFourthTextBox">
            <p className="MainFourthBigText">
              언어 장벽,
              <br />
              기술로 극복하다
            </p>
            <p className="MainFourthLitleText">
              한국 관광 명소를 여행하는 것도 좋지만, <br />
              한국에 여행 온 젊은 사람들은 한국의 문화를 몸소 경험하고 싶을
              거예요.
            </p>
          </div>
          <div className="MainFourthImgBox">
            <img src="../img/MassageOne.svg" alt="" className="MassageOne" />
            <img src="../img/MassageTwo.svg" alt="" className="MassageTwo" />
          </div>
        </div>
      </InnerBox>
    </div>
  );
}

export default MainFourth;
