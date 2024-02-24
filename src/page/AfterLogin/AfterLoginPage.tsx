import React from "react";
import "./AfterLoginPage.css";
// import "src/page/Track/MyTrack.css";
import HeaderTwo from "../../HeaderTwo";

function AfterLoginPage() {
  interface GuideMainPageInfoBoxProps {
    InfoBoxTitle: string;
    InfoBoxFigure: string;
    InfoBoxUnit: string;
    InfoBoxstyle: any;
    InfoBoxTextstyle: any;
  }
  const GuideMainPageInfoBox: React.FC<GuideMainPageInfoBoxProps> = ({
    InfoBoxTitle,
    InfoBoxFigure,
    InfoBoxUnit,
    InfoBoxstyle,
    InfoBoxTextstyle,
  }) => {
    return (
      <div className="GuideMainPageInfoBoxOne" style={InfoBoxstyle}>
        <div className="GuideMainPageInfoBoxOneInner">
          <div className="GuideMainPageInfoBoxOneText">{InfoBoxTitle}</div>
          <div
            className="GuideMainPageInfoBoxOneFigure"
            style={InfoBoxTextstyle}
          >
            {InfoBoxFigure}
            <span className="GuideMainPageInfoBoxOneFigureUnit">
              {InfoBoxUnit}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // const GuidePageTrackComponent = ({ track }: { track: any }) => {
  const GuidePageTrackComponent = () => {
    return (
      <div className="MyTrackComponent">
        <div className="MyTrackComponentImgBox">
          <img
            className="MyTrackComponentStar"
            src="../img/NoneStar.svg"
            alt="오류"
          ></img>
          {/* <img
            className="MyTrackComponentImg"
            src={track.primaryImageUrl}
            alt="오류"
          ></img> */}
        </div>
        <div className="MyTrackComponentTextBox">
          {/* <div className="MyTrackComponentTitleText">{track.trackTitle}</div>
          <div className="MyTrackComponentSubText">{track.trackPreview}</div> */}
          <div className="MyTrackComponentTitleText">
            한국의 아름다움을 함께해요
          </div>
          <div className="MyTrackComponentSubText">
            한국의 중심 서울을 구석구석 함께해요
          </div>
        </div>
        <div className="MyTrackComponentContentBox">
          <div className="MyTrackComponentTagBox">
            {/* {track.tags.map((tag: string, index: number) => (
              <span key={index}> #{tag}</span>
            ))} */}
          </div>
          <div className="MyTrackComponentContent">
            <div className="MyTrackComponentViewBox">
              <img className="" src="../img/eye.svg" alt="조회수"></img>
              {/* <div className="MyTrackComponentView">{track.view}</div> */}
              <div className="MyTrackComponentView">1,034</div>
            </div>
            <div className="MyTrackComponentHeartBox">
              <img
                className="MyTrackComponentHeartImg"
                src="../img/MyTrackheart.svg"
                alt="조회수"
              ></img>
              {/* <div className="MyTrackComponentHeart">{track.like}</div> */}
              <div className="MyTrackComponentHeart">78</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="GuideMainPage">
      <HeaderTwo></HeaderTwo>
      <div className="GuideMainPageFrame">
        <div className="GuideMainPageTitleTextBox">
          <div className="GuideMainPageTitleText">김찬주님,</div>
          <div className="GuideMainPageTitleText">오늘 하루는 어떠셨나요?</div>
        </div>
        <div className="GuideMainPageScheduleBox">
          <div className="GuideMainPageScheduleContent">
            <div className="GuideMainPageScheduleContentTwo">
              <img
                className="ScheduleBoxImg"
                src="../img/ScheduleBoxImg.svg"
                alt=""
              ></img>
              <div className="ScheduleBoxText">
                다가오는 일정이 있습니다. 여기를 눌러 확인해 보세요!
              </div>
            </div>
            <div className="ScheduleBoxDateText">3 일후</div>
          </div>
        </div>
        <div className="GuideMainPageProgressBox">
          <div className="GuideMainPageProgressContent">
            <div className="GuideMainPageProgressContentTwo">
              <img
                className="ScheduleBoxImg"
                src="../img/Heart.svg"
                alt=""
              ></img>
              <div className="ScheduleBoxText">
                아직 프로필이 완성되지 않았습니다. 여기를 눌러 진척도를 확인해
                보세요!
              </div>
            </div>
            <div className="ScheduleBoxDateText">1단계 완료</div>
          </div>
        </div>
        {
          <div className="GuideMainPageInfoContainer">
            <GuideMainPageInfoBox
              InfoBoxTitle="모든 트랙 조회 수"
              InfoBoxFigure="592"
              InfoBoxUnit="회"
              InfoBoxstyle={{
                background: "linear-gradient(316deg, #730ef4 0%, #bb88fb 100%)",
              }}
              InfoBoxTextstyle={{
                fontSize: "64px",
              }}
            ></GuideMainPageInfoBox>
            <GuideMainPageInfoBox
              InfoBoxTitle="모든 트랙 관심 수"
              InfoBoxFigure="592"
              InfoBoxUnit="회"
              InfoBoxstyle={{
                background: "linear-gradient(135deg, #ff1414 0%, #f46363 100%)",
              }}
              InfoBoxTextstyle={{
                fontSize: "64px",
              }}
            ></GuideMainPageInfoBox>
            <GuideMainPageInfoBox
              InfoBoxTitle="내 크레딧"
              InfoBoxFigure="100,000"
              InfoBoxUnit="크레딧"
              InfoBoxstyle={{
                background: "linear-gradient(316deg, #730ef4 0%, #bb88fb 100%)",
              }}
              InfoBoxTextstyle={{
                fontSize: "45px",
              }}
            ></GuideMainPageInfoBox>
          </div>
        }
        {
          <div className="PhoneGuideMainPageInfoContainer">
            <div className="PhoneGuideMainPageInfoBoxOne">
              <div className="PhoneGuideMainPageInfoTextBox">
                <div className="PhoneGuideMainPageInfoText">
                  모든 트랙 조회 수
                </div>
                <div className="PhoneGuideMainPageInfoTextBoxTwo">
                  <div className="PhoneGuideMainPageInfoBoxFigure">555</div>
                  <div className="PhoneGuideMainPageInfoBoxFigureUnit">회</div>
                </div>
              </div>
            </div>
            <div className="PhoneGuideMainPageInfoBoxTwo">
              <div className="PhoneGuideMainPageInfoTextBox">
                <div className="PhoneGuideMainPageInfoText">
                  모든 트랙 관심 수
                </div>
                <div className="PhoneGuideMainPageInfoTextBoxTwo">
                  <div className="PhoneGuideMainPageInfoBoxFigure">555</div>
                  <div className="PhoneGuideMainPageInfoBoxFigureUnit">회</div>
                </div>
              </div>
            </div>
            <div className="PhoneGuideMainPageInfoBoxThree">
              <div className="PhoneGuideMainPageInfoTextBox">
                <div className="PhoneGuideMainPageInfoText">내 크레딧</div>
                <div className="PhoneGuideMainPageInfoTextBoxTwo">
                  <div className="PhoneGuideMainPageInfoBoxFigure">555,000</div>
                  <div className="PhoneGuideMainPageInfoBoxFigureUnit">회</div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="GuideMainPageTrackTextBox">
          <div className="GuideMainPageTrackTextOne">
            코리안 가이드 인기 트랙 TOP 3
          </div>
          <div className="GuideMainPageTrackTextTwo">
            코리안 가이드에서 가장 인기있는 순위권 트랙을 참고하여, 내 트랙에
            반영해 보세요!
          </div>
        </div>
        <div className="GuidePageTrackComponentContainer">
          <GuidePageTrackComponent></GuidePageTrackComponent>
          <GuidePageTrackComponent></GuidePageTrackComponent>
          <GuidePageTrackComponent></GuidePageTrackComponent>
        </div>
      </div>
    </div>
  );
}

export default AfterLoginPage;
