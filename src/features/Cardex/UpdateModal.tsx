/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
}

const UpdateModal: React.FC<ModalProps> = ({ isOpen, onClose, patient }) => {
  if (!isOpen) return null;

  return (
    <div className="fixedinset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg md:w-1/3">
        <h2 className="text-xl font-bold mb-4">ویرایش اطلاعات بیمار</h2>
        <p>نام بیمار: {patient.name_b}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
            بستن
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
