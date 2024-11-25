import React, { useState } from "react";
import { useColor, ColorPicker } from "react-color-palette";
import { FaTrash } from "react-icons/fa";
import "react-color-palette/css";
import { useInsertSettings } from "../../hooks/useInsertSettings";
import { useDataSettings } from "../../hooks/useDataSettings";
import { useDeleteSettings } from "../../hooks/useDeleteSettings";
import { ToastContainer, toast } from "react-toastify";

interface Feature {
  id: number;
  value: string;
  color: number;
}

const Dastband: React.FC = () => {
  const [newFeature, setNewFeature] = useState<
    Omit<Feature, "id"> & { id: string | number }
  >({
    id: "",
    value: "",
    color: 0,
  });
  const [color, setColor] = useColor("rgb(0, 0, 0)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: insertSettings } = useInsertSettings();
  const { data: settings, isPending, refetch } = useDataSettings(0, 0);
  const { mutate: deleteSetting } = useDeleteSettings();

  const addFeature = () => {
    if (!newFeature.id || !newFeature.value || newFeature.color === 0) {
      toast.error("لطفاً تمامی مقادیر را وارد کنید.");
      return;
    }

    const idAsNumber = parseInt(newFeature.id.toString(), 10);

    insertSettings({
      settingId: idAsNumber,
      color: newFeature.color,
      value: newFeature.value,
      requestType: 0,
      wardId: 0,
    });

    refetch();
    setNewFeature({ id: "", value: "", color: 0 });
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
        مشخصات اصلی دستبند
      </h3>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
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
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          انتخاب رنگ
        </button>

        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <ColorPicker color={color} onChange={setColor} hideAlpha />
              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const selectedColor =
                      (color.rgb.r << 16) | (color.rgb.g << 8) | color.rgb.b;
                    setNewFeature({ ...newFeature, color: selectedColor });
                    setIsModalOpen(false);
                  }}
                >
                  ذخیره رنگ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button className="btn btn-success text-white my-8" onClick={addFeature}>
        افزودن
      </button>

      <table className="table w-full mt-4" dir="rtl">
        <thead>
          <tr>
            <th>شماره ویژگی</th>
            <th>نام ویژگی</th>
            <th>رنگ</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr>
              <td colSpan={4}>در حال بارگذاری...</td>
            </tr>
          ) : (
            settings?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td>{item.settingId}</td>
                <td>{item.value}</td>
                <td>
                  <div
                    className="w-8 h-8"
                    style={{
                      backgroundColor: `rgb(${(item.color >> 16) & 255}, ${
                        (item.color >> 8) & 255
                      }, ${item.color & 255})`,
                    }}
                  ></div>
                </td>
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

export default Dastband;
