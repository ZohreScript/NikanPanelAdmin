/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { RegisterPatientData } from "../../types/types";
import toast from "react-hot-toast";

interface PatientModalProps {
  isOpen: boolean;
  patientData: RegisterPatientData;
  isEditMode: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  existingPatients: RegisterPatientData[]; 
}

const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  patientData,
  isEditMode,
  onClose,
  onSubmit,
  onChange,
  existingPatients
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false); 

  const isDuplicate = existingPatients.some(patient => 
    patient.no_pazir === patientData.no_pazir);

  const handleSubmit = () => {
    if (isDuplicate) {
      toast.error("این بیمار قبلاً ثبت شده است!"); 
      return;
    }
    setIsSubmitting(true);
    onSubmit(); 
    onClose(); 
    toast.success(isEditMode ? "تغییرات با موفقیت ذخیره شد" : "بیمار با موفقیت ثبت شد"); // Show success toast
    setIsSubmitting(false); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open" dir="rtl" onClick={onClose}>
      <div
        className="modal-box w-11/12 max-w-5xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-lg mb-4">
          {isEditMode ? "ویرایش مشخصات بیمار" : "ثبت مشخصات بیمار"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">شماره پذیرش </label>
                  <input
                    type="text"
                    name="no_pazir"
                    value={patientData.no_pazir}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نام بیمار</label>
                  <input
                    type="text"
                    name="name_b"
                    value={patientData.name_b}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">نام پزشک</label>
                  <input
                    type="text"
                    name="name_p"
                    value={patientData.name_p}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">نام تخت</label>
                  <input
                    type="text"
                    name="bed_name"
                    value={patientData.bed_name}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نام اتاق</label>
                  <input
                    type="text"
                    name="room_name"
                    value={patientData.room_name}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نام بخش</label>
                  <input
                    type="text"
                    name="name_bakhsh"
                    value={patientData.name_bakhsh}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">تاریخ بستری</label>
                  <input
                    type="date"
                    name="bast_date"
                    value={patientData.bast_date}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">پزشک صبح</label>
                  <input
                    type="text"
                    name="p_morning"
                    value={patientData.p_morning}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">پزشک عصر</label>
                  <input
                    type="text"
                    name="p_Evening"
                    value={patientData.p_Evening}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">پزشک شب</label>
                  <input
                    type="text"
                    name="p_Night"
                    value={patientData.p_Night}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">نام بیماری</label>
                  <input
                    type="text"
                    name="name_bimari"
                    value={patientData.name_bimari}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">جنسیت</label>
                  <select
                    name="sex"
                    value={patientData.sex}
                    onChange={onChange}
                    className="select select-bordered w-full"
                  >
                    <option value={1}>مرد</option>
                    <option value={2}>زن</option>
                  </select>

                  <label className="label">سن</label>
                  <input
                    type="number"
                    name="sen"
                    value={patientData.sen}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">ایزوله</label>
                  <input
                    type="number"
                    name="isoleh"
                    value={patientData.isoleh}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">توضیح کاردکس</label>
                  <input
                    type="text"
                    name="toz_kardeks"
                    value={patientData.toz_kardeks}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نوع تغذیه </label>
                  <input
                    type="text"
                    placeholder="feed "
                    name="feed"
                    value={patientData.feed}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">شماره اتاق</label>
                  <input
                    type="text"
                    name="room_no"
                    value={patientData.room_no}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">ممنوعیت تجویز </label>
                  <input
                    type="text"
                    name="blood_Ban"
                    value={patientData.blood_Ban}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">وضعیت حرکت</label>
                  <input
                    type="text"
                    name="movement_Status"
                    value={patientData.movement_Status}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نوع شکستگی</label>
                  <input
                    type="number"
                    name="fracture_Type"
                    value={patientData.fracture_Type}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">دستبند</label>
                  <select
                    name="braceelet"
                    value={patientData.braceelet}
                    onChange={onChange}
                    className="select select-bordered w-full"
                  >
                    <option value="0">بدون دستبند</option>
                    <option value="1">قرمز</option>
                    <option value="2">زرد</option>
                  </select>

                  <label className="label">time-j </label>
                  <input
                    type="text"
                    name="time_j"
                    value={patientData.time_j}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">سریال تخت</label>
                  <input
                    type="number"
                    name="bed_serial"
                    value={patientData.bed_serial}
                    onChange={onChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">نیاز به ویلچر</label>
                  <select
                    name="need_Wheelchair"
                    value={patientData.need_Wheelchair ? "true" : "false"}
                    onChange={(e) =>
                      onChange({
                        target: {
                          name: "need_Wheelchair",
                          value: e.target.value === "true",
                        },
                      } as any)
                    }
                    className="select select-bordered w-full"
                  >
                    <option value="true">بله</option>
                    <option value="false">خیر</option>
                  </select>
                </div>
         </div>

        <div className="modal-action">
          <button onClick={onClose} className="btn">
            بستن
          </button>
          <button 
            onClick={handleSubmit} 
            className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting} 
          >
            {isEditMode ? "ذخیره تغییرات" : "ثبت"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
