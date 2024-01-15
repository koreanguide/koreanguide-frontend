import React, { useState, useEffect } from "react";
import "./TrackCreate.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";

function TrackCreatePage() {
  type ConsentCheckBoxProps = {
    consentCheckBoxText: string;
    onCheckChange: (isChecked: boolean) => void;
  };

  type CheckBoxItem = {
    name: string;
    text: string;
  };

  const ConsentCheckBox: React.FC<ConsentCheckBoxProps> = ({
    consentCheckBoxText,
    onCheckChange,
  }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [checkBoxImage, setCheckBoxImage] = useState("../img/nonChecked.svg");

    const handleCheckBoxClick = () => {
      setIsChecked((prev) => !prev);
    };

    useEffect(() => {
      if (isChecked) {
        setCheckBoxImage("../img/Checked.svg");
      } else {
        setCheckBoxImage("../img/nonChecked.svg");
      }
    }, [isChecked]);

    return (
      <div className="consentCheckBoxContainer">
        <img
          className="consentCheckBoxImg"
          src={checkBoxImage}
          alt="오류"
          onClick={handleCheckBoxClick}
        ></img>
        <p className="consentCheckBoxText">
          <span className="highlight">{consentCheckBoxText}</span>에 동의합니다.
        </p>
      </div>
    );
  };
  // ---------------------------------------------------------------------------
  const checkBoxItems: CheckBoxItem[] = [
    { name: "termsOfService", text: "서비스 이용약관" },
    { name: "privacyPolicy", text: "개인정보 처리방침" },
    { name: "trackTermsOfService", text: "트랙 서비스 이용약관" },
  ];

  const [consentCheckAlert, setConsentCheckAlert] = useState(true);
  const [checkBoxStatus, setCheckBoxStatus] = useState<Record<string, boolean>>(
    checkBoxItems.reduce((acc, item) => {
      acc[item.name] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleCheckBoxChange = (name: string, isChecked: boolean) => {
    setCheckBoxStatus((prevState) => ({ ...prevState, [name]: isChecked }));
  };

  useEffect(() => {
    const allChecked = checkBoxItems.every((item) => checkBoxStatus[item.name]);
    setConsentCheckAlert(!allChecked);
  }, [checkBoxStatus]);

  // ---------------------------------------------------------------------------

  const AddImgComponent = () => {
    return (
      <div className="AddImgComponentFrame">
        <div className="AddImgComponentInnerBox">
          <img className="plusImg" src="../img/plusImg.svg" alt="오류"></img>
          <div className="AddImgComponentText">새 이미지 추가</div>
        </div>
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

  interface InputComponentProps {
    maxText: number;
    textPlaceholder: string;
  }

  const InputComponent: React.FC<InputComponentProps> = ({
    maxText,
    textPlaceholder,
  }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);
    const [checkBoxImage, setCheckBoxImage] = useState(
      "../img/purpleCircle.svg"
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      inputValue.length > maxText
        ? "TrackInputComponentInput error"
        : "TrackInputComponentInput";

    return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={inputClass}
          placeholder={textPlaceholder}
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
                {consentCheckAlert && (
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
                {checkBoxItems.map((item) => (
                  <ConsentCheckBox
                    key={item.name}
                    consentCheckBoxText={item.text}
                    onCheckChange={(isChecked) =>
                      handleCheckBoxChange(item.name, isChecked)
                    }
                  />
                ))}
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
                  <div className="mainImgAddContainer">
                    <div className="mainImgAddInnerContainer">
                      <img
                        className="plusImg"
                        src="../img/plusImg.svg"
                        alt="오류"
                      ></img>
                      <div className="plusImgText">새 대표 이미지 추가</div>
                    </div>
                  </div>
                </div>
                <div className="trackAddImgContainerFour">
                  <div className="textAddImg">추가 이미지</div>
                  <div className="trackAddImgContainerFive">
                    <AddImgComponent></AddImgComponent>
                    <AddImgComponent></AddImgComponent>
                    <AddImgComponent></AddImgComponent>
                    <AddImgComponent></AddImgComponent>
                  </div>
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
              <InputComponent
                maxText={25}
                textPlaceholder="트랙 이름을 입력하세요."
              ></InputComponent>
            </div>
          </TrackInputComponent>
          <TrackInputComponent
            titleText="어떻게 이 트랙을 소개할까요?"
            warningText="트랙 소개는 반드시 입력되어야 합니다"
            guideText="관광객에게 보여질 트랙 설명을 설정합니다. 최대 20자까지 입력할 수 있습니다."
          >
            <div className="trackInputComponentTextBoxFive">
              <InputComponent
                maxText={20}
                textPlaceholder="트랙 소개를 입력하세요."
              ></InputComponent>
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
          <div className="trackInputCompeletButton">완료하기</div>
        </div>
      </div>
    </div>
  );
}

export default TrackCreatePage;
