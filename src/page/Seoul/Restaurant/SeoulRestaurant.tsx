import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderTwo from "../../../HeaderTwo";
import SeoulHeader from "../../../SeoulHeader";
import "./SeoulRestaurant.css";
import LoadPage from "../../LoadPage/LoadPage";
import { useLocation, useNavigate } from "react-router-dom";

function SeoulRestaurantPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access-token");
  const [loading, setLoading] = useState(true);

  const { selectedDistrict } = location.state || {};

  const goToSeoulCategory = () => {
    navigate("/portal/seoul/select", { state: { selectedDistrict } });
    window.scrollTo(0, 0);
  };

  const gotoSeoulBasket = () => {
    navigate("/portal/seoul/saved");
    window.scrollTo(0, 0);
  };

  const [shops, setShops] = useState<Array<any>>([]);
  const [SeoulShopBasketNum, setSeoulShopBasketNum] = useState("");

  type DistrictKey =
    | "강남구"
    | "강동구"
    | "강북구"
    | "강서구"
    | "관악구"
    | "광진구"
    | "구로구"
    | "금천구"
    | "노원구"
    | "도봉구"
    | "동대문구"
    | "동작구"
    | "마포구"
    | "서대문구"
    | "서초구"
    | "성동구"
    | "성북구"
    | "송파구"
    | "양천구"
    | "영등포구"
    | "용산구"
    | "은평구"
    | "종로구"
    | "중구"
    | "중랑구";
  type DistrictEnglish =
    | "GANGNAM"
    | "GANGDONG"
    | "GANGBUK"
    | "GANGSEO"
    | "GWANAK"
    | "GWANGJIN"
    | "GURO"
    | "GEUMCHEON"
    | "NOWON"
    | "DOBONG"
    | "DONGDAEMUN"
    | "DONGJAK"
    | "MAPO"
    | "SEODAEMUN"
    | "SEOCHO"
    | "SEONGDONG"
    | "SEONGBUK"
    | "SONGPA"
    | "YANGCHEON"
    | "YEONGDEUNGPO"
    | "YONGSAN"
    | "EUNPYEONG"
    | "JONGNO"
    | "JUNG"
    | "JUNGNANG";

  function convertDistrictToEnglish(
    district: DistrictKey
  ): DistrictEnglish | "UNKNOWN" {
    const districtMap: { [key in DistrictKey]: DistrictEnglish } = {
      강남구: "GANGNAM",
      강동구: "GANGDONG",
      강북구: "GANGBUK",
      강서구: "GANGSEO",
      관악구: "GWANAK",
      광진구: "GWANGJIN",
      구로구: "GURO",
      금천구: "GEUMCHEON",
      노원구: "NOWON",
      도봉구: "DOBONG",
      동대문구: "DONGDAEMUN",
      동작구: "DONGJAK",
      마포구: "MAPO",
      서대문구: "SEODAEMUN",
      서초구: "SEOCHO",
      성동구: "SEONGDONG",
      성북구: "SEONGBUK",
      송파구: "SONGPA",
      양천구: "YANGCHEON",
      영등포구: "YEONGDEUNGPO",
      용산구: "YONGSAN",
      은평구: "EUNPYEONG",
      종로구: "JONGNO",
      중구: "JUNG",
      중랑구: "JUNGNANG",
    };

    return districtMap[district] || "UNKNOWN";
  }

  const englishDistrict: DistrictEnglish | "UNKNOWN" =
    convertDistrictToEnglish(selectedDistrict);

  interface SeoulShopListProps {
    cate2Name: string;
    cate3Name: string;
    nameKor: string;
    address: string;
  }

  const ShopListBox = ({ shop }: { shop: SeoulShopListProps }) => {
    const [isHovered, setIsHovered] = useState(false);

    interface SeoulItemData {
      address: string;
      category: string;
      value: string;
    }

    const SeoulItemSaveButton = async () => {
      let SeoulSaveItemValue = shop.nameKor.toString();
      let setSeoulSaveItemAddress = shop.address.toString();

      const data: SeoulItemData = {
        address: SeoulSaveItemValue,
        value: setSeoulSaveItemAddress,
        category: "음식점",
      };
      try {
        const response = await axios.post("/v1/saved/add", data, {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        });
        console.log("장바구니 담기 성공", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div className="ShopListBoxFrame">
        <div className="ShopListBoxInner">
          <div className="ShopListBoxTopFrame">
            <div className="ShopListBoxTagContainer">
              <div className="ShopListBoxTagItem">
                <div className="ShopListBoxTagItemText">{shop.cate2Name}</div>
              </div>
              <div className="ShopListBoxTagItem">
                <div className="ShopListBoxTagItemText">{shop.cate3Name}</div>
              </div>
            </div>
            <div
              className="ShopListBoxContainmentFrame"
              onClick={() => SeoulItemSaveButton()}
            >
              <img
                src="/img/BasketTwo.svg"
                alt="오류"
                className="BasketTwo"
              ></img>
              <div className="TextContainment">담기</div>
            </div>
          </div>
          <div className="ShopListBoxBottomFrame">
            <div className="ShopListBoxTextContainer">
              <div className="ShopListBoxTextOne">{shop.nameKor}</div>
              <div className="ShopListBoxTextTwo">{shop.address}</div>
            </div>
            <div className="SeoulSearchFrame">
              <a 
                href={`https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=${encodeURIComponent(shop.nameKor)}`}
                target='_blank'
                rel="noopener noreferrer"
              >
                <div className="PortalSearchButton">
                  <div className="PortalSearchButtonInner">
                    <img
                      src="/img/SeoulNaver.svg"
                      alt="오류"
                      className="SeoulNaver"
                    ></img>
                    <div className="PortalSearchButtonText">포털 검색</div>
                  </div>
                </div>
              </a>
              <a 
                href={`https://map.kakao.com/link/search/${encodeURIComponent(shop.nameKor)}`}
                target='_blank'
                rel="noopener noreferrer"
              >
                <div
                  className="PortalKakaoSearchButton"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="PortalSearchButtonInner">
                    <img
                      src="/img/SeoulKakaoMap.svg"
                      alt="오류"
                      className="SeoulKakaoMap"
                    ></img>
                    <div className="PortalSearchButtonText">장소 탐색</div>
                  </div>
                </div>
              </a>
              {isHovered && (
                <div className="SeoulShopBalloonFrame">
                  <img
                    src="/img/SeoulShopBalloon.svg"
                    alt="오류"
                    className="SeoulShopBalloon"
                  ></img>
                  <div className="SeoulShopBalloonText">
                    정확한 위치 미제공으로, 검색 화면으로 이동합니다.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const SeoulShopList = async () => {
      try {
        const response = await axios.get("/v1/seoul/food", {
          params: { seoulCountry: englishDistrict },
        });
        console.log(response.data);
        setShops(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    SeoulShopList();
  }, [englishDistrict]);

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

  if (loading) {
    return <LoadPage />;
  }

  const SeoulBasketDelete = async () => {
    try {
      const response = await axios.delete("/v1/saved/reset", {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      });
      console.log("장바구니 비우기 성공", response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
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
            <div className="SeoulMainTextOne">현재 선택된 카테고리: 음식점</div>
            <div className="SeoulMainTextTwo">
              {selectedDistrict}에서 {shops.length}개의 음식점이 발견되었어요!
            </div>
          </div>
          <div className="SeoulCategoryBasketBox">
            <div className="BasketRemoveButton" onClick={SeoulBasketDelete}>
              비우기
            </div>
            <div className="BasketNumFrame" onClick={gotoSeoulBasket}>
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
        <div className="SeoulShopInformationBox">
          <img
            src="/img/ShopAlertImg.svg"
            alt="오류"
            className="ShopAlertImg"
          ></img>
          <div className="SeoulShopInformationText">
            정보제공: 서울 열린데이터광장
          </div>
        </div>
        <div className="ShopListContainer">
          {shops.map((shop) => (
            <ShopListBox shop={shop} />
          ))}
        </div>
        <div className="SeoulMoreButtonFrame">
          <div className="SeoulMoreButton">더 보기</div>
        </div>
        <div className="BackToIntorButtonContainer" onClick={goToSeoulCategory}>
          <div className="BackToIntorButtonFrame">
            <div className="BackToIntorButtonCircle">
              <img
                src="/img/SeoulBackIcon.svg"
                alt="none"
                className="SeoulBackIcon"
              />
            </div>
            <div className="SeoulBackText">카테고리 선택</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulRestaurantPage;
