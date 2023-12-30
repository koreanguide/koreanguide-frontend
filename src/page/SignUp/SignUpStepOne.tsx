import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpStepOne.css";
import "./SignUpStepTwo.css";
import "./SignUpStepThree.css";
import "./SignUpLastStep.css";

function SignUp() {
  const [authKey, setAuthKey] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  interface SignUpData {
    authKey: string;
    country: string;
    email: string;
    nickname: string;
    password: string;
    userRole: string;
  }

  const handleSignUp = async () => {
    const data: SignUpData = {
      authKey: authKey,
      country: country,
      email: email,
      nickname: nickname,
      password: password,
      userRole: userRole,
    };

    try {
      const response = await axios.post("/v1/signup", data);

      if (response.status === 200) {
        sessionStorage.setItem("access-token", response.data.accessToken);
        sessionStorage.setItem("refresh-token", response.data.refreshToken);
        sessionStorage.setItem("email", response.data.email);
        console.log("로그인 성공");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate("/SignUp/Last");
  };

  // ===============================================================================
  // ===============================================================================
  // ===============================================================================
  // ===============================================================================

  function SignUpStepThree() {
    return (
      <div className="SignUpStepThreeFrame">
        <img className="ImgPoint" src="../img/point.svg" alt="오류"></img>
        <div className="SignUpStepThreeTextBoxOne">
          <div className="TextSend">이메일로 인증번호를 발송했어요.</div>
          <div className="TextSendTwo">
            이메일로 발송된 인증번호를 확인하고 아래에 인증번호를 입력한 후,
            시작하기 버튼을 눌러주세요.
          </div>
        </div>
        <div className="SignUpStepThreeButtonBoxOne">
          <div className="TextMissingNum">인증번호가 도착하지 않았나요?</div>
          <div className="SignUpStepThreeButtonBoxTwo">
            <input className="NumInput" placeholder="인증번호 입력"></input>
            <button
              className="SignUpStepThreeStartButton"
              onClick={handleNextStep}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===============================================================================
  // ===============================================================================
  // ===============================================================================
  // ===============================================================================

  const SignUpStepTwo = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState("");
    const [passwordText, setPasswordText] = useState(
      "8자리, 특수문자, 대문자, 숫자 포함"
    );
    const [passwordTextColor, setPasswordTextColor] = useState("darkgray");
    const [showEmailWarning, setShowEmailWarning] = useState(false);
    const [showCityList, setShowCityList] = useState(false);
    const [selectedCity, setSelectedCity] = useState("강동구");
    const [stepTwoDisplay, setStepTwoDisplay] = useState<boolean>(true);
    const [stepThreeDisplay, setStepThreeDisplay] = useState<boolean>(false);

    const isPasswordMatch = () => {
      if (rePassword) {
        return password === rePassword;
      }
    };

    const getPasswordMatchClass = () => {
      return isPasswordMatch() ? "PasswordMatch" : "PasswordMismatch";
    };

    const isValidEmail = () => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const isValidPassword = () => {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
      return re.test(password);
    };

    const handleClick = (e: React.MouseEvent) => {
      if (!isValidEmail() && !isValidPassword()) {
        e.preventDefault();
        setShowEmailWarning(true);
        setPasswordText("비밀번호 형식이 잘못되었습니다.");
        setPasswordTextColor("red");
      } else if (!isValidEmail()) {
        e.preventDefault();
        setShowEmailWarning(true);
        setPasswordText("8자리, 특수문자, 대문자, 숫자 포함");
        setPasswordTextColor("green");
      } else if (!isValidPassword()) {
        e.preventDefault();
        setPasswordText("비밀번호 형식이 잘못되었습니다.");
        setShowEmailWarning(false);
        setPasswordTextColor("red");
      } else if (!isPasswordMatch()) {
        e.preventDefault();
      } else {
        console.log("성공");
        setStepTwoDisplay(false);
        setStepThreeDisplay(true);
      }
    };

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

    interface CityListBoxProps {
      CityName: string;
      CityNameEn: string;
      setSelectedCity: any;
      setShowCityList: (show: boolean) => void;
    }

    const CityListBox: React.FC<CityListBoxProps> = ({
      CityName,
      CityNameEn,
      setSelectedCity,
      setShowCityList,
    }) => {
      return (
        <div
          className="CityListBox"
          onClick={() => {
            setSelectedCity(CityName);
            setShowCityList(false);
            console.log(`선택된 도시: ${CityNameEn}`);
          }}
        >
          <div className="ListBoxCityName">{CityName}</div>
        </div>
      );
    };

    return (
      <div>
        {stepTwoDisplay && (
          <div>
            <div className="STTextOne">기본 정보를 알려주세요.</div>
            <div className="STTextTwo">
              변경하기 어려운 정보이니, 신중히 입력해주세요.
            </div>
            <div className="InputFrame">
              <div className="EmailInputFrame">
                <div className="EmailAdressText">이메일 주소</div>
                <input
                  type="email"
                  className="SignUpEmail"
                  placeholder="abc@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <div
                  className="EmailWarning"
                  style={{ display: showEmailWarning ? "block" : "none" }}
                >
                  이메일 형식이 잘못되었습니다.
                </div>
              </div>
              <div className="PasswordFrame">
                <div className="SignUpPasswordFrame">
                  <div className="EmailAdressText">비밀번호</div>
                  <input
                    type="password"
                    className="SignUpPassword"
                    placeholder="password123!@#"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <div
                    className="PasswordGuide"
                    style={{ color: passwordTextColor }}
                  >
                    {passwordText}
                  </div>
                </div>
                <div className="SignUpRepasswordFrame">
                  <div className="EmailAdressText">비밀번호 재입력</div>
                  <input
                    type="password"
                    className="SignUpPassword"
                    placeholder="password123!@#"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                  ></input>
                  <div
                    className={`PasswordCheckText ${getPasswordMatchClass()}`}
                  >
                    {isPasswordMatch() ? "일치합니다." : "일치하지 않습니다."}
                  </div>
                </div>
              </div>
              <div className="SelectLocationFrame">
                <div className="SelectLocationFrameText">
                  선호 활동 지역 선택
                </div>
                <div className="listFrame">
                  <div className="SoulSelectFrame">
                    <div className="SoulSelectFrameText">서울특별시</div>
                  </div>
                  <div className="CitySelectFrame">
                    <div className="CitySelectFrameTwo">
                      <div className="CityText">{selectedCity}</div>
                      <button
                        className="CitySelectButton"
                        onClick={() => setShowCityList(!showCityList)}
                      >
                        <img src="../img/ListButton.svg" alt="오류"></img>
                      </button>
                    </div>
                  </div>
                  <div
                    className="CitySelectListFrame"
                    style={{ display: showCityList ? "block" : "none" }}
                  >
                    {cityData.map((city) => (
                      <CityListBox
                        key={city.en}
                        CityName={city.kr}
                        CityNameEn={city.en}
                        setSelectedCity={setSelectedCity}
                        setShowCityList={setShowCityList}
                      ></CityListBox>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button className="StepThreeButton" onClick={handleClick}>
              다음 단계로 이동하기
            </button>
          </div>
        )}
        {stepThreeDisplay && <SignUpStepThree />}
      </div>
    );
  };
  // ===============================================================================
  // ===============================================================================
  // ===============================================================================
  // ===============================================================================
  const SignUpStepOne = () => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [handImage, setHandImage] = useState("../img/BlackHand.svg");
    const [jetImage, setJetImage] = useState("../img/BlackJet.svg");
    const [stepOneDisplay, setStepOneDisplay] = useState<boolean>(true);
    const [stepTwoDisplay, setStepTwoDisplay] = useState<boolean>(false);

    const handleButtonClick = (buttonName: string) => {
      setSelectedButton(buttonName);
      if (buttonName === "guide") {
        setUserRole("GUIDE");
        console.log("GUIDE");
        setHandImage("../img/PurpleHand.svg");
        setJetImage("../img/BlackJet.svg");
      } else {
        setUserRole("VISITOR");
        console.log("VISITOR");
        setJetImage("../img/PurpleJet.svg");
        setHandImage("../img/BlackHand.svg");
      }
    };

    const handleNextStep = () => {
      if (selectedButton) {
        setStepOneDisplay(false);
        setStepTwoDisplay(true);
      } else {
        setShowMessage(true);
      }
    };

    return (
      <div className="WhiteBoxInner">
        {stepOneDisplay && (
          <div>
            <div className="TextOne">어떤 사용자로 가입하시겠어요?</div>
            <div className="TextTwo">한 번 선택하면, 되돌릴 수 없어요.</div>
            <div className="ButtonContainer">
              <button
                className={`SelectGuide ${
                  selectedButton === "guide" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("guide")}
                onMouseOver={() => {
                  if (selectedButton !== "guide") {
                    setHandImage("../img/PurpleHand.svg");
                  }
                }}
                onMouseOut={() => {
                  if (selectedButton !== "guide") {
                    setHandImage("../img/BlackHand.svg");
                  }
                }}
              >
                <img src={handImage} alt="오류" className="HandImg" />
                <div className="SelectGuideTextOne">가이드</div>
              </button>
              <button
                className={`SelectTourist ${
                  selectedButton === "tourist" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("tourist")}
                onMouseOver={() => {
                  if (selectedButton !== "tourist") {
                    setJetImage("../img/PurpleJet.svg");
                  }
                }}
                onMouseOut={() => {
                  if (selectedButton !== "tourist") {
                    setJetImage("../img/BlackJet.svg");
                  }
                }}
              >
                <img src={jetImage} alt="" className="JetImg"></img>
                <div className="SelectGuideTextTwo">관광객</div>
              </button>
              <div className="NextStepButtonLink">
                <button className="NextStepButton" onClick={handleNextStep}>
                  다음 단계로 이동하기
                </button>
                {showMessage && (
                  <div className="NotionText">
                    가이드 또는 관광객 중 하나를 선택해주세요.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {stepTwoDisplay && <SignUpStepTwo />}
      </div>
    );
  };

  // ===============================================================================
  // ===============================================================================
  // ===============================================================================
  // ===============================================================================

  interface CustomProps {
    children: ReactNode;
  }

  const SignUpMainFrameContainer: React.FC<CustomProps> = ({ children }) => {
    return (
      <div className="SignUpStepOnePage">
        <div className="SignUpFrame">
          <div className="PurpleBox">
            <div className="LogoText">KOREAN GUIDE</div>
            <img className="LogoImg" src="../img/Logo1.png" alt="오류"></img>
          </div>
          <div className="WhiteBox">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <SignUpMainFrameContainer>
        <SignUpStepOne></SignUpStepOne>
      </SignUpMainFrameContainer>
    </div>
  );
}
export default SignUp;
