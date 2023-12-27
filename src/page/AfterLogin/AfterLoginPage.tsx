import React, { useState } from "react";
import "react-toggle/style.css";
import "./AfterLoginPage.css";
import HeaderTwo from "../../HeaderTwo";
import { InnerBox } from "../Main/MainFirst";

function AfterLoginPage() {
  interface AfterLoginPageComponentProps {
    Title: string;
  }

  const AfterLoginPageComponent: React.FC<AfterLoginPageComponentProps> = ({
    Title,
  }) => {
    return (
      <div className="ComponentOneFrame">
        <div className="ComponentBoxOne">
          <div className="ComponentOneTitleProps">{Title}</div>
          <div className="TextMore">더 보기</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="AfterLoginPageFrame">
        <HeaderTwo></HeaderTwo>
        <InnerBox>
          <div className="WelcomeBox">
            <div className="WelcomeText">김찬주님, 환영합니다!</div>
          </div>
          <div className="ScheduleBox">
            <img
              className="ScheduleBoxImg"
              src="../img/ScheduleBoxImg.svg"
              alt="Error"
            ></img>
            <div className="ScheduleBoxText">
              다가오는 일정이 있습니다. 여기를 눌러 확인해 보세요!
            </div>
            <div className="ScheduleBoxTextTwo">3일후</div>
          </div>
          <div className="ProgressChartBox">
            <img
              className="ProgressChartBoxImg"
              src="../img/Heart.svg"
              alt="Error"
            ></img>
            <div className="ProgressChartBoxText">
              아직 프로필이 완성되지 않았습니다. 여기를 눌러 자세한 진척도를
              확인해 보세요!
            </div>
            <div className="ProgressChartBoxTextTwo">5단계 중 1단계 완료</div>
          </div>
          <div className="ComponentsFrame">
            <AfterLoginPageComponent Title="내 프로필"></AfterLoginPageComponent>
            <AfterLoginPageComponent Title="내 일정"></AfterLoginPageComponent>
            <AfterLoginPageComponent Title="최근에 남겨진 리뷰"></AfterLoginPageComponent>
            <AfterLoginPageComponent Title="프로필 방문자 통계"></AfterLoginPageComponent>
          </div>
        </InnerBox>
      </div>
    </div>
  );
}

export default AfterLoginPage;
