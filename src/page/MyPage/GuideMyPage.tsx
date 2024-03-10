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
  return (
    <div className="GuideMyPageFrame">
      <HeaderTwo></HeaderTwo>
      <div className="GuideMyPageInner">
        <div className="GuideMyPageInnerTextOne">내 정보</div>
        <div className="GuideMyPageInfoContainer">
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne">이메일 주소</div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageInfoText">{email}</div>
              <div className="GuideMyPageInfoBoxButtonOne">수정</div>
            </div>
          </div>
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne">비밀번호</div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageInfoText">{password}</div>
              <div className="GuideMyPageInfoBoxButtonOne">변경</div>
            </div>
          </div>
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne">이름</div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageInfoText">{name}</div>
              <div className="GuideMyPageInfoBoxButtonOne">수정</div>
            </div>
          </div>
          <div className="GuideMyPageInfoBoxline"></div>
          <div className="GuideMyPageInfoBoxOne">
            <div className="GuideMyPageInfoBoxOneTextOne">전화번호</div>
            <div className="GuideMyPageInfoBoxOneInner">
              <div className="GuideMyPageInfoText">{phoneNum}</div>
              <div className="GuideMyPageInfoBoxButtonOne">수정</div>
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
              <div className="EmailFixPopUpCancleButton">취소</div>
              <div className="EmailFixPopUpRegisterButton">등록</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideMyPage;
