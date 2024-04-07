import React, { useState } from "react";
import HeaderTwo from "../../HeaderTwo";
import SeoulHeader from "../../SeoulHeader";
import "./SeoulLocation.css";
import { useNavigate } from "react-router-dom";

interface SeoulLocationSelectButtonProps {
  districtName: string;
  onSelect: () => void;
  isSelected: boolean;
}

const SeoulLocationSelectButton: React.FC<SeoulLocationSelectButtonProps> = ({
  districtName,
  onSelect,
  isSelected,
}) => (
  <div
    className="SeoulLocationSelectButtonFrame"
    onClick={onSelect}
    style={{ backgroundColor: isSelected ? "#ececec" : "transparent" }}
  >
    <div className="SeoulLocationSelectButtonText">{districtName}</div>
  </div>
);

function SeoulLocationPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("강서구");
  const districts = [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  const handleSelectDistrict = (districtName: string) => {
    setSelectedDistrict(districtName);
  };

  const navigate = useNavigate();

  const goToSeoulMain = () => {
    navigate("/portal/seoul/main");
    window.scrollTo(0, 0);
  };

  const goToSeoulCategory = () => {
    navigate("/portal/seoul/select", { state: { selectedDistrict } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="TrackViewPageFrame">
      <div className="SeoulMainHeaderBox">
        <SeoulHeader />
        <HeaderTwo />
      </div>
      <div className="SeoulLocationPageInner">
        <div className="SeoulLocationTextOne">
          수도 서울 컨텐츠를 선택해 트랙 자동 생성
        </div>
        <div className="SeoulLocationTextTwo">자치구를 선택해 주세요</div>
        <div className="SeoulLocationBoxOne">
          <div className="SeoulLocationBoxOneInner">
            <div className="SeoulLocationBoxTwo">
              <img
                src="/img/SeoulAirplane.svg"
                alt="none"
                className="SeoulAirplane"
              />
              <div className="SeoulLocationBoxOneText">
                등록된 활동 지역으로 빠르게 시작하기
              </div>
            </div>
            <div className="SeoulLocationBoxOneSelected">
              {selectedDistrict}
            </div>{" "}
          </div>
        </div>
        <div className="SeoulLocationBoxThree">
          {districts.map((district) => (
            <SeoulLocationSelectButton
              key={district}
              districtName={district}
              onSelect={() => handleSelectDistrict(district)}
              isSelected={selectedDistrict === district}
            />
          ))}
        </div>
        <div className="BackToIntorButtonContainer">
          <div className="BackToIntorButtonFrame" onClick={goToSeoulMain}>
            <div className="BackToIntorButtonCircle">
              <img
                src="/img/SeoulBackIcon.svg"
                alt="none"
                className="SeoulBackIcon"
              />
            </div>
            <div className="SeoulBackText">소개 페이지</div>
          </div>

          <div className="SeoulNextStepButtonFrame" onClick={goToSeoulCategory}>
            <div className="SeoulNextStepButtonCircle">
              <img
                src="/img/SeoulBackIcon.svg"
                alt="none"
                className="SeoulNextIcon"
              />
            </div>
            <div className="SeoulNextStepButtonText">다음 단계</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulLocationPage;
