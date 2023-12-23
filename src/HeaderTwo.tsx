import React from "react";
import "./HeaderTwo.css";

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
  return (
    <div className="HeaderTwoBoxFrame">
      <div className="HeaderTwoBox">
        <button className="HomeButtonTwo">
          <img
            src="../img/HTL2.png"
            alt="none"
            className="HomeButtonImgTwo"
          ></img>
          <p className="HomeButtonTextTwo">KOREAN GUIDE</p>
        </button>
        <button className="HeaderProfileButton">
          <p className="HeaderProfileButtonText">프로필 관리</p>
        </button>
        <button className="HeaderReviewButton">
          <p className="HeaderReviewButtonText">리뷰 관리</p>
        </button>
        <button className="HeaderCreditButton">
          <p className="HeaderCreditButtonText">크레딧 관리</p>
        </button>
        <button className="HeaderMypageButton">
          <p className="HeaderMypageButtonText">내 정보</p>
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
