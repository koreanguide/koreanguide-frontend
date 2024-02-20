import React, { useState, useEffect, KeyboardEvent } from "react";
import "./NewTrack.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";

function NewTrackpage() {
  const token = sessionStorage.getItem("access-token");

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
  const [useAutoTranslate, setUseAutoTranslate] = useState<boolean>(false);
  const [FirstCheckImg, setFirstCheckImg] = useState<string>(
    "../img/purpleCircle.svg"
  );
  const [SecondCheckImg, setSecondCheckImg] = useState<string>(
    "../img/purpleCircle.svg"
  );
  const [ThirdCheckImg, setThirdCheckImg] = useState<string>(
    "../img/purpleCircle.svg"
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

  // const [imageSource, setImageSource] = useState("../img/purpleCircle.svg");
  const [FirstInputText, setFirstInputText] = useState("");
  const maxCharLengthOne = 25;

  // const [imageSourceTwo, setImageSourceTwo] = useState(
  //   "../img/purpleCircle.svg"
  // );
  const [SecondInputText, setSecondInputText] = useState("");
  const maxCharLengthTwo = 20;

  const [tagList, setTagList] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [TextAreaText, setTextAreaText] = useState("");
  const maxCharLengthThree = 200;

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
      setFirstCheckImg("../img/purpleCircleCheck.svg");
    } else {
      setFirstCheckImg("../img/purpleCircle.svg");
    }

    if (SecondCheck) {
      setSecondCheckImg("../img/purpleCircleCheck.svg");
    } else {
      setSecondCheckImg("../img/purpleCircle.svg");
    }

    if (ThirdCheck) {
      setThirdCheckImg("../img/purpleCircleCheck.svg");
    } else {
      setThirdCheckImg("../img/purpleCircle.svg");
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
        <img className="plusImg" src="../img/plusImg.svg" alt="오류"></img>
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

  // const FirstTranslateClick = () => {
  //   if (imageSource === "../img/purpleCircle.svg") {
  //     setImageSource("../img/purpleCircleCheck.svg");
  //   } else {
  //     setImageSource("../img/purpleCircle.svg");
  //   }
  // };

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

  // const SecondTranslateClick = () => {
  //   if (imageSourceTwo === "../img/purpleCircle.svg") {
  //     setImageSourceTwo("../img/purpleCircleCheck.svg");
  //   } else {
  //     setImageSourceTwo("../img/purpleCircle.svg");
  //   }
  // };

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
  const InputTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const InputTagKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagList.length < 5) {
      setTagList((prevTagList) => [...prevTagList, tagInput]);
      setTagInput("");

      if (tagList.length >= 2) {
        setShowNotificationFive(false);
      }
    }
  };

  const handleTagClick = (index: number) => {
    setTagList((prevTagList) => prevTagList.filter((tag, i) => i !== index));

    if (tagList.length <= 3) {
      setShowNotificationFive(true);
    }
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

  // 변역 버튼 활성화
  const TranslationButtonClick = () => {
    setUseAutoTranslate(!useAutoTranslate);
  };

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
                      src="../img/RedNotification.svg"
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
                TitleSub="관광객에게 보여질 트랙 이름을 설정합니다. 최대 25자까지 입력할 수 있습니다."
              >
                {ShowNotificationThird && (
                  <div className="NewTrackContainerNotificationBox">
                    <img
                      className="RedNotificationImg"
                      src="../img/RedNotification.svg"
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
                {/* <div
                  className="NewTrackFirstInputTranslateBox"
                  onClick={FirstTranslateClick}
                >
                  <img className="NTTTImg" src={imageSource} alt="오류"></img>
                  <div className="NewTrackFirstInputTranslateText">
                    자동 번역 사용 끔
                  </div>
                </div> */}
                <div></div>
                <div className="NewTrackFirstInputTextLength">{`${FirstInputText.length}자 / 25자`}</div>
              </div>
            </div>
          </div>
          {/* 3번째 컴포넌트 end */}
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
                      src="../img/RedNotification.svg"
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
                      <NewTrackImageComponent text="새 대표 이미지 추가" />
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
                      <NewTrackImageComponent text="새 이미지 추가" />
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
                      <NewTrackImageComponent text="새 이미지 추가" />
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
                      <NewTrackImageComponent text="새 이미지 추가" />
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
                      <NewTrackImageComponent text="새 이미지 추가" />
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
                Title="트랙을 쉽게 이해할 수 있게 간단한 소개 글을 작성해 주세요."
                TitleSub="관광객에게 보여질 트랙 설명을 설정합니다. 최대 20자까지 입력할 수 있습니다."
              >
                {ShowNotificationFour && (
                  <div className="NewTrackContainerNotificationBox">
                    <img
                      className="RedNotificationImg"
                      src="../img/RedNotification.svg"
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
                {/* <div
                  className="NewTrackFirstInputTranslateBox"
                  onClick={SecondTranslateClick}
                >
                  <img
                    className="NTTTImg"
                    src={imageSourceTwo}
                    alt="오류"
                  ></img>
                  <div className="NewTrackFirstInputTranslateText">
                    자동 번역 사용 끔
                  </div>
                </div> */}
                <div></div>
                <div className="NewTrackFirstInputTextLength">{`${SecondInputText.length}자 / 20자`}</div>
              </div>
            </div>
          </div>
          {/* 4번째 컴포넌트 end */}
          {/* 5번째 컴포넌트 start */}
          <div className="NewTrackContainerThree">
            <div className="NewTrackContainerFiveInner">
              <NewTrackContainerPropsOne
                Title="트랙에 대한 태그를 작성해 주세요."
                TitleSub="트랙을 간단히 표현할 수 있는 태그를 달아주세요. 예) food, club"
              >
                {ShowNotificationFive && (
                  <div className="NewTrackContainerNotificationBox">
                    <img
                      className="RedNotificationImg"
                      src="../img/RedNotification.svg"
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
                <input
                  className="HaskInput"
                  placeholder="태그를 입력하세요."
                  value={tagInput}
                  onChange={InputTagChange}
                  onKeyPress={InputTagKeyPress}
                ></input>
              </div>
              <div className="HaskTageBox">
                {tagList.map((tag, index) => (
                  <div
                    className="HaskTageContent"
                    key={index}
                    onClick={() => handleTagClick(index)}
                  >
                    # {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 5번째 컴포넌트 end */}
          {/* 6번째 컴포넌트 start */}
          <div className="NewTrackContainerSix">
            <div className="NewTrackContentFrame">
              <div className="NewTrackContentInner">
                <NewTrackContainerPropsOne
                  Title="관광객과 어떤 여정을 함께할 것인지 자세히 설명해 주세요."
                  TitleSub="트랙 본문은 마크다운 형식으로 작성되어야 해요. 마크다운 형식을 작성하는 방법은 여기에서 확인할 수 있어요."
                >
                  {ShowNotificationSix && (
                    <div className="NewTrackContainerNotificationBox">
                      <img
                        className="RedNotificationImg"
                        src="../img/RedNotification.svg"
                        alt="오류"
                      ></img>
                      <div className="RedNotificationText">
                        트랙 본문은 반드시 입력되어야 합니다
                      </div>
                    </div>
                  )}
                </NewTrackContainerPropsOne>
                <div className="TextAreaTextNumBox">
                  <div className="NewTrackFirstInputTextLength">{`${TextAreaText.length}자 / 200자`}</div>
                  <textarea
                    placeholder="트랙 본문을 입력하세요"
                    className={`NewTrackFirstTextArea ${
                      TextAreaText.length > maxCharLengthThree ? "error" : ""
                    }`}
                    value={TextAreaText}
                    onChange={handleTextAreaChange}
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
                  한국어로 작성된 모든 내용이 자동으로 번역되어 관광객에게
                  보여져요.
                </div>
              </div>
              <div
                className="TranslationButton"
                style={{
                  backgroundColor: useAutoTranslate ? "#f94747" : "",
                  color: useAutoTranslate ? "#fff" : "",
                }}
                onClick={TranslationButtonClick}
              >
                비활성화
              </div>
            </div>
          </div>
          <button
            className="NewTrackCompeletButton"
            onClick={TrackCreateSubmitClick}
          >
            완료하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTrackpage;
