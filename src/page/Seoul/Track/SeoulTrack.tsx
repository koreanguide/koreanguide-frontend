import React from "react";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import "./SeoulTrack.css";
import store from "../Redux/store";

function SeoulTrackCreatePage() {
  interface SeoulTrackTextTypeOneProps {
    content: string;
  }
  const SeoulTrackTextOne: React.FC<SeoulTrackTextTypeOneProps> = ({
    content,
  }) => {
    return <div className="SeoulTrackTextTypeOne">{content}</div>;
  };

  const currentState = store.getState();
  console.log(currentState);
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
        <div className="MovementInformationBox"></div>
        {/* 트랙 컴포넌트 */}
        {/* <div className="NewTrackContainerFiveInputBox">
          <div className="HashBox">#</div>
          {ShowTagTwoBox && (
            <div className="HaskTagSelectFrame">
              <div
                className="HaskTagSelectFrameBoxOne"
                onClick={ShowTagBoxChangeTwo}
              >
                <div className="HaskTagSelectButtonBox">
                  <div className="HaskTagSelectButtonText">
                    트랙에 알맞는 태그를 선택해 주세요
                  </div>
                  <img
                    className="TrackTagImg"
                    src="../../img/TrackTagImg.svg"
                    alt="오류"
                  ></img>
                </div>
              </div>
              <div className="HaskTagSelectFrameBoxTwo">
                <div className="HaskTagSelectFrameBoxTwoInner">
                  <div className="HaskTagSelectFrameContainerOne">
                    {tagsTwo.map((tagName) => (
                      <TagChoice
                        key={tagName}
                        tagName={tagName}
                        selected={selectedTags.includes(tagName)}
                        onClick={() => handleTagClick(tagName)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {ShowTagOneBox && (
            <div className="HaskTagSelectButton" onClick={ShowTagBoxChange}>
              <div
                className="HaskTagSelectButtonBox"
                onClick={ShowTagBoxChange}
              >
                <div className="HaskTagSelectButtonText">
                  트랙에 알맞는 태그를 선택해 주세요
                </div>
                <img
                  className="TrackTagImg"
                  src="../../img/TrackTagImg.svg"
                  alt="오류"
                ></img>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default SeoulTrackCreatePage;
