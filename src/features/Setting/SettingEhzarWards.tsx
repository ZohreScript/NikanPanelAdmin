import React, { useState } from "react";
import { useInsertWard } from "../../hooks/useInsertWard";
import { useWardList } from "../../hooks/useWardList";
import { useDeleteSettings } from "../../hooks/useDeleteSettings";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const SettingEhzarWards: React.FC = () => {
  const [newWard, setNewWard] = useState({
    wardName: "",
    wardId: "",
    description: "",
  });

  const { mutate: insertWard } = useInsertWard();
  const { mutate: deleteWard } = useDeleteSettings();
  const { data: wards, isPending, refetch } = useWardList(true);

  const addWard = () => {
    const wardIdAsNumber = parseInt(newWard.wardId.toString(), 10);

    if (!newWard.wardName || !newWard.description || isNaN(wardIdAsNumber)) {
      toast.error("لطفاً تمامی فیلدها را پر کنید.");
      return;
    }

    insertWard(
      {
        wardName: newWard.wardName,
        wardId: wardIdAsNumber,
        description: newWard.description,
      },
      {
        onSuccess: () => {
          toast.success("بخش با موفقیت اضافه شد.");
          refetch();
          setNewWard({ wardName: "", wardId: "", description: "" });
        },
        onError: (error) => {
          console.error("خطا در اضافه کردن بخش:", error);
          toast.error("اضافه کردن بخش با مشکل مواجه شد.");
        },
      }
    );
  };
  refetch();
  const handleDelete = (id: number) => {
    deleteWard(
      { id },
      {
        onSuccess: () => {
          toast.success("بخش با موفقیت حذف شد.");
          refetch();
        },
        onError: (error) => {
          console.error("خطا در حذف بخش:", error);
          toast.error("حذف بخش با مشکل مواجه شد.");
        },
      }
    );
  };

  return (
    <div className="card bg-white w-full text-gray-600 p-4 shadow-xl">
      <h3 className="text-base font-semibold text-right text-gray-700 my-8">
        مدیریت بخش‌ها
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-4 gap-4" dir="rtl">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="نام بخش"
          value={newWard.wardName}
          onChange={(e) => setNewWard({ ...newWard, wardName: e.target.value })}
        />
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="شناسه بخش"
          value={newWard.wardId}
          onChange={(e) => setNewWard({ ...newWard, wardId: e.target.value })}
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="توضیحات"
          value={newWard.description}
          onChange={(e) =>
            setNewWard({ ...newWard, description: e.target.value })
          }
        />
      </div>

      <button className="btn btn-success text-white my-8" onClick={addWard}>
        افزودن بخش
      </button>

      <table className="table w-full mt-4" dir="rtl">
        <thead>
          <tr>
            <th>شناسه بخش</th>
            <th>نام بخش</th>
            <th>توضیحات</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr>
              <td colSpan={4}>در حال بارگذاری...</td>
            </tr>
          ) : (
            wards?.map((ward) => (
              <tr key={ward.wardId} className="hover:bg-gray-100">
                <td>{ward.wardId}</td>
                <td>{ward.wardName}</td>
                <td>{ward.description}</td>
                <td>
                <button
                    className="btn btn-ghost"
                    onClick={() => handleDelete(ward.wardId)}
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

export default SettingEhzarWards;
