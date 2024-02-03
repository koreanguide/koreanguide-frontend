import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderTwo from "../../HeaderTwo";
import "./MyPage.css";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const token = sessionStorage.getItem("access-token");

  const [name, setName] = useState("실명");
  const [nickName, setNickName] = useState("별명");
  const [phoneNum, setPhoneNum] = useState("010-1234-1234");
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("************");
  const [accountInfo, setAccountInfo] = useState("신한 000000000000");
  const [blocked, setBlocked] = useState("5명의 사용자");
  const [enable, setEnable] = useState("활성화 여부");

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
      } catch (error) {
        console.error(error);
      }
    };

    MyInformation();
  }, [token]);

  type ChangeComponentProps = {
    category: string;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    editText: string;
    saveText: string;
  };

  const ChangeComponent: React.FC<ChangeComponentProps> = ({
    category,
    content,
    setContent,
    editText,
    saveText,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempContent, setTempContent] = useState(content);

    const handleEdit = () => {
      setIsEditing(true);
      setTempContent(content);
    };

    const handleSave = () => {
      setIsEditing(false);
      setContent(tempContent);
    };

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
          <button
            className="MyInfoFixButton"
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? saveText : editText}
          </button>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();

  const PasswordResetPage = () => {
    navigate("/passwordreset");
    window.scrollTo(0, 0);
  };

  const CreditPage = () => {
    navigate("/credit/management");
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

  const ToggleSwitch: React.FC = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
      setIsToggled(!isToggled);
    };

    return (
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          id="toggleSwitch"
          checked={isToggled}
          onChange={handleToggle}
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          <span
            className={`toggle-switch-inner ${
              isToggled && "toggle-switch-checked"
            }`}
          />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    );
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
                editText="수정"
                saveText="저장"
              />
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
            editText="등록"
            saveText="저장"
          />
          <ChangeComponent
            category="닉네임"
            content={nickName}
            setContent={setNickName}
            editText="수정"
            saveText="저장"
          />
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
            editText="수정"
            saveText="저장"
          />
          <div className="MyInfoContainer">
            <div className="MyInfoInnerContainer">
              <div className="MyInfoCategory">계좌번호</div>

              <div className="MyInfoCategoryContent">{accountInfo}</div>
              <button className="MyInfoFixButton" onClick={CreditPage}>
                변경
              </button>
            </div>
          </div>
          <ChangeComponent
            category="공개 상태"
            content={enable}
            setContent={setEnable}
            editText="&&"
            saveText="저장"
          />
        </div>
        <ToggleSwitch></ToggleSwitch>
      </div>
    </div>
  );
}

export default MyPage;
