import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderTwo from "../../HeaderTwo";
import SeoulHeader from "../../SeoulHeader";
import "./SeoulBasket.css";
import axios from "axios";

// eslint-disable-next-line react-hooks/rules-of-hooks

function SeoulBasketPage() {
  const location = useLocation();
  const goToSeoulTrack = () => {
    navigate("/portal/seoul/track", { state: { SeoulTrackGolbalData } });
    window.scrollTo(0, 0);
  };

  var { SeoulTrackGolbalData } = location.state || {};

  const [savedData, setSavedData] = useState([]);
  const [length, setlength] = useState("");

  const [OptionOne, setOptionOne] = useState<boolean>(false);
  const [OptionTwo, setOptionTwo] = useState<boolean>(false);
  const [OptionThree, setOptionThree] = useState<boolean>(false);

  interface SeoulSavedComponentProps {
    data: {
      address: string;
      category: string;
      value: string;
      id: string;
    };
    index: number;
  }

  const [selectedId, setSelectedId] = useState(null);

  const handleToggle = (id: any) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
      console.log(id);
    }
  };

  const SeoulSavedComponent: React.FC<
    SeoulSavedComponentProps & { isToggled: boolean; onToggle: () => void }
  > = ({ data, index, isToggled, onToggle }) => {
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
          alert("장바구니에서 해당 항목을 제거했습니다.");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleDeleteClick = () => {
      SeoulSavedDataDelete(data.id);
    };

    return (
      <div className="SeoulSavedComponentFrame">
        <div className="SeoulSavedComponentInner">
          <div className="SeoulSavedComponentCategory">{data.category}</div>
          <div className="SeoulSavedComponentClassification">{data.value}</div>
          <div className="SeoulSavedComponentAddress">{data.address}</div>
          <div className="SeoulSavedComponentVisit" onClick={onToggle}>
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

  const [BasketItemIdList, setBasketItemIdList] = useState<string[]>([]);
  const [uniqueList, setUniqueList] = useState<string[]>([]);
  useEffect(() => {
    setUniqueList(Array.from(new Set(BasketItemIdList)));
  }, [BasketItemIdList]);

  useEffect(() => {
    const fetchSavedData = async () => {
      const token = sessionStorage.getItem("access-token");
      try {
        const response = await axios.get("/v1/saved/", {
          headers: { "X-AUTH-TOKEN": token },
        });
        setSavedData(response.data);
        setlength(response.data.length);
        if (response.data.length > 0) {
          const ids = response.data.map((item: any) => item.id);
          setBasketItemIdList(ids);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedData();
  }, []);

  interface Option {
    id: number;
    text: string;
    isSelected: boolean;
  }

  const [options, setOptions] = useState<Option[]>([
    {
      id: 1,
      text: "관광객을 위해 강남구의 인기있는 호텔을 추천할게요",
      isSelected: false,
    },
    {
      id: 2,
      text: "관광객이 원한다면 방문 장소를 변경할 수 있어요",
      isSelected: false,
    },
    {
      id: 3,
      text: "관광객이 원하는 곳으로 찾아가 관광을 시작할게요.",
      isSelected: false,
    },
  ]);

  const toggleOption = (id: number) => {
    const newOptions = options.map((option) => {
      if (option.id === id) {
        const updatedOption = { ...option, isSelected: !option.isSelected };
        switch (id) {
          case 1:
            setOptionOne(!option.isSelected);
            break;
          case 2:
            setOptionTwo(!option.isSelected);
            break;
          case 3:
            setOptionThree(!option.isSelected);
            break;
          default:
            break;
        }
        return updatedOption;
      }
      return option;
    });
    setOptions(newOptions);
    console.log(newOptions);
  };

  const selectedOptionNum = options.filter(
    (option) => option.isSelected
  ).length;

  // {Track-Post}

  interface SeoulTrackItemData {
    requiredSavedId: any;
    savedId: any[];
    useCanStartVisitorsLocationOptions: any;
    useChangeLocationOptions: any;
    useHotelOptions: any;
  }

  const SeoulTrackPostApi = async () => {
    const timeout = 500000;
    console.log(uniqueList);
    console.log("2번째 리스트", BasketItemIdList);
    const data: SeoulTrackItemData = {
      requiredSavedId: selectedId,
      savedId: uniqueList,
      useCanStartVisitorsLocationOptions: OptionOne,
      useChangeLocationOptions: OptionTwo,
      useHotelOptions: OptionThree,
    };

    const token = sessionStorage.getItem("access-token");

    try {
      const response = await axios.post("/v1/seoul/", data, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
        timeout: timeout,
      });
      console.log("이동할 값", response.data);
      SeoulTrackGolbalData = response.data;
      goToSeoulTrack();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios 에러인지 확인
        if (
          error.code === "ECONNABORTED" ||
          error.message.includes("timeout")
        ) {
          console.log("요청이 타임아웃되었습니다.");
        } else {
          console.error("요청 실패:", error.message);
        }
      } else {
        console.error("예상치 못한 에러:", error);
      }
      alert("트랙 생성 실패");
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
            <SeoulSavedComponent
              key={index}
              data={item}
              index={index}
              isToggled={selectedId === (item as any).id}
              onToggle={() => handleToggle((item as any).id)}
            />
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
            <div className="SeoulMainBoxFourText">
              {selectedOptionNum}개의 옵션이 선택됨
            </div>
          </div>
        </div>
        <div className="SeoulSavedSelectFrame">
          {options.map((option) => (
            <div
              key={option.id}
              className="SeoulSavedSelectBox"
              style={{
                backgroundColor: option.isSelected ? "#3876c0" : "#F7F7F7",
                color: option.isSelected ? "#fff" : "#3876c0",
              }}
              onClick={() => toggleOption(option.id)}
            >
              <div className="SeoulSavedSelectBoxText">{option.text}</div>
            </div>
          ))}
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
          <div className="SeoulTrackButtonFrame" onClick={SeoulTrackPostApi}>
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
