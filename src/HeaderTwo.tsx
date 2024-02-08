import React from "react";
import "./HeaderTwo.css";
import { useNavigate } from "react-router-dom";

interface UserInformationButtonProps {
  UserName: any;
}

const UserInformationButton = (props: UserInformationButtonProps) => {
  return (
    <button className="UserInformationButton">
      <p className="UserInformationButtonText">{props.UserName}님</p>
      <img
        src="../img/UserNameButtonImg.svg"
        alt="none"
        className="UserNameButtonImg"
      ></img>
    </button>
  );
};

function HeaderTwo() {
  const navigate = useNavigate();

  const goToMyProfile = () => {
    navigate("/AfterLogin");
    window.scrollTo(0, 0);
  };

  const goToCreditManagementPage = () => {
    navigate("/portal/credit");
    window.scrollTo(0, 0);
  };

  const goToMainPage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const navigatePortal = () => {
    navigate("/portal")
    window.scrollTo(0, 0);
  }

  const goToMyPage = () => {
    navigate("/portal/mypage");
    window.scrollTo(0, 0);
  };

  return (
    <div className="HeaderTwoBoxFrame">
      <div className="HeaderTwoBox">
        <button className="HomeButtonTwo" onClick={navigatePortal}>
          <img
            src="../img/HTL2.png"
            alt="none"
            className="HomeButtonImgTwo"
          ></img>
          <p className="HomeButtonTextTwo">KOREAN GUIDE</p>
        </button>
        <button className="HeaderProfileButton" onClick={goToMyPage}>
          <p className="HeaderProfileButtonText">프로필 관리</p>
        </button>
        <button className="HeaderReviewButton">
          <p className="HeaderReviewButtonText">리뷰 관리</p>
        </button>
        <button
          className="HeaderCreditButton"
          onClick={goToCreditManagementPage}
        >
          <p className="HeaderCreditButtonText">크레딧 관리</p>
        </button>
        <button className="HeaderMypageButton" onClick={goToMyPage}>
          <p className="HeaderMypageButtonText">내 트랙</p>
        </button>
        <button className="MassageButton">
          <img
            src="../img/K-Massage.svg"
            alt="none"
            className="MassageButtonImg"
          ></img>
        </button>
        <UserInformationButton UserName="김찬주"></UserInformationButton>
      </div>
    </div>
  );
}

export default HeaderTwo;
