import React from "react";
import HeaderTwo from "../../HeaderTwo";
import SeoulHeader from "../../SeoulHeader";
import "./SeoulMain.css";
import { useNavigate } from "react-router-dom";

function SeoulMain() {
  interface SeoulMainStepProps {
    src: string;
    step: string;
    title: string;
    content: string;
  }
  const SeoulMainStep: React.FC<SeoulMainStepProps> = ({
    src,
    step,
    title,
    content,
  }) => {
    return (
      <div className="SeoulMainStepFrame">
        <div className="SeoulMainStepBoxOne">
          <img src={src} alt="none" className="SeoulReview"></img>
        </div>
        <div className="SeoulMainStepBoxTwo">
          <div className="SeoulMainStepBoxTwoInner">
            <div className="SeoulMainStepTextStep">{step}</div>
            <div className="SeoulMainStepTitleText">{title}</div>
            <div className="SeoulMainStepContentText">{content}</div>
          </div>
        </div>
      </div>
    );
  };
  const navigate = useNavigate();

  const goToSeoulOpenData = () => {
    navigate("https://data.seoul.go.kr/");
  };

  const goToPublicData = () => {
    navigate("https://www.data.go.kr/");
  };

  const gotoAITrackCreate = () => {
    navigate("/portal/seoul/location");
    window.scrollTo(0, 0);
  };

  return (
    <div className="SeoulMainPageFrame">
      <div className="SeoulMainHeaderBox">
        <SeoulHeader></SeoulHeader>
        <HeaderTwo></HeaderTwo>
      </div>
      <div className="SeoulMainInner">
        <div className="SeoulMainBoxOne">
          <div className="SeoulMainTextBox">
            <div className="SeoulMainTextOne">
              수도 서울 컨텐츠를 선택해 트랙 자동 생성
            </div>
            <div className="SeoulMainTextTwo">
              트랙 자동 생성, 어떻게 이루어 질까요?
            </div>
          </div>
          <div className="StartNowButton" onClick={gotoAITrackCreate}>
            지금 시작하기
          </div>
        </div>
        <div className="SeoulMainBoxThree">
          <div>힘든 정보 탐색, 번거러운 트랙 본문 작성,</div>
          <div>3단계로 간단하게 해결해요!</div>
        </div>
        <div className="SeoulMainStepContainer">
          <SeoulMainStep
            src="/img/SeoulReview.svg"
            step="1 단계"
            title="수도 서울 컨텐츠 둘러보기"
            content="원하는 자치구를 선택하고, 자치구에 해당하는 수도 서울 컨텐츠를 둘러보세요!"
          />
          <SeoulMainStep
            src="/img/SeoulBasket.svg"
            step="2 단계"
            title="컨텐츠 장바구니 담기"
            content="원하는 수도 서울의 컨텐츠를 장바구니에 마음껏 담아주세
            요! 최대 3개까지 고를 수 있어요."
          />
          <SeoulMainStep
            src="/img/SeoulReview.svg"
            step="3 단계"
            title="트랙 생성하기"
            content="간단한 설정을 마치고, 트랙 생성하기 버튼을 누르면
            자동으로 트랙이 완성돼요! 간단한 수정 후 등록하면 끝!"
          />
        </div>
        <div className="SeoulMainLine"></div>
        <div className="SeoulMainBoxFour">
          <div>수도 서울 컨텐츠를 이용한 자동 트랙 생성,</div>
          <div>정확하고 공식적인 서울의 정보만을 활용해요.</div>
        </div>
        <div className="SeoulMainBoxFive">
          <div className="SeoulMainNavBox">
            <div className="SeoulMainNavInnerBox">
              <div className="SeoulMainNavBoxOne">
                <div className="SeoulMainNavTextOne">서울 열린데이터 광장</div>
                <div className="SeoulMainNavButton" onClick={goToSeoulOpenData}>
                  <div className="SeoulMainNavButtonText">
                    홈페이지 바로가기
                  </div>
                  <img
                    src="/img/SeoulNavButton.svg"
                    alt="none"
                    className="SeoulReview"
                  ></img>
                </div>
              </div>
              <div className="SeoulMainNavBoxTwo">
                사용자에게 ‘서울 열린데이터 광장'에서 제공하는 정확한 데이터를
                제공해요. 이로써 부정확한 데이터로 곤란한 일이 발생하거나,
                계획에 차질이 생기는 상 황을 최소화할 수 있어 외국인 관광객의
                신뢰도를 높일 수 있어요.
              </div>
            </div>
          </div>
          <div className="SeoulMainNavBox">
            <div className="SeoulMainNavInnerBox">
              <div className="SeoulMainNavBoxOne">
                <div className="SeoulMainNavTextOne">공공데이터포털</div>
                <div className="SeoulMainNavButton" onClick={goToPublicData}>
                  <div className="SeoulMainNavButtonText">
                    홈페이지 바로가기
                  </div>
                  <img
                    src="/img/SeoulNavButton.svg"
                    alt="none"
                    className="SeoulReview"
                  ></img>
                </div>
              </div>
              <div className="SeoulMainNavBoxTwo">
                공공데이터포털은 공공기관이 생성 또는 취득하여 관리하고 있는
                공공데이터 를 한 곳에서 제공하는 통합 창구에요. 신뢰도 높은
                정보를 활용해 양질의 트랙 컨텐츠를 관광객에게 제공하세요.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulMain;
