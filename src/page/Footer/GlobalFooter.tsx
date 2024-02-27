import React from "react";
import "./Footer.css";
import FooterBottomComponent from "./FooterBottom";

function GlobalFooter() {
  interface AppButtonProps {
    imgName: string;
    text: string;
  }

  const AppButton: React.FC<AppButtonProps> = ({ imgName, text }) => {
    return (
      <div className="AppButtonSize">
        <div className="AppButtonContainerOne">
          <img className="AppImg" src={`../img/${imgName}.svg`} alt=""></img>
          <div className="AppText useUrbanist">{text}</div>
        </div>
      </div>
    );
  };

  return (
    <footer>
      <div className="FooterFrame">
        <div className="FooterInnerBox">
          <div className="MoreInfoBox useUrbanist">
            Learn More
            <ul className="useUrbanist">
              <li>KOREAN GUIDE for Korean</li>
              <li>KOREAN GUIDE for Visitor</li>
            </ul>
          </div>
          <div className="FooterRightTopContainer">
            <p className="TextFindInApp useUrbanist">You can also find it on the app.</p>
            <div className="AppButtonFrame">
              <AppButton imgName="AppleLogo" text="App Store"></AppButton>
              <AppButton
                imgName="GooglePlayLogo"
                text="Google Play"
              ></AppButton>
            </div>
          </div>
          <div className="FooterRightBottomContainer">
            <div className="TextKG useUrbanist">KOREAN GUIDE</div>
            <div className="TextBoxOne">
              <div className="TextBoss useUrbanist">Representative</div>
              <div className="TextCJ useUrbanist">김찬주(Chanju KIM)</div>
            </div>
            <div className="TextBoxTwo">
              <div className="TextCustomerService useUrbanist">Customer Service</div>
              <div className="TextPhoneNumber useUrbanist">010-1234-1234</div>
            </div>
            <div className="TextBoxThree">
              <div className="TextPlusFriend useUrbanist">KakaoTalk Plus Chat</div>
            </div>
            <div className="TextBoxFour">
              <div className="TextChatBot useUrbanist">ChatBot</div>
            </div>
          </div>
          <FooterBottomComponent></FooterBottomComponent>
        </div>
      </div>
    </footer>
  );
}

export default GlobalFooter;
