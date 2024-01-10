import React, { useState } from "react";
import "./TrackCreate.css";
import HeaderTwo from "../../HeaderTwo";

function TrackCreatePage() {
  interface consentCheckBoxProps {
    consentCheckBoxText: string;
  }

  const ConsentCheckBox: React.FC<consentCheckBoxProps> = ({
    consentCheckBoxText,
  }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [checkBoxImage, setCheckBoxImage] = useState("../img/nonChecked.svg");

    const handleCheckBoxClick = () => {
      setIsChecked(!isChecked);
    };

    React.useEffect(() => {
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

  const TrackInputComponent = () => {
    return (
      <div className="trackInputComponentFrame">
        <div className=""></div>
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
                <div className="textEssentialInput">* 필수 입력 섹션</div>
              </div>
              <div className="textServiceConsentServ">
                추가를 시작하기 전, 아래 내용을 반드시 동의해야 합니다.
              </div>
              <div className="consentCheckBox">
                <ConsentCheckBox consentCheckBoxText="서비스 이용약관"></ConsentCheckBox>
                <ConsentCheckBox consentCheckBoxText="개인정보 처리방침"></ConsentCheckBox>
                <ConsentCheckBox consentCheckBoxText="트랙 서비스 이용약관"></ConsentCheckBox>
              </div>
            </div>
          </div>
          <div className="trackAddImgContainer">
            <div className="trackAddImgInnerContainer">
              <div className="textIncludeImgContainer">
                <div className="textIncludeImg">
                  트랙을 잘 소개할 수 있는 이미지를 선택해 주세요.
                </div>
                <div className="textEssentialInput">* 필수 입력 섹션</div>
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
              <TrackCreatePage></TrackCreatePage>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackCreatePage;
