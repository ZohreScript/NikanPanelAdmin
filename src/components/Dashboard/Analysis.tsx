import { SiGoogleanalytics } from "react-icons/si";
const Analysis = () => {
  return (
   
      <div className="p-6 text-right grid grid-cols-2 w-full  gap-6">
      {/* call card total */}
        <div className="card bg-white w-full text-gray-600 p-4 shadow-xl">
          <div className="flex text-right justify-end  items-center">
            <h3 className="text-base font-semibold text-right text-gray-700">
              کل تماس‌ها
            </h3>
            <div className="rounded-full m-1 bg-[#f5f5ff] p-3 ">
              <SiGoogleanalytics  className="text-[#7480ff] text-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-base">50</span>
            <span className="text-right text-sm text-gray-600">تعداد کل</span>
          </div>
          <progress
            className="progress progress-primary w-full mt-2"dir="rtl"
            value="70"
            max="100"
          ></progress>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-sm">25</span>
            <span className="text-right text-xs">میانگین پاسخگویی (ثانیه)</span>
          </div>
        </div>
{/* 2card */}
<div className="card bg-white w-full text-gray-600 p-4 shadow-xl">
          <div className="flex text-right justify-end  items-center">
            <h3 className="text-base font-semibold text-right text-gray-700">
              زنگ معمولی
            </h3>
            <div className="rounded-full m-1 bg-[#e6f8ff] p-3 ">
              <SiGoogleanalytics  className="text-[#00b5ff]  text-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-base">50</span>
            <span className="text-right text-sm text-gray-600">تعداد زنگ معمولی</span>
          </div>
          <progress
            className="progress progress-info w-full mt-2"dir="rtl"
            value="70"
            max="100"
          ></progress>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-sm">25</span>
            <span className="text-right text-xs">میانگین پاسخگویی (ثانیه)</span>
          </div>
        </div>
{/* 3card */}
<div className="card bg-white w-full text-gray-600 p-4 shadow-xl">
          <div className="flex text-right justify-end  items-center">
            <h3 className="text-base font-semibold text-right text-gray-700">
             زنگ اضطراری
            </h3>
            <div className="rounded-full m-1 bg-[#ffe8fa] p-3 ">
              <SiGoogleanalytics  className="text-[#ff52d9]  text-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-base">50</span>
            <span className="text-right text-sm text-gray-600">تعداد زنگ اضطراری</span>
          </div>
          <progress
            className="progress progress-secondary w-full mt-2"dir="rtl"
            value="70"
            max="100"
          ></progress>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-sm">25</span>
            <span className="text-right text-xs">میانگین پاسخگویی (ثانیه)</span>
          </div>
        </div>
        {/* 4card */}
        <div className="card bg-white w-full text-gray-600 p-4 shadow-xl">
          <div className="flex text-right justify-end  items-center">
            <h3 className="text-base font-semibold text-right text-gray-700">
              زنگ استف
            </h3>
            <div className="rounded-full m-1 bg-[#e4f5f4] p-3 ">
              <SiGoogleanalytics  className="text-[#00cdb8]  text-xl" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-base">50</span>
            <span className="text-right text-sm text-gray-600">تعداد رنگ استف</span>
          </div>
          <progress
            className="progress progress-accent w-full mt-2"dir="rtl"
            value="70"
            max="100"
          ></progress>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-sm">25</span>
            <span className="text-right text-xs">میانگین پاسخگویی (ثانیه)</span>
          </div>
        </div>

      </div>
  
  );
};

export default Analysis;
