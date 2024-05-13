import React, { useEffect, useState } from "react";
import "./PlanPage.css";
import HeaderTwo from "../../HeaderTwo";
import axios from "axios";
import SeoulHeader from "../../SeoulHeader";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

function PlanPage() {
  const token = sessionStorage.getItem("access-token");

  const [appointmentId, setappointmentId] = useState("");
  const [cancel, setcancel] = useState("");
  const [chatRoomId, setchatRoomId] = useState("");
  const [createAt, setcreateAt] = useState("");
  const [credit, setcredit] = useState("");
  const [depositPercent, setdepositPercent] = useState("");
  const [done, setdone] = useState("");
  const [endDate, setendDate] = useState("");
  const [endTime, setendTime] = useState("");
  const [fullAddress, setfullAddress] = useState("");
  const [kakaoMapUrl, setkakaoMapUrl] = useState("");
  const [startDate, setstartDate] = useState("");
  const [startTime, setstartTime] = useState("");
  const [status, setstatus] = useState("");
  const [targetNickname, settargetNickname] = useState("");
  const [targetProfileUrl, settargetProfileUrl] = useState("");
  const [targetUserEmail, settargetUserEmail] = useState("");
  const [totalCredit, settotalCredit] = useState("");
  const [trackId, settrackId] = useState("");
  const [trackName, settrackName] = useState("");
  const [uuid, setuuid] = useState("");
  const [length, setlength] = useState("");

  const [selectedItem, setSelectedItem] = useState<string>("모든 일정");
  const [isHovered, setIsHovered] = useState(false);

  const [selectedItemTwo, setSelectedItemTwo] = useState<string>("모든 일정");

  useEffect(() => {
    const MyTrackInquiry = async () => {
      try {
        const response = await axios.get("/v1/appointment/", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        setappointmentId(response.data[0].appointmentId);
        setcancel(response.data[0].cancel);
        setchatRoomId(response.data[0].chatRoomId);
        setcreateAt(response.data[0].createAt);
        setcredit(response.data[0].credit);
        setdepositPercent(response.data[0].depositPercent);
        setdone(response.data[0].done);
        setendDate(response.data[0].endDate);
        setendTime(response.data[0].endTime);
        setfullAddress(response.data[0].fullAddress);
        setkakaoMapUrl(response.data[0].kakaoMapUrl);
        setstartDate(response.data[0].startDate);
        setstartTime(response.data[0].startTime);
        setstatus(response.data[0].status);
        settargetNickname(response.data[0].targetNickname);
        settargetProfileUrl(response.data[0].targetProfileUrl);
        settargetUserEmail(response.data[0].targetUserEmail);
        settotalCredit(response.data[0].totalCredit);
        settrackId(response.data[0].trackId);
        settrackName(response.data[0].trackName);
        setuuid(response.data[0].uuid);
        setlength(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    MyTrackInquiry();
  }, [token]);

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    setSelectedItemTwo(itemName);
  };

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/portal");
    window.scrollTo(0, 0);
  };

  const ScheduleComponent = () => {
    interface ContractBoxProps {
      ContractBoxId: string;
      ContractBoxTitle: string;
    }

    const ContractBox: React.FC<ContractBoxProps> = ({
      ContractBoxId,
      ContractBoxTitle,
    }) => {
      return (
        <div className="ContractBoxFrame">
          <div className="ContractBoxTitleText">{ContractBoxTitle}</div>
          <div className="ContractBoxContentText">{ContractBoxId}</div>
        </div>
      );
    };

    return (
      <div className="ScheduleComponentFrame">
        <div className="ScheduleComponentInner">
          {/* 첫번째 박스 Start*/}

          <div className="ScheduleComponentBoxOne">
            <ContractBox
              ContractBoxTitle="약속 Id"
              ContractBoxId={uuid}
            ></ContractBox>
            <ContractBox
              ContractBoxTitle="약속일자: 시작"
              ContractBoxId={startDate}
            ></ContractBox>
            <ContractBox
              ContractBoxTitle="약속일자: 종료"
              ContractBoxId={endDate}
            ></ContractBox>
            <div className="ContractBoxTimeFrame">
              <ContractBox
                ContractBoxTitle="시작일 약속 시간"
                ContractBoxId={startTime}
              ></ContractBox>
              <ContractBox
                ContractBoxTitle="종료일 시간"
                ContractBoxId={endTime}
              ></ContractBox>
            </div>
            <ContractBox
              ContractBoxTitle="시간 기준"
              ContractBoxId="대한민국, 서울"
            ></ContractBox>
          </div>
          {/* 첫번째 박스 End*/}
          {/* Line Start*/}
          <div className="ScheduleComponentLine"></div>
          {/* Line End*/}
          {/* 두번째 박스 Start*/}
          <div className="ScheduleComponentBoxTwo">
            <div className="ContractBoxFrame">
              <div className="ContractBoxTitleText">대상</div>
              <div className="ContractBoxUserInfoBox">
                <img
                  className="PlanTestImg"
                  src={targetProfileUrl}
                  alt="오류"
                ></img>
                <div className="ContractBoxContentText">{targetNickname}</div>
              </div>
            </div>
            <div className="ContractBoxFrame">
              <div className="ContractBoxTitleText">약속된 트랙</div>
              <div className="ContractBoxUserInfoBox">
                <img
                  className="PlanContectImg"
                  src="/img/PlanContectImg.svg"
                  alt="오류"
                ></img>
                <div className="ContractBoxContentText">{trackName}</div>
              </div>
            </div>
            <div className="ContractBoxCreditInfo">
              <ContractBox
                ContractBoxTitle="거래 크레딧"
                ContractBoxId={`${credit} 크레딧`}
              ></ContractBox>
              <ContractBox
                ContractBoxTitle="안전 거래 예치금 비율"
                ContractBoxId={`${depositPercent} %`}
              ></ContractBox>
            </div>
            <div className="ContractBoxFrameTwo">
              <div className="ContractBoxTitleText">만남의 장소</div>
              <div
                className="ContractBoxUserInfoBox"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
              >
                <img
                  className="PlanContectImg"
                  src="/img/PlanContectImg.svg"
                  alt="오류"
                />
                <div className="ContractBoxContentText">{fullAddress}</div>
              </div>
              {isHovered && (
                <div className="FullAddressImgFrame">
                  <img
                    className="FullAddressImg"
                    src="/img/FullAddressImg.svg"
                    alt="오류"
                  />
                  <div className="FullAddressImgText">{fullAddress}</div>
                </div>
              )}
            </div>
            <div className="ScheduleComponentBoxTwoButtonBox">
              <div className="ScheduleEditButton">약속 수정</div>
              <div className="ScheduleCancleButton">약속 삭제</div>
            </div>
          </div>
          {/* 두번째 박스 End*/}
          {/* 세번째 박스 Start*/}
          <div className="ScheduleComponentBoxThree">
            <ContractBox
              ContractBoxTitle="이메일 주소"
              ContractBoxId={targetUserEmail}
            ></ContractBox>
            <ContractBox
              ContractBoxTitle="진행상태"
              ContractBoxId={status}
            ></ContractBox>
            <ContractBox
              ContractBoxTitle="총 거래 크레딧"
              ContractBoxId={totalCredit}
            ></ContractBox>
            <ContractBox
              ContractBoxTitle="약속 생성일"
              ContractBoxId={createAt}
            ></ContractBox>
            <div className="ScheduleComponentBoxTwoButtonBox">
              <div className="ScheduleEditButton">비행기 티켓 확인</div>
              <div className="GoToChatButton">채팅 바로가기</div>
            </div>
          </div>
          {/* 세번째 박스 End*/}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="MyTrackPage">
        <SeoulHeader></SeoulHeader>
        <HeaderTwo></HeaderTwo>
        <div className="MyTrackFrame">
          <div className="TextMyTrackBox">
            <div className="TextMyTrack">일정 관리</div>
            <div className="PlanBar">
              <div
                className={`PlanBarItem ${
                  selectedItem === "모든 일정" ? "selected" : ""
                }`}
                onClick={() => handleItemClick("모든 일정")}
              >
                모든 일정
              </div>
              <div
                className={`PlanBarItem ${
                  selectedItem === "완료 일정" ? "selected" : ""
                }`}
                onClick={() => handleItemClick("완료 일정")}
              >
                완료 일정
              </div>
              <div
                className={`PlanBarItem ${
                  selectedItem === "취소 일정" ? "selected" : ""
                }`}
                onClick={() => handleItemClick("취소 일정")}
              >
                취소 일정
              </div>
            </div>
          </div>
          {/* <div className="AllSchedulesFrame">
            <div className="RecentPlanComponentNum">{selectedItemTwo} (0)</div>
            <div className="SchedulesFrame">
              <ScheduleComponent></ScheduleComponent>
              <div className="NoneSchedulesFrame">
                등록된 일정이 없어요 :(
                <br />전 세계 관람객들과 새로운 일정을 생성하고, 수익도 창출해
                보세요!
                <div
                  className="NoneTrackContainerTextTwoBox"
                  onClick={goToMain}
                >
                  <div className="NoneTrackContainerTextTwo">
                    포털로 돌아가기
                  </div>
                  <img
                    className="NewTrackRegisterImg"
                    src="../img/NewTrackRegisterImg.svg"
                    alt="error"
                  ></img>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default PlanPage;
