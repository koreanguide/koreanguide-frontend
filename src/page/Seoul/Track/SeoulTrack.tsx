import React, { useState, useEffect } from "react";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import "./SeoulTrack.css";
import store from "../Redux/store";

function SeoulTrackCreatePage() {
  const [ShowNotificationFive, setShowNotificationFive] =
    useState<boolean>(true);
  const [ShowTagOneBox, setShowTagOneBox] = useState<boolean>(
    window.innerWidth >= 655
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [ShowTagTwoBox, setShowTagTwoBox] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([{ tagName: "tag1" }]);

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

  interface NewTrackContainerPropsOneI {
    Title: string;
    TitleSub: string;
    children: any;
  }
  const NewTrackContainerPropsOne: React.FC<NewTrackContainerPropsOneI> = ({
    Title,
    children,
    TitleSub,
  }) => {
    return (
      <div className="NewTrackContainerPropsOne">
        <div className="NewTrackContainerTitleBox">
          <div className="NewTrackContainerTitle">{Title}</div>
          {children}
        </div>
        <div className="NewTrackContainerTitleSupplementBox">{TitleSub}</div>
      </div>
    );
  };

  const ShowTagBoxChangeTwo = () => {
    setShowTagOneBox(true);
    setShowTagTwoBox(false);
    console.log(selectedTags);
  };

  const tagsTwo: string[] = [
    "CLUB",
    "식도락",
    "관광지",
    "맛집",
    "재미",
    "사진",
    "휴양",
    "K-pop",
    "스토어",
    "유흥",
    "핫플",
    "주점",
    "문화",
    "쇼핑",
    "Custom",
    "SNS",
    // "MOOD",
  ];

  interface TagChoiceProps {
    tagName: string;
    selected: boolean;
    onClick: () => void;
  }

  const TagChoice: React.FC<TagChoiceProps> = ({
    tagName,
    selected,
    onClick,
  }) => {
    return (
      <div
        className="TagChoiceFrame"
        style={{
          backgroundColor: selected ? "#3876c0" : "",
          color: selected ? "#fff" : "",
        }}
        onClick={onClick}
      >
        <div className="TagChoiceText">{tagName}</div>
      </div>
    );
  };

  const handleTagClick = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const ShowTagBoxChange = () => {
    setShowTagOneBox(false);
    setShowTagTwoBox(true);
  };

  useEffect(() => {
    if (selectedTags.length >= 1) {
      setShowNotificationFive(false);
      setTags(selectedTags.map((tagName) => ({ tagName })));
    } else {
      setShowNotificationFive(true);
    }
  }, [selectedTags]);

  interface Image {
    imageUrl: string;
  }

  interface Tag {
    tagName: string;
  }

  interface TrackCreateSubmitData {
    agreePrivacyPolicy: boolean;
    agreePublicTerms: boolean;
    agreeTerms: boolean;
    images: Image[];
    primaryImageUrl: string;
    tags: Tag[];
    trackContent: string;
    trackPreview: string;
    trackTitle: string;
    useAutoTranslate: boolean;
  }
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
        <div className="NewTrackContainerThreeTag">
          <div className="NewTrackContainerFiveInner">
            <NewTrackContainerPropsOne
              Title="트랙에 대한 태그를 작성해 주세요."
              TitleSub="트랙을 간단히 표현할 수 있는 태그를 달아주세요. 예) food, club"
            >
              {ShowNotificationFive && (
                <div className="NewTrackContainerNotificationBox">
                  <img
                    className="RedNotificationImg"
                    src="../../img/RedNotification.svg"
                    alt="오류"
                  ></img>
                  <div className="RedNotificationText">
                    트랙 태그는 반드시 3개 이상 추가되어야 합니다
                  </div>
                </div>
              )}
            </NewTrackContainerPropsOne>
            <div className="NewTrackContainerFiveInputBox">
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
            </div>
            <div className="TagedItemContainer">
              {selectedTags.map((tagName) => (
                <div key={tagName} className="TagedItem">
                  {tagName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulTrackCreatePage;
