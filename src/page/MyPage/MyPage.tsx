import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import axios from "axios";
import HeaderTwo from "../../HeaderTwo";
import "./MyPage.css";
import LoadPage from "../LoadPage/LoadPage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropDownComponent from "../../SubwayLine/SubwayLine";
import SeoulHeader from "../../SeoulHeader";

function MyPage() {
  const token = sessionStorage.getItem("access-token");
  const [loading, setLoading] = useState(true);
  const [nickName, setNickName] = useState("");
  const [ProfileImg, setProfileImg] = useState("");
  const [IntroductionTarget, setIntroductionTarget] = useState<string>("");
  const [FixNameConponentShow, setFixNameConponentShow] = useState(false);
  const [target, setTarget] = useState<string>("");
  const [FixPhoneNumConponentShow, setFixPhoneNumConponentShow] =
    useState(false);
  const [FixNickNameConponentShow, setFixNickNameConponentShow] =
    useState(false);
  const [ShowPasswordChange, setShowPasswordChange] = useState<boolean>(false);
  const [PasswordChange, setPasswordChange] = useState<string>("");
  const [NewPasswordChange, setNewPasswordChange] = useState<string>("");
  const [NameRegisterPassword, setNameRegisterPassword] = useState<string>("");
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

  const [birth, setbirth] = useState("");
  const [nearSubway, setnearSubway] = useState("");
  const [subwayLine, setSubwayLine] = useState("");
  const [address, setaddress] = useState("");
  const [firstLang, setfirstLang] = useState("");
  const [secondLang, setsecondLang] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const [SubwayChangeShow, setSubwayChangeShow] = useState(false);

  const [AddressChangeShow, setAddressChangeShow] = useState(false);

  const [seoulCountry, setseoulCountry] = useState("");

  const [currentSelection, setCurrentSelection] = useState("NONE");

  useEffect(() => {
    const MyInformation = async () => {
      try {
        const response = await axios.get("/v1/profile/info", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        setNickName(response.data.nickName);
        if (response.data.profileUrl === "DEFAULT") {
          setProfileImg("../img/NormalProfile.svg");
        } else {
          setProfileImg(response.data.profileUrl);
        }
        setLoading(false);
        setIntroductionContent(response.data.introduce);
        setbirth(response.data.birth);
        setnearSubway(response.data.nearSubway);
        setaddress(response.data.address);
        setSubwayLine(response.data.subwayLine);
        setfirstLang(response.data.firstLang);
        setsecondLang(response.data.secondLang);
      } catch (error) {
        console.error(error);
      }
    };

    MyInformation();
  }, [token]);

  const cityData = [
    { kr: "강서구", en: "GANGSEO" },
    { kr: "양천구", en: "YANGCHEON" },
    { kr: "구로구", en: "GURO" },
    { kr: "영등포구", en: "YONGDENGPO" },
    { kr: "금천구", en: "GEUMCHEON" },
    { kr: "관악구", en: "GWANAK" },
    { kr: "동작구", en: "DONGJAK" },
    { kr: "서초구", en: "SEOCHO" },
    { kr: "강남구", en: "GANGNAM" },
    { kr: "송파구", en: "SONGPA" },
    { kr: "강동구", en: "GANGDONG" },
    { kr: "은평구", en: "EUNPYEONG" },
    { kr: "서대문구", en: "SEODAEMUN" },
    { kr: "마포구", en: "MAPO" },
    { kr: "종로구", en: "JONGNO" },
    { kr: "중구", en: "JUNG" },
    { kr: "용산구", en: "YONGSAN" },
    { kr: "강북구", en: "GANGBUK" },
    { kr: "성북구", en: "SEONGBUK" },
    { kr: "동대문구", en: "DONGDAEMUN" },
    { kr: "성동구", en: "SEONGDONG" },
    { kr: "도봉구", en: "DOBONG" },
    { kr: "노원구", en: "NOWON" },
    { kr: "중랑구", en: "JUNGNANG" },
    { kr: "광진구", en: "GWANGJIN" },
  ];

  function translateToKorean(englishName: string): string {
    const city = cityData.find((data) => data.en === englishName);
    return city ? city.kr : "알 수 없는 지역";
  }

  const koreanAddress = "서울특별시 " + translateToKorean(address);

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

  type SubwayComponentProps = {
    category: string;
    content: string;
    subway: string;
    children: any;
  };

  const SubwayComponent: React.FC<SubwayComponentProps> = ({
    category,
    content,
    subway,
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
            {subway && (
              <img
                className="seoulImg"
                src={"../img/" + subway + ".svg"}
                alt="오류"
              ></img>
            )}
            {content}
          </div>
          {children}
        </div>
      </div>
    );
  };

  const ProfileImgContainer: React.FC = () => {
    const handleImageUpload = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          setProfileImg(reader.result as string);

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

              const profileResponse = await axios.post(
                "/v1/profile/profile",
                {
                  target: imageUrl,
                },
                {
                  headers: {
                    "X-AUTH-TOKEN": token,
                  },
                }
              );
            }
          } catch (error) {
            console.error(error);
          }
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
        window.location.reload();
      }
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
    }
  };

  /*이름변경 컴포넌트*/

  const NameRegisterClick = () => {
    setFixNameConponentShow(false);
    NameRegisterOnClick();
    BackGroundBlurCancle();
    document.body.style.overflow = "auto";
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
        window.location.reload();
      }
    } catch (error) {
      console.error("실명등록 실패:", error);
    }
  };

  /*번호변경 컴포넌트*/

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

  interface BirthRegisterData {
    birth: any;
  }

  const BirthRegister = async () => {
    const data: BirthRegisterData = {
      birth: selectedDateStr,
    };
    try {
      const response = await axios.post("/v1/profile/birth", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("생년월일 실패:", error);
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
        setShowPasswordChange(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
    }
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

  const MyDatePicker: React.FC = () => {
    const handleChange = (date: Date | null) => {
      if (date === null) {
        setSelectedDate(null);
        setSelectedDateStr(null);
      } else {
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        setSelectedDateStr(formattedDate);
      }
    };

    const handleDateChangeRaw = (e: React.FocusEvent<HTMLInputElement>) => {
      e.preventDefault();
    };

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const formattedYear = `${year}`;
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
      const formattedDay = day < 10 ? `0${day}` : `${day}`;

      // YYYYMMDD 형태의 문자열로 합칩니다.
      return `${formattedYear}${formattedMonth}${formattedDay}`;
    };

    return (
      <DatePicker
        className="DatePicker"
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy.MM.dd"
        onChangeRaw={handleDateChangeRaw}
        placeholderText="ex) 20240101"
      />
    );
  };

  const SubwayFixClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setSubwayChangeShow(true);
    BackGroundBlur();
  };

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentSelection(event.target.value);
    const newValue = event.target.value;
    setCurrentSelection(newValue);
    setseoulCountry(`${newValue}`);
  };

  const dropdownOptions = [
    { value: "NONE", displayText: "지역을 선택해주세요" },
    { value: "GANGNAM", displayText: "강남구" },
    { value: "GANGDONG", displayText: "강북구" },
    { value: "GANGBUK", displayText: "강동구" },
    { value: "GANGSEO", displayText: "강서구" },
    { value: "GWANAK", displayText: "관악구" },
    { value: "GWANGJIN", displayText: "광진구" },
    { value: "GURO", displayText: "구로구" },
    { value: "GEUMCHEON", displayText: "금천구" },
    { value: "NOWON", displayText: "노원구" },
    { value: "DOBONG", displayText: "도봉구" },
    { value: "DONGDAEMUN", displayText: "동대문구" },
    { value: "DONGJAK", displayText: "동작구" },
    { value: "MAPO", displayText: "마포구" },
    { value: "SEODAEMUN", displayText: "서대문구" },
    { value: "SEOCHO", displayText: "서초구" },
    { value: "SEONGDONG", displayText: "성동구" },
    { value: "SEONGBUK", displayText: "성북구" },
    { value: "SONGPA", displayText: "송파구" },
    { value: "YANGCHEON", displayText: "양천구" },
    { value: "YONGDENGPO", displayText: "영등포구" },
    { value: "YONGSAN", displayText: "용산구" },
    { value: "EUNPYEONG", displayText: "은평구" },
    { value: "JONGNO", displayText: "종로구" },
    { value: "JUNG", displayText: "종구" },
    { value: "JUNGNANG", displayText: "종랑구" },
  ];

  const AddressRegisterClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    setAddressChangeShow(true);
    BackGroundBlur();
  };

  const AddressCancleClick = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    setAddressChangeShow(false);
    BackGroundBlurCancle();
  };

  interface AddressData {
    seoulCountry: string;
  }

  const AddressRegisterOnClick = async () => {
    const data: AddressData = {
      seoulCountry: seoulCountry,
    };
    try {
      const response = await axios.post("/v1/profile/address", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        setAddressChangeShow(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("거주지 변경 실패:", error);
    }
  };

  //계좌번호 미등록 색상

  return (
    <div className="MyPageFrame">
      <SeoulHeader></SeoulHeader>
      <HeaderTwo></HeaderTwo>
      <div className={`MyPageInner ${blur ? "blur" : ""}`}>
        <div className="TextMyInfo">프로필 관리</div>
        <div className="MyInfoFrame">
          <div className="MyInfoContainerFrame">
            <div className="MyInfoSecondContainer">
              <ProfileImgContainer></ProfileImgContainer>
              <ChangeComponent
                category="닉네임"
                content={nickName}
                setContent={setNickName}
              >
                <div className="ChangeComponentFixButton" onClick={NickNameFix}>
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
            category="생년월일"
            content={birth}
            setContent={setbirth}
          >
            <div className="ChangeComponentFixButton" onClick={PhoneNumFix}>
              수정
            </div>
          </ChangeComponent>
          <SubwayComponent
            category="근처 지하철 역"
            content={nearSubway}
            subway={subwayLine}
          >
            <div className="ChangeComponentFixButton" onClick={SubwayFixClick}>
              수정
            </div>
          </SubwayComponent>
          <div className="MyInfoContainer">
            <div className="MyInfoInnerContainer">
              <div className="MyInfoCategory">사용 가능 언어 (1순위)</div>
              <div className="MyInfoCategoryContent">{firstLang}</div>
            </div>
          </div>
          <div className="MyInfoContainer">
            <div className="MyInfoInnerContainer">
              <div className="MyInfoCategory">거주지</div>
              <div className="MyInfoCategoryContent">
                <img
                  className="seoulImg"
                  src="../img/seoul_logo.svg"
                  alt="오류"
                ></img>
                {koreanAddress}
              </div>
              <button
                className="MyInfoFixButton"
                onClick={AddressRegisterClick}
              >
                변경
              </button>
            </div>
          </div>
          <div className="MyInfoContainer">
            <div className="MyInfoInnerContainer">
              <div className="MyInfoCategory">사용 가능 언어 (2순위)</div>
              <div className="MyInfoCategoryContent">{secondLang}</div>
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
            <div className="FixConponentTitle">생년월일 등록 및 수정</div>
            <div className="FixConponentInputFrame">
              <div className="FixConponentInputInner">
                <div className="FixConponentInputTitle">생년월일 선택</div>
              </div>
              <div className="FixConponentInputSecondInner">
                <div className="FixBirthContainer">
                  <MyDatePicker></MyDatePicker>
                </div>
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
                onClick={BirthRegister}
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
                {`${IntroductionTarget.length}자 / 3000자`}
              </div>
            </div>
            <textarea
              className={`IntroductionChangeTextArea ${
                IntroductionTarget.length > 3000 ? "overLimit" : ""
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
      {SubwayChangeShow && <DropDownComponent></DropDownComponent>}
      {AddressChangeShow && (
        <div className="SubWaySelectFrame">
          <div className="SubWaySelectInner">
            <div className="SubWaySelectTitle">거주지 등록 및 수정</div>
            <div className="SubWaySelectTextBox">
              <div className="TextLineSelect">시, 도 선택</div>
              <div className="TextLineSelect">구 선택</div>
            </div>
            <div className="SubWaySelectDropsetFrame">
              <div className="LocationSoulBox">
                서울특별시
                <img
                  className="SubwayArrow"
                  src="../img/SubwayArrow.svg"
                  alt="오류"
                ></img>
              </div>
              <select
                className="addressOption"
                value={currentSelection}
                onChange={handleSelectionChange}
              >
                {dropdownOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div className="IntroductionChangeButtonBox">
              <div
                className="IntroductionChangeButtonCancle"
                onClick={AddressCancleClick}
              >
                취소
              </div>
              <div
                className="IntroductionChangeButtonRegister"
                onClick={AddressRegisterOnClick}
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
