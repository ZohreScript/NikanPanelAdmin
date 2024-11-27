/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useGetRFIDSettings } from "../../hooks/getrfidsettings";
import { useInsertRFIDSettings } from "../../hooks/insertrfidsettings";
import { toast } from "react-toastify"; // import Toastify for notifications

const SettingEhzarRfid: React.FC = () => {
  const { data: settingsData, isLoading, error, refetch } = useGetRFIDSettings();
  const { mutate: saveSettings, isPending: isSaving } = useInsertRFIDSettings();
  const [settings, setSettings] = useState(settingsData?.rFIDSettings || []);

  useEffect(() => {
    if (settingsData?.rFIDSettings) {
      const initialSettings = settingsData.rFIDSettings.map((setting) => ({
        ...setting,
        value: setting.value !== undefined ? setting.value : false, 
      }));
      setSettings(initialSettings);
    }
  }, [settingsData]);

  const handleCheckboxChange = (index: number) => {
    const updatedSettings = [...settings];
    updatedSettings[index].value = !updatedSettings[index].value;
    setSettings(updatedSettings);
  };

  const handleSave = async () => {
    try {
      await saveSettings(settings.map((setting) => ({
        ...setting,
        value: setting.value ? true : false,
      })));
      toast.success("تنظیمات با موفقیت ذخیره شد");
      refetch(); 
    } catch (error) {
      toast.error("خطا در ثبت تنظیمات");
    }
  };

  if (isLoading) {
    return <div>در حال بارگذاری تنظیمات...</div>;
  }

  if (error) {
    return <div>خطا در دریافت تنظیمات: {error.message}</div>;
  }

  return (
    <div className="card bg-white w-full text-gray-600 shadow-xl p-4" dir="rtl">
      <h2 className="text-lg font-bold mb-4">RFID تنظیمات</h2>
      <div className="grid grid-cols-4 gap-4">
        {settings?.map((setting, index) => (
          <label key={setting.settingId} className="flex items-center space-2">
            <input
              type="checkbox"
              checked={setting.value}
              onChange={() => handleCheckboxChange(index)}
              className="checkbox m-1"
            />
            <span className="m-1">{setting.title}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`btn ${isSaving ? "btn-disabled" : "btn-primary"} mt-4 w-36`}
      >
        {isSaving ? "در حال ثبت..." : "ذخیره تنظیمات"}
      </button>
    </div>
  );
};

export default SettingEhzarRfid;
