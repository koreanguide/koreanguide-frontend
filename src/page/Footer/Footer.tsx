import React from "react";
import "./Footer.css";
import FooterBottomComponent from "./FooterBottom";

function Footer() {
  interface AppButtonProps {
    imgName: string;
    text: string;
  }

  const AppButton: React.FC<AppButtonProps> = ({ imgName, text }) => {
    return (
      <div className="AppButtonSize">
        <div className="AppButtonContainerOne">
          <img className="AppImg" src={`../img/${imgName}.svg`} alt=""></img>
          <div className="AppText">{text}</div>
        </div>
      </div>
    );
  };

  return (
    <footer>
      <div className="FooterFrame">
        <div className="FooterInnerBox">
          <div className="MoreInfoBox">
            더 알아보기
            <ul>
              <li>KOREAN GUIDE for Korean</li>
              <li>KOREAN GUIDE for Visitor</li>
            </ul>
          </div>
          <div className="FooterRightTopContainer">
            <p className="TextFindInApp">앱에서도 만나보세요.</p>
            <div className="AppButtonFrame">
              <AppButton imgName="AppleLogo" text="App Store"></AppButton>
              <AppButton
                imgName="GooglePlayLogo"
                text="Google Play"
              ></AppButton>
            </div>
          </div>
          <div className="FooterRightBottomContainer">
            <div className="TextKG">KOREAN GUIDE (코리안가이드)</div>
            <div className="TextBoxOne">
              <div className="TextBoss">대표</div>
              <div className="TextCJ">김찬주</div>
            </div>
            <div className="TextBoxTwo">
              <div className="TextCustomerService">고객센터</div>
              <div className="TextPhoneNumber">010-1234-1234</div>
            </div>
            <div className="TextBoxThree">
              <div className="TextPlusFriend">카카오톡 플러스친구</div>
            </div>
            <div className="TextBoxFour">
              <div className="TextChatBot">챗봇</div>
            </div>
          </div>
          <FooterBottomComponent></FooterBottomComponent>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
