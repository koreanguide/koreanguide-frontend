import React, { useState, useEffect } from "react";
import HeaderTwo from "../../HeaderTwo";
import "./LoadPage.css";

function LoadPage() {
    const token = sessionStorage.getItem("access-token");

    useEffect(() => {
        if (token === null) {
          console.log("세션 스토리지에 토큰이 없습니다.");
          return;
        } else {
          console.log("토큰", token);
        }
    }, [token]);

    return (
        <div className="LoadPageFrame">
            <HeaderTwo></HeaderTwo>
            <div className="LoadPageInner">
                여기에 로딩 아이콘
                <div className="LoadPageTitle">
                    잠시만 기다려 주세요!
                </div>
                <div className="LoadPageDescription">
                    사용자님의 정보를 불러오는 중이에요. <br />
                    이 화면이 계속된다면 새로고침(F5)을 시도해 보세요.
                </div>
            </div>
        </div>
    );
}

export default LoadPage;