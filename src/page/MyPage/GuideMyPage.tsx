import React, { useState, useEffect } from "react";
import HeaderTwo from "../../HeaderTwo";
import "./GuideMyPage.css";
import axios from "axios";

function GuideMyPage() {
  const token = sessionStorage.getItem("access-token");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [registeredAt, setRegisteredAt] = useState("");
  const [EmailFixPopUp, setEmailFixPopUp] = useState(false);
  const [isBlurred, seIsBlurred] = useState(true);
  const [PhoneNumFixPopUp, setPhoneNumFixPopUp] = useState(false);
  const [PhonenNumtarget, setPhonenNumtarget] = useState<string>("");
  const [PhoneNumRegisterPassword, setPhoneNumRegisterPassword] =
    useState<string>("");
  const [PhoneNumFixPopUpError, setPhoneNumFixPopUpError] = useState(false);
  const [PasswordChange, setPasswordChange] = useState<string>("");
  const [NewPasswordChange, setNewPasswordChange] = useState<string>("");
  const [PasswordFixPopUp, setPasswordFixPopUp] = useState(false);
  const [PasswordFixPopUpError, setPasswordFixPopUpError] = useState(false);
  const [target, setTarget] = useState<string>("");
  const [NameRegisterPassword, setNameRegisterPassword] = useState("");
  const [NameFixPopUp, setNameFixPopUp] = useState(false);
  const [NameFixPopUpError, setNameFixPopUpError] = useState(false);

  useEffect(() => {
    if (token === null) {
      console.log("세션 스토리지에 토큰이 없습니다.");
      return;
    } else {
      console.log("토큰", token);
    }

    const GuideMyInformation = async () => {
      try {
        const response = await axios.get("/v1/profile/mypage", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("내 정보", response.data);
        setName(response.data.name);
        setPhoneNum(response.data.phoneNum);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setRegisteredAt(response.data.registeredAt);
      } catch (error) {
        console.error(error);
      }
    };

    GuideMyInformation();
  }, [token]);
  // 이메일 수정, 등록
  const EmailFixClick = () => {
    setEmailFixPopUp(true);
    seIsBlurred(false);
  };
  const EmailFixCancelClick = () => {
    setEmailFixPopUp(false);
    seIsBlurred(true);
  };

  // 비밀번호 변경

  interface ChangePasswordData {
    password: string;
    newPassword: string;
  }

  const ChangePasswordRegisterOnClick = async () => {
    const data: ChangePasswordData = {
      password: PasswordChange,
      newPassword: NewPasswordChange,
    };
    try {
      const response = await axios.post("/v1/profile/password", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("비밀번호 재설정 성공", response.data);
        window.location.reload();
      }
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
      setPasswordFixPopUpError(true);
    }
  };

  const PasswordFixClick = () => {
    setPasswordFixPopUp(true);
    seIsBlurred(false);
  };
  const PasswordFixCancelClick = () => {
    setPasswordFixPopUp(false);
    seIsBlurred(true);
    setPasswordFixPopUpError(false);
  };

  // 이름 등록, 변경

  interface NameRegisterData {
    target: string;
    password: string;
  }

  const NameRegisterOnClick = async () => {
    const data: NameRegisterData = {
      target: target,
      password: NameRegisterPassword,
    };

    try {
      const response = await axios.post("/v1/profile/name", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("실명등록 성공", response.data);
        window.location.reload();
      }
    } catch (error) {
      console.error("실명등록 실패:", error);
      setNameFixPopUpError(true);
    }
  };

  const NameFixClick = () => {
    setNameFixPopUp(true);
    seIsBlurred(false);
  };
  const NameFixCancelClick = () => {
    setNameFixPopUp(false);
    seIsBlurred(true);
    setNameFixPopUpError(false);
  };

  // 전화 번호 수정, 등록

  interface PhoneNumRegisterData {
    target: string;
    password: string;
  }

  const PhoneNumRegisterOnClick = async () => {
    const data: PhoneNumRegisterData = {
      target: PhonenNumtarget,
      password: PhoneNumRegisterPassword,
    };
    try {
      const response = await axios.post("/v1/profile/phone", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("전화등록 성공", response.data);
        window.location.reload();
      }
    } catch (error) {
      console.error("전화등록 실패:", error);
      setPhoneNumFixPopUpError(true);
    }
  };

  const PhoneNumFixClick = () => {
    setPhoneNumFixPopUp(true);
    seIsBlurred(false);
  };
  const PhoneNumFixCancelClick = () => {
    setPhoneNumFixPopUp(false);
    seIsBlurred(true);
    setPhoneNumFixPopUpError(false);
  };
  return (
    <div className="GuideMyPageFrame">
      <HeaderTwo></HeaderTwo>
      <div className={isBlurred ? "GuideMyPageInner" : "GuideMyPageInnerBlur"}>
        <div className="GuideMyPageInnerTextOne">내 정보</div>
        <div className="GuideMyPageInfoContainer">
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne">이메일 주소</div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageInfoText">{email}</div>
              <div
                className="GuideMyPageInfoBoxButtonOne"
                onClick={EmailFixClick}
              >
                수정
              </div>
            </div>
          </div>
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne">비밀번호</div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageInfoText">{password}</div>
              <div
                className="GuideMyPageInfoBoxButtonOne"
                onClick={PasswordFixClick}
              >
                변경
              </div>
            </div>
          </div>
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne">이름</div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageInfoText">
                {name ? name : <span style={{color: 'red'}}>미등록</span>}
              </div>
              <div
                className="GuideMyPageInfoBoxButtonOne"
                onClick={NameFixClick}
              >
                수정
              </div>
            </div>
          </div>
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne">전화번호</div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageInfoText">
                {phoneNum ? phoneNum : <span style={{color: 'red'}}>미등록</span>}  
              </div>
              <div
                className="GuideMyPageInfoBoxButtonOne"
                onClick={PhoneNumFixClick}
              >
                수정
              </div>
            </div>
          </div>
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne">가입일</div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageInfoText">{registeredAt}</div>
            </div>
          </div>
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne"></div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageTextOut">회원탈퇴하기</div>
            </div>
          </div>
        </div>
      </div>
      {EmailFixPopUp && (
        <div className="EmailFixPopUpFrame">
          <div className="EmailFixPopUpInner">
            <div className="EmailFixPopUpTextOne">새로운 이메일 주소 등록</div>
            <div className="EmailFixPopUpAlert">
              <img
                className="EmailFixPopUpAlertImg"
                src="../img/EmailFixPopUpAlertImg.svg"
                alt="!"
              ></img>
              <div className="EmailFixPopUpAlertText">
                새로운 이메일 주소를 등록하려면, 이메일 주소 인증이 필요합니다.
              </div>
            </div>
            <div className="EmailFixPopUpTextTwo">변경할 이메일 주소</div>
            <input
              placeholder="이메일 주소"
              className="EmailFixPopUpInputOne"
            ></input>
            <div className="EmailFixPopUpBoxOne">
              <div className="EmailFixPopUpBoxTwo">
                <div className="EmailFixPopUpTextPassword">비밀번호</div>
                <input
                  placeholder="현재 비밀번호"
                  className="EmailFixPopUpInputTwo"
                  //   type=password
                ></input>
              </div>
              <div className="EmailFixPopUpBoxThree">
                <div className="EmailFixPopUpTextPassword">인증코드</div>
                <input
                  placeholder="이메일 인증 코드"
                  className="EmailFixPopUpInputThree"
                ></input>
              </div>
            </div>
            <div className="EmailFixPopUpButtonContainer">
              <div
                className="EmailFixPopUpCancleButton"
                onClick={EmailFixCancelClick}
              >
                취소
              </div>
              <div className="EmailFixPopUpRegisterButton">등록</div>
            </div>
          </div>
        </div>
      )}
      {PhoneNumFixPopUp && (
        <div className="FixConponentFrame">
          <div className="FixConponentInner">
            <div className="FixConponentTitle">전화번호 등록 및 변경</div>
            {PhoneNumFixPopUpError && (
              <div className="EmailFixPopUpAlert">
                <img
                  className="EmailFixPopUpAlertImg"
                  src="../img/EmailFixPopUpAlertImg.svg"
                  alt="!"
                ></img>
                <div className="EmailFixPopUpAlertText">
                  비밀번호를 다시 확인해 주세요
                </div>
              </div>
            )}
            <div className="FixConponentInputFrame">
              <div className="FixConponentInputInner">
                <div className="FixConponentInputTitle">전화번호</div>
                <div className="FixConponentInputTitle">비밀번호</div>
              </div>
              <div className="FixConponentInputSecondInner">
                <input
                  placeholder="010-XXXX-XXXX 형식으로 입력"
                  className="FixConponentFirstInput"
                  autoComplete='off'
                  onChange={(e) => setPhonenNumtarget(e.target.value)}
                ></input>
                <input
                  className="FixConponentSecondInput"
                  placeholder="현재 비밀번호"
                  type="password"
                  autoComplete='off'
                  onChange={(e) => setPhoneNumRegisterPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="FixConponentButtonFrame">
              <div
                className="FixConponentCancleButton"
                onClick={PhoneNumFixCancelClick}
              >
                취소
              </div>
              <div
                className="FixConponentRegisterButton"
                onClick={PhoneNumRegisterOnClick}
              >
                등록
              </div>
            </div>
          </div>
        </div>
      )}
      {PasswordFixPopUp && (
        <div className="ChangePasswordFrame">
          <div className="ChangePasswordInner">
            <div className="TextChangePassword">비밀번호 변경</div>
            {PasswordFixPopUpError && (
              <div className="EmailFixPopUpAlert">
                <img
                  className="EmailFixPopUpAlertImg"
                  src="../img/EmailFixPopUpAlertImg.svg"
                  alt="!"
                ></img>
                <div className="EmailFixPopUpAlertText">
                  현재 비밀번호를 확인해 주세요 (8자리 이상, 특수문자, 대문자,
                  숫자 1개 이상 포함)
                </div>
              </div>
            )}
            <div className="TextLastPassword">현재 비밀번호</div>
            <input
              className="LastPasswordInput"
              type="password"
              onChange={(e) => setPasswordChange(e.target.value)}
            ></input>
            <div className="NewPasswordTextFrame">
              <div className="NewPasswordText">새 비밀번호</div>
              <div className="NewPasswordText">새 비밀번호 재입력</div>
            </div>
            <div className="NewPasswordInputFrame">
              <input
                className="NewPasswordInput"
                type="password"
                onChange={(e) => setNewPasswordChange(e.target.value)}
              ></input>
              <input
                className="NewPasswordInput"
                type="password"
                onChange={(e) => setNewPasswordChange(e.target.value)}
              ></input>
            </div>
            <div className="ChangePasswordButtonFrame">
              <div
                className="ChangePasswordCancle"
                onClick={PasswordFixCancelClick}
              >
                취소
              </div>
              <div
                className="ChangePasswordRegister"
                onClick={ChangePasswordRegisterOnClick}
              >
                변경
              </div>
            </div>
          </div>
        </div>
      )}
      {NameFixPopUp && (
        <div className="FixConponentFrame">
          <div className="FixConponentInner">
            <div className="FixConponentTitle">이름 등록 및 변경</div>
            {NameFixPopUpError && (
              <div className="EmailFixPopUpAlert">
                <img
                  className="EmailFixPopUpAlertImg"
                  src="../img/EmailFixPopUpAlertImg.svg"
                  alt="!"
                ></img>
                <div className="EmailFixPopUpAlertText">
                  현재 비밀번호를 확인해 주세요
                </div>
              </div>
            )}
            <div className="FixConponentInputFrame">
              <div className="FixConponentInputInner">
                <div className="FixConponentInputTitle">이름</div>
                <div className="FixConponentInputTitle">비밀번호</div>
              </div>
              <div className="FixConponentInputSecondInner">
                <input
                  placeholder="이름"
                  className="FixConponentFirstInput"
                  onChange={(e) => setTarget(e.target.value)}
                ></input>
                <input
                  className="FixConponentSecondInput"
                  placeholder="현재 비밀번호"
                  type="password"
                  onChange={(e) => setNameRegisterPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="FixConponentButtonFrame">
              <div
                className="FixConponentCancleButton"
                onClick={NameFixCancelClick}
              >
                취소
              </div>
              <div
                className="FixConponentRegisterButton"
                onClick={NameRegisterOnClick}
              >
                등록
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuideMyPage;
