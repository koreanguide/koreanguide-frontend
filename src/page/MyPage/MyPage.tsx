import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import axios from "axios";
import HeaderTwo from "../../HeaderTwo";
import "./MyPage.css";
import { useNavigate } from "react-router-dom";
import LoadPage from "../LoadPage/LoadPage";

function MyPage() {
  const token = sessionStorage.getItem("access-token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountInfo, setAccountInfo] = useState<string>("");
  const [ProfileImg, setProfileImg] = useState("../img/NormalProfile.svg");
  const [enable, setEnable] = useState(false);
  const [IntroductionTarget, setIntroductionTarget] = useState<string>("");
  const [FixNameConponentShow, setFixNameConponentShow] = useState(false);
  const [target, setTarget] = useState<string>("");
  const [FixPhoneNumConponentShow, setFixPhoneNumConponentShow] =
    useState(false);
  const [FixNickNameConponentShow, setFixNickNameConponentShow] =
    useState(false);
  const [isToggled, setIsToggled] = useState(enable);
  const [ShowPasswordChange, setShowPasswordChange] = useState<boolean>(false);
  const [PasswordChange, setPasswordChange] = useState<string>("");
  const [NewPasswordChange, setNewPasswordChange] = useState<string>("");
  const [PhonenNumtarget, setPhonenNumtarget] = useState<string>("");
  const [NameRegisterPassword, setNameRegisterPassword] = useState<string>("");
  const [PhoneNumRegisterPassword, setPhoneNumRegisterPassword] =
    useState<string>("");
  const [NickNametarget, setNickNametarget] = useState<string>("");
  const [NickNametargetRegisterPassword, setNickNametargetRegisterPassword] =
    useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [IntroductionChangeShow, setIntroductionChangeShow] = useState(false);
  const [IntroductionPassword, setIntroductionPassword] = useState<string>("");
  const [IntroductionContent, setIntroductionContent] = useState<string>("");
  const [CaseIntroducionNone, setCaseIntroducionNone] = useState(false);
  const [CaseIntroducionExist, setCaseIntroducionExist] = useState(true);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    if (token === null) {
      console.log("세션 스토리지에 토큰이 없습니다.");
      return;
    } else {
      console.log("토큰", token);
    }

    const MyInformation = async () => {
      try {
        const response = await axios.get("/v1/profile/", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("내 정보", response.data);
        setName(response.data.name);
        setNickName(response.data.nickName);
        setPhoneNum(response.data.phoneNum);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setAccountInfo(response.data.accountInfo);
        setEnable(response.data.enable);
        setLoading(false);
        setIntroductionContent(response.data.introduce);
      } catch (error) {
        console.error(error);
      }
    };

    MyInformation();
  }, [token]);

  useEffect(() => {
    if (IntroductionContent === "등록된 소개 글이 없습니다.") {
      setCaseIntroducionNone(true);
      setCaseIntroducionExist(false);
    } else {
      setCaseIntroducionNone(false);
      setCaseIntroducionExist(true);
    }
  }, [IntroductionContent]);

  if (loading) {
    return <LoadPage />;
  }

  type ChangeComponentProps = {
    category: string;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    children: any;
  };

  const ChangeComponent: React.FC<ChangeComponentProps> = ({
    category,
    content,
    setContent,
    children,
  }) => {
    return (
      <div className="MyInfoContainer">
        <div className="MyInfoInnerContainer">
          <div className="MyInfoCategory">{category}</div>
          <div
            className="MyInfoCategoryContent"
            style={{ color: content === "미등록" ? "red" : "inherit" }}
          >
            {content}
          </div>
          {children}
        </div>
      </div>
    );
  };

  const CreditPage = () => {
    navigate("/portal/credit");
    window.scrollTo(0, 0);
  };

  const ProfileImgContainer: React.FC = () => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImg(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="ProfileImgContainer">
        <div className="ProfileImgContainerText">프로필 이미지</div>
        <div className="ProfileImgContainerImgBox">
          <img
            src={ProfileImg}
            alt="none"
            className="ProfileImgContainerImg"
          ></img>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="imageUpload"
        />
        <label htmlFor="imageUpload" className="ProfileImgContainerButton">
          수정
        </label>
        <div className="ImgDeleteButton" onClick={ProfileImgDel}>
          삭제
        </div>
      </div>
    );
  };

  const ProfileImgDel = async () => {
    try {
      const response = await axios.delete("/v1/profile/profile", {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("이미지 삭제 성공", response.data);
        window.location.reload();
      }
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
    }
  };

  // 토글 버튼

  const ToggleButton: React.FC = () => {
    const handleToggle = () => {
      const newState = !isToggled;
      setIsToggled(newState);
      setEnable(newState);
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

  /*이름변경 컴포넌트*/

  const NameRegisterClick = () => {
    setFixNameConponentShow(false);
    NameRegisterOnClick();
    BackGroundBlurCancle();
    document.body.style.overflow = "auto";
  };

  const NameFix = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setFixNameConponentShow(true);
    BackGroundBlur();
  };

  const FixNameConponentCancleClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    setFixNameConponentShow(false);
    BackGroundBlurCancle();
  };

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
    }
  };

  /*번호변경 컴포넌트*/

  const PhoneRegisterClick = () => {
    setFixPhoneNumConponentShow(false);
    PhoneNumRegisterOnClick();
    document.body.style.overflow = "auto";
    BackGroundBlurCancle();
  };

  const PhoneNumFix = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setFixPhoneNumConponentShow(true);
    BackGroundBlur();
  };

  const FixPhoneNumConponentCancleClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    setFixPhoneNumConponentShow(false);
    BackGroundBlurCancle();
  };

  interface PhoneNumRegisterData {
    target: string;
    password: string;
  }

  const PhoneNumRegisterOnClick = async () => {
    window.location.reload();

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
      }
    } catch (error) {
      console.error("전화등록 실패:", error);
    }
  };

  /*닉네임변경 컴포넌트*/

  const NickNameFix = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setFixNickNameConponentShow(true);
    BackGroundBlur();
  };

  const FixNickNameConponentCancleClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    setFixNickNameConponentShow(false);
    BackGroundBlurCancle();
  };

  interface NickNameRegisterData {
    target: string;
    password: string;
  }

  const NickNameRegisterOnClick = async () => {
    window.location.reload();

    const data: NickNameRegisterData = {
      target: NickNametarget,
      password: NickNametargetRegisterPassword,
    };
    try {
      const response = await axios.post("/v1/profile/nickname", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("닉네임등록 성공", response.data);
      }
    } catch (error) {
      console.error("닉네임등록 실패:", error);
    }
  };

  /*소개글변경 컴포넌트*/

  interface IntroductionReplaceData {
    target: string;
    password: string;
  }

  const IntroductionReplaceOnClick = async () => {
    const data: IntroductionReplaceData = {
      target: IntroductionTarget,
      password: IntroductionPassword,
    };
    try {
      const response = await axios.post("/v1/profile/introduce", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("소개글 수정 및 등록 성공", response.data);
        window.location.reload();
      }
    } catch (error) {
      console.error("소개글 수정 및 등록 실패:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroductionTarget(e.target.value);
  };

  const handleInputFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
  };

  const IntroductionTextClick = () => {
    document.body.style.overflow = "hidden";
    setIntroductionChangeShow(true);
    BackGroundBlur();
  };

  const IntroductionCancleClick = () => {
    document.body.style.overflow = "auto";
    setIntroductionChangeShow(false);
    BackGroundBlurCancle();
  };

  // 비밀번호 변경 컴포넌트

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
        setShowPasswordChange(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
    }
  };

  const PasswordResetOnClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setShowPasswordChange(true);
    BackGroundBlur();
  };

  const PasswordResetCancleOnClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    setShowPasswordChange(false);
    BackGroundBlurCancle();
  };

  // 블러처리

  const BackGroundBlur = () => {
    setBlur(true);
  };

  const BackGroundBlurCancle = () => {
    setBlur(false);
  };

  //계좌번호 미등록 색상

  return (
    <div className="MyPageFrame">
      <HeaderTwo></HeaderTwo>
      <div className={`MyPageInner ${blur ? "blur" : ""}`}>
        <div className="TextMyInfo">프로필 관리</div>
        <div className="MyInfoFrame">
          <div className="MyInfoContainerFrame">
            <div className="MyInfoSecondContainer">
              <ProfileImgContainer></ProfileImgContainer>
              <ChangeComponent
                category="이름"
                content={name}
                setContent={setName}
              >
                <div className="ChangeComponentFixButton" onClick={NameFix}>
                  수정
                </div>
              </ChangeComponent>
            </div>
            {CaseIntroducionExist && (
              <div className="IntroductionContainer">
                <div className="IntroductionInnerContainer">
                  <div className="TestIntroductionBox">
                    <div className="TestIntroduction">소개글</div>
                    <div
                      className="IntroductionReplace"
                      onClick={IntroductionTextClick}
                    >
                      수정
                    </div>
                  </div>
                  <div className="ExistIntroductionText">
                    {IntroductionContent}
                  </div>
                </div>
              </div>
            )}
            {CaseIntroducionNone && (
              <div className="IntroductionContainer">
                <div className="IntroductionInnerContainer">
                  <div className="TestIntroductionBox">
                    <div className="TestIntroduction">소개글</div>
                    <div
                      className="IntroductionReplace"
                      onClick={IntroductionTextClick}
                    >
                      작성
                    </div>
                  </div>
                  <div className="NoneIntroductionText">
                    등록된 소개글이 없습니다.
                    <br /> 소개글을 추가하여 나를 소개하세요!
                  </div>
                </div>
              </div>
            )}
          </div>
          <ChangeComponent
            category="전화번호"
            content={phoneNum}
            setContent={setPhoneNum}
          >
            <div className="ChangeComponentFixButton" onClick={PhoneNumFix}>
              수정
            </div>
          </ChangeComponent>
          <ChangeComponent
            category="닉네임"
            content={nickName}
            setContent={setNickName}
          >
            <div className="ChangeComponentFixButton" onClick={NickNameFix}>
              수정
            </div>
          </ChangeComponent>

          <div className="MyInfoContainer">
            <div className="MyInfoInnerContainer">
              <div className="MyInfoCategory">비밀번호</div>

              <div className="MyInfoCategoryContent">{password}</div>
              <button
                className="MyInfoFixButton"
                onClick={PasswordResetOnClick}
              >
                변경
              </button>
            </div>
          </div>
          <ChangeComponent
            category="이메일"
            content={email}
            setContent={setEmail}
          >
            <div className="ChangeComponentFixButton">수정</div>
          </ChangeComponent>
          <div className="MyInfoContainer">
            <div className="MyInfoInnerContainer">
              <div className="MyInfoCategory">계좌번호</div>
              <div className="MyInfoCategoryContent">{accountInfo}</div>
              <button className="MyInfoFixButton" onClick={CreditPage}>
                변경
              </button>
            </div>
          </div>
          <div className="MyInfoContainer">
            <div className="MyInfoInnerContainer">
              <div className="MyInfoCategory">활성화 상태</div>
              <div className="ToggleButtonLocation">
                <ToggleButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      {FixNameConponentShow && (
        <div className="FixConponentFrame">
          <div className="FixConponentInner">
            <div className="FixConponentTitle">이름 등록 및 변경</div>
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
                onClick={FixNameConponentCancleClick}
              >
                취소
              </div>
              <div
                className="FixConponentRegisterButton"
                onClick={NameRegisterClick}
              >
                등록
              </div>
            </div>
          </div>
        </div>
      )}
      {FixPhoneNumConponentShow && (
        <div className="FixConponentFrame">
          <div className="FixConponentInner">
            <div className="FixConponentTitle">전화번호 등록 및 변경</div>
            <div className="FixConponentInputFrame">
              <div className="FixConponentInputInner">
                <div className="FixConponentInputTitle">전화번호</div>
                <div className="FixConponentInputTitle">비밀번호</div>
              </div>
              <div className="FixConponentInputSecondInner">
                <input
                  placeholder="010-XXXX-XXXX 형식으로 입력"
                  className="FixConponentFirstInput"
                  onChange={(e) => setPhonenNumtarget(e.target.value)}
                ></input>
                <input
                  className="FixConponentSecondInput"
                  placeholder="현재 비밀번호"
                  type="password"
                  onChange={(e) => setPhoneNumRegisterPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="FixConponentButtonFrame">
              <div
                className="FixConponentCancleButton"
                onClick={FixPhoneNumConponentCancleClick}
              >
                취소
              </div>
              <div
                className="FixConponentRegisterButton"
                onClick={PhoneRegisterClick}
              >
                등록
              </div>
            </div>
          </div>
        </div>
      )}
      {FixNickNameConponentShow && (
        <div className="FixConponentFrame">
          <div className="FixConponentInner">
            <div className="FixConponentTitle">닉네임 등록 및 변경</div>
            <div className="FixConponentInputFrame">
              <div className="FixConponentInputInner">
                <div className="FixConponentInputTitle">닉네임</div>
                <div className="FixConponentInputTitle">비밀번호</div>
              </div>
              <div className="FixConponentInputSecondInner">
                <input
                  placeholder="닉네임"
                  className="FixConponentFirstInput"
                  onChange={(e) => setNickNametarget(e.target.value)}
                ></input>
                <input
                  className="FixConponentSecondInput"
                  placeholder="현재 비밀번호"
                  type="password"
                  onChange={(e) =>
                    setNickNametargetRegisterPassword(e.target.value)
                  }
                ></input>
              </div>
            </div>
            <div className="FixConponentButtonFrame">
              <div
                className="FixConponentCancleButton"
                onClick={FixNickNameConponentCancleClick}
              >
                취소
              </div>
              <div
                className="FixConponentRegisterButton"
                onClick={NickNameRegisterOnClick}
              >
                등록
              </div>
            </div>
          </div>
        </div>
      )}
      {ShowPasswordChange && (
        <div className="ChangePasswordFrame">
          <div className="ChangePasswordInner">
            <div className="TextChangePassword">비밀번호 변경</div>
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
                onClick={PasswordResetCancleOnClick}
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
      {IntroductionChangeShow && (
        <div className="IntroductionChangeContainer">
          <div className="IntroductionChangeContainerInner">
            <div className="TextIntorductionFix">소개글 수정</div>
            <div className="TextLimitContainer">
              <div className="TextIntroduction">소개글</div>
              <div className="IntroductionChangeContainerTextLimit">
                {`${IntroductionTarget.length}자 / 100자`}
              </div>
            </div>
            <textarea
              className={`IntroductionChangeTextArea ${
                IntroductionTarget.length > 100 ? "overLimit" : ""
              } ${isFocused ? "focused" : ""}`}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              value={IntroductionTarget}
            />
            <div className="IntroductionChangeTextPassword">비밀번호</div>
            <input
              className="IntroductionChangePasswordInput"
              type="password"
              onChange={(e) => setIntroductionPassword(e.target.value)}
            ></input>
            <div className="IntroductionChangeButtonBox">
              <div
                className="IntroductionChangeButtonCancle"
                onClick={IntroductionCancleClick}
              >
                취소
              </div>
              <div
                className="IntroductionChangeButtonRegister"
                onClick={IntroductionReplaceOnClick}
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

export default MyPage;
