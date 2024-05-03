import React from "react";
import "./ChatPage.css";
import HeaderTwo from "../../HeaderTwo";
import SeoulHeader from "../../SeoulHeader";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const ChatTime: React.FC = () => {
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}`;

    return (
      <div className="ChatTime">
        <p>{formattedDate}</p>
      </div>
    );
  };

  const ChatBoxTime: React.FC = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 ${today.getDate()}일`;

    return (
      <div className="ChatBoxTime">
        <p>{formattedDate}</p>
      </div>
    );
  };

  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="ChatFrame">
      <SeoulHeader></SeoulHeader>
      <HeaderTwo></HeaderTwo>
      <div className="ChatBox">
        <div className="ChatSideBox">
          <div className="ChatSideTopBox">
            <div className="ChatSideTopBoxText">채팅</div>
            <div className="ChatSideTopBoxTwo">
              <img className="CPI-1" src="../img/CPI-1.svg" alt="error"></img>
              <div className="ChatSideTopBoxTwoText">최근 순</div>
            </div>
          </div>
          <div className="ChatSideBoxTwo">
            <div className="ChatSideBoxTwoInner">
              <div className="ChatSideBoxTwoInnerline"></div>
              <div className="ChatSideBoxTwoImgBox">
                <img
                  className="ChatSideBoxTwoImg"
                  src="../img/OnlyWhiteLogoImg.svg"
                  alt="error"
                ></img>
              </div>
              <div className="ChatSideBoxThree">
                <div className="ChatSideBoxThreeTextOne">KOREAN GUIDE</div>
                <div className="ChatSideBoxThreeTextTwo">
                  가이드님! KOREAN GUIDE에 오...
                </div>
              </div>
              <ChatTime></ChatTime>
            </div>
          </div>
        </div>
        <div className="ChatLine"></div>
        <div className="ChatMainBoxFrame">
          <div className="ChatMainBoxOne">
            <div className="ChatMainBoxTwo">
              <div className="ChatMainBoxTwoCircle">
                <img
                  className="ChatMainBoxTwoCircleImg"
                  src="../img/OnlyWhiteLogoImg.svg"
                  alt="error"
                ></img>
              </div>
              <div className="ChatMainBoxTwoTextBox">
                <div className="ChatMainBoxTwoTextOne">KOREAN GUIDE</div>
                <div className="ChatMainBoxTwoTextTwoBox">
                  <div className="ChatMainBoxTwoTextBoxCircle"></div>
                  <div className="ChatMainBoxTwoTextTwo">현재 활동중</div>
                </div>
              </div>
            </div>
            <div className="ChatInfoButton" onClick={goToMainPage}>
              <img
                className="ChatInfoButtonImg"
                src="../img/CPII.svg"
                alt="error"
              ></img>
              <div className="ChatInfoText">정보</div>
            </div>
          </div>
          <div className="ChatMainBoxLine"></div>
          <div className="ChatScrollableDiv">
            <div className="ChatScrollableDivInner">
              <ChatBoxTime></ChatBoxTime>
              <div className="ChatMassageBox">
                <div className="ChatMassageBoxCircle">
                  <img
                    className="ChatMassageBoxCircleImg"
                    src="../img/OnlyWhiteLogoImg.svg"
                    alt="error"
                  ></img>
                </div>
                <div className="ChatMassageBoxTwo">
                  <div className="ChatMassageBoxTwoInner">
                    <div className="ChatMassageBoxTextOne">
                      김찬주 가이드님!
                      <br />
                      <br />
                      KOREAN GUIDE에 오신 것을 환영합니다.
                      <br />
                      <br />
                      많은 관광객이 KOREAN GUIDE와 함께하고 있어요.
                      <br />
                      새로운 트랙을 생성하여 수 많은 관광객에게 노출하고, 일정을
                      함께하며 경험을 쌓아보세요!
                      <br />
                      <br />
                      도움이 필요하다면 언제든 저에게 질문해 주세요. 감사합니다.
                    </div>
                    <div className="ChatMassageBoxTextTwo">
                      <img
                        className="TranslateImg"
                        src="../img/TranslateImg.svg"
                        alt="error"
                      ></img>
                      <div className="ChatMassageBoxTextTwoText">
                        Guide 김찬주!
                        <br />
                        <br />
                        Welcome to KOREA GUIDE.
                        <br />
                        <br />A lot of tourists are with KOREA GUIDE.
                        <br />
                        Create a new track to expose it to countless tourists,
                        share the schedule, and gain experience!
                        <br />
                        <br />
                        If you need any help, feel free to ask me any questions.
                        <br />
                        Thank you.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ChatMassageTextRecent">방금</div>
              </div>
            </div>
          </div>
          <div className="ChatMainBoxFour">
            <img className="CSFI-1" src="../img/CSFI-1.svg" alt="error"></img>
            <img className="CSFI-2" src="../img/CSFI-2.svg" alt="error"></img>
            <img className="CSFI-3" src="../img/CSFI-3.svg" alt="error"></img>
          </div>
          <div className="ChatMassageTextInputBox">
            <div className="ChatMassageTextInputCircle">
              <img className="CMPI" src="../img/CMPI.svg" alt="error"></img>
            </div>
            <div className="ChatMassageTextInputPlaceholder">
              상담직원과는 대화가 불가능합니다.
            </div>
            <div className="ChatMassageTextInputCircle">
              <img className="CSBI" src="../img/CSBI.svg" alt="error"></img>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ChatPage;
