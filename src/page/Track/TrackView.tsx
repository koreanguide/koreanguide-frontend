import React from "react";
import HeaderTwo from "../../HeaderTwo";
import "./TrackView.css";

function TrackViewPage() {
  return (
    <div className="TrackViewPageFrame">
      <HeaderTwo></HeaderTwo>
      <div className="TrackViewPageInner">
        <div className="GoToMyPageButton">
          <div className="GoToMyPageText">내 트랙 페이지로 돌아가기</div>
          <img className="" src="../img/ViewArrow.svg" alt=""></img>
        </div>
        <div className="TrackViewPageTrackTitleBox">
          <div className="TrackViewPageTrackTitle">
            신촌에서 떠나는 식도락 여행
          </div>
          <div className="TrackViewPageTrackTitleBoxTwo">
            <div className="TrackViewPageLikeBox"></div>
            <div className="TrackViewPageLViewNumBox"></div>
            <div className="TrackViewPageSettingBox">
              <img className="" src="../img/ViewArrow.svg" alt=""></img>
              <div className="TrackViewPageTextSetting">관리</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackViewPage;
