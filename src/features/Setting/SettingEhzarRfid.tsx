import React, { useState } from "react";
import { useInsertCard } from "../../hooks/useInsertCard";
import { useDeleteCard } from "../../hooks/useDeleteCard";
import { useCardList } from "../../hooks/useCardList";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const SettingEhzarRfid: React.FC = () => {
  const [newCard, setNewCard] = useState({
    readerRFIDcode: "",
    oPtimazeRFIDcode: "",
    userName: "",
    userIDinHIS: "",
    codeMelli: "",
    codePersoneli: "",
    wardIDs: [0],
    acssessLevel: "",
  });

  const { mutate: insertCard } = useInsertCard();
  const { mutate: deleteCard } = useDeleteCard();
  const { data: cards, isPending, refetch } = useCardList(true);

  const addCard = () => {
    if (
      !newCard.readerRFIDcode ||
      !newCard.userName ||
      !newCard.codeMelli ||
      !newCard.codePersoneli
    ) {
      toast.error("لطفاً تمامی فیلدها را پر کنید.");
      return;
    }

    insertCard(newCard, {
      onSuccess: () => {
        toast.success("کارت با موفقیت اضافه شد.");
        refetch();
        setNewCard({
          readerRFIDcode: "",
          oPtimazeRFIDcode: "",
          userName: "",
          userIDinHIS: "",
          codeMelli: "",
          codePersoneli: "",
          wardIDs: [0],
          acssessLevel: "",
        });
      },
      onError: (error) => {
        console.error("خطا در اضافه کردن کارت:", error);
        toast.error("اضافه کردن کارت با مشکل مواجه شد.");
      },
    });
  };

  const handleDeleteCard = (id: number) => {
    deleteCard(
      { id },
      {
        onSuccess: () => {
          toast.success("کارت با موفقیت حذف شد.");
          refetch();
        },
        onError: (error) => {
          console.error("خطا در حذف کارت:", error);
          toast.error("حذف کارت با مشکل مواجه شد.");
        },
      }
    );
  };

  return (
    <div className="card bg-white w-full text-gray-600 p-4 shadow-xl">
      <h3 className="text-base font-semibold text-right text-gray-700 my-8">
        مدیریت کارت‌های RFID
      </h3>

      {/* Input Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-4 gap-4" dir="rtl">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="کد RFID خوان"
          value={newCard.readerRFIDcode}
          onChange={(e) =>
            setNewCard({ ...newCard, readerRFIDcode: e.target.value })
          }
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="نام کاربر"
          value={newCard.userName}
          onChange={(e) => setNewCard({ ...newCard, userName: e.target.value })}
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="کد ملی"
          value={newCard.codeMelli}
          onChange={(e) =>
            setNewCard({ ...newCard, codeMelli: e.target.value })
          }
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="کد پرسنلی"
          value={newCard.codePersoneli}
          onChange={(e) =>
            setNewCard({ ...newCard, codePersoneli: e.target.value })
          }
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="سطح دسترسی"
          value={newCard.acssessLevel}
          onChange={(e) =>
            setNewCard({ ...newCard, acssessLevel: e.target.value })
          }
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="محدوده دسترسی (شناسه‌های بخش‌ها)"
          value={newCard.wardIDs.join(", ")}
          onChange={(e) =>
            setNewCard({
              ...newCard,
              wardIDs: e.target.value
                .split(",")
                .map((id) => parseInt(id.trim())),
            })
          }
        />
      </div>

      <button className="btn btn-success text-white my-8" onClick={addCard}>
        افزودن کارت
      </button>

      {/* Data Table */}
      <table className="table w-full mt-4" dir="rtl">
        <thead>
          <tr>
            <th>کد RFID خوان</th>
            <th>نام کاربر</th>
            <th>کد ملی</th>
            <th>کد پرسنلی</th>
            <th>محدوده دسترسی</th>
            <th>سطح دسترسی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr>
              <td colSpan={7}>در حال بارگذاری...</td>
            </tr>
          ) : (
            cards?.map((card) => (
              <tr key={card.id} className="hover:bg-gray-100">
                <td>{card.readerRFIDcode}</td>
                <td>{card.userName}</td>
                <td>{card.codeMelli}</td>
                <td>{card.codePersoneli}</td>
                <td>
                  {card.wardIDs && card.wardIDs.length > 0
                    ? card.wardIDs.join(", ")
                    : "ندارد"}
                </td>
                <td>{card.acssessLevel}</td>
                <td>
                  <button
                    className="btn btn-danger text-white"
                    onClick={() => handleDeleteCard(card.id)}
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

export default SettingEhzarRfid;
