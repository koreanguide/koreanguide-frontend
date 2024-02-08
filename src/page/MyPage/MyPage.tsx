import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderTwo from "../../HeaderTwo";
import "./MyPage.css";
import { useNavigate } from "react-router-dom";
import LoadPage from "../LoadPage/LoadPage";

function MyPage() {
  const token = sessionStorage.getItem("access-token");

  const navigate = useNavigate();

  const [name, setName] = useState("실명");
  const [nickName, setNickName] = useState("별명");
  const [phoneNum, setPhoneNum] = useState("010-1234-1234");
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("************");
  const [accountInfo, setAccountInfo] = useState("신한 000000000000");
  const [blocked, setBlocked] = useState("5명의 사용자");
  const [enable, setEnable] = useState(false);
  const [loading, setLoading] = useState(true);

  const [FixConponentShow, setFixConponentShow] = useState(false);

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
        setBlocked(response.data.blocked);
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
    const [isEditing, setIsEditing] = useState(false);
    const [tempContent, setTempContent] = useState(content);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTempContent(event.target.value);
    };

    return (
      <div className="MyInfoContainer">
        <div className="MyInfoInnerContainer">
          <div className="MyInfoCategory">{category}</div>
          {isEditing ? (
            <input
              className="MyInfoContainerInput"
              type="text"
              value={tempContent}
              onChange={handleChange}
            />
          ) : (
            <div
              className="MyInfoCategoryContent"
              style={{ color: content === "미등록" ? "red" : "inherit" }}
            >
              {content}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  };

  const PasswordResetPage = () => {
    navigate("/portal/reset_password");
    window.scrollTo(0, 0);
  };

  const CreditPage = () => {
    navigate("/portal/credit");
    window.scrollTo(0, 0);
  };

  const ProfileImgContainer: React.FC = () => {
    const [image, setImage] = useState("../img/profile2.svg");

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
    const [isToggled, setIsToggled] = useState(enable);
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

  const FixConponent = () => {
    return (
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
                className="FixConponentFirstInput"
                placeholder="010-XXXX-XXXX 형식으로 입력"
              ></input>
              <input
                className="FixConponentSecondInput"
                placeholder="현재 비밀번호"
              ></input>
            </div>
          </div>
          <div className="FixConponentButtonFrame">
            <div
              className="FixConponentCancleButton"
              onClick={FixConponentCancleClick}
            >
              취소
            </div>
            <div className="FixConponentRegisterButton">등록</div>
          </div>
        </div>
      </div>
    );
  };

  const NameFix = () => {
    setFixConponentShow(true);
  };

  const FixConponentCancleClick = () => {
    setFixConponentShow(false);
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
                  <div className="IntroductionReplace">수정</div>
                </div>
                <textarea className="IntroductionTextArea"></textarea>
              </div>
            </div>
          </div>
          <ChangeComponent
            category="전화번호"
            content={phoneNum}
            setContent={setPhoneNum}
          >
            <div className="ChangeComponentFixButton">수정</div>
          </ChangeComponent>
          <ChangeComponent
            category="닉네임"
            content={nickName}
            setContent={setNickName}
          >
            <div className="ChangeComponentFixButton">수정</div>
          </ChangeComponent>

          <div className="MyInfoContainer">
            <div className="MyInfoInnerContainer">
              <div className="MyInfoCategory">비밀번호</div>

              <div className="MyInfoCategoryContent">{password}</div>
              <button className="MyInfoFixButton" onClick={PasswordResetPage}>
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
      {FixConponentShow && <FixConponent></FixConponent>}
    </div>
  );
}

export default MyPage;
