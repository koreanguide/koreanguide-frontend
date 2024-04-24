import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HeaderTwo.css";
import { useNavigate } from "react-router-dom";

function HeaderTwo() {
  const token = sessionStorage.getItem("access-token");

  const [HeaderInfoBoxShow, setHeaderInfoBoxShow] = useState<boolean>(false);
  const [ActivityBoxShow, setActivityBoxShow] = useState<boolean>(false);
  const [MenuTrackBoxShow, setMenuTrackBoxShow] = useState<boolean>(false);
  const [ShowPhoneMenu, setShowPhoneMenu] = useState<boolean>(false);
  const [AnimateFunction, setAnimateFunction] = useState<boolean>(false);
  const [Amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const nickName = sessionStorage.getItem("name");
  const [ProfileImg, setProfileImg] = useState("");

  useEffect(() => {
    const MyInformation = async () => {
      try {
        const response = await axios.get("/v1/profile/infobox", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        setEmail(response.data.email);
        setAmount(response.data.credit);
        if (response.data.profileUrl === "DEFAULT") {
          setProfileImg("../img/NormalProfile.svg");
        } else {
          setProfileImg(response.data.profileUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };

    MyInformation();
  }, [token]);

  const ShowHeaderInfoBox = () => {
    setHeaderInfoBoxShow(!HeaderInfoBoxShow);
    setActivityBoxShow(false);
    setMenuTrackBoxShow(false);
  };

  const Activity = () => {
    setActivityBoxShow(!ActivityBoxShow);
    setHeaderInfoBoxShow(false);
    setMenuTrackBoxShow(false);
  };

  const MenuTrack = () => {
    setMenuTrackBoxShow(!MenuTrackBoxShow);
    setHeaderInfoBoxShow(false);
    setActivityBoxShow(false);
  };

  interface UserInformationButtonProps {
    UserName: any;
  }

  const UserInformationButton = (props: UserInformationButtonProps) => {
    return (
      <button className="UserInformationButton" onClick={ShowHeaderInfoBox}>
        <p className="UserInformationButtonText">{props.UserName}</p>
        <img
          src="/img/UserArrow.svg"
          alt="none"
          className="UserNameButtonImg"
        ></img>
      </button>
    );
  };

  const navigate = useNavigate();

  const goToCreditManagementPage = () => {
    navigate("/portal/credit");
    window.scrollTo(0, 0);
  };

  const goToCreateTrack = () => {
    navigate("/portal/track/new");
    window.scrollTo(0, 0);
  };

  const navigatePortal = () => {
    navigate("/portal");
    window.scrollTo(0, 0);
  };

  const goToChatPage = () => {
    navigate("/portal/chat");
    window.scrollTo(0, 0);
  };

  const goToProfilePage = () => {
    navigate("/portal/profile");
    window.scrollTo(0, 0);
  };

  const goToMyPage = () => {
    navigate("/portal/mypage");
    window.scrollTo(0, 0);
  };

  const goToMyTrack = () => {
    navigate("/portal/track");
    window.scrollTo(0, 0);
  };

  const goToSeoulMainPage = () => {
    navigate("/portal/seoul");
    window.scrollTo(0, 0);
  };

  const LogOutClick = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    navigate("/");
    window.scrollTo(0, 0);
  };

  // const MenuClick = () => {
  //   if (MenuImgState === "/img/x.svg") {
  //     setMenuImgState("/img/Menu.svg");
  //     setAnimateFunction(true);
  //     setTimeout(() => {
  //       setShowPhoneMenu(false);
  //     }, 500);
  //   } else {
  //     setMenuImgState("/img/x.svg");
  //     setAnimateFunction(false);
  //     setShowPhoneMenu(true);
  //   }
  // };

  return (
    <div className="HeaderTwoBoxFrame">
      <div className="HeaderTwoBox">
        {
          <div className="HomeButtonContainer">
            <button className="HomeButtonTwo" onClick={navigatePortal}>
              <img
                src="/img/HTL2.png"
                alt="none"
                className="HomeButtonImgTwo"
              ></img>
              <p className="HomeButtonTextTwo">KOREAN GUIDE</p>
            </button>
          </div>
        }
        {/* 분리 */}
        <div className="NavButtonFrame">
          <div className="NavButtonBox">
            <button
              className="HeaderSeoulTrackButton"
              onClick={goToSeoulMainPage}
            >
              <p className="HeaderSeoulTrackButtonText">AI 트랙 자동생성</p>
            </button>
            <button className="HeaderProfileButton" onClick={goToChatPage}>
              <img
                src="/img/pinkChat.svg"
                alt="none"
                className="pickChatImg"
              ></img>
              <p className="HeaderProfileButtonText">채팅</p>
            </button>
            <button className="HeaderCreditButton" onClick={Activity}>
              <p className="HeaderCreditButtonText">활동</p>
              <img
                src="/img/BlackArrow.svg"
                alt="none"
                className="BlackArrowImg"
              ></img>
            </button>
            <button className="HeaderMypageButton" onClick={MenuTrack}>
              <p className="HeaderMypageButtonText">트랙</p>
              <img
                src="/img/BlackArrow.svg"
                alt="none"
                className="BlackArrowImg"
              ></img>
            </button>
          </div>
          <UserInformationButton UserName={nickName}></UserInformationButton>
        </div>
        {/* 분리 */}
        {/* <div className="MenuImgBox" onClick={MenuClick}>
          <img src={MenuImgState} alt="none" className="MenuImg"></img>
        </div> */}
        {HeaderInfoBoxShow && (
          <div className="HeaderInfoBox">
            <div className="HeaderInfoInner">
              <div className="HeaderInfoSetting" onClick={goToMyPage}>
                <img
                  src="/img/settingImg.svg"
                  alt="none"
                  className="settingImg"
                ></img>
              </div>
              <div className="HeaderInfoSecondBox">
                <img
                  src={ProfileImg}
                  alt="none"
                  className="HeaderNormalProfile"
                ></img>
                <div className="HeaderInfoUserName">{nickName}</div>
                <div className="HeaderInfoUserEmail">{email}</div>
              </div>
              <div className="HeaderInfoThridBox">
                <div className="HeaderInfoUserAmount">
                  {Amount.toLocaleString()}원
                </div>
                <div className="HeaderInfoUserAmountNotion">보유 크레딧</div>
              </div>
              <div className="HeaderInfoLogoutBox" onClick={LogOutClick}>
                <img
                  src="/img/logoutImg.svg"
                  alt="none"
                  className="logoutImg"
                ></img>
                <div className="HeaderInfoTextLogout">로그아웃</div>
              </div>
            </div>
          </div>
        )}
        {ActivityBoxShow && (
          <div className="ActivityBox">
            <div className="ActivityInnerBox">
              <div className="ActivityBoxMenuText" onClick={goToMyPage}>
                리뷰관리
              </div>
              <div className="ActivityBoxLine"></div>
              <div
                className="ActivityBoxMenuText"
                onClick={goToCreditManagementPage}
              >
                크레딧관리
              </div>
              <div className="ActivityBoxLine"></div>
              <div className="ActivityBoxMenuText" onClick={goToProfilePage}>
                프로필관리
              </div>
            </div>
          </div>
        )}
        {MenuTrackBoxShow && (
          <div className="MenuTrackBoxBox">
            <div className="MenuTrackInnerBox">
              <div className="ActivityBoxMenuText" onClick={goToMyTrack}>
                등록 트랙 관리
              </div>
              <div className="ActivityBoxLine"></div>
              <div className="ActivityBoxMenuText" onClick={goToCreateTrack}>
                새 트랙 추가
              </div>
            </div>
          </div>
        )}
      </div>
      {ShowPhoneMenu && (
        <div>
          <div className={`PhoneMenu ${AnimateFunction ? "animate" : ""}`}>
            <div className="PhoneMenuInner">
              <div className="PhoneMenuText" onClick={goToChatPage}>
                채팅
              </div>
              <div className="PhoneMenuText" onClick={goToCreditManagementPage}>
                크레딧 관리
              </div>
              <div className="PhoneMenuText">리뷰 관리</div>
              <div className="PhoneMenuText">일정 관리</div>
              <div className="PhoneMenuText" onClick={goToMyPage}>
                프로필 관리
              </div>
              <div className="PhoneMenuText" onClick={goToMyPage}>
                내 정보
              </div>
              <div className="PhoneMenuText" onClick={goToMyTrack}>
                등록 트랙 관리
              </div>
              <div className="PhoneMenuText" onClick={goToCreateTrack}>
                새 트랙 추가
              </div>
            </div>
            <div className="PhoneMenuLogOutBox" onClick={LogOutClick}>
              <img
                src="/img/logoutImg.svg"
                alt="none"
                className="logoutImg"
              ></img>
              <div className="PhoneMenuLogOut">로그아웃</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderTwo;
