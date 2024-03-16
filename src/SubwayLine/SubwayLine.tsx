import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

const FirstDropdown = ({
  options,
  onSelect,
}: {
  options: Option[];
  onSelect: (value: string) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <select className="select" onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const SecondDropdown = ({
  options,
  onSelect,
}: {
  options: Option[];
  onSelect: (value: string) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <select className="dropdownTwo" onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const DropDown = () => {
  const [firstDropdownValue, setFirstDropdownValue] = useState<string>("");
  const [secondDropdownValue, setSecondDropdownValue] = useState<string>("");
  const [secondDropdownOptions, setSecondDropdownOptions] = useState<Option[]>(
    []
  );

  const firstDropdownOptions: Option[] = [
    { value: "option1", label: "1호선" },
    { value: "option2", label: "2호선" },
    { value: "option3", label: "3호선" },
  ];

  const handleFirstDropdownChange = (selectedValue: string) => {
    console.log("First dropdown selected:", selectedValue);
    setFirstDropdownValue(selectedValue);

    // 예시로 첫 번째 드롭다운의 값에 따라 두 번째 드롭다운의 옵션을 동적으로 변경
    if (selectedValue === "option1") {
      setSecondDropdownOptions([
        { value: "suboption1", label: "연천" },
        { value: "suboption2", label: "전곡" },
      ]);
    } else if (selectedValue === "option2") {
      setSecondDropdownOptions([
        { value: "suboption3", label: "Suboption 3" },
        { value: "suboption4", label: "Suboption 4" },
      ]);
    } else {
      setSecondDropdownOptions([]);
    }
  };

  const handleSecondDropdownChange = (selectedValue: string) => {
    console.log("Second dropdown selected:", selectedValue);
    setSecondDropdownValue(selectedValue);
  };

  return (
    <div className="SubWaySelectDropsetFrame">
      <FirstDropdown
        options={firstDropdownOptions}
        onSelect={handleFirstDropdownChange}
      />
      <SecondDropdown
        options={secondDropdownOptions}
        onSelect={handleSecondDropdownChange}
      />
    </div>
  );
};

export default DropDown;
