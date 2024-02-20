import React from "react";
import "./MyTrack.css";
import HeaderTwo from "../../HeaderTwo";

function MyTrack() {
  const MyTrackComponent = () => {
    return (
      <div className="MyTrackComponent">
        <div className="MyTrackComponentImgBox">
          <img
            className="MyTrackComponentStar"
            src="../img/MyTrackStar.svg"
            alt="오류"
          ></img>
          <img
            className="MyTrackComponentImg"
            src="../img/MyTrackTestImg.svg"
            alt="오류"
          ></img>
        </div>
        <div className="MyTrackComponentTextBox">
          <div className="MyTrackComponentTitleText">
            신촌에서 떠나는 식도락 여행
          </div>
          <div className="MyTrackComponentSubText">
            여기에 설명 글이 입력됩니다. 여기에 설명 글이 입력됩니다. 여기에
            설명 글이 입력됩니다. 여기에 설명...
          </div>
        </div>
        <div className="MyTrackComponentContentBox">
          <div className="MyTrackComponentTagBox">#식도락 #식도락 #식도락</div>
          <div className="MyTrackComponentContent">
            <div className="MyTrackComponentViewBox">
              <img className="" src="../img/eye.svg" alt="조회수"></img>
              <div className="MyTrackComponentView">3,378</div>
            </div>
            <div className="MyTrackComponentHeartBox">
              <img
                className="MyTrackComponentHeartImg"
                src="../img/MyTrackheart.svg"
                alt="조회수"
              ></img>
              <div className="MyTrackComponentHeart">1234</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="MyTrackPage">
      <HeaderTwo></HeaderTwo>
      <div className="MyTrackFrame">
        <div className="TextMyTrackBox">
          <div className="TextMyTrack">내 트랙</div>
          <div className="TextCreatNewTrack">새 트랙 등록</div>
        </div>
        <div className="TextMyTrackSub">5건의 등록된 트랙이 있어요.</div>
        <div className="MyTrackComponentFrame">
          <div className="MyTrack-container">
            <MyTrackComponent></MyTrackComponent>
            <MyTrackComponent></MyTrackComponent>
            <MyTrackComponent></MyTrackComponent>
            <MyTrackComponent></MyTrackComponent>
            <MyTrackComponent></MyTrackComponent>
            <MyTrackComponent></MyTrackComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTrack;
