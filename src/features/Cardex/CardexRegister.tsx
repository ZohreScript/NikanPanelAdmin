/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useRegisterPatient } from "../../hooks/useRegisterPatient";
import PatientTable from "./PatientTable";
import { RegisterPatientData } from "../../types/types";

const CardexRegister = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { mutate } = useRegisterPatient();
  const [isEditMode, setEditMode] = useState(false);
  const [patientData, setPatientData] = useState<RegisterPatientData>({
    no_pazir: "",
    id: 0,
    name_b: "",
    bed_name: "",
    room_name: "",
    name_bakhsh: "",
    bast_date: "",
    name_p: "",
    name_bimari: "",
    sex: 0,
    sen: 0,
    isoleh: 0,
    feed: "",
    room_no: "",
    p_morning: "",
    p_Evening: "",
    p_Night: "",
    toz_kardeks: "",
    movement_Status: "",
    blood_Ban: 0,
    fracture_Type: 0,
    braceelet: 0,
    need_Wheelchair: false,
    time_j: "",
    bed_serial: 0,
  });

  const toggleModal = () => setModalOpen(!isModalOpen);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    mutate(patientData);
    toggleModal();
  };
  const openEditModal = (data: RegisterPatientData) => {
    setPatientData(data);
    setEditMode(true);
    setModalOpen(true);
};

const openRegisterModal = () => {
    setPatientData(initialPatientData);
    setEditMode(false);
    setModalOpen(true);
};


  return (
    <>
      <div className="flex flex-col w-full text-gray-600 rounded-lg p-4 mt-8">
        <p className="text-lg text-gray-700 font-bold text-right mb-4 justify-end">
          مشخصات بیمار
        </p>
        <div className="flex gap-2 mb-4 justify-end w-full">
          <button onClick={toggleModal} className="btn btn-primary w-auto">
            ثبت مشخصات بیمار +
          </button>
          <input
            type="text"
            placeholder="جستجوی بیمار"
            className="input input-bordered w-full text-right"
          />
        </div>
        {isModalOpen && (
          <div className="modal modal-open" dir="rtl" onClick={toggleModal}>
            <div
              className="modal-box w-11/12 max-w-5xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold text-lg mb-4">ثبت مشخصات بیمار</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">شماره پذیرش </label>
                  <input
                    type="text"
                    name="no_pazir"
                    value={patientData.no_pazir}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نام بیمار</label>
                  <input
                    type="text"
                    name="name_b"
                    value={patientData.name_b}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">نام پزشک</label>
                  <input
                    type="text"
                    name="name_b"
                    value={patientData.name_p}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">نام تخت</label>
                  <input
                    type="text"
                    name="bed_name"
                    value={patientData.bed_name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نام اتاق</label>
                  <input
                    type="text"
                    name="room_name"
                    value={patientData.room_name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نام بخش</label>
                  <input
                    type="text"
                    name="name_bakhsh"
                    value={patientData.name_bakhsh}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">تاریخ بستری</label>
                  <input
                    type="date"
                    name="bast_date"
                    value={patientData.bast_date}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">پزشک صبح</label>
                  <input
                    type="text"
                    name="p_morning"
                    value={patientData.p_morning}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">پزشک عصر</label>
                  <input
                    type="text"
                    name="p_Evening"
                    value={patientData.p_Evening}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">پزشک شب</label>
                  <input
                    type="text"
                    name="p_Night"
                    value={patientData.p_Night}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">نام بیماری</label>
                  <input
                    type="text"
                    name="name_bimari"
                    value={patientData.name_bimari}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">جنسیت</label>
                  <select
                    name="sex"
                    value={patientData.sex}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">ایزوله</label>
                  <input
                    type="number"
                    name="isoleh"
                    value={patientData.isoleh}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">توضیح کاردکس</label>
                  <input
                    type="text"
                    name="toz_kardeks"
                    value={patientData.toz_kardeks}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نوع تغذیه </label>
                  <input
                    type="text"
                    placeholder="feed "
                    name="feed"
                    value={patientData.feed}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">شماره اتاق</label>
                  <input
                    type="text"
                    name="room_no"
                    value={patientData.room_no}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">ممنوعیت تجویز </label>
                  <input
                    type="text"
                    name="blood_Ban"
                    value={patientData.blood_Ban}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">وضعیت حرکت</label>
                  <input
                    type="text"
                    name="movement_Status"
                    value={patientData.movement_Status}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">نوع شکستگی</label>
                  <input
                    type="number"
                    name="fracture_Type"
                    value={patientData.fracture_Type}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">دستبند</label>
                  <select
                    name="braceelet"
                    value={patientData.braceelet}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />

                  <label className="label">سریال تخت</label>
                  <input
                    type="number"
                    name="bed_serial"
                    value={patientData.bed_serial}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                  <label className="label">نیاز به ویلچر</label>
                  <select
                    name="need_Wheelchair"
                    value={patientData.need_Wheelchair ? "true" : "false"}
                    onChange={(e) =>
                      handleChange({
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
                <button onClick={toggleModal} className="btn">
                  بستن
                </button>
                <button onClick={handleSubmit} className="btn btn-primary">
                  ثبت
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <PatientTable />
    </>
  );
};

export default CardexRegister;
