import React from "react";
import CustomSelectBox from "../../components/CustomSelectBox";

type SelectBarProps = {
  yearOptions: string[];
 monthOptions: { label: string; value?: number }[];
  wardOptions: string[];
  isLoadingWards: boolean;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  onWardChange: (ward: string) => void;
};

const SelectBar: React.FC<SelectBarProps> = ({
  yearOptions,
  monthOptions,
  wardOptions,
  isLoadingWards,
  onYearChange,
  onMonthChange,
  onWardChange,
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
        <CustomSelectBox
          options={["همه", ...wardOptions]} 
          defaultOption="انتخاب بخش"
          onChange={onWardChange}
        />
      )}
    </li>
    <li className="font-medium text-sm px-4 py-2 hover:bg-slate-100 rounded-xl">
      <a href="/dashboard">خانه</a>
    </li>
  </ul>
);

export default SelectBar;
