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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
    };

    return (
      <div className="consentCheckBoxContainer">
        <label className="customCheckbox">
          <input type="checkbox" checked={isChecked} onChange={handleChange} />
        </label>
        <div className="consentCheckBoxText">{consentCheckBoxText}</div>
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
                <ConsentCheckBox consentCheckBoxText="이 트랙은 대한민국을 방문하는 외국인에게 공개되는 트랙임을 확인했습니다."></ConsentCheckBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackCreatePage;
