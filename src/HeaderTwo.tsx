import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HeaderTwo.css";
import { useNavigate } from "react-router-dom";

function HeaderTwo() {
  const token = sessionStorage.getItem("access-token");

  const [HeaderInfoBoxShow, setHeaderInfoBoxShow] = useState<boolean>(false);
  const [Amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    const HeaderUserAmount = async () => {
      try {
        const response = await axios.get("/v1/credit/", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("잔액조회", response.data);
        setAmount(response.data.amount);
      } catch (error) {
        console.error(error);
      }
    };

    const MyInformation = async () => {
      try {
        const response = await axios.get("/v1/profile/", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("내 정보", response.data);
        setNickName(response.data.nickName);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };

    MyInformation();
    HeaderUserAmount();
  }, [token]);

  const ShowHeaderInfoBox = () => {
    setHeaderInfoBoxShow(!HeaderInfoBoxShow);
  };

  interface UserInformationButtonProps {
    UserName: any;
  }

  const UserInformationButton = (props: UserInformationButtonProps) => {
    return (
      <button className="UserInformationButton" onClick={ShowHeaderInfoBox}>
        <p className="UserInformationButtonText">{props.UserName}님</p>
        <img
          src="../img/UserNameButtonImg.svg"
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

  const goToMyPage = () => {
    navigate("/portal/mypage");
    window.scrollTo(0, 0);
  };

  return (
    <div>
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
          <button className="HeaderMypageButton" onClick={goToCreateTrack}>
            <p className="HeaderMypageButtonText">내 트랙</p>
          </button>
          <button className="MassageButton">
            <img
              src="../img/K-Massage.svg"
              alt="none"
              className="MassageButtonImg"
            ></img>
          </button>
          <UserInformationButton UserName={nickName}></UserInformationButton>
        </div>
      </div>
      {HeaderInfoBoxShow && (
        <div className="HeaderInfoBox">
          <div className="HeaderInfoInner">
            <div className="HeaderInfoSetting" onClick={goToMyPage}>
              <img
                src="../img/settingImg.svg"
                alt="none"
                className="settingImg"
              ></img>
            </div>
            <div className="HeaderInfoSecondBox">
              <img
                src="../img/NormalProfile.svg"
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
            <div className="HeaderInfoLogoutBox">
              <img
                src="../img/logoutImg.svg"
                alt="none"
                className="logoutImg"
              ></img>
              <div className="HeaderInfoTextLogout">로그아웃</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderTwo;
