import React, { useState } from "react";
import HeaderTwo from "../../HeaderTwo";
import "./TrackView.css";
import "./TrackDelete.css";

function TrackDeletePage() {
  const [TrackDeleteIsChecked, setTrackDeleteIsChecked] = useState(false);
  const [TrackDeleteCheckImg, setTrackDeleteCheckImg] = useState(
    "/img/DeleteCheck.svg"
  );
  const [TrackDeleteShowCheckError, setTrackDeleteShowCheckError] =
    useState(true);
  const [PasswordNoneMatchError, setPasswordNoneMatchError] = useState(false);

  const TrackDeleteCheckFunction = () => {
    setTrackDeleteIsChecked(!TrackDeleteIsChecked);
    if (TrackDeleteIsChecked) {
      setTrackDeleteCheckImg("/img/DeleteChecked.svg");
      setTrackDeleteShowCheckError(false);
    } else {
      setTrackDeleteCheckImg("/img/DeleteCheck.svg");
      setTrackDeleteShowCheckError(true);
    }
  };

  return (
    <div className="TrackViewPageFrame">
      <HeaderTwo></HeaderTwo>
      <div className="TrackViewPageInner">
        <div className="TextDeleteTrack">트랙 삭제</div>
        <div className="TrackDeleteContainerOne">
          <div className="TrackDeleteContainerOneInner">
            <div className="TrackDeleteTextOne">
              트랙 삭제를 진행하면, 아래 항목의 데이터가 모두 소실되며, 복구할
              수 없습니다.
            </div>
            <div className="TrackDeleteViewText">1,000회의 조회수</div>
            <div className="TrackDeleteReviewText">1,000개의 리뷰</div>
            <div className="TrackDeleteInterestText">1,000개의 관심 수</div>
            <div className="TrackDeleteCheckBox">
              <div className="TrackDeleteCheckBoxInner">
                <img
                  className="TrackDeleteCheckImg"
                  src={TrackDeleteCheckImg}
                  alt=""
                  onClick={TrackDeleteCheckFunction}
                ></img>
                <div className="TrackDeleteCheckBoxText">
                  모든 내용을 확인하였습니다.
                </div>
              </div>
              {TrackDeleteShowCheckError && (
                <div className="TrackDeleteNoneCheckText">
                  * 동의 후 삭제 가능합니다
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="TrackDeletePasswordTextBox">
          <div className="TrackDeletePasswordTextOne">
            트랙 삭제를 진행하려면, 회원님의 현재 비밀번호로 인증을 진행해
            주세요.
          </div>
          {PasswordNoneMatchError && (
            <div className="TrackDeletePasswordNoneMatch">
              * 비밀번호가 일치하지 않습니다
            </div>
          )}
        </div>
        <input
          className="TrackDeletePasswordInput"
          placeholder="현재 비밀번호"
        ></input>
        <div className="TrackDeleteButton">삭제하기</div>
      </div>
    </div>
  );
}

export default TrackDeletePage;
