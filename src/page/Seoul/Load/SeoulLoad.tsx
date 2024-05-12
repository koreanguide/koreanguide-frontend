import React from "react";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";

function SeoulLoadPage() {
  return (
    <div className="LoadPageFrame">
      <SeoulHeader></SeoulHeader>
      <HeaderTwo></HeaderTwo>
      <div className="LoadPageInner">
        <img src="/img/SeoulLoadImg2.svg" className="loadImg" alt=""></img>
        <div className="LoadPageTitle">
          잠시만 기다려 주세요! <br />
          트랙이 지금 생성되고 있어요. (약 3분 소요)
        </div>
        <div className="LoadPageDescription">
          장바구니의 컨텐츠로 최적의 트랙을 생성하는 중이예요.
          <br /> 이 작업은 시간이 조금 걸릴 수 있어요.
          <br /> 이 화면이 계속된다면 장바구니로 이동해 트랙 생성을 다시
          요청하실 수도 있어요!
        </div>
      </div>
    </div>
  );
}

export default SeoulLoadPage;
