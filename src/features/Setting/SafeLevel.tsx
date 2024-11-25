import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useInsertSettings } from "../../hooks/useInsertSettings";
import { useDataSettings } from "../../hooks/useDataSettings";
import { useDeleteSettings } from "../../hooks/useDeleteSettings";
import { ToastContainer, toast } from "react-toastify";

interface Feature {
  id: number;
  value: string;
}

const SafeLevel: React.FC = () => {
  const [newFeature, setNewFeature] = useState<
    Omit<Feature, "id"> & { id: string | number }
  >({
    id: "",
    value: "",
  });

  const { mutate: insertSettings } = useInsertSettings();
  const { data: settings, isPending, refetch } = useDataSettings(2, 0);
  const { mutate: deleteSetting } = useDeleteSettings();

  const addFeature = () => {
    if (!newFeature.id || !newFeature.value) {
      toast.error("لطفاً تمامی مقادیر را وارد کنید.");
      return;
    }

    const idAsNumber = parseInt(newFeature.id.toString(), 10);

    insertSettings({
      settingId: idAsNumber,
      value: newFeature.value,
      color: 0,
      requestType: 2,
      wardId: 0,
    });
    refetch();
    setNewFeature({ id: "", value: "" });
  };
  refetch();

  const handleDelete = (id: number) => {
    deleteSetting(
      { id },
      {
        onSuccess: () => {
          toast.success("حذف با موفقیت انجام شد");
          refetch();
        },
        onError: (error) => {
          console.error("خطا در حذف تنظیم:", error);
          toast.error("حذف با مشکل مواجه شد");
        },
      }
    );
  };

  return (
    <div className="card bg-white w-full text-gray-600 p-4 shadow-xl">
      <h3 className="text-base font-semibold text-right text-gray-700 my-8">
        مشخصات اصلی سطح مراقبت
      </h3>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 m-4 gap-4"
        dir="rtl"
      >
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="شماره ویژگی"
          value={newFeature.id}
          onChange={(e) => setNewFeature({ ...newFeature, id: e.target.value })}
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="نام ویژگی"
          value={newFeature.value}
          onChange={(e) =>
            setNewFeature({ ...newFeature, value: e.target.value })
          }
        />
      </div>

      <button className="btn btn-success text-white my-8" onClick={addFeature}>
        افزودن
      </button>

      <table className="table w-full mt-4" dir="rtl">
        <thead>
          <tr>
            <th>شماره ویژگی</th>
            <th>نام ویژگی</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr>
              <td colSpan={3}>در حال بارگذاری...</td>
            </tr>
          ) : (
            settings?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td>{item.settingId}</td>
                <td>{item.value}</td>
                <td>
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash className="text-2xl text-red-600" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default SafeLevel;
