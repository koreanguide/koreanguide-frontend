import React, { useState, useEffect } from "react";
import "./MyTrack.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";

export const MyTrackComponent = ({ track }: { track: any }) => {
  return (
    <div className="MyTrackComponent">
      <div className="MyTrackComponentImgBox">
        <img
          className="MyTrackComponentStar"
          src="../img/NoneStar.svg"
          alt="오류"
        ></img>
        <img
          className="MyTrackComponentImg"
          src={track.primaryImageUrl}
          alt="오류"
        ></img>
      </div>
      <div className="MyTrackComponentTextBox">
        <div className="MyTrackComponentTitleText">{track.trackTitle}</div>
        <div className="MyTrackComponentSubText">{track.trackPreview}</div>
      </div>
      <div className="MyTrackComponentContentBox">
        <div className="MyTrackComponentTagBox">
          {track.tags.map((tag: string, index: number) => (
            <span key={index}> #{tag}</span>
          ))}
        </div>
        <div className="MyTrackComponentContent">
          <div className="MyTrackComponentViewBox">
            <img className="" src="../img/eye.svg" alt="조회수"></img>
            <div className="MyTrackComponentView">{track.view}</div>
          </div>
          <div className="MyTrackComponentHeartBox">
            <img
              className="MyTrackComponentHeartImg"
              src="../img/MyTrackheart.svg"
              alt="조회수"
            ></img>
            <div className="MyTrackComponentHeart">{track.like}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function MyTrack() {
  const token = sessionStorage.getItem("access-token");

  const [tracks, setTracks] = useState<Array<any>>([]);

  useEffect(() => {
    const MyTrackInquiry = async () => {
      try {
        const response = await axios.get("/v1/track/", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("내 트랙 정보", response.data);
        setTracks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    MyTrackInquiry();
  }, [token]);

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
            {tracks.map((track, index) => (
              <MyTrackComponent key={index} track={track} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTrack;
