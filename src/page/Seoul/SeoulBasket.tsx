import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTwo from "../../HeaderTwo";
import SeoulHeader from "../../SeoulHeader";
import "./SeoulBasket.css";
import axios from "axios";

function SeoulBasketPage() {
  const [savedData, setSavedData] = useState([]);
  const [length, setlength] = useState("");

  interface SeoulSavedComponentProps {
    data: {
      address: string;
      category: string;
      value: string;
      id: string;
    };
    index: number;
  }

  const SeoulSavedComponent: React.FC<SeoulSavedComponentProps> = ({
    data,
    index,
  }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
      setIsToggled(!isToggled);
      console.log(`${index} ${!isToggled}`);
    };

    const SeoulSavedDataDelete = async (id: string) => {
      const deleteData = {
        itemId: id,
      };

      const token = sessionStorage.getItem("access-token");
      try {
        const response = await axios.delete("/v1/saved/", {
          headers: { "X-AUTH-TOKEN": token },
          params: deleteData,
        });
        if (response.status === 200) {
          console.log("제거 성공", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleDeleteClick = () => {
      console.log(data.id);
      SeoulSavedDataDelete(data.id);
    };

    return (
      <div className="SeoulSavedComponentFrame">
        <div className="SeoulSavedComponentInner">
          <div className="SeoulSavedComponentCategory">{data.category}</div>
          <div className="SeoulSavedComponentClassification">{data.value}</div>
          <div className="SeoulSavedComponentAddress">{data.address}</div>

          <div className="SeoulSavedComponentVisit" onClick={handleToggle}>
            <div
              className={`SeoulBasketToggleButtonMainFrame ${
                isToggled ? "active" : ""
              }`}
            >
              <div
                className={`SeoulBasketCircle ${isToggled ? "active" : ""}`}
              ></div>
            </div>
          </div>
          <div
            className="SeoulSavedComponentDeleteButton"
            onClick={handleDeleteClick}
          >
            <img
              src="/img/SeoulDeleteIcon.svg"
              alt="none"
              className="SeoulDeleteIcon"
            />
          </div>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();

  const goToSeoulSelect = () => {
    navigate("/portal/seoul/Select");
    window.scrollTo(0, 0);
  };

  const goToSeoulTrackCreate = () => {
    navigate("/portal/seoul");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchSavedData = async () => {
      const token = sessionStorage.getItem("access-token");
      try {
        const response = await axios.get("/v1/saved/", {
          headers: { "X-AUTH-TOKEN": token },
        });
        setSavedData(response.data);
        setlength(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedData();
  }, []);

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
              현재 선택된 서울특별시 자치구: 강남구
            </div>
            <div className="SeoulMainTextTwo">
              {length}개의 항목이 담겨있어요.
            </div>
          </div>
        </div>
        <div className="SeoulBasketAlertBox">
          <div className="SeoulBasketAlertInner">
            <div className="SeoulBasketAlertBoxTwo">
              <img className="Iimg" src="/img/Iimg.svg" alt="오류"></img>
              <div className="SeoulBasketAlertTwoText">필수 방문 예정이란?</div>
            </div>
            <div className="SeoulBasketAlertBoxThree">
              이 트랙에 대해 관광을 진행하며 관광객과 반드시 방문할 곳을 뜻해요.
              만약 3개 항목이 있다면 1곳은 필수 방문, 2곳은 관광객과 협의 또는
              요청에 따라 결정돼요. 방문 예정 항목은 한 곳만 지정할 수 있어요.
            </div>
          </div>
        </div>
        <div className="SeoulBasketSavedContainer">
          <div className="SeoulBasketSavedCategoryBox">
            <div className="SeoulBasketSavedTextCategory">카테고리</div>
            <div className="SeoulBasketSavedTextClassification">항목</div>
            <div className="SeoulBasketSavedTextAddress">주소</div>
            <div className="SeoulBasketSavedTextVisit">필수 방문 예정</div>
          </div>
          <div className="SeoulBasketSavedContainerLine"></div>
          {savedData.map((item, index) => (
            <SeoulSavedComponent key={index} data={item} index={index} />
          ))}
        </div>
        <div className="SeoulMainBoxTwo">
          <div className="SeoulMainBoxThreeTwo">
            <div className="SeoulMainBoxTwoTextOne">
              더 정확한 트랙 생성을 위해 원하는 옵션을 선택해 주세요!
            </div>
            <div className="SeoulMainBoxTwoTextTwo">
              원하는 항목을 선택하면, 항목에 맞는 요청 사항이 트랙 스크립트에
              자동으로 포함됩니다.
            </div>
          </div>
          <div className="SeoulMainBoxFourTwo">
            <div className="SeoulMainBoxFourText">1개의 옵션이 선택됨</div>
          </div>
        </div>
        <div className="SeoulSavedSelectFrame">
          <div className="SeoulSavedSelectBox">
            <div className="SeoulSavedSelectBoxText">
              관광객을 위해 강남구의 인기있는 호텔을 추천할게요
            </div>
          </div>
          <div className="SeoulSavedSelectBox">
            <div className="SeoulSavedSelectBoxText">
              관광객을 위해 강남구의 인기있는 호텔을 추천할게요
            </div>
          </div>
          <div className="SeoulSavedSelectBox">
            <div className="SeoulSavedSelectBoxText">
              관광객을 위해 강남구의 인기있는 호텔을 추천할게요
            </div>
          </div>
        </div>
        <div className="BackToIntorButtonContainer">
          <div className="BackToIntorButtonFrame" onClick={goToSeoulSelect}>
            <div className="BackToIntorButtonCircle">
              <img
                src="/img/SeoulBackIcon.svg"
                alt="none"
                className="SeoulBackIcon"
              />
            </div>
            <div className="SeoulBackText">카테고리 선택</div>
          </div>

          <div className="SeoulTrackButtonFrame" onClick={goToSeoulTrackCreate}>
            <div className="SeoulNextStepButtonCircle">
              <img
                src="/img/SeoulBackIcon.svg"
                alt="none"
                className="SeoulNextIcon"
              />
            </div>
            <div className="SeoulNextStepButtonText">
              위 내용을 바탕으로 트랙 생성하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulBasketPage;
