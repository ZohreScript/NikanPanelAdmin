import React from "react";
import CustomSelectBox from "../../components/CustomSelectBox";

type SelectBarProps = {
  yearOptions: number[];
  monthOptions: { label: string; value: number }[];
  wardOptions: { label: string; value: number }[];
  isLoadingWards: boolean;
  onYearChange: (year: number) => void;
  onMonthChange: (monthValue: number) => void;
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
        options={yearOptions.map(year => year.toString())}
        defaultOption="انتخاب سال"
        onChange={(year) => onYearChange(Number(year))}
      />
    </li>
    <li>
      <CustomSelectBox
        options={monthOptions}
        defaultOption="انتخاب ماه"
        onChange={(month) => onMonthChange(Number(month))}
      />
    </li>
    <li>
      {isLoadingWards ? (
        <div>در حال بارگذاری...</div>
      ) : (
        <CustomSelectBox
          options={["همه", ...wardOptions]} 
          defaultOption="انتخاب بخش"
          onChange={(option) => {
            if (typeof option === 'string') {
              onWardChange(option);
            }
          }}        />
      )}
    </li>
  </ul>
);

export default SelectBar;
