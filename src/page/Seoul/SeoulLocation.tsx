import React from "react";
import HeaderTwo from "../../HeaderTwo";
import SeoulHeader from "../../SeoulHeader";
import "./SeoulLocation.css";

function SeoulLocationPage() {
  const SeoulLocationSelectButton = () => {
    return (
      <div className="SeoulLocationSelectButtonFrame">
        <div className="SeoulLocationSelectButtonText">강서구</div>
      </div>
    );
  };
  return (
    <div className="TrackViewPageFrame">
      <div className="SeoulMainHeaderBox">
        <SeoulHeader></SeoulHeader>
        <HeaderTwo></HeaderTwo>
      </div>
      <div className="SeoulLocationPageInner">
        <div className="SeoulLocationTextOne">
          수도 서울 컨텐츠를 선택해 트랙 자동 생성
        </div>
        <div className="SeoulLocationTextTwo">자치구를 선택해 주세요</div>
        <div className="SeoulLocationBoxOne">
          <div className="SeoulLocationBoxOneInner">
            <div className="SeoulLocationBoxTwo">
              <img
                src="/img/SeoulAirplane.svg"
                alt="none"
                className="SeoulAirplane"
              ></img>
              <div className="SeoulLocationBoxOneText">
                등록된 활동 지역으로 빠르게 시작하기
              </div>
            </div>
            <div className="SeoulLocationBoxOneSelected">강서구</div>
          </div>
        </div>
        <div className="SeoulLocationBoxThree">
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
          <SeoulLocationSelectButton></SeoulLocationSelectButton>
        </div>
        <div className="BackToIntorButtonContainer">
          <div className="BackToIntorButtonFrame">
            <div className="BackToIntorButtonCircle">
              <img
                src="/img/SeoulBackIcon.svg"
                alt="none"
                className="SeoulBackIcon"
              ></img>
            </div>
            <div className="SeoulBackText">소개 페이지</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulLocationPage;
