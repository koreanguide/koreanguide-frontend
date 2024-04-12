import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderTwo from "../../HeaderTwo";
import SeoulHeader from "../../SeoulHeader";
import "./SeoulCategory.css";
import { useLocation, useNavigate } from "react-router-dom";

function SeoulCategoryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access-token");

  const [SeoulShopBasketNum, setSeoulShopBasketNum] = useState("");

  const { selectedDistrict } = location.state || {};

  const goToSeoulLocation = () => {
    navigate("/portal/seoul/location", { state: { selectedDistrict } });
    window.scrollTo(0, 0);
  };

  const goToSeoulShop = () => {
    navigate("/portal/seoul/shop", { state: { selectedDistrict } });
    window.scrollTo(0, 0);
  };

  const goToSeoulSights = () => {
    navigate("/portal/seoul/sights", { state: { selectedDistrict } });
    window.scrollTo(0, 0);
  };

  const gotoSeoulBasket = () => {
    navigate("/portal/seoul/saved");
    window.scrollTo(0, 0);
  };

  interface SeoulAlgorithmsContainerProps {
    imgUrl: string;
    title: string;
    content: string;
    onClick: () => void;
  }

  useEffect(() => {
    const SeoulShopBasket = async () => {
      try {
        const response = await axios.get("/v1/saved/count", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("장바구니 갯수", response.data);
        setSeoulShopBasketNum(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    SeoulShopBasket();
  }, [SeoulShopBasketNum, token]);

  const SeoulAlgorithmsContainer: React.FC<SeoulAlgorithmsContainerProps> = ({
    imgUrl,
    title,
    content,
    onClick,
  }) => {
    return (
      <div className="SeoulAlgorithmsFrame" onClick={onClick}>
        <div className="SeoulAlgorithmsImg">
          <img src={imgUrl} alt="none" className="AlgoImg1"></img>
        </div>
        <div className="SeoulAlgorithmsTextContainer">
          <div className="SeoulAlgorithmsTextBox">
            <div className="SeoulAlgorithmsBoxTitle">{title}</div>
            <div className="SeoulAlgorithmsBoxContent">{content}</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="TrackViewPageFrame">
      <div className="SeoulMainHeaderBox">
        <SeoulHeader></SeoulHeader>
        <HeaderTwo></HeaderTwo>
      </div>
      <div className="TrackViewPageInner">
        <div className="SeoulMainBoxOne">
          <div className="SeoulMainTextBox">
            <div className="SeoulMainTextOne">
              현재 선택된 서울특별시 자치구: {selectedDistrict}
            </div>
            <div className="SeoulMainTextTwo">
              알아보고 싶은 카테고리를 선택해 주세요
            </div>
          </div>
          <div className="SeoulCategoryBasketBox" onClick={gotoSeoulBasket}>
            <div className="BasketRemoveButton">비우기</div>
            <div className="BasketNumFrame">
              <div className="BasketNumInner">
                <img
                  src="/img/BasketTwo.svg"
                  alt="none"
                  className="BasketTwo"
                ></img>
                <div className="TextBasket">장바구니</div>
                <div className="TextBasketNumFrame">
                  <div className="TextBasketNum">{SeoulShopBasketNum}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="SeoulAlgorithmsContainer">
          <SeoulAlgorithmsContainer
            imgUrl="/img/AlgoImg1.svg"
            title="한강공원"
            content="서울의 대표 한강, 한강 공원에서 아름다운 서울을 즐겨보 시는건 어떨까요? 좋은 추억이 될 거예요."
            onClick={() => goToSeoulShop()}
          />
          <SeoulAlgorithmsContainer
            imgUrl="/img/AlgoImg2.svg"
            title="쇼핑몰"
            content="관광에서 절대 빠질 수 없는 쇼핑! 서울 곳곳 쇼핑몰에 대해 
            추천해 드려요."
            onClick={() => goToSeoulShop()}
          />
          <SeoulAlgorithmsContainer
            imgUrl="/img/AlgoImg3.svg"
            title="따릉이(공공자전거)"
            content="서울시에서 제공하는 공공자전거 따릉이에요. 따릉이를 함
            께타며 서울 이곳저곳을 즐겨보세요! 아, 안전은 필수겠죠?"
            onClick={() => goToSeoulSights()}
          />
          <SeoulAlgorithmsContainer
            imgUrl="/img/AlgoImg4.svg"
            title="자랑스러운 한국 음식점"
            content="한국의 맛을 전 세계에 빛내는 자랑스러운 음식점들을 모았
            어요. 한국의 전통과 현대가 어우러진 독창적인 맛의 향연을
            경험할 수 있어요!"
            onClick={() => console.log("한강공원 선택됨")}
          />
          <SeoulAlgorithmsContainer
            imgUrl="/img/AlgoImg5.svg"
            title="노래방"
            content="한국의 독특한 문화 중 하나인 코인노래방은 남녀노소 누구
            나 부담 없이 즐길 수 있는 엔터테인먼트 공간이에요. 한국
            을 방문한 외국인에게 흥미로운 경험을 선사할거예요!"
            onClick={() => console.log("한강공원 선택됨")}
          />
          <SeoulAlgorithmsContainer
            imgUrl="/img/AlgoImg6.svg"
            title="관광거리"
            content="서울시 공식관광정보 홈페이지에서 주요 관광거리에 대한
            공식 명칭 및 주소 등 정보를 제공 해요. 서울의 이곳저곳 인
            기있는 관광거리를 찾아보세요!"
            onClick={() => goToSeoulSights()}
          />
        </div>
        <div className="BackToIntorButtonContainer" onClick={goToSeoulLocation}>
          <div className="BackToIntorButtonFrame">
            <div className="BackToIntorButtonCircle">
              <img
                src="/img/SeoulBackIcon.svg"
                alt="none"
                className="SeoulBackIcon"
              />
            </div>
            <div className="SeoulBackText">자치구 선택</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulCategoryPage;
