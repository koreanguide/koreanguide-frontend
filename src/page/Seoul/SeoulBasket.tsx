import React from "react";
import HeaderTwo from "../../HeaderTwo";
import SeoulHeader from "../../SeoulHeader";
import "./SeoulBasket.css";

function SeoulBasketPage() {
  return (
    <div className="TrackViewPageFrame">
      <div className="SeoulMainHeaderBox">
        <SeoulHeader></SeoulHeader>
        <HeaderTwo></HeaderTwo>
      </div>
      <div className="TrackViewPageInner">
        <div className="SeoulMainBoxOne">
          <div className="SeoulMainTextBox">
            <div className="SeoulMainTextOne">
              현재 선택된 서울특별시 자치구: 강남구
            </div>
            <div className="SeoulMainTextTwo">3개의 항목이 담겨있어요.</div>
          </div>
        </div>
        <div className="SeoulBasketAlertBox">
          <div className="SeoulBasketAlertInner">
            <div className="SeoulBasketAlertBoxTwo">
              <img className="Iimg" src="/img/Iimg.svg" alt="오류"></img>
              <div className="SeoulBasketAlertTwoText">필수 방문 예정이란?</div>
            </div>
            <div className="SeoulBasketAlertBoxThree">
              이 트랙에 대해 관광을 진행하며 관광객과 반드시 방문할 곳을 뜻해요.
              만약 3개 항목이 있다면 1곳은 필수 방문, 2곳은 관광객과 협의 또는
              요청에 따라 결정돼요. 방문 예정 항목은 한 곳만 지정할 수 있어요.
            </div>
          </div>
        </div>
        {/* <div className="BackToIntorButtonContainer">
          <div className="BackToIntorButtonFrame">
            <div className="BackToIntorButtonCircle">
              <img
                src="/img/SeoulBackIcon.svg"
                alt="none"
                className="SeoulBackIcon"
              />
            </div>
            <div className="SeoulBackText">자치구 선택</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SeoulBasketPage;
