import React, { useState, useEffect } from "react";
import "./MyTrack.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [TrackNoneCase, setTrackNoneCase] = useState(true);

  const navigate = useNavigate();

  const goToMyTrackCreate = () => {
    navigate("/portal/track/new");
    window.scrollTo(0, 0);
  };

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

        if (response.data.length === 0) {
          setTrackNoneCase(true);
        } else {
          setTrackNoneCase(false);
        }
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
          <div className="TextCreatNewTrack" onClick={goToMyTrackCreate}>
            새 트랙 등록
          </div>
        </div>
        <div className="TextMyTrackSub">
          {tracks.length}건의 등록된 트랙이 있어요.
        </div>
        <div className="MyTrackComponentFrame">
          <div className="MyTrack-container">
            {tracks.map((track, index) => (
              <MyTrackComponent key={index} track={track} />
            ))}
          </div>
        </div>
        {TrackNoneCase && (
          <div className="NoneTrackContainer">
            <div className="NoneTrackContainerTextOne">
              등록된 트랙이 없어요 :(
              <br /> 새로운 트랙을 생성하여 전 세계의 관람객도 만나보고, 수익도
              창출해 보세요!
            </div>
            <div
              className="NoneTrackContainerTextTwoBox"
              onClick={goToMyTrackCreate}
            >
              <div className="NoneTrackContainerTextTwo">
                새로운 트랙 등록하기
              </div>
              <img
                className="NewTrackRegisterImg"
                src="../img/NewTrackRegisterImg.svg"
                alt="error"
              ></img>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrack;
