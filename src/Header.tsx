import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const goToStart = () => {
    navigate("/portal/signin");
    window.scrollTo(0, 0);
  };

  return (
    <div className="HeaderBoxFrame">
      <div className="HeaderBox">
        <img className="HeaderBoxNLW" src="../img/NLW.svg" alt=""></img>
        <div className="HeaderBoxGoToGuideButton">
          <div className="HeaderBoxGoToGuideButtonText" onClick={goToStart}>
            가이드로 시작하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
