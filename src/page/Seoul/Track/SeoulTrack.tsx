import React from "react";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import "./SeoulTrack.css";

function SeoulTrackCreatePage() {
  interface SeoulTrackTextTypeOneProps {
    content: string;
  }
  const SeoulTrackTextOne: React.FC<SeoulTrackTextTypeOneProps> = ({
    content,
  }) => {
    return <div className="SeoulTrackTextTypeOne">{content}</div>;
  };

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
              트랙이 성공적으로 생성되었어요!
            </div>
            <div className="SeoulMainTextTwo">다 왔어요, 마지막 단계에요!</div>
          </div>
          <div className="TrackInitializationButton">
            마음에 들지 않아요, 이 트랙을 포기할게요.
          </div>
        </div>
        <div className="SeoulTrackBoxOne">
          <div className="SeoulTrackBoxTwo">
            <div className="SeoulTrackNameBox">
              <div className="SeoulTrackTextNameBox">
                <SeoulTrackTextOne content="자동으로 생성된 트랙 명이에요. 수정할 수 있어요!" />
                <SeoulTrackTextOne content="18자 / 30자" />
              </div>
              <input className="SeoulTrackNameBoxInput"></input>
            </div>
            <div className="SeoulTrackIntroductionBox">
              <div className="SeoulTrackTextNameBox">
                <SeoulTrackTextOne content="자동으로 생성된 트랙 소개글이에요. 수정할 수 있어요!" />
                <SeoulTrackTextOne content="18자 / 50자" />
              </div>
              <textarea className="SeoulTrackIntroductionTextArea"></textarea>
            </div>
          </div>
          <div className="SeoulTrackContentBox">
            <div className="SeoulTrackTextNameBox">
              <SeoulTrackTextOne content="자동으로 생성된 트랙 본문이에요. 수정할 수 있어요!" />
              <SeoulTrackTextOne content="109자 / 3000자" />
            </div>
            <textarea className="SeoulTrackContentTextArea"></textarea>
          </div>
        </div>
        <p>값이 들어갈 자리</p>
      </div>
    </div>
  );
}

export default SeoulTrackCreatePage;
