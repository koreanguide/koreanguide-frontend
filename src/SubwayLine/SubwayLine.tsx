// DropDownComponent.tsx
import React, { useState } from "react";
import "./SubwayLine.css";
import axios from "axios";

const DropDownComponent: React.FC = () => {
  const token = sessionStorage.getItem("access-token");

  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [station, setstation] = useState("");
  const [subwayLine, setsubwayLine] = useState("");

  interface SubwayRegisterData {
    station: string;
    subwayLine: string;
  }

  const SubwayRegisterOnClick = async () => {
    const data: SubwayRegisterData = {
      station: station,
      subwayLine: subwayLine,
    };
    try {
      const response = await axios.post("/v1/profile/subway", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("지하철 등록 실패:", error);
    }
  };

  const SubwayRegisterCancleOnClick = () => {
    window.location.reload();
    document.body.style.overflow = "auto";
  };

  const firstOptions = [
    { label: "호선을 선택해주세요", value: "" },
    { label: "1호선", value: "LINE_1" },
    { label: "2호선", value: "LINE_2" },
    { label: "3호선", value: "LINE_3" },
    { label: "4호선", value: "LINE_4" },
    { label: "5호선", value: "LINE_5" },
    { label: "6호선", value: "LINE_6" },
    { label: "7호선", value: "LINE_7" },
    { label: "8호선", value: "LINE_8" },
    { label: "9호선", value: "LINE_9" },
  ];
  let secondOptions: string[] = [];

  if (firstOption === "LINE_1") {
    secondOptions = [
      "역을 선택해주세요",
      "연천",
      "전곡",
      "청산",
      "소요산",
      "동두천",
      "보산",
      "동두천중앙",
      "지행",
      "덕정",
      "회천중앙",
      "덕계",
      "양주",
      "녹양",
      "가능",
      "의정부",
      "회룡",
      "망월사",
      "도봉산",
      "도봉",
      "방학",
      "창동",
      "녹천",
      "월계",
      "광운대",
      "석계",
      "신이문",
      "외대앞",
      "회기",
      "청량리",
      "제기동",
      "신설동",
      "동묘앞",
      "동대문",
      "종로5가",
      "종로3가",
      "종각",
      "시청",
      "서울역",
      "남영",
      "용산",
      "노량진",
      "대방",
      "신길",
      "영등포",
      "신도림",
      "구로",
      "구일",
      "개봉",
      "오류동",
      "온수",
      "역곡",
      "소사",
      "부천",
      "중동",
      "송내",
      "부개",
      "부평",
      "백운",
      "동암",
      "간석",
      "주안",
      "도화",
      "제물포",
      "도원",
      "동인천",
      "인천",
      "가산디지털단지",
      "독산",
      "금천구청",
      "석수",
      "관악",
      "안양",
      "명학",
      "금정",
      "군포",
      "당정",
      "의왕",
      "성균관대",
      "화서",
      "수원",
      "세류",
      "병점",
      "세마",
      "오산대",
      "오산",
      "진위",
      "송탄",
      "서정리",
      "평택지제",
      "평택",
      "성환",
      "직산",
      "부성",
      "두정",
      "천안",
      "봉명",
      "쌍용",
      "아산",
      "탕정",
      "배방",
      "풍기",
      "온양온천",
      "신창",
    ];
  } else if (firstOption === "LINE_2") {
    secondOptions = [
      "역을 선택해주세요",
      "시청",
      "을지로입구",
      "을지로3가",
      "을지로4가",
      "동대문역사문화공원",
      "신당",
      "상왕십리",
      "왕십리",
      "한양대",
      "뚝섬",
      "성수",
      "건대입구",
      "구의",
      "강변",
      "잠실나루",
      "잠실",
      "잠실새내",
      "종합운동장",
      "삼성",
      "선릉",
      "역삼",
      "강남",
      "교대",
      "서초",
      "방배",
      "사당",
      "낙성대",
      "서울대입구",
      "봉천",
      "신림",
      "신대방",
      "구로디지털단지",
      "대림",
      "신도림",
      "도림천",
      "양천구청",
      "신정네거리",
      "용답",
      "신답",
      "도선동",
      "용두",
      "신설동",
    ];
  } else if (firstOption === "LINE_3") {
    secondOptions = [
      "역을 선택해주세요",
      "녹번",
      "홍제",
      "무악재",
      "독립문",
      "경복궁",
      "안국",
      "종로3가",
      "을지로3가",
      "충무로",
      "동대입구",
      "약수",
      "금호",
      "옥수",
      "압구정",
      "신사",
      "잠원",
      "고속터미널",
      "교대",
      "남부터미널",
      "양재",
      "매봉",
      "도곡",
      "대치",
      "학여울",
      "대청",
      "일원",
      "수서",
      "가락시장",
      "경찰병원",
      "오금",
    ];
  } else if (firstOption === "LINE_4") {
    secondOptions = [
      "역을 선택해주세요",
      "당고개",
      "상계",
      "노원",
      "창동",
      "쌍문",
      "수유",
      "미아",
      "미아사거리",
      "길음",
      "성신여대입구",
      "한성대입구",
      "혜화",
      "동대문",
      "동대문역사문화공원",
      "충무로",
      "명동",
      "회현",
      "서울역",
      "숙대입구",
      "삼각지",
      "신용산",
      "이촌",
      "동작",
      "총신대입구",
      "사당",
      "남태령",
      "선바위",
      "경마공원",
      "대공원",
      "과천",
      "정부과천청사",
      "인덕원",
      "평촌",
      "범계",
      "금정",
      "산본",
      "수리산",
      "대야미",
      "반월",
      "상록수",
      "한대앞",
      "중앙",
      "고잔",
      "초지",
      "안산",
      "신길온천",
      "정왕",
      "오이도",
    ];
  } else if (firstOption === "LINE_5") {
    secondOptions = [
      "역을 선택해주세요",
      "방화",
      "개화산",
      "김포공항",
      "송정",
      "마곡",
      "발산",
      "우장산",
      "화곡",
      "까치산",
      "신정",
      "목동",
      "오목교",
      "양평",
      "영등포구청",
      "영등포시장",
      "신길",
      "여의도",
      "여의나루",
      "마포",
      "공덕",
      "애오개",
      "충정로",
      "서대문",
      "광화문",
      "종로3가",
      "을지로4가",
      "동대문역사문화공원",
      "청구",
      "신금호",
      "행당",
      "왕십리",
      "마장",
      "답십리",
      "장한평",
      "군자",
      "아차산",
      "광나루",
      "천호",
      "강동",
      "길동",
      "굽은다리",
      "명일",
      "고덕",
      "상일동",
    ];
  } else if (firstOption === "LINE_6") {
    secondOptions = [
      "역을 선택해주세요",
      "응암",
      "역촌",
      "불광",
      "독바위",
      "연신내",
      "구산",
      "증산",
      "디지털미디어시티",
      "월드컵경기장",
      "마포구청",
      "망원",
      "합정",
      "상수",
      "광흥창",
      "대흥",
      "공덕",
      "효창공원앞",
      "삼각지",
      "녹사평",
      "이태원",
      "한강진",
      "버티고개",
      "약수",
      "청구",
      "신당",
      "동묘앞",
      "창신",
      "보문",
      "안암",
      "고려대",
      "월곡",
      "상월곡",
      "돌곶이",
      "석계",
      "태릉입구",
      "화랑대",
      "봉화산",
    ];
  } else if (firstOption === "LINE_7") {
    secondOptions = [
      "역을 선택해주세요",
      "장암",
      "도봉산",
      "수락산",
      "마들",
      "노원",
      "중계",
      "하계",
      "공릉",
      "태릉입구",
      "먹골",
      "중화",
      "상봉",
      "면목",
      "사가정",
      "용마산",
      "중곡",
      "군자",
      "어린이대공원",
      "건대입구",
      "뚝섬유원지",
      "청담",
      "강남구청",
      "학동",
      "논현",
      "반포",
      "고속터미널",
      "내방",
      "이수",
      "남성",
      "숭실대입구",
      "상도",
      "장승배기",
      "신대방삼거리",
      "보라매",
      "신풍",
      "대림",
      "남구로",
      "가산디지털단지",
      "철산",
      "명사거리",
      "천왕",
      "온수",
      "까치울",
      "부천종합운동장",
      "춘의",
      "신중동",
      "부천시청",
      "상동",
      "삼산체육관",
      "굴포천",
      "부평구청",
    ];
  } else if (firstOption === "LINE_8") {
    secondOptions = [
      "역을 선택해주세요",
      "암사",
      "천호",
      "강동구청",
      "몽촌토성",
      "잠실",
      "석촌",
      "송파",
      "가락시장",
      "문정",
      "장지",
      "복정",
      "산성",
      "남한산성입구",
      "단대오거리",
      "신흥",
      "수진",
      "모란",
    ];
  } else if (firstOption === "LINE_9") {
    secondOptions = [
      "역을 선택해주세요",
      "개화",
      "김포공항",
      "공항시장",
      "신방화",
      "마곡나루",
      "양천향교",
      "가양",
      "증미",
      "등촌",
      "염창",
      "신목동",
      "선유도",
      "당산",
      "국회의사당",
      "여의도",
      "샛강",
      "노량진",
      "노들",
      "흑석",
      "동작",
      "구반포",
      "신반포",
      "고속터미널",
      "사평",
      "신논현",
      "언주",
      "선정릉",
      "삼성중앙",
      "봉은사",
      "종합운동장",
      "삼전",
      "석촌고분",
      "석촌",
      "송파나루",
      "한성백제",
      "올림픽공원",
      "둔촌오륜",
      "중앙보훈병원",
    ];
  } else {
    secondOptions = ["역을 선택해주세요"];
  }

  return (
    <div className="SubWaySelectFrame">
      <div className="SubWaySelectInner">
        <div className="SubWaySelectTitle">근처 지하철 역 등록 및 수정</div>
        <div className="SubWaySelectTextBox">
          <div className="TextLineSelect">호선 선택</div>
          <div className="TextLineSelect">지하철 역 선택</div>
        </div>
        <div className="SubWaySelectDropsetFrame">
          <div>
            <select
              className="dropdown-first"
              value={firstOption}
              onChange={(e) => {
                setFirstOption(e.target.value);
                setsubwayLine(e.target.value);
              }}
            >
              {firstOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              className="dropdown-second"
              value={secondOption}
              onChange={(e) => {
                setSecondOption(e.target.value);
                setstation(e.target.value);
              }}
            >
              {secondOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="IntroductionChangeButtonBox">
          <div
            className="IntroductionChangeButtonCancle"
            onClick={SubwayRegisterCancleOnClick}
          >
            취소
          </div>
          <div
            className="IntroductionChangeButtonRegister"
            onClick={SubwayRegisterOnClick}
          >
            등록
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownComponent;
