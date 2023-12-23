import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
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
          <Link to="/LoginPage">
            <button className="StartButton">
              <p>시작하기</p>
            </button>
          </Link>
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
