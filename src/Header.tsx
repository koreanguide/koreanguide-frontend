import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const goToStart = () => {
    navigate("/portal/signin");
    window.scrollTo(0, 0);
  };

  interface LanguageProps {
    ImgSrc: any;
    LanguageText: React.ReactNode;
  }

  const LanguageSelectBox = (props: LanguageProps) => {
    return (
      <button className="SelectLanguage">
        <img src={`../img/${props.ImgSrc}.svg`} alt="none"></img>
        <p>{props.LanguageText}</p>
      </button>
    );
  };

  const [showBox, setShowBox] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const toggleBox = () => {
    setShowBox(!showBox);
    setIsRotated(!isRotated);
  };

  return (
    <div className="HeaderBoxFrame">
      <div className="HeaderBox">
        <button className="HomeButton">
          <img
            src="../img/Logo2.png"
            alt="none"
            className="HomeButtonImg"
          ></img>
          <p className="HomeButtonText">KOREAN GUIDE</p>
        </button>
        <div className="StartButtonFrame">
          <button className="StartButton" onClick={goToStart}>
            <p>시작하기</p>
          </button>
        </div>
        <button className="language" onClick={toggleBox}>
          <p>Language</p>
          <img src="../img/Globe.svg" alt="none" className="Globe"></img>
          <img
            src="../img/DownArrow.svg"
            alt="none"
            className={`DownArrow ${isRotated ? "rotated" : ""}`}
          ></img>
        </button>
        {showBox && (
          <div className="languageSelectFrame">
            <LanguageSelectBox
              ImgSrc="KoreaFlag"
              LanguageText="한국어 (Korean)"
            ></LanguageSelectBox>
            <div className="Line"></div>
            <LanguageSelectBox
              ImgSrc="USAFlag"
              LanguageText="English (영어)"
            ></LanguageSelectBox>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
