import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import "./TrackCreate.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";

function TrackCreatePage() {
  const [unicornText, setUnicornText] = useState<string>("");

  const rainbowClick = () => {
    console.log(unicornText);
  };

  const FantasticInput: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [checkBoxImage, setCheckBoxImage] = useState(
      "../img/purpleCircle.svg"
    );

    const handleCheckBoxClick = () => {
      setIsChecked(!isChecked);
    };

    React.useEffect(() => {
      if (isChecked) {
        setCheckBoxImage("../img/purpleCircleCheck.svg");
      } else {
        setCheckBoxImage("../img/purpleCircle.svg");
      }
    }, [isChecked]);

    const magicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUnicornText(event.target.value);
    };

    return (
      <div>
        <input
          type="text"
          className="TrackInputComponentInput"
          value={unicornText}
          onChange={magicChange}
        />
        <div className="InputUnderBox">
          <div className="translationBox" onClick={handleCheckBoxClick}>
            <img
              className="purpleCircleImg"
              src={checkBoxImage}
              alt="오류"
            ></img>
            <div className="translationBoxText">자동 번역 사용 끔</div>
          </div>
          <div className="textCount"></div>
        </div>
      </div>
    );
  };

  const FantasticInputTwo: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [checkBoxImage, setCheckBoxImage] = useState(
      "../img/purpleCircle.svg"
    );

    const handleCheckBoxClick = () => {
      setIsChecked(!isChecked);
    };

    React.useEffect(() => {
      if (isChecked) {
        setCheckBoxImage("../img/purpleCircleCheck.svg");
      } else {
        setCheckBoxImage("../img/purpleCircle.svg");
      }
    }, [isChecked]);

    const [unicornText, setUnicornText] = useState<string>("");

    const magicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUnicornText(event.target.value);
    };

    const rainbowClick = () => {
      setTrackPreview(unicornText);
    };

    return (
      <div>
        <input
          type="text"
          className="TrackInputComponentInput"
          value={unicornText}
          onChange={magicChange}
        />
        <button onClick={rainbowClick}>보물상자에 넣기</button>
        <div className="InputUnderBox">
          <div className="translationBox" onClick={handleCheckBoxClick}>
            <img
              className="purpleCircleImg"
              src={checkBoxImage}
              alt="오류"
            ></img>
            <div className="translationBoxText">자동 번역 사용 끔</div>
          </div>
          <div className="textCount"></div>
        </div>
      </div>
    );
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
  }

  const token = sessionStorage.getItem("access-token");

  const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState<boolean>(false);
  const [agreePublicTerms, setAgreePublicTerms] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([{ imageUrl: "images" }]);
  const [primaryImageUrl, setPrimaryImageUrl] = useState<string>("images");
  const [tags, setTags] = useState<Tag[]>([{ tagName: "tag1" }]);
  const [trackContent, setTrackContent] = useState<string>("images");
  const [trackPreview, setTrackPreview] = useState<string>("images");
  const [trackTitle, setTrackTitle] = useState<string>("images");

  const [NoneAgreeAlert, setNoneAgreeAlert] = useState<boolean>(true);

  useEffect(() => {
    if (agreePrivacyPolicy && agreePublicTerms && agreeTerms) {
      setNoneAgreeAlert(false);
    } else {
      setNoneAgreeAlert(true);
    }
  }, [agreePrivacyPolicy, agreePublicTerms, agreeTerms]);

  const TrackCreateSubmitClick = async () => {
    const data: TrackCreateSubmitData = {
      agreePrivacyPolicy: agreePrivacyPolicy,
      agreePublicTerms: agreePublicTerms,
      agreeTerms: agreeTerms,
      images: images,
      primaryImageUrl: primaryImageUrl,
      tags: tags,
      trackContent: trackContent,
      trackPreview: trackPreview,
      trackTitle: trackTitle,
    };

    try {
      const response = await axios.post("/v1/track/", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("트랙 생성 반환:", response.data);
      }
    } catch (error) {
      console.error("트랙 생성 반환 실패:", error);
    }
  };

  interface CheckData {
    ConsentCheckText: string;
    isChecked: boolean;
    setIsChecked: (value: boolean) => void;
  }

  const UseConsentCheckBox: React.FC<CheckData> = ({
    ConsentCheckText,
    isChecked,
    setIsChecked,
  }) => {
    const handleCheckBoxClick = () => {
      setIsChecked(!isChecked);
    };

    return (
      <div className="consentCheckBoxContainer">
        <img
          className="consentCheckBoxImg"
          src={isChecked ? "../img/Checked.svg" : "../img/nonChecked.svg"}
          alt="오류"
          onClick={handleCheckBoxClick}
        ></img>
        <p className="consentCheckBoxText">
          <span className="highlight">{ConsentCheckText}</span>에 동의합니다.
        </p>
      </div>
    );
  };

  interface TrackInputComponentProps {
    titleText: string;
    warningText: string;
    guideText: string;
    children?: React.ReactNode;
  }

  const TrackInputComponent: React.FC<TrackInputComponentProps> = ({
    titleText,
    warningText,
    guideText,
    children,
  }) => {
    return (
      <div className="trackInputComponentFrame">
        <div className="trackInputComponentTextBoxOne">
          <div className="trackInputComponentTextBoxTwo">{titleText}</div>
          <div className="TrackInputComponentContainer">
            <img
              className="plusImg"
              src="../img/redNotionIcon.svg"
              alt="오류"
            />
            <div className="trackInputComponentTextBoxThree">{warningText}</div>
          </div>
        </div>
        <div className="trackInputComponentTextBoxFour">
          <div className="trackInputComponentServText">{guideText}</div>
        </div>
        {children}
      </div>
    );
  };

  interface TextAreaComponentProps {
    maxText: number;
  }

  const TextAreaComponent: React.FC<TextAreaComponentProps> = ({ maxText }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);
    const [checkBoxImage, setCheckBoxImage] = useState(
      "../img/purpleCircle.svg"
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
    };

    const handleCheckBoxClick = () => {
      setIsChecked(!isChecked);
    };

    React.useEffect(() => {
      if (isChecked) {
        setCheckBoxImage("../img/purpleCircleCheck.svg");
      } else {
        setCheckBoxImage("../img/purpleCircle.svg");
      }
    }, [isChecked]);

    const inputClass =
      inputValue.length > maxText ? "specificInput error" : "specificInput";

    return (
      <div>
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          className={inputClass}
          style={{ resize: "none" }}
        />
        <div className="InputUnderBox">
          <div className="translationBox" onClick={handleCheckBoxClick}>
            <img
              className="purpleCircleImg"
              src={checkBoxImage}
              alt="오류"
            ></img>
            <div className="translationBoxText">자동 번역 사용 끔</div>
          </div>
          <div className="textCount">
            {inputValue.length}자 / {maxText}자
          </div>
        </div>
      </div>
    );
  };

  interface TagComponentProps {
    tagText: string;
  }

  const TagComponent: React.FC<TagComponentProps> = ({ tagText }) => {
    return (
      <div className="tagDisplayBox">
        <div className="tagText">{tagText}</div>
      </div>
    );
  };

  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div className="TrackCreatePageFrame">
        <HeaderTwo></HeaderTwo>
        <div className="TrackCreateInner">
          <div className="textNewTrackAdd">새 트랙 추가</div>
          <div className="serviceConsentContainer">
            <div className="serviceConsentInnerContainer">
              <div className="serviceConsentBoxOne">
                <div className="textServiceConsent">서비스 이용약관 동의</div>
                {NoneAgreeAlert && (
                  <div className="TrackInputComponentContainer">
                    <img
                      className="plusImg"
                      src="../img/redNotionIcon.svg"
                      alt="오류"
                    />
                    <div className="trackInputComponentTextBoxThree">
                      모든 약관에 동의해야 합니다
                    </div>
                  </div>
                )}
              </div>
              <div className="textServiceConsentServ">
                추가를 시작하기 전, 아래 내용을 반드시 동의해야 합니다.
              </div>
              <div className="consentCheckBox">
                <UseConsentCheckBox
                  ConsentCheckText="서비스 이용 약관"
                  isChecked={agreePrivacyPolicy}
                  setIsChecked={setAgreePrivacyPolicy}
                />
                <UseConsentCheckBox
                  ConsentCheckText="개인정보 처리방침"
                  isChecked={agreePublicTerms}
                  setIsChecked={setAgreePublicTerms}
                />
                <UseConsentCheckBox
                  ConsentCheckText="트랙 서비스 이용약관"
                  isChecked={agreeTerms}
                  setIsChecked={setAgreeTerms}
                />
              </div>
            </div>
          </div>
          <div className="trackAddImgContainer">
            <div className="trackAddImgInnerContainer">
              <div className="textIncludeImgContainer">
                <div className="textIncludeImg">
                  트랙을 잘 소개할 수 있는 이미지를 선택해 주세요.
                </div>
                <div className="TrackInputComponentContainer">
                  <img
                    className="plusImg"
                    src="../img/redNotionIcon.svg"
                    alt="오류"
                  />
                  <div className="trackInputComponentTextBoxThree">
                    대표 이미지가 첨부되지 않았습니다.
                  </div>
                </div>
              </div>
              <div className="textIncludeImgServ">
                트랙의 이미지를 첨부해 주세요. 대표 이미지는 반드시 업로드가
                필요합니다.
              </div>
              <div className="trackAddImgContainerTwo">
                <div className="trackAddImgContainerThree">
                  <div className="textMainImg">대표 이미지</div>
                  <div className="mainImgAddContainer" onClick={handleDivClick}>
                    <input
                      style={{ display: "none" }}
                      id="fileInput"
                      type="file"
                      onChange={handleFileInput}
                      ref={fileInputRef}
                    />
                    {imageSrc ? (
                      <img
                        src={imageSrc.toString()}
                        alt="chosen"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "1.25rem",
                        }}
                      />
                    ) : (
                      <label htmlFor="fileInput">
                        <div className="mainImgAddInnerContainer">
                          <img
                            className="plusImg"
                            src="../img/plusImg.svg"
                            alt="오류"
                          ></img>
                          <div className="plusImgText">새 대표 이미지 추가</div>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
                <div className="trackAddImgContainerFour">
                  <div className="textAddImg">추가 이미지</div>
                  <div className="trackAddImgContainerFive"></div>
                </div>
              </div>
            </div>
          </div>
          <TrackInputComponent
            titleText="트랙의 이름을 알려주세요."
            warningText="트랙 제목은 반드시 입력되어야 합니다."
            guideText="관광객에게 보여질 트랙 이름을 설정합니다. 최대 25자까지 입력할 수 있습니다."
          >
            <div className="trackInputComponentTextBoxFive">
              <FantasticInput />
              <button onClick={rainbowClick}>보물상자에 넣기</button>
            </div>
          </TrackInputComponent>
          <TrackInputComponent
            titleText="어떻게 이 트랙을 소개할까요?"
            warningText="트랙 소개는 반드시 입력되어야 합니다"
            guideText="관광객에게 보여질 트랙 설명을 설정합니다. 최대 20자까지 입력할 수 있습니다."
          >
            <div className="trackInputComponentTextBoxFive">
              <FantasticInputTwo></FantasticInputTwo>
            </div>
          </TrackInputComponent>
          <TrackInputComponent
            titleText="트랙에 대한 태그를 작성해 주세요."
            warningText="트랙 태그는 반드시 3개 이상 추가되어야 합니다"
            guideText="트랙을 간단히 표현할 수 있는 태그를 달아주세요. 예) food, club"
          >
            <div className="tagContainer">
              <div className="tagBoxOne">
                <div className="tagBoxOneText">#</div>
              </div>
              <input
                type="text"
                className="tagBoxTwo"
                placeholder="태그를 입력하세요"
              ></input>
            </div>
            <div className="tagUnderBox">
              <TagComponent tagText="식도락"></TagComponent>
              <TagComponent tagText="맛집"></TagComponent>
              <TagComponent tagText="쾌락"></TagComponent>
              <TagComponent tagText="극락"></TagComponent>
              <TagComponent tagText="도시락"></TagComponent>
            </div>
          </TrackInputComponent>
          <div className="trackInputComponentFrameTwo">
            <div className="trackInputComponentTextBoxOne">
              <div className="trackInputComponentTextBoxTwo">
                트랙에 대한 구체적인 설명을 적어주세요.
              </div>
              <div className="TrackInputComponentContainer">
                <img
                  className="plusImg"
                  src="../img/redNotionIcon.svg"
                  alt="오류"
                />
                <div className="trackInputComponentTextBoxThree">
                  트랙 상세 설명은 반드시 입력되어야 합니다
                </div>
              </div>
            </div>
            <div className="trackInputComponentTextBoxFour">
              <div className="trackInputComponentServText">
                트랙 본문은 마크다운 형식으로 작성되어야 합니다. 마크다운 형식을
                작성하는 방법은 <span className="textHere">여기</span>에서
                확인할 수 있습니다.
              </div>
            </div>
            <TextAreaComponent maxText={1000}></TextAreaComponent>
          </div>
          <div
            className="trackInputCompeletButton"
            onClick={TrackCreateSubmitClick}
          >
            완료하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackCreatePage;
