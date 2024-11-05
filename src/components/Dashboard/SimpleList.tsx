import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomSelectBox from "../CustomSelectBox";
import { useExportFile } from "../../hooks/useExportFile";
import { useWardEvents } from "../../hooks/useWardEvents";

const SimpleList: React.FC = () => {
  const [selectedFileType, setSelectedFileType] = useState<string>("");
  const { ward, year, month } = useSelector(
    (state: RootState) => state.selectedWard
  );
  const exportfile: string[] = ["Excel", "Xml", "Json", "XSD", "Word"];
  const exportMapping: Record<string, number> = {
    Excel: 0,
    Xml: 1,
    Json: 2,
    XSD: 3,
    Word: 4,
  };

  const { mutate: exportData, isPending: isExporting } = useExportFile();

  const handleExport = () => {
    if (selectedFileType === "") {
      alert("لطفاً نوع فایل را انتخاب کنید.");
      return;
    }

    const exportType = exportMapping[selectedFileType];
    exportData(exportType); 
  };

  const handleSelectChange = (option: string) => {
    setSelectedFileType(option);
  };

  const page = 1;
  const count = 10;
  const { data, isLoading, error } = useWardEvents(
    page,
    count,
    year,
    month,
    ward
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const bedEvents = data?.bedEvents || [];

  return (
    <div className="mt-2 p-6 grid grid-cols-1 gap-5">
      <div className="card flex flex-col bg-white w-full text-gray-600 p-4 shadow-2xl">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
          <p className="text-xs md:text-lg md:hidden block text-gray-700 font-bold text-right">
            لیست ساده آخرین رکوردها
            <span className="text-sm md:text-base text-gray-500 ml-2">
              ({bedEvents.length} مورد)
            </span>
          </p>
          <div className="flex items-center gap-4 md:my-0 my-4">
            <button
              onClick={handleExport}
              className="w-full md:px-4 px-3 py-3 text-xs md:py-2 bg-blue-500 text-white rounded-lg"
              disabled={isExporting}
            >
              {isExporting ? "در حال دریافت..." : "دریافت خروجی"}
            </button>
            <CustomSelectBox
              options={exportfile}
              defaultOption="نوع فایل"
              onChange={(option) => {
                if (typeof option === "string") {
                  handleSelectChange(option);
                }
              }}
            />
          </div>
          <p className="text-xs md:text-lg md:block hidden text-gray-700 font-bold text-right">
            لیست ساده آخرین رکوردها
            <span className="text-sm md:text-base text-gray-500 ml-2">
              ({bedEvents.length} مورد)
            </span>
          </p>
        </div>
        <div className="overflow-x-auto max-h-96" dir="rtl">
          <table className="w-full text-left text-gray-500">
            <thead className="mt-2 text-right">
              <tr>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  ردیف
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  شماره دستگاه
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  شماره تخت
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  شماره اتاق
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  وضعیت
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  تاریخ
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  ساعت
                </th>
              </tr>
            </thead>
            <tbody>
              {bedEvents.map((event, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 text-center"
                >
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {index + 1}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {event.deviceNumber}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {event.bedNumber}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {event.roomName}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {event.statusName}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {event.date}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {event.hours}:{event.minute}:{event.second}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SimpleList;
