import React from "react";
import "./MainHeaderTop.css";

function MainHeaderTop() {
  return (
    <div className="MainHeaderBoxFrame">
      <div className="MainHeaderBox">
        <div className="MainHeaderBoxText">
          Are you planning to visit Korea?
        </div>
        <div className="MainHeaderButtonBox">
          <div className="MainHeaderBoxTextTwo">
            Click here to visit foreign page
          </div>
          <img className="MHTBI" src="../img/MHTBI.svg" alt="error"></img>
        </div>
      </div>
    </div>
  );
}

export default MainHeaderTop;
