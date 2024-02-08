import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HeaderTwo from "../../HeaderTwo";
import "./MyPage.css";
import { useNavigate } from "react-router-dom";
import LoadPage from "../LoadPage/LoadPage";

function MyPage() {
  const token = sessionStorage.getItem("access-token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("실명");
  const [nickName, setNickName] = useState("별명");
  const [phoneNum, setPhoneNum] = useState("010-1234-1234");
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("************");
  const [accountInfo, setAccountInfo] = useState("신한 000000000000");
  const [enable, setEnable] = useState(false);
  const [IntroductionTarget, setIntroductionTarget] = useState<string>("");
  const [FixNameConponentShow, setFixNameConponentShow] = useState(false);
  const [FixPhoneNumConponentShow, setFixPhoneNumConponentShow] =
    useState(false);
  const [FixNickNameConponentShow, setFixNickNameConponentShow] =
    useState(false);
  const [isToggled, setIsToggled] = useState(enable);
  const [image, setImage] = useState("../img/profile2.svg");
  const [ShowPasswordChange, setShowPasswordChange] = useState<boolean>(false);
  const [PasswordChange, setPasswordChange] = useState<string>("");
  const [NewPasswordChange, setNewPasswordChange] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [PhonenNumtarget, setPhonenNumtarget] = useState<string>("");

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
      } catch (error) {
        console.error(error);
      }
    };

    MyInformation();
  }, [token]);

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

  const PasswordResetPage = () => {
    navigate("/passwordreset");
    window.scrollTo(0, 0);
  };

  const CreditPage = () => {
    navigate("/credit/management");
    window.scrollTo(0, 0);
  };

  const ProfileImgContainer: React.FC = () => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="ProfileImgContainer">
        <div className="ProfileImgContainerText">프로필 이미지</div>
        <div className="ProfileImgContainerImgBox">
          <img src={image} alt="none" className="ProfileImgContainerImg"></img>
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
      </div>
    );
  };

  const ToggleButton: React.FC = () => {
    const handleToggle = () => {
      const newState = !isToggled;
      setIsToggled(newState);
      setEnable(newState);
    };

    return (
      <div className={`ToggleButtonMainFrame ${isToggled ? "active" : ""}`}>
        <div
          className={`ToggleButtonFrame ${isToggled ? "active" : ""}`}
          onClick={handleToggle}
        >
          <div
            className={`ToggleButtonCircle ${isToggled ? "active" : ""}`}
          ></div>
        </div>
      </div>
    );
  };

  interface FixComponentProps {
    title: string;
    label: string;
    placeholder: string;
    onCancleClick: () => void;
    onRegisterClick: (inputValue: string) => void;
  }

  const FixConponent: React.FC<FixComponentProps> = ({
    title,
    label,
    placeholder,
    onCancleClick,
    onRegisterClick,
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleRegisterClick = () => {
      setFixPhoneNumConponentShow(false);
      setFixNickNameConponentShow(false);
      setFixNameConponentShow(false);
      document.body.style.overflow = "auto";

      if (inputRef.current) {
        onRegisterClick(inputRef.current.value);
      }
    };

    return (
      <div className="FixConponentFrame">
        <div className="FixConponentInner">
          <div className="FixConponentTitle">{title}</div>
          <div className="FixConponentInputFrame">
            <div className="FixConponentInputInner">
              <div className="FixConponentInputTitle">{label}</div>
              <div className="FixConponentInputTitle">비밀번호</div>
            </div>
            <div className="FixConponentInputSecondInner">
              <input
                className="FixConponentFirstInput"
                placeholder={placeholder}
                ref={inputRef}
              ></input>
              <input
                className="FixConponentSecondInput"
                placeholder="현재 비밀번호"
              ></input>
            </div>
          </div>
          <div className="FixConponentButtonFrame">
            <div className="FixConponentCancleButton" onClick={onCancleClick}>
              취소
            </div>
            <div
              className="FixConponentRegisterButton"
              onClick={handleRegisterClick}
            >
              등록
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NameFix = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setFixNameConponentShow(true);
  };

  const FixNameConponentCancleClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    setFixNameConponentShow(false);
  };

  const PhoneNumFix = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setFixPhoneNumConponentShow(true);
  };

  const FixPhoneNumConponentCancleClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    setFixPhoneNumConponentShow(false);
  };

  const NickNameFix = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setFixNickNameConponentShow(true);
  };

  const FixNickNameConponentCancleClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    setFixNickNameConponentShow(false);
  };

  interface NameRegisterData {
    target: string;
  }

  const NameRegisterOnClick = async () => {
    // window.location.reload();

    const data: NameRegisterData = {
      target: target,
    };
    try {
      const response = await axios.post("/v1/profile/name", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("실명등록 성공", response.data);
      }
    } catch (error) {
      console.error("실명등록 실패:", error);
    }
  };

  interface PhoneNumRegisterData {
    target: string;
  }

  const PhoneNumRegisterOnClick = async () => {
    // window.location.reload();

    const data: PhoneNumRegisterData = {
      target: PhonenNumtarget,
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

  interface IntroductionReplaceData {
    target: string;
  }

  const IntroductionReplaceOnClick = async () => {
    const data: IntroductionReplaceData = {
      target: IntroductionTarget,
    };
    try {
      const response = await axios.post("/v1/profile/introduce", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        console.log("소개글 수정 및 등록 성공", response.data);
      }
    } catch (error) {
      console.error("소개글 수정 및 등록 실패:", error);
    }
  };

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
  };

  const PasswordResetCancleOnClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    setShowPasswordChange(false);
  };

  return (
    <div className="MyPageFrame">
      <HeaderTwo></HeaderTwo>
      <div className="MyPageInner">
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
            <div className="IntroductionContainer">
              <div className="IntroductionInnerContainer">
                <div className="TestIntroductionBox">
                  <div className="TestIntroduction">소개글</div>
                  <div
                    className="IntroductionReplace"
                    onClick={IntroductionReplaceOnClick}
                  >
                    완료
                  </div>
                </div>
                <textarea
                  className="IntroductionTextArea"
                  onChange={(e) => setIntroductionTarget(e.target.value)}
                ></textarea>
              </div>
            </div>
            {
              //   <div className="IntroductionContainer">
              //     <div className="IntroductionInnerContainer">
              //       <div className="TestIntroductionBox">
              //         <div className="TestIntroduction">소개글</div>
              //         <div className="IntroductionReplace">작성</div>
              //       </div>
              //       <div className="NoneIntroductionText">
              //         등록된 소개글이 없습니다.
              //         <br /> 소개글을 추가하여 나를 소개하세요!
              //       </div>
              //     </div>
              //   </div>
            }
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
        <FixConponent
          title="이름 등록 및 변경"
          label="이름"
          placeholder="이름"
          onCancleClick={FixNameConponentCancleClick}
          onRegisterClick={(inputValue) => {
            setTarget(inputValue);
            NameRegisterOnClick();
          }}
        />
      )}
      {FixPhoneNumConponentShow && (
        <FixConponent
          title="전화번호 등록 및 변경"
          label="전화번호"
          placeholder="010-XXXX-XXXX 형식으로 입력"
          onCancleClick={FixPhoneNumConponentCancleClick}
          onRegisterClick={(inputValue) => {
            setPhonenNumtarget(inputValue);
            PhoneNumRegisterOnClick();
          }}
        />
      )}
      {/* {FixNickNameConponentShow && (
        <FixConponent
          title="닉네임 등록 및 변경"
          label="닉네임"
          placeholder="닉네임"
          onCancleClick={FixNickNameConponentCancleClick}
        />
      )} */}
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
    </div>
  );
}

export default MyPage;