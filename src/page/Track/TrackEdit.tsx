import React, { useState, useEffect, useRef } from "react";
import "./NewTrack.css";
import "./TrackEdit.css";
import HeaderTwo from "../../HeaderTwo";
import { useParams } from "react-router-dom";
import axios from "axios";

function TrackEdit() {
  const token = sessionStorage.getItem("access-token");

  const [ShowNotificationThird, setShowNotificationThird] =
    useState<boolean>(false);
  const [ShowNotificationFour, setShowNotificationFour] =
    useState<boolean>(false);
  const [ShowNotificationFive, setShowNotificationFive] =
    useState<boolean>(false);
  const [ShowNotificationSix, setShowNotificationSix] =
    useState<boolean>(false);

  const [tags, setTags] = useState<Tag[]>([{ tagName: "tag1" }]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [ShowTagOneBox, setShowTagOneBox] = useState<boolean>(
    window.innerWidth >= 655
  );
  const [ShowTagTwoBox, setShowTagTwoBox] = useState<boolean>(false);

  const maxCharLengthOne = 20;

  const maxCharLengthTwo = 50;

  const maxCharLengthThree = 3000;

  const [ShowCantButton, setShowCantButton] = useState<boolean>(true);

  const [ShowAIBox, setShowAIBox] = useState<boolean>(false);
  const [AIArrowImg, setAIArrowImg] = useState<string>("/img/AImg2.svg");

  const [AI_Ask, setAI_Ask] = useState<string>("");
  const [AI_Answer, setAI_Answer] = useState<string>("");

  const [AIFirst, setAIFirst] = useState<boolean>(true);
  const [AIWait, setAIWait] = useState<boolean>(false);
  const [AIError, setAIError] = useState<boolean>(false);
  const [AIAnw, setAIAnw] = useState<boolean>(false);

  // ======================================================================================================================
  const [EditTrackId, setEditTrackId] = useState("");
  const [EditTitle, setEditTitle] = useState("");
  const [EditPrimaryImage, setEditPrimaryImage] = useState("");
  const [EdiAdditionalImage, setEditAdditionalImage] = useState("");
  const [EditPreview, setEditPreview] = useState("");
  const [EditTags, setEditTags] = useState<string[]>([]);
  const [EditContent, setEditContent] = useState("");
  const [EditVisible, setEditVisible] = useState(false);
  const [EditUseAutoTranslate, setEditUseAutoTranslate] = useState(false);

  const [EditMainImgFormFile, setEditMainImgFormFile] = useState("");

  interface Tag {
    tagName: string;
  }

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

  //트랙 이름 입력

  const FirstInputFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEditTitle(inputValue);

    if (inputValue.length > 0) {
      setShowNotificationThird(false);
    } else {
      setShowNotificationThird(true);
    }

    if (inputValue.length > maxCharLengthOne) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "";
    }
  };

  // 트랙 한줄 소개

  const SecondInputFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEditPreview(inputValue);

    if (inputValue.length > 0) {
      setShowNotificationFour(false);
    } else {
      setShowNotificationFour(true);
    }

    if (inputValue.length > maxCharLengthTwo) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "";
    }
  };

  //트랙 태그 생성
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
          backgroundColor: selected ? "#730ef4" : "",
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
  ];

  useEffect(() => {
    if (selectedTags.length >= 1) {
      setShowNotificationFive(false);
      setTags(selectedTags.map((tagName) => ({ tagName })));
    } else {
      setShowNotificationFive(true);
    }
  }, [selectedTags]);

  const ShowTagBoxChange = () => {
    setShowTagOneBox(false);
    setShowTagTwoBox(true);
  };

  const ShowTagBoxChangeTwo = () => {
    setShowTagOneBox(true);
    setShowTagTwoBox(false);
    console.log(selectedTags);
  };

  useEffect(() => {
    setSelectedTags(EditTags);
  }, [EditTags]);

  // 본문 컴포넌트

  const EditContentFunction = (e: {
    target: {
      style: any;
      value: React.SetStateAction<string>;
    };
  }) => {
    setEditContent(e.target.value);

    if (e.target.value.length > 0) {
      setShowNotificationSix(false);
    } else {
      setShowNotificationSix(true);
    }

    if (e.target.value.length > maxCharLengthThree) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "";
    }
  };

  // 토글 버튼

  const TranslateToggleButton: React.FC = () => {
    const handleToggle = () => {
      const newState = !EditUseAutoTranslate;
      setEditUseAutoTranslate(newState);
      // setUseAutoTranslate(newState);
      console.log("자동변역:", newState);
    };

    return (
      <div
        className={`ToggleButtonMainFrame ${
          EditUseAutoTranslate ? "active" : ""
        }`}
      >
        <div
          className={`ToggleButtonFrame ${
            EditUseAutoTranslate ? "active" : ""
          }`}
          onClick={handleToggle}
        >
          <div
            className={`ToggleButtonCircle ${
              EditUseAutoTranslate ? "active" : ""
            }`}
          ></div>
        </div>
      </div>
    );
  };

  const VisibleToggleButton: React.FC = () => {
    const handleToggle = () => {
      const newState = !EditVisible;
      setEditVisible(newState);
      // setUseAutoTranslate(newState);
      console.log("공개 여부:", newState);
    };

    return (
      <div className={`ToggleButtonMainFrame ${EditVisible ? "active" : ""}`}>
        <div
          className={`ToggleButtonFrame ${EditVisible ? "active" : ""}`}
          onClick={handleToggle}
        >
          <div
            className={`ToggleButtonCircle ${EditVisible ? "active" : ""}`}
          ></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (
      ShowNotificationThird ||
      ShowNotificationFour ||
      ShowNotificationFive ||
      ShowNotificationSix
    ) {
      setShowCantButton(true);
    } else {
      setShowCantButton(false);
    }
  }, [
    ShowNotificationThird,
    ShowNotificationFour,
    ShowNotificationFive,
    ShowNotificationSix,
  ]);

  const AIBoxClick = () => {
    setShowAIBox(!ShowAIBox);
    if (ShowAIBox === true) {
      setAIArrowImg("/img/AImg2.svg");
    } else {
      setAIArrowImg("/img/AImg3.svg");
    }
  };

  const AI_Change = (event: any) => {
    setAI_Ask(event.target.value);
  };

  interface AIProps {
    msg: string;
  }

  const AI_API = async () => {
    setAIFirst(false);
    setAIWait(true);
    setAIError(false);
    setAIAnw(false);
    const data: AIProps = {
      msg: AI_Ask,
    };
    try {
      const response = await axios.post("/v1/assistant/", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log(response.data.msg);
        setAI_Answer(response.data.msg);
        setAIFirst(false);
        setAIWait(false);
        setAIError(false);
        setAIAnw(true);
      } else {
        setAIFirst(false);
        setAIWait(false);
        setAIError(true);
        setAIAnw(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      AI_API();
    }
  };

  const handleCopyClipBoard = async (AI_Answer: string) => {
    try {
      await navigator.clipboard.writeText(AI_Answer);
      alert("복사 성공!");
    } catch (error) {
      alert("복사 실패!");
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = () => {
    if (textareaRef.current) {
      const { selectionStart, selectionEnd } = textareaRef.current;
      const text = textareaRef.current.value;
      const textBeforeCursor = text.substring(0, selectionStart);
      const textAfterCursor = text.substring(selectionEnd, text.length);
      const newText = `${textBeforeCursor}${AI_Answer}${textAfterCursor}`;

      setEditContent(newText);

      if (newText.length > 0) {
        setShowNotificationSix(false);
      } else {
        setShowNotificationSix(true);
      }

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const cursorPosition = selectionStart + AI_Answer.length;
          textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
      }, 0);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setShowTagOneBox(window.innerWidth >= 655);
      setShowTagTwoBox(window.innerWidth <= 655);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [setShowTagOneBox]);

  const gotoTrackDelete = () => {
    // navigate(`/portal/track/view/${track.trackId}`);
  };

  // ======================================================================================================================

  const { trackId } = useParams();

  useEffect(() => {
    if (token === null) {
      console.log("세션 스토리지에 토큰이 없습니다.");
      return;
    } else {
      console.log("토큰", token);
    }

    const GetTrackEditInfo = async () => {
      try {
        const response = await axios.get("/v1/track/edit", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
          params: {
            trackId: trackId,
          },
        });
        const data = response.data;
        setEditTrackId(data.trackId);
        setEditTitle(data.title);
        setEditPrimaryImage(data.primaryImage);
        setEditAdditionalImage(data.additionalImage);
        setEditPreview(data.preview);
        setEditTags(data.tags);
        setEditContent(data.content);
        setEditVisible(data.visible);
        setEditUseAutoTranslate(data.useAutoTranslate);

        console.log("***트랙 편집*** 정보 :", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    GetTrackEditInfo();
  }, [token, trackId]);

  // 트랙업데이트

  const uploadImage = async (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/v1/file/", formData, {
          headers: {
            "X-AUTH-TOKEN": token,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setEditMainImgFormFile(response.data);
          return response.data;
        }
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }

    return null;
  };

  const onImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async (loadEvent) => {
        const result = loadEvent.target?.result;
        if (typeof result === "string") {
          setEditPrimaryImage(result);
          // 파일 객체를 API로 전송
          const uploadResult = await uploadImage(file);
          console.log("업로드 결과:", uploadResult);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImageBoxClicked = () => {
    fileInputRef.current?.click();
  };

  interface ImageUploaderProps {
    onImageSelected: (file: File) => void;
  }

  interface Tag {
    tagName: string;
  }

  interface Image {
    imageUrl: string;
  }

  interface TrackEditSubmitData {
    trackContent: string;
    trackPreview: string;
    trackTitle: string;
    trackId: string;
    useAutoTranslate: boolean;
    tags: Tag[];
    primaryImageUrl: string;
    visible: boolean;
    images: Image[];
  }

  const TrackSaveOnClick = async () => {
    const images = [
      { imageUrl: "" },
      { imageUrl: "" },
      { imageUrl: "" },
      { imageUrl: "" },
    ].filter((image) => image.imageUrl !== null);

    const data: TrackEditSubmitData = {
      trackContent: EditContent,
      trackPreview: EditPreview,
      trackTitle: EditTitle,
      useAutoTranslate: EditUseAutoTranslate,
      trackId: EditTrackId,
      tags: tags,
      primaryImageUrl: EditMainImgFormFile,
      visible: EditVisible,
      images: images,
    };

    try {
      const response = await axios.put("/v1/track/", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("트랙 업데이트 성공:", response.data);
      }
    } catch (error) {
      console.error("트랙 업데이트 실패:", error);
    }
    console.log("가능");
  };

  return (
    <div>
      <HeaderTwo></HeaderTwo>
      <div className="NewTrackpage">
        <div className="NewTrackpageInner">
          <div className="TextAddNewTrack">트랙 관리: {EditTitle}</div>
          <div className="MustKnowBox">
            <div className="MustKnowBoxInner">
              <div className="MustKnowPurpleBox">
                <img className="Iimg" src="/img/Iimg.svg" alt="오류"></img>
                <div className="MustKnowPurpleBoxText">꼭 확인해 주세요!</div>
              </div>
              <div className="MustKnowSecondBox">
                <div className="MustKnowSecondBoxText">
                  아래에서 입력되는 모든 내용은 자동으로 번역되어 관광객에게
                  보여져요.
                  <br /> 자동 번역 사용을 원치 않다면, 트랙 관리 가장 아래에서
                  자동 번역 활성화를 반드시 해제해 주세요.
                </div>
              </div>
            </div>
          </div>
          {/* 수정 트랙 명 start*/}
          <div className="NewTrackContainerThree">
            <div className="NewTrackContainerThreeInner">
              <NewTrackContainerPropsOne
                Title="트랙이 돋보일 수 있는 트랙 명을 설정하세요."
                TitleSub="관광객에게 보여질 트랙 명을 설정해 주세요. 최대 20자까지 입력할 수 있어요."
              >
                {ShowNotificationThird && (
                  <div className="NewTrackContainerNotificationBox">
                    <img
                      className="RedNotificationImg"
                      src="/img/RedNotification.svg"
                      alt="오류"
                    ></img>
                    <div className="RedNotificationText">
                      트랙 제목은 반드시 입력되어야 합니다
                    </div>
                  </div>
                )}
              </NewTrackContainerPropsOne>
              <input
                type="text"
                placeholder="트랙 이름을 입력하세요."
                className={`NewTrackFirstInput ${
                  EditTitle.length > maxCharLengthOne ? "error" : ""
                }`}
                value={EditTitle}
                onChange={FirstInputFunction}
              ></input>
              <div className="NewTrackFirstInputSubBox">
                <div></div>
                <div className="NewTrackFirstInputTextLength">{`${EditTitle.length}자 / 20자`}</div>
              </div>
            </div>
          </div>
          {/* 수정 트랙 명 end */}
          {/* 2번째 컴포넌트 start*/}
          <div className="NewTrackContainerTwo">
            <div className="NewTrackContainerTwoInner">
              <NewTrackContainerPropsOne
                Title="트랙을 잘 소개할 수 있는 이미지를 선택해 주세요."
                TitleSub="트랙의 이미지를 첨부해 주세요. 대표 이미지는 반드시 업로드가 필요합니다."
              >
                <></>
              </NewTrackContainerPropsOne>
              <div className="ImageSelectTextBox">
                <div className="MainImageText">대표 이미지</div>
                <div className="SubImageText">추가 이미지</div>
              </div>
              <div className="NewTrackImageSelectContainer">
                {
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={onImageSelected}
                    />
                    <div className="MainImageBox" onClick={onImageBoxClicked}>
                      <img
                        className="EditPrimaryImage"
                        src={EditPrimaryImage}
                        alt="오류"
                      />
                    </div>
                  </div>
                }
                {/* 추가 이미지1 */}
                <div className="NewTrackAddImageContainer">
                  <div className="NewTrackAddImageBoxOne">
                    <img
                      className="EditPrimaryImage"
                      src={EdiAdditionalImage[0]}
                      alt="오류"
                    ></img>
                  </div>

                  {/* 추가 이미지2 */}
                  <div className="NewTrackAddImageBoxOne">
                    <img
                      className="EditPrimaryImage"
                      src={EdiAdditionalImage[1]}
                      alt="오류"
                    ></img>
                  </div>
                  {/* 추가 이미지3 */}
                  <div className="NewTrackAddImageBoxOne">
                    <img
                      className="EditPrimaryImage"
                      src={EdiAdditionalImage[2]}
                      alt="오류"
                    ></img>
                  </div>
                  {/* 추가 이미지4 */}
                  <div className="NewTrackAddImageBoxOne">
                    <img
                      className="EditPrimaryImage"
                      src={EdiAdditionalImage[3]}
                      alt="오류"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 2번째 컴포넌트 end */}
          {/* 수정 트랙 한줄 소개글 start */}
          <div className="NewTrackContainerThree">
            <div className="NewTrackContainerThreeInner">
              <NewTrackContainerPropsOne
                Title="트랙의 간단한 소개 글을 작성해 주세요."
                TitleSub="관광객에게 보여질 트랙 설명을 설정해 주세요. 최대 50자까지 입력할 수 있어요."
              >
                {ShowNotificationFour && (
                  <div className="NewTrackContainerNotificationBox">
                    <img
                      className="RedNotificationImg"
                      src="/img/RedNotification.svg"
                      alt="오류"
                    ></img>
                    <div className="RedNotificationText">
                      트랙 소개는 반드시 입력되어야 합니다
                    </div>
                  </div>
                )}
              </NewTrackContainerPropsOne>
              <input
                type="text"
                placeholder="트랙 소개를 입력하세요."
                className={`NewTrackFirstInput ${
                  EditPreview.length > maxCharLengthTwo ? "error" : ""
                }`}
                value={EditPreview}
                onChange={SecondInputFunction}
              ></input>
              <div className="NewTrackFirstInputSubBox">
                <div></div>
                <div className="NewTrackFirstInputTextLength">{`${EditPreview.length}자 / 50자`}</div>
              </div>
            </div>
          </div>
          {/* 수정 트랙 한줄 소개글 end */}
          {/* 5번째 컴포넌트 start */}
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
                      src="/img/RedNotification.svg"
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
                          src="/img/TrackTagImg.svg"
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
                  <div
                    className="HaskTagSelectButton"
                    onClick={ShowTagBoxChange}
                  >
                    <div
                      className="HaskTagSelectButtonBox"
                      onClick={ShowTagBoxChange}
                    >
                      <div className="HaskTagSelectButtonText">
                        트랙에 알맞는 태그를 선택해 주세요
                      </div>
                      <img
                        className="TrackTagImg"
                        src="/img/TrackTagImg.svg"
                        alt="오류"
                      ></img>
                    </div>
                  </div>
                )}
              </div>
              <div className="TagedItemContainer">
                {selectedTags.map((tag, index) => (
                  <div key={index} className="TagedItem">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 5번째 컴포넌트 end */}
          {/* AI번째 컴포넌트 start*/}
          {!ShowAIBox && (
            <div className="AIBoxFrame" onClick={AIBoxClick}>
              <div className="AIBoxInner">
                <div className="AIBoxOne">
                  <img className="AIImg" src="/img/AImg.svg" alt="오류"></img>
                  <div className="AIBoxOneText">AI로 손쉽게 트랙 만들기</div>
                </div>
                <div className="AIBoxTwo">
                  <div className="AIBoxTwoText">
                    이제 어떤 내용을 넣을까 고민하지 마세요! AI로 트랙의 내용을
                    편하게 작성해볼 수 있어요.
                  </div>
                  <img className="AIImg2" src={AIArrowImg} alt="오류"></img>
                </div>
              </div>
            </div>
          )}
          {ShowAIBox && (
            <div className="AIBoxClickBox">
              <div className="AIBoxFrame" onClick={AIBoxClick}>
                <div className="AIBoxInner">
                  <div className="AIBoxOne">
                    <img className="AIImg" src="/img/AImg.svg" alt="오류"></img>
                    <div className="AIBoxOneText">AI로 손쉽게 트랙 만들기</div>
                  </div>
                  <div className="AIBoxTwo">
                    <div className="AIBoxTwoText">
                      이제 어떤 내용을 넣을까 고민하지 마세요! AI로 트랙의
                      내용을 편하게 작성해볼 수 있어요.
                    </div>
                    <img className="AIImg2" src={AIArrowImg} alt="오류"></img>
                  </div>
                </div>
              </div>
              <div className="AIInputBox">
                <input
                  type="text"
                  className="AIAskInput"
                  placeholder="예) 홍대 클럽에 대해 외국인에게 소개하고 싶어"
                  value={AI_Ask}
                  onChange={AI_Change}
                  onKeyPress={handleKeyPress}
                ></input>
                <img
                  className="AIImg4"
                  src="/img/AImg4.svg"
                  alt="오류"
                  onClick={AI_API}
                ></img>
              </div>
              {AIFirst && (
                <div className="AIAnswerBox">
                  <div className="TexTAIAnswerPlace">
                    여기에 AI 답변이 생성됩니다.
                  </div>
                </div>
              )}
              {AIWait && (
                <div className="AIAnswerBox">
                  <img
                    className="AIWait"
                    src="/img/AIWait.svg"
                    alt="오류"
                  ></img>
                  <div className="TexTAIAnswerPlace">
                    AI의 답변을 기다리고 있어요
                  </div>
                </div>
              )}
              {AIError && (
                <div className="AIAnswerErrorBox">
                  <img
                    className="AIError"
                    src="/img/AIError.svg"
                    alt="오류"
                  ></img>
                  <div className="AIAnswerErrorBoxText">
                    AI 답변을 일시적으로 가져올 수 없어요.
                    <br /> 다시 시도해 주세요.
                  </div>
                </div>
              )}
              {AIAnw && (
                <div className="AIAnswerBox">
                  <div className="AIAnswerArea">{AI_Answer}</div>
                </div>
              )}
              <div className="AIBoxFunctionBox">
                <div className="AIBoxCopyButton">
                  <img
                    className="PostImg"
                    src="/img/postImg.svg"
                    alt="오류"
                  ></img>
                  <div
                    className="AIBoxFunctionBoxText"
                    onClick={() => handleCopyClipBoard(AI_Answer)}
                  >
                    내용 복사하기
                  </div>
                </div>
                <div className="AIBoxFunctionBoxLine"></div>
                <div className="AIBoxPostButton">
                  <img
                    className="CopyImg"
                    src="/img/copyImg.svg"
                    alt="오류"
                  ></img>
                  <div className="AIBoxFunctionBoxText" onClick={insertText}>
                    바로 붙여넣기
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 3번째 컴포넌트 end */}
          {/* 수정 트랙 본문 start */}
          <div className="NewTrackContainerSix">
            <div className="NewTrackContentFrame">
              <div className="NewTrackContentInner">
                <NewTrackContainerPropsOne
                  Title="어떤 여정을 함께할 것인지 설명해 주세요."
                  TitleSub="트랙 본문은 마크다운 형식으로 작성되어야 해요. "
                >
                  {ShowNotificationSix && (
                    <div className="NewTrackContainerNotificationBox">
                      <img
                        className="RedNotificationImg"
                        src="/img/RedNotification.svg"
                        alt="오류"
                      ></img>
                      <div className="RedNotificationText">
                        트랙 본문은 반드시 입력되어야 합니다
                      </div>
                    </div>
                  )}
                </NewTrackContainerPropsOne>
                <div className="TextAreaTextNumBox">
                  <div className="NewTrackFirstInputTextLength">{`${EditContent.length}자 / 3000자`}</div>
                  <textarea
                    placeholder="트랙 본문을 입력하세요"
                    className={`NewTrackFirstTextArea ${
                      EditContent.length > maxCharLengthThree ? "error" : ""
                    }`}
                    value={EditContent}
                    onChange={EditContentFunction}
                    ref={textareaRef}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="TextSensitiveOption">민감 설정</div>
          {/* 수정 트랙 본문 end */}
          {/* 7번째 컴포넌트 start */}
          <div className="SensitiveSetting">
            <div className="SensitiveSettingInner">
              <div className="NewTrackContainerSevenBoxOne">
                <div className="TextAutomaticTranslation">등록된 트랙 삭제</div>
                <div className="TextAutomaticTranslationSub">
                  등록한 트랙의 정보가 모두 즉시 삭제되며, 회원님은 물론 다른
                  사용자도 접근할 수 없게됩니다.
                </div>
              </div>
              <div className="TrackDelete" onClick={gotoTrackDelete}>
                삭제
              </div>
            </div>
            <div className="SensitiveSettingLine"></div>
            <div className="SensitiveSettingInnerTwo">
              <div className="SensitiveSettingBoxOne">
                <div className="TextAutomaticTranslation">
                  등록된 트랙 비공개
                </div>
                <div className="SensitiveSettingBoxOneText">
                  트랙을 비공개하게 되면, 회원님만 이 트랙의 정보를 확인할 수
                  있고, KOREAN GUIDE에서 제공하는 모든 매칭 서비스와, 트랙
                  둘러보기에 이 트랙의 정보가 포함되지 않습니다.
                </div>
              </div>
              <VisibleToggleButton></VisibleToggleButton>
            </div>
            <div className="SensitiveSettingLine"></div>
            <div className="NewTrackContainerSevenInner">
              <div className="NewTrackContainerSevenBoxOne">
                <div className="TextAutomaticTranslation">자동 변역 설정</div>
                <div className="TextAutomaticTranslationSub">
                  한국어로 작성된 모든 내용이 자동으로 번역되어 보여져요.
                </div>
              </div>
              <TranslateToggleButton></TranslateToggleButton>
            </div>
          </div>
          {!ShowCantButton && (
            <button
              className="NewTrackCompeletButton"
              onClick={TrackSaveOnClick}
            >
              저장하기
            </button>
          )}
          {ShowCantButton && (
            <button className="CantCraeteButton">
              <div className="CantCraeteButtonBox">
                <img
                  className="CantCraeteImg"
                  src="/img/CantCreate.svg"
                  alt="오류"
                ></img>
                <div className="CantCraeteButtonText">저장할 수 없음</div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackEdit;
