import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Portal.css";
import HeaderTwo from "../../HeaderTwo";
import Footer from "../Footer/Footer";
import axios from "axios";
import LoadPage from "../LoadPage/LoadPage";
import SeoulHeader from "../../SeoulHeader";

function Portal() {
  const token = sessionStorage.getItem("access-token");
  const nickName = sessionStorage.getItem("name");
  const [ShowProgressBox, setShowProgressBox] = useState<boolean>(false);
  const [totalLiked, setTotalLiked] = useState("");
  const [totalView, setTotalView] = useState("");
  const [credit, setCredit] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [firstLevel, setFirstLevel] = useState(false);
  const [secondLevel, setSecondLevel] = useState(false);
  const [thirdLevel, setThirdLevel] = useState(false);
  const [fourthLevel, setFourthLevel] = useState(false);
  const [fifthLevel, setFifthLevel] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [couponUsed, setCouponUsed] = useState(false);
  const [level, setLevel] = useState("");
  const navigate = useNavigate();

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const MainInfo = async () => {
      try {
        const response = await axios.get("/v1/profile/main", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });

        setTotalLiked(response.data.totalLiked);
        setTotalView(response.data.totalView);
        setCredit(response.data.credit);
      } catch (error) {
        console.error(error);
      }
    };

    const MainProfileProgressInfo = async () => {
      try {
        const response = await axios.get("/v1/profile/progress", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });

        setFirstLevel(response.data.firstLevel);
        setSecondLevel(response.data.secondLevel);
        setThirdLevel(response.data.thirdLevel);
        setFourthLevel(response.data.fourthLevel);
        setFifthLevel(response.data.fifthLevel);
        setLevel(response.data.level);
        setProfileComplete(response.data.profileComplete);
        setCouponUsed(response.data.couponUsed);
      } catch (error) {
        console.error(error);
      }
    };

    const MainProfileTrackRankComponent = async () => {
      try {
        const response = await axios.get("/v1/track/top");
        setTracks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    Promise.all([
      MainInfo(),
      MainProfileProgressInfo(),
      MainProfileTrackRankComponent(),
    ]).then(() => setIsLoading(false));
  }, [token]);

  const handleBoxClick = async () => {
    try {
      const response = await axios.post(
        "/v1/profile/progress/deposit",
        {},
        {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        }
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadPage />;
  }

  const ShowProgressBoxOnClick = () => {
    setShowProgressBox(true);
  };

  const OnClickProgressBoxHidden = () => {
    setShowProgressBox(false);
  };

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

  interface PortalRankTrackComponentProps {
    trackId: string;
    title: string;
    preview: string;
    primaryUrl: string;
    nickname: string;
    view: number;
    like: number;
    tags: string[];
    profileUrl?: string;
  }

  const PortalRankTrackComponent = ({
    track,
    rank,
  }: {
    track: PortalRankTrackComponentProps;
    rank: number;
  }) => {
    const profileUrl =
      track.profileUrl === "DEFAULT"
        ? "/img/NormalProfile.svg"
        : track.profileUrl;
    const handleTrackClick = () => {
      navigate(`/portal/track/view/${track.trackId}`);
    };
    return (
      <div className="PortalRankTrackComponentFrame" onClick={handleTrackClick}>
        <div className="PortalRankCircle">
          <div className="PortalRankNum">{rank}</div>
        </div>
        <div className="PortalRankTrackComponentInner">
          <div className="PortalRankTrackComponentBoxOne">
            <img
              className="TopTrackPrimaryImg"
              src={track.primaryUrl}
              alt="에러"
            ></img>
          </div>
          <div className="PortalRankTrackComponentInnerTwo">
            <div className="PortalRankTrackComponentBoxTwo">{track.title}</div>
            <div className="PortalRankTrackComponentBoxThree">
              {track.preview}
            </div>
            <div className="PortalRankTrackComponentBoxFour">
              {track.tags.map((tag) => (
                <div className="PortalRankTrackComponentBoxTag" key={tag}>
                  #{tag}
                </div>
              ))}
            </div>
            <div className="PortalRankTrackComponentBoxFive">
              <div className="PortalRankTrackComponentBoxSix">
                <img
                  className="PortalRankTrackComponentBoxProfileImg"
                  src={profileUrl}
                  alt="에러"
                ></img>

                <div className="PortalRankTrackComponentBoxNickName">
                  {track.nickname}
                </div>
              </div>
              <div className="PortalRankTrackComponentBoxSeven">
                <div className="PortalRankTrackComponentBoxViewNum">
                  {track.view}
                </div>
                <img className="eyeImg" src="../img/eye.svg" alt="view"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="GuideMainMainPage">
      <SeoulHeader></SeoulHeader>
      <HeaderTwo></HeaderTwo>
      <div className="GuideMainPage">
        <div className="GuideMainPageFrame">
          <div className="GuideMainPageTitleTextBox">
            <div className="GuideMainPageTitleText">{nickName}님,</div>
            <div className="GuideMainPageTitleText">
              오늘 하루는 어떠셨나요?
            </div>
          </div>
          {profileComplete && !couponUsed && (
            <div className="GuideMainPageScheduleBox" onClick={handleBoxClick}>
              <div className="GuideMainPageScheduleContent">
                <div className="GuideMainPageScheduleContentTwo">
                  <img
                    className="ScheduleBoxImg"
                    src="../img/Heart.svg"
                    alt=""
                  ></img>
                  <div className="ScheduleBoxText">
                    프로필이 모두 완성되었어요! 여기를 눌러 시작 크레딧(10,000
                    크레딧)을 지급 받으세요!
                  </div>
                </div>
              </div>
            </div>
          )}
          {!profileComplete && (
            <>
              {ShowProgressBox || (
                <div
                  className="GuideMainPageProgressBox"
                  onClick={ShowProgressBoxOnClick}
                >
                  <div className="GuideMainPageProgressContent">
                    <div className="GuideMainPageProgressContentTwo">
                      <img
                        className="ScheduleBoxImg"
                        src="../img/Heart.svg"
                        alt=""
                      ></img>
                      <div className="ScheduleBoxText">
                        아직 프로필이 완성되지 않았어요! 완성하고 시작 크레딧을
                        지급받으세요!
                      </div>
                    </div>
                    <div className="ScheduleBoxDateText">
                      5단계 중 {level}단계 완료
                    </div>
                  </div>
                </div>
              )}
              {ShowProgressBox && (
                <div
                  className="OnClickProgressBox"
                  onClick={OnClickProgressBoxHidden}
                >
                  <div className="OnClickProgressBoxFrameOne">
                    <div className="GuideMainPageProgressContent">
                      <div className="GuideMainPageProgressContentTwo">
                        <img
                          className="ScheduleBoxImg"
                          src="../img/Heart.svg"
                          alt=""
                        ></img>
                        <div className="ScheduleBoxText">
                          아직 프로필이 완성되지 않았어요! 완성하고 시작
                          크레딧을 지급받으세요!
                        </div>
                      </div>
                      <div className="ScheduleBoxDateText">
                        5단계 중 {level}단계 완료
                      </div>
                    </div>
                  </div>
                  <div className="OnClickProgressBoxFrameTwo">
                    <div className="OnClickProgressLevelBox">
                      <div className="OnClickProgressGroupBox">
                        {
                          <div className="OnClickProgressLevel">
                            <div className="OnClickProgressLevelBoxTwo">
                              <div
                                className={
                                  firstLevel
                                    ? "CompleteCircle"
                                    : "IncompleteCircle"
                                }
                              ></div>
                              <div className="OnClickProgressLevelText">
                                1단계
                              </div>
                            </div>
                            <div className="OnClickProgressLevelMissionText">
                              KOREAN GUIDE 가입하기
                            </div>
                          </div>
                        }
                        {
                          <div className="OnClickProgressLevel">
                            <div className="OnClickProgressLevelBoxTwo">
                              <div
                                className={
                                  secondLevel
                                    ? "CompleteCircle"
                                    : "IncompleteCircle"
                                }
                              ></div>
                              <div className="OnClickProgressLevelText">
                                2단계
                              </div>
                            </div>
                            <div className="OnClickProgressLevelMissionText">
                              소개글 등록하기
                            </div>
                          </div>
                        }
                        {
                          <div className="OnClickProgressLevel">
                            <div className="OnClickProgressLevelBoxTwo">
                              <div
                                className={
                                  thirdLevel
                                    ? "CompleteCircle"
                                    : "IncompleteCircle"
                                }
                              ></div>
                              <div className="OnClickProgressLevelText">
                                3단계
                              </div>
                            </div>
                            <div className="OnClickProgressLevelMissionText">
                              근처 지하철 역 등록하기
                            </div>
                          </div>
                        }
                      </div>
                      <div className="OnClickProgressGroupBoxTwo">
                        {
                          <div className="OnClickProgressLevel">
                            <div className="OnClickProgressLevelBoxTwo">
                              <div
                                className={
                                  fourthLevel
                                    ? "CompleteCircle"
                                    : "IncompleteCircle"
                                }
                              ></div>
                              <div className="OnClickProgressLevelText">
                                4단계
                              </div>
                            </div>
                            <div className="OnClickProgressLevelMissionText">
                              생년월일 등록하기
                            </div>
                          </div>
                        }
                        {
                          <div className="OnClickProgressLevel">
                            <div className="OnClickProgressLevelBoxTwo">
                              <div
                                className={
                                  fifthLevel
                                    ? "CompleteCircle"
                                    : "IncompleteCircle"
                                }
                              ></div>
                              <div className="OnClickProgressLevelText">
                                5단계
                              </div>
                            </div>
                            <div className="OnClickProgressLevelMissionText">
                              나만의 트랙 생성하기
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {
            <div className="GuideMainPageInfoContainer">
              <GuideMainPageInfoBox
                InfoBoxTitle="모든 트랙 조회 수"
                InfoBoxFigure={totalView.toLocaleString()}
                InfoBoxUnit="회"
                InfoBoxstyle={{
                  background:
                    "linear-gradient(316deg, #3876C0 26.21%, #A0C5F2 97.94%)",
                }}
                InfoBoxTextstyle={{
                  fontSize: "64px",
                }}
              ></GuideMainPageInfoBox>
              <GuideMainPageInfoBox
                InfoBoxTitle="모든 트랙 관심 수"
                InfoBoxFigure={totalLiked.toLocaleString()}
                InfoBoxUnit="회"
                InfoBoxstyle={{
                  background:
                    "linear-gradient(135deg, #ff1414 0%, #f46363 100%)",
                }}
                InfoBoxTextstyle={{
                  fontSize: "64px",
                }}
              ></GuideMainPageInfoBox>
              <GuideMainPageInfoBox
                InfoBoxTitle="내 크레딧"
                InfoBoxFigure={credit.toLocaleString()}
                InfoBoxUnit="크레딧"
                InfoBoxstyle={{
                  background:
                    "linear-gradient(316deg, #3876C0 26.21%, #A0C5F2 97.94%)",
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
                    <div className="PhoneGuideMainPageInfoBoxFigureUnit">
                      회
                    </div>
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
                    <div className="PhoneGuideMainPageInfoBoxFigureUnit">
                      회
                    </div>
                  </div>
                </div>
              </div>
              <div className="PhoneGuideMainPageInfoBoxThree">
                <div className="PhoneGuideMainPageInfoTextBox">
                  <div className="PhoneGuideMainPageInfoText">내 크레딧</div>
                  <div className="PhoneGuideMainPageInfoTextBoxTwo">
                    <div className="PhoneGuideMainPageInfoBoxFigure">
                      555,000
                    </div>
                    <div className="PhoneGuideMainPageInfoBoxFigureUnit">
                      회
                    </div>
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
            {tracks.map((track, index) => (
              <PortalRankTrackComponent track={track} rank={index + 1} />
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Portal;
