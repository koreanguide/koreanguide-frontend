import React, { useState, useEffect } from "react";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import "./SeoulTrack.css";
import { useLocation } from "react-router-dom";

function SeoulTrackCreatePage() {
  interface SeoulTrackTextTypeOneProps {
    content: string;
  }
  const SeoulTrackTextOne: React.FC<SeoulTrackTextTypeOneProps> = ({
    content,
  }) => {
    return <div className="SeoulTrackTextTypeOne">{content}</div>;
  };

  const SeoulTrackTextTwo: React.FC<SeoulTrackTextTypeOneProps> = ({
    content,
  }) => {
    return <div className="SeoulTrackTextTypeOne">{content}</div>;
  };

  const location = useLocation();
  var { SeoulTrackGolbalData } = location.state || {};
  console.log("====== 이동값 =======", SeoulTrackGolbalData);
  const { title, content, preview } = SeoulTrackGolbalData;

  const [trackTitle, setTrackTitle] = useState(title);
  const [trackPreview, setTrackPreview] = useState(preview);
  const [trackContent, setTrackContent] = useState(content);

  const titleLimit = 30;
  const previewLimit = 50;
  const contentLimit = 3000;

  const [titleBorder, setTitleBorder] = useState(false);
  const [previewBorder, setPreviewBorder] = useState(false);
  const [contentBorder, setContentBorder] = useState(false);

  useEffect(() => {
    // 각 입력 필드의 글자 수가 제한을 넘는지 확인
    setTitleBorder(trackTitle.length > titleLimit);
    setPreviewBorder(trackPreview.length > previewLimit);
    setContentBorder(trackContent.length > contentLimit);
  }, [trackTitle, trackPreview, trackContent]); // 입력 값이 변경될 때마다 실행

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
                <SeoulTrackTextTwo
                  content={`${trackTitle.length} 자 / 30 자`}
                />
              </div>
              <input
                className={`SeoulTrackNameBoxInput ${
                  titleBorder ? "inputErrorTwo" : ""
                }`}
                value={trackTitle}
                onChange={(e) => setTrackTitle(e.target.value)}
                style={{
                  border: titleBorder ? "1px solid red" : "",
                }}
              ></input>
            </div>
            <div className="SeoulTrackIntroductionBox">
              <div className="SeoulTrackTextNameBox">
                <SeoulTrackTextOne content="자동으로 생성된 트랙 소개글이에요. 수정할 수 있어요!" />
                <SeoulTrackTextTwo
                  content={`${trackPreview.length} 자 / 50 자`}
                />
              </div>
              <textarea
                className={`SeoulTrackIntroductionTextArea ${
                  previewBorder ? "inputErrorTwo" : ""
                }`}
                value={trackPreview}
                onChange={(e) => setTrackPreview(e.target.value)}
                style={{
                  border: previewBorder ? "1px solid red" : "",
                }}
              ></textarea>
            </div>
          </div>
          <div className="SeoulTrackContentBox">
            <div className="SeoulTrackTextNameBox">
              <SeoulTrackTextOne content="자동으로 생성된 트랙 본문이에요. 수정할 수 있어요!" />
              <SeoulTrackTextTwo
                content={`${trackContent.length} 자 / 3000 자`}
              />
            </div>
            <textarea
              className={`SeoulTrackContentTextArea ${
                contentBorder ? "inputErrorTwo" : ""
              }`}
              value={trackContent}
              onChange={(e) => setTrackContent(e.target.value)}
              style={{
                border: contentBorder ? "1px solid red" : "",
              }}
            ></textarea>
          </div>
        </div>
        <p>{title}</p>
        <p>{content}</p>
        <p>{preview}</p>
      </div>
    </div>
  );
}

export default SeoulTrackCreatePage;
