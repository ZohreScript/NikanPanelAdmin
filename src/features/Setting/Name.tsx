import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useInsertSettings } from "../../hooks/useInsertSettings";

const Name: React.FC = () => {
  const { mutate: insertSettings } = useInsertSettings();

  const handleSelectChange = (value: number, requestType: number) => {
    insertSettings(
      {
        settingId: requestType,
        value: "", 
        color: value,
        requestType,
        wardId: 0,
      },
      {
        onSuccess: () => {
          toast.success("تغییرات با موفقیت ذخیره شد");
        },
        onError: (error) => {
          console.error("خطا در ذخیره‌سازی:", error);
          toast.error("ذخیره‌سازی با مشکل مواجه شد");
        },
      }
    );
  };

  return (
    <div className="card bg-white w-full text-gray-600 p-4 shadow-xl">
      <h3 className="text-base font-semibold text-right text-gray-700 my-8">
        تنظیمات نام بیمار و پرستار
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="rtl">
        <div>
          <label className="block mb-2 font-semibold">تنظیمات نام بیمار</label>
          <select
            className="input input-bordered w-full"
            onChange={(e) =>
              handleSelectChange(parseInt(e.target.value, 10), 4)
            }
          >
            <option value="0">اولویت با تنظیمات کلاینت‌ها</option>
            <option value="1">نمایش نام بیمار</option>
            <option value="2">نمایش شماره پذیرش به‌جای نام بیمار</option>
          </select>
        </div>

        {/* سلکت‌باکس وضعیت پرستار */}
        <div>
          <label className="block mb-2 font-semibold">تنظیمات وضعیت پرستار</label>
          <select
            className="input input-bordered w-full"
            onChange={(e) =>
              handleSelectChange(parseInt(e.target.value, 10), 5)
            }
          >
            <option value="0">اولویت با تنظیمات کلاینت‌ها</option>
            <option value="1">پرستار شیفت صبح</option>
            <option value="2">پرستار شیفت عصر</option>
            <option value="3">پرستار شیفت شب</option>
          </select>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Name;
