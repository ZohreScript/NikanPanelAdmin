import { useState } from "react";
import CustomSelectBox from "../CustomSelectBox";

// Define the type for the data rows
interface DataRow {
  name: string;
  progress: string;
  quantity: number;
  date: string;
}

const LastRecord: React.FC = () => {
  const [selectedFileType, setSelectedFileType] = useState<string>("");

  const data: DataRow[] = [
    {
      name: "1",
      progress: "تست",
      quantity: 2458,
      date: "تست",
    },
  ];

  const exportfile: string[] = ["Excel", "Word", "Xml", "Json", "XSD"];

  const handleExport = () => {
    if (selectedFileType === "") {
      alert("لطفاً نوع فایل را انتخاب کنید.");
      return;
    }
    // This is where you would add the file export logic.
    console.log(`Exporting ${selectedFileType}...`);
  };

  const handleSelectChange = (option: string) => {
    setSelectedFileType(option);
  };

  return (
    <div className="mt-2 p-6 grid grid-cols-1 gap-5 ">
      <div className="card flex flex-col bg-white w-full text-gray-600 p-4 shadow-2xl">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
          <p className="text-xs md:text-lg md:hidden block text-gray-700 font-bold text-right">
            لیست ساده آخرین رکوردها
            <span className="text-sm md:text-base text-gray-500 ml-2">
              ({data.length} مورد)
            </span>
          </p>
          <div className="flex items-center gap-4 md:my-0 my-4">
            <CustomSelectBox
              options={exportfile}
              defaultOption=" نوع فایل"
              onChange={handleSelectChange}
            />
            <button
              onClick={handleExport}
              className="w-full md:px-4 px-3 py-2 text-xs md:py-2 bg-blue-500 text-white rounded-lg"
            >
              دریافت خروجی
            </button>
          </div>
          <p className="text-xs md:text-lg md:block hidden text-gray-700 font-bold text-right">
            لیست ساده آخرین رکوردها
            <span className="text-sm md:text-base text-gray-500 ml-2">
              ({data.length} مورد)
            </span>
          </p>
        </div>

        <div className="overflow-x-auto" dir="rtl">
          <table className="w-full text-left text-gray-500">
            <thead className="mt-2 text-right">
              <tr>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  ردیف
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  نام بخش
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  زنگ عادی
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  زنگ استف
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  زنگ اضطراری
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  میانگین پاسخ دهی
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  جزئیات
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 text-center">
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.name}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.progress}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.quantity}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.date}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.progress} {/* Assuming this is some other value */}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.quantity} {/* Assuming this is some other value */}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.date} {/* Assuming this is some other value */}
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

export default LastRecord;
