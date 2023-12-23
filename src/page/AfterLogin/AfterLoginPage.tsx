import React, { useState } from "react";
// import Toggle from "react-toggle";
import "react-toggle/style.css";
import "./AfterLoginPage.css";
import HeaderTwo from "../../HeaderTwo";
import { InnerBox } from "../Main/MainFirst";

interface WelcomeTextProps {
  UserName: any;
}

const WelcomeText = (props: WelcomeTextProps) => {
  return <p className="WelcomeText">{props.UserName}님, 환영합니다!</p>;
};

function AfterLoginPage() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div className="AfterLoginPageFrame">
        <HeaderTwo></HeaderTwo>
        <InnerBox>
          <div className="WelcomeTextBox">
            <WelcomeText UserName="김찬주"></WelcomeText>
            <div className="ProfileMuteSwitchBox">
              <p className="ProfileMuteSwitchText">프로필 공개 상태</p>
              {/* <Toggle
                className="ProfileSwitch"
                defaultChecked={isChecked}
                icons={false}
                onChange={handleToggle}
              /> */}
            </div>
          </div>
        </InnerBox>
      </div>
    </div>
  );
}

export default AfterLoginPage;
