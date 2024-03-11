import React, { useState, useEffect, useRef } from "react";
import "./NewTrack.css";
import HeaderTwo from "../../HeaderTwo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewTrackpage() {
  const token = sessionStorage.getItem("access-token");

  const navigate = useNavigate();

  const [ShowNotificationFirst, setShowNotificationFirst] =
    useState<boolean>(true);
  const [ShowNotificationSecond, setShowNotificationSecond] =
    useState<boolean>(true);
  const [ShowNotificationThird, setShowNotificationThird] =
    useState<boolean>(true);
  const [ShowNotificationFour, setShowNotificationFour] =
    useState<boolean>(true);
  const [ShowNotificationFive, setShowNotificationFive] =
    useState<boolean>(true);
  const [ShowNotificationSix, setShowNotificationSix] = useState<boolean>(true);
  const [FirstCheck, setFirstCheck] = useState<boolean>(false);
  const [SecondCheck, setSecondCheck] = useState<boolean>(false);
  const [ThirdCheck, setThirdCheck] = useState<boolean>(false);
  const [FirstCheckImg, setFirstCheckImg] = useState<string>(
    "../../img/purpleCircle.svg"
  );
  const [SecondCheckImg, setSecondCheckImg] = useState<string>(
    "../../img/purpleCircle.svg"
  );
  const [ThirdCheckImg, setThirdCheckImg] = useState<string>(
    "../../img/purpleCircle.svg"
  );
  const [primaryImageUrl, setPrimaryImageUrl] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([{ tagName: "tag1" }]);
  const [trackContent, setTrackContent] = useState<string>("");
  const [trackPreview, setTrackPreview] = useState<string>("");
  const [trackTitle, setTrackTitle] = useState<string>("");
  const [selectedMainImage, setSelectedMainImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImageOne, setSelectedImageOne] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImageTwo, setSelectedImageTwo] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImageThree, setSelectedImageThree] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedImageFour, setSelectedImageFour] = useState<
    string | ArrayBuffer | null
  >(null);
  const [imageFileOne, setImageFileOne] = useState<File | null>(null);
  const [imageFileTwo, setImageFileTwo] = useState<File | null>(null);
  const [imageFileThree, setImageFileThree] = useState<File | null>(null);
  const [imageFileFour, setImageFileFour] = useState<File | null>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [ShowTagOneBox, setShowTagOneBox] = useState<boolean>(
    window.innerWidth >= 655
  );
  const [ShowTagTwoBox, setShowTagTwoBox] = useState<boolean>(false);

  const [FirstInputText, setFirstInputText] = useState("");
  const maxCharLengthOne = 20;

  const [SecondInputText, setSecondInputText] = useState("");
  const maxCharLengthTwo = 50;

  const [TextAreaText, setTextAreaText] = useState("");
  const maxCharLengthThree = 3000;

  const [useAutoTranslate, setUseAutoTranslate] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState(useAutoTranslate);

  const [ShowCantButton, setShowCantButton] = useState<boolean>(true);

  const [ShowAIBox, setShowAIBox] = useState<boolean>(false);
  const [AIArrowImg, setAIArrowImg] = useState<string>("../../img/AImg2.svg");

  const [AI_Ask, setAI_Ask] = useState<string>("");
  const [AI_Answer, setAI_Answer] = useState<string>("");

  const [AIFirst, setAIFirst] = useState<boolean>(true);
  const [AIWait, setAIWait] = useState<boolean>(false);
  const [AIError, setAIError] = useState<boolean>(false);
  const [AIAnw, setAIAnw] = useState<boolean>(false);

  const goToMyTrack = () => {
    navigate("/portal/track");
    window.scrollTo(0, 0);
  };

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

  const uploadImage = async (file: File | null) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/v1/file/", formData, {
        headers: {
          "X-AUTH-TOKEN": token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    }

    return null;
  };

  const TrackCreateSubmitClick = async () => {
    if (
      ShowNotificationFirst ||
      ShowNotificationSecond ||
      ShowNotificationThird ||
      ShowNotificationFour ||
      ShowNotificationFive ||
      ShowNotificationSix
    ) {
      console.log("불가능");
    } else {
      const imageUrlOne = await uploadImage(imageFileOne);
      const imageUrlTwo = await uploadImage(imageFileTwo);
      const imageUrlThree = await uploadImage(imageFileThree);
      const imageUrlFour = await uploadImage(imageFileFour);

      const images = [
        { imageUrl: imageUrlOne },
        { imageUrl: imageUrlTwo },
        { imageUrl: imageUrlThree },
        { imageUrl: imageUrlFour },
      ].filter((image) => image.imageUrl !== null);

      const data: TrackCreateSubmitData = {
        agreePrivacyPolicy: FirstCheck,
        agreePublicTerms: SecondCheck,
        agreeTerms: ThirdCheck,
        images: images,
        primaryImageUrl: primaryImageUrl,
        tags: tags,
        trackContent: trackContent,
        trackPreview: trackPreview,
        trackTitle: trackTitle,
        useAutoTranslate: useAutoTranslate,
      };

      try {
        const response = await axios.post("/v1/track/", data, {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });

        if (response.status === 200) {
          console.log("트랙 생성 반환 성공:", response.data);
          goToMyTrack();
        }
      } catch (error) {
        console.error("트랙 생성 반환 실패:", error);
      }
      console.log("가능");
    }
  };

  const FirstCheckBoxCheck = () => {
    setFirstCheck(!FirstCheck);
  };

  const SecondCheckBoxCheck = () => {
    setSecondCheck(!SecondCheck);
  };

  const ThirdCheckBoxCheck = () => {
    setThirdCheck(!ThirdCheck);
  };

  useEffect(() => {
    if (FirstCheck) {
      setFirstCheckImg("../../img/purpleCircleCheck.svg");
    } else {
      setFirstCheckImg("../../img/purpleCircle.svg");
    }

    if (SecondCheck) {
      setSecondCheckImg("../../img/purpleCircleCheck.svg");
    } else {
      setSecondCheckImg("../../img/purpleCircle.svg");
    }

    if (ThirdCheck) {
      setThirdCheckImg("../../img/purpleCircleCheck.svg");
    } else {
      setThirdCheckImg("../../img/purpleCircle.svg");
    }

    if (FirstCheck && SecondCheck && ThirdCheck) {
      setShowNotificationFirst(false);
    } else {
      setShowNotificationFirst(true);
    }
  }, [FirstCheck, SecondCheck, ThirdCheck]);

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

  interface NewTrackImageComponentProps {
    text: string;
  }

  const NewTrackImageComponent: React.FC<NewTrackImageComponentProps> = ({
    text,
  }) => {
    return (
      <div className="NewTrackImageComponentFrame">
        <img className="plusImg" src="../../img/plusImg.svg" alt="오류"></img>
        <div className="NewTrackImageComponentText">{text}</div>
      </div>
    );
  };

  // 대표 이미지

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setShowNotificationSecond(false);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setSelectedMainImage(reader.result);

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
            const imageUrl = response.data;
            setPrimaryImageUrl(imageUrl);
          }
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //추가 이미지

  const handleImageOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageOne(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFileOne(file);
    }
  };

  const handleImageTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageTwo(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFileTwo(file);
    }
  };

  const handleImageThreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageThree(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFileThree(file);
    }
  };

  const handleImageFourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageFour(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFileFour(file);
    }
  };

  //트랙 이름 입력

  const FirstInputFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFirstInputText(inputValue);
    setTrackTitle(inputValue);

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
    setSecondInputText(inputValue);
    setTrackPreview(inputValue);

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
    // "MOOD",
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

  // 본문 컴포넌트
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaText(e.target.value);
    setTrackContent(e.target.value);

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

  const ToggleButton: React.FC = () => {
    const handleToggle = () => {
      const newState = !isToggled;
      setIsToggled(newState);
      setUseAutoTranslate(newState);
    };

    return (
      <div className={`ToggleButtonMainFrame ${!isToggled ? "active" : ""}`}>
        <div
          className={`ToggleButtonFrame ${!isToggled ? "active" : ""}`}
          onClick={handleToggle}
        >
          <div
            className={`ToggleButtonCircle ${!isToggled ? "active" : ""}`}
          ></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (
      ShowNotificationFirst ||
      ShowNotificationSecond ||
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
    ShowNotificationFirst,
    ShowNotificationSecond,
    ShowNotificationThird,
    ShowNotificationFour,
    ShowNotificationFive,
    ShowNotificationSix,
  ]);

  const AIBoxClick = () => {
    setShowAIBox(!ShowAIBox);
    if (ShowAIBox === true) {
      setAIArrowImg("../../img/AImg2.svg");
    } else {
      setAIArrowImg("../../img/AImg3.svg");
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
      const response = await axios.post("/v1/gpt/", data, {
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

      textareaRef.current.value = `${textBeforeCursor}${AI_Answer}${textAfterCursor}`;
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

  return (
    <div>
      <HeaderTwo></HeaderTwo>
      <div className="NewTrackpage">
        <div className="NewTrackpageInner">
          <div className="TextAddNewTrack">새 트랙 추가</div>
          {/* 1번째 컴포넌트 start*/}
          <div className="NewTrackContainerOne">
            <div className="NewTrackContainerOneInner">
              <NewTrackContainerPropsOne
                Title="이용약관에 동의해 주세요"
                TitleSub="새 트랙을 추가를 시작하기 전, 아래 내용을 반드시 동의해야 합니다."
              >
                {ShowNotificationFirst && (
                  <div className="NewTrackContainerNotificationBox">
                    <img
                      className="RedNotificationImg"
                      src="../../img/RedNotification.svg"
                      alt="오류"
                    ></img>
                    <div className="RedNotificationText">
                      모든 이용약관에 동의해야 합니다
                    </div>
                  </div>
                )}
              </NewTrackContainerPropsOne>
              <div className="NewTrackCheckBoxContainer">
                <div className="NewTrackCheckBox" onClick={FirstCheckBoxCheck}>
                  <img
                    className="purpleCircleImg"
                    src={FirstCheckImg}
                    alt="오류"
                  ></img>
                  <div className="NewTrackCheckBoxText">
                    <span className="NewTrackCheckBoxTextSpan">
                      서비스 이용약관
                    </span>
                    에 동의합니다.
                  </div>
                </div>
                <div className="NewTrackCheckBox" onClick={SecondCheckBoxCheck}>
                  <img
                    className="purpleCircleImg"
                    src={SecondCheckImg}
                    alt="오류"
                  ></img>
                  <div className="NewTrackCheckBoxText">
                    <span className="NewTrackCheckBoxTextSpan">
                      개인정보 처리방침
                    </span>
                    에 동의합니다.
                  </div>
                </div>
                <div className="NewTrackCheckBox" onClick={ThirdCheckBoxCheck}>
                  <img
                    className="purpleCircleImg"
                    src={ThirdCheckImg}
                    alt="오류"
                  ></img>
                  <div className="NewTrackCheckBoxText">
                    <span className="NewTrackCheckBoxTextSpan">
                      트랙 서비스 이용약관
                    </span>
                    에 동의합니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 1번째 컴포넌트 end */}
          {/* 3번째 컴포넌트 start*/}
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
                      src="../../img/RedNotification.svg"
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
                  FirstInputText.length > maxCharLengthOne ? "error" : ""
                }`}
                value={FirstInputText}
                onChange={FirstInputFunction}
              ></input>
              <div className="NewTrackFirstInputSubBox">
                <div></div>
                <div className="NewTrackFirstInputTextLength">{`${FirstInputText.length}자 / 25자`}</div>
              </div>
            </div>
          </div>
          {/* 태그번째 컴포넌트 end */}
          {/* 2번째 컴포넌트 start*/}
          <div className="NewTrackContainerTwo">
            <div className="NewTrackContainerTwoInner">
              <NewTrackContainerPropsOne
                Title="트랙을 잘 소개할 수 있는 이미지를 선택해 주세요."
                TitleSub="트랙의 이미지를 첨부해 주세요. 대표 이미지는 반드시 업로드가 필요합니다."
              >
                {ShowNotificationSecond && (
                  <div className="NewTrackContainerNotificationBox">
                    <img
                      className="RedNotificationImg"
                      src="../../img/RedNotification.svg"
                      alt="오류"
                    ></img>
                    <div className="RedNotificationText">
                      대표 이미지가 첨부되지 않았습니다
                    </div>
                  </div>
                )}
              </NewTrackContainerPropsOne>
              <div className="ImageSelectTextBox">
                <div className="MainImageText">대표 이미지</div>
                <div className="SubImageText">추가 이미지</div>
              </div>
              <div className="NewTrackImageSelectContainer">
                {
                  <div
                    className="MainImageBox"
                    onClick={() =>
                      document.getElementById("imageInput")?.click()
                    }
                  >
                    {selectedMainImage ? (
                      <img
                        src={selectedMainImage.toString()}
                        alt="오류"
                        className="selectedMainImage"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 대표 이미지 추가" />
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactText">대표 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>
                }
                {/* 추가 이미지1 */}
                <div className="NewTrackAddImageContainer">
                  <div
                    className="NewTrackAddImageBoxOne"
                    onClick={() =>
                      document.getElementById("imageInputOne")?.click()
                    }
                  >
                    {selectedImageOne ? (
                      <img
                        src={selectedImageOne.toString()}
                        alt="오류"
                        className="selectedImageOne"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 이미지 추가" />{" "}
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactTextTwo">추가 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInputOne"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageOneChange}
                    />
                  </div>
                  {/* 추가 이미지2 */}
                  <div
                    className="NewTrackAddImageBoxOne"
                    onClick={() =>
                      document.getElementById("imageInputTwo")?.click()
                    }
                  >
                    {selectedImageTwo ? (
                      <img
                        src={selectedImageTwo.toString()}
                        alt="오류"
                        className="selectedImageTwo"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 이미지 추가" />{" "}
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactTextTwo">추가 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInputTwo"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageTwoChange}
                    />
                  </div>
                  {/* 추가 이미지3 */}
                  <div
                    className="NewTrackAddImageBoxOne"
                    onClick={() =>
                      document.getElementById("imageInputThree")?.click()
                    }
                  >
                    {selectedImageThree ? (
                      <img
                        src={selectedImageThree.toString()}
                        alt="오류"
                        className="selectedImageThree"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 이미지 추가" />{" "}
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactTextTwo">추가 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInputThree"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageThreeChange}
                    />
                  </div>
                  {/* 추가 이미지4 */}
                  <div
                    className="NewTrackAddImageBoxOne"
                    onClick={() =>
                      document.getElementById("imageInputFour")?.click()
                    }
                  >
                    {selectedImageFour ? (
                      <img
                        src={selectedImageFour.toString()}
                        alt="오류"
                        className="selectedImageFour"
                      />
                    ) : (
                      <>
                        <NewTrackImageComponent text="새 이미지 추가" />{" "}
                        <div className="ReactTextBox">
                          <img
                            className="ReactplusImg"
                            src="../../img/plusImg.svg"
                            alt="오류"
                          />
                          <div className="ReactTextTwo">추가 이미지</div>
                        </div>
                      </>
                    )}
                    <input
                      id="imageInputFour"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageFourChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 2번째 컴포넌트 end */}
          {/* 4번째 컴포넌트 start */}
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
                      src="../../img/RedNotification.svg"
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
                  SecondInputText.length > maxCharLengthTwo ? "error" : ""
                }`}
                value={SecondInputText}
                onChange={SecondInputFunction}
              ></input>
              <div className="NewTrackFirstInputSubBox">
                <div></div>
                <div className="NewTrackFirstInputTextLength">{`${SecondInputText.length}자 / 20자`}</div>
              </div>
            </div>
          </div>
          {/* 4번째 컴포넌트 end */}
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
                        src="../../img/TrackTagImg.svg"
                        alt="오류"
                      ></img>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* 5번째 컴포넌트 end */}
          {/* AI번째 컴포넌트 start*/}
          {!ShowAIBox && (
            <div className="AIBoxFrame" onClick={AIBoxClick}>
              <div className="AIBoxInner">
                <div className="AIBoxOne">
                  <img className="AIImg" src="../../img/AImg.svg" alt="오류"></img>
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
                    <img
                      className="AIImg"
                      src="../../img/AImg.svg"
                      alt="오류"
                    ></img>
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
                  src="../../img/AImg4.svg"
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
                    src="../../img/AIWait.svg"
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
                    src="../../img/AIError.svg"
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
                    src="../../img/postImg.svg"
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
                    src="../../img/copyImg.svg"
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
          {/* 6번째 컴포넌트 start */}
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
                        src="../../img/RedNotification.svg"
                        alt="오류"
                      ></img>
                      <div className="RedNotificationText">
                        트랙 본문은 반드시 입력되어야 합니다
                      </div>
                    </div>
                  )}
                </NewTrackContainerPropsOne>
                <div className="TextAreaTextNumBox">
                  <div className="NewTrackFirstInputTextLength">{`${TextAreaText.length}자 / 3000자`}</div>
                  <textarea
                    placeholder="트랙 본문을 입력하세요"
                    className={`NewTrackFirstTextArea ${
                      TextAreaText.length > maxCharLengthThree ? "error" : ""
                    }`}
                    value={TextAreaText}
                    onChange={handleTextAreaChange}
                    ref={textareaRef}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="TextSensitiveOption">민감 설정</div>
          {/* 6번째 컴포넌트 end */}
          {/* 7번째 컴포넌트 start */}
          <div className="NewTrackContainerSeven">
            <div className="NewTrackContainerSevenInner">
              <div className="NewTrackContainerSevenBoxOne">
                <div className="TextAutomaticTranslation">자동 변역 설정</div>
                <div className="TextAutomaticTranslationSub">
                  한국어로 작성된 모든 내용이 자동으로 번역되어 보여져요.
                </div>
              </div>
              <ToggleButton></ToggleButton>
            </div>
          </div>
          {!ShowCantButton && (
            <button
              className="NewTrackCompeletButton"
              onClick={TrackCreateSubmitClick}
            >
              생성하기
            </button>
          )}
          {ShowCantButton && (
            <button className="CantCraeteButton">
              <div className="CantCraeteButtonBox">
                <img
                  className="CantCraeteImg"
                  src="../../img/CantCreate.svg"
                  alt="오류"
                ></img>
                <div className="CantCraeteButtonText">생성할 수 없음</div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewTrackpage;
