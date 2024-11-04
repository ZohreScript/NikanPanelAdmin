import React from "react";
import CustomSelectBox from "../../components/CustomSelectBox";

type SelectBarProps = {
  yearOptions: string[];
  monthOptions: string[];
  wardOptions: string[];
  isLoadingWards: boolean;
  onYearChange: () => void;
  onMonthChange: () => void;
};

const SelectBar: React.FC<SelectBarProps> = ({
  yearOptions,
  monthOptions,
  wardOptions,
  isLoadingWards,
  onYearChange,
  onMonthChange,
}) => (
  <ul className="flex space-x-4 pb-2 justify-center items-center">
    <li>
      <CustomSelectBox
        options={yearOptions}
        defaultOption="انتخاب سال"
        onChange={onYearChange}
      />
    </li>
    <li>
      <CustomSelectBox
        options={monthOptions}
        defaultOption="انتخاب ماه"
        onChange={onMonthChange}
      />
    </li>
    <li>
      {isLoadingWards ? (
        <div>در حال بارگذاری...</div>
      ) : (
        <CustomSelectBox options={wardOptions} defaultOption="انتخاب بخش" />
      )}
    </li>
    <li className="font-medium text-sm px-4 py-2 hover:bg-slate-100 rounded-xl">
      <a href="/dashboard">خانه</a>
    </li>
  </ul>
);

export default SelectBar;
