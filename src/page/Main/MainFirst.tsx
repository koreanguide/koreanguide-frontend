import React from "react";
import "./MainFirst.css";

interface ChildComponentProps {
  children: React.ReactNode;
}

export const InnerBox = (props: ChildComponentProps) => {
  return <div className="InnerBox">{props.children}</div>;
};

function MainFirst() {
  const scrollToPosition = () => {
    window.scrollTo({ top: 700, behavior: "smooth" });
  };

  return (
    <div className="MainFrameOne">
      <InnerBox>
        <div className="FirstText">
          <p className="POne">당연한 일상을 공유하는 것이,</p>
          <p className="PTwo">어떤 이에겐 소중하고</p>
          <p className="PThree">새로운 경험이 될 수 있어요.</p>
        </div>
        <img src="../img/TwoPeople.png" alt="" className="MainOneImg"></img>
        <div className="SecondText">
          <p className="PFour">
            당연한 일상을 우리나라에 방문하는 이들에게 공유하고,
          </p>
          <p className="PFive">경험을 선물하며, 수익을 올려보세요.</p>
        </div>
        <button className="MoreButton" onClick={scrollToPosition}>
          <div className="ButtonBox">
            <p className="ButtonText">더 알아보기</p>
            <img src="../img/MoreArrow.png" alt=""></img>
          </div>
        </button>
      </InnerBox>
    </div>
  );
}

export default MainFirst;
