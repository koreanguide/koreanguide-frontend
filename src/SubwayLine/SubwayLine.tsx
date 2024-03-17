// DropDownComponent.tsx
import React, { useState } from "react";
import "./SubwayLine.css";

const DropDownComponent: React.FC = () => {
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const firstOptions = ["옵션1", "옵션2", "옵션3"];
  let secondOptions: string[] = [];

  if (firstOption === "옵션1") {
    secondOptions = ["옵션1-1", "옵션1-2"];
  } else if (firstOption === "옵션2") {
    secondOptions = ["옵션2-1", "옵션2-2"];
  } else if (firstOption === "옵션3") {
    secondOptions = ["옵션3-1", "옵션3-2"];
  }

  return (
    <div>
      <select
        className="dropdown-first"
        value={firstOption}
        onChange={(e) => {
          setFirstOption(e.target.value);
          console.log("첫 번째 드롭다운 선택:", e.target.value);
        }}
      >
        {firstOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="dropdown-second"
        value={secondOption}
        onChange={(e) => {
          setSecondOption(e.target.value);
          console.log("두 번째 드롭다운 선택:", e.target.value);
        }}
      >
        {secondOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownComponent;
