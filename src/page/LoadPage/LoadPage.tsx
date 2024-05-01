import React from "react";
import HeaderTwo from "../../HeaderTwo";
import "./LoadPage.css";
import SeoulHeader from "../../SeoulHeader";

function LoadPage() {
  return (
    <div className="LoadPageFrame">
      <SeoulHeader></SeoulHeader>
      <HeaderTwo></HeaderTwo>
      <div className="LoadPageInner">
        <img src="/img/SeoulLoadImg2.svg" className="loadImg"></img>
        <div className="LoadPageTitle">잠시만 기다려 주세요!</div>
        <div className="LoadPageDescription">
          사용자님의 정보를 불러오는 중이에요. <br />이 화면이 계속된다면
          새로고침(F5)을 시도해 보세요.
        </div>
      </div>
    </div>
  );
}

export default LoadPage;
