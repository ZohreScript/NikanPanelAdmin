/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { RegisterPatientData } from "../../types/types";
import { utils } from "react-modern-calendar-datepicker";
import { useDataSettings } from "../../hooks/useDataSettings";

interface PatientModalProps {
  isOpen: boolean;
  patientData: RegisterPatientData;
  isEditMode: boolean;
  onClose: () => void;
  onSubmitmodal: (data: RegisterPatientData) => void;
  existingPatients: RegisterPatientData[];
}

const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  patientData,
  isEditMode,
  onClose,
  onSubmitmodal,
  existingPatients,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPatientData>({
    defaultValues: patientData,
  });

  const today = utils("fa").getToday();
  const todayString = `${today.year}-${String(today.month).padStart(
    2,
    "0"
  )}-${String(today.day).padStart(2, "0")}`;
  const [selectedDate, setSelectedDate] = useState<string | null>(todayString);

  useEffect(() => {
    if (isOpen) {
      Object.entries(patientData).forEach(([key, value]) => {
        setValue(key as keyof RegisterPatientData, value);
      });
    }
  }, [isOpen, patientData, setValue]);

  const { data: braceelet } = useDataSettings(0, 0);
console.log("braceelet",braceelet)
  // هندل تغییر تاریخ
  const handleDateChange = (date: any) => {
    const formattedDate = date?.format("YYYY/MM/DD"); // تبدیل به فرمت رشته
    setSelectedDate(formattedDate || null);
    setValue("bast_date", formattedDate || ""); // ذخیره در فرم
  };

  const validateDuplicate = (no_pazir: string) => {
    return (
      !existingPatients.some((patient) => patient.no_pazir === no_pazir) ||
      "این شماره پذیرش قبلاً ثبت شده است!"
    );
  };

  const onSubmit = (data: RegisterPatientData) => {
    onSubmitmodal({ ...data, bast_date: selectedDate || "" }); // ارسال داده با تاریخ انتخابی
    onClose();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">شماره پذیرش </label>
              <input
                type="text"
                {...register("no_pazir", { required: "شماره  الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.no_pazir ? "border-red-500" : ""
                }`}
              />
              {errors.no_pazir && (
                <span className="text-red-500 text-sm">
                  {errors.no_pazir.message}
                </span>
              )}

              <label className="label">نام بیمار</label>
              <input
                type="text"
                {...register("name_b", { required: "نام بیمار الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.name_b ? "border-red-500" : ""
                }`}
              />
              {errors.name_b && (
                <span className="text-red-500 text-sm">
                  {errors.name_b.message}
                </span>
              )}

              <label className="label">نام پزشک</label>
              <input
                type="text"
                {...register("name_p", { required: "نام پزشک الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.name_p ? "border-red-500" : ""
                }`}
              />
              {errors.name_p && (
                <span className="text-red-500 text-sm">
                  {errors.name_p.message}
                </span>
              )}

              <div>
                <label className="label">سریال تخت </label>
                <input
                  type="text"
                  {...register("bed_serial", {
                    required: "شماره سریال  الزامی است",
                  })}
                  className={`input input-bordered w-full ${
                    errors.bed_serial ? "border-red-500" : ""
                  }`}
                />
                {errors.bed_serial && (
                  <span className="text-red-500 text-sm">
                    {errors.bed_serial.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label">تاریخ بستری</label>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="w-full"
                  inputClass={`input input-bordered w-full ${
                    errors.bast_date ? "border-red-500" : ""
                  }`}
                />
                {errors.bast_date && (
                  <span className="text-red-500 text-sm">
                    {errors.bast_date?.message}
                  </span>
                )}
              </div>

              <label className="label">نام تخت</label>
              <input
                type="text"
                {...register("bed_name", { required: "نام تخت الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.bed_name ? "border-red-500" : ""
                }`}
              />
              {errors.bed_name && (
                <span className="text-red-500 text-sm">
                  {errors.bed_name.message}
                </span>
              )}

              <label className="label">نام اتاق</label>
              <input
                type="text"
                {...register("room_name", { required: "نام اتاق الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.room_name ? "border-red-500" : ""
                }`}
              />
              {errors.room_name && (
                <span className="text-red-500 text-sm">
                  {errors.room_name.message}
                </span>
              )}

              <label className="label">نام بخش</label>
              <input
                type="text"
                {...register("name_bakhsh", { required: "نام بخش الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.name_bakhsh ? "border-red-500" : ""
                }`}
              />
              {errors.name_bakhsh && (
                <span className="text-red-500 text-sm">
                  {errors.name_bakhsh.message}
                </span>
              )}

              <label className="label">نام پزشک صبح</label>
              <input
                type="text"
                {...register("p_morning", {
                  required: "نام پزشک صبح الزامی است",
                })}
                className={`input input-bordered w-full ${
                  errors.p_morning ? "border-red-500" : ""
                }`}
              />
              {errors.p_morning && (
                <span className="text-red-500 text-sm">
                  {errors.p_morning.message}
                </span>
              )}

              <label className="label">نام پزشک عصر</label>
              <input
                type="text"
                {...register("p_Evening", {
                  required: "نام پزشک عصر الزامی است",
                })}
                className={`input input-bordered w-full ${
                  errors.p_Evening ? "border-red-500" : ""
                }`}
              />
              {errors.p_Evening && (
                <span className="text-red-500 text-sm">
                  {errors.p_Evening.message}
                </span>
              )}
              <label className="label">نام پزشک شب</label>
              <input
                type="text"
                {...register("p_Night", { required: "نام پزشک شب الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.p_Night ? "border-red-500" : ""
                }`}
              />
              {errors.p_Night && (
                <span className="text-red-500 text-sm">
                  {errors.p_Night.message}
                </span>
              )}

              <label className="label">نام بیماری </label>
              <input
                type="text"
                {...register("name_bimari", {
                  required: "نام بیماری  الزامی است",
                })}
                className={`input input-bordered w-full ${
                  errors.name_bimari ? "border-red-500" : ""
                }`}
              />
              {errors.name_bimari && (
                <span className="text-red-500 text-sm">
                  {errors.name_bimari.message}
                </span>
              )}
              <label className="label">جنسیت</label>
              <select
                {...register("sex", { required: "انتخاب جنسیت الزامی است" })}
                className={`select select-bordered w-full ${
                  errors.sex ? "border-red-500" : ""
                }`}
              >
                <option value="">لطفاً جنسیت را انتخاب کنید</option>
                <option value="1">مرد</option>
                <option value="2">زن</option>
              </select>
              {errors.sex && (
                <span className="text-red-500 text-sm">
                  {errors.sex.message}
                </span>
              )}
            </div>
            <div>
              <label className="label">سن </label>
              <input
                type="number"
                {...register("sen", { required: "نام بیماری  الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.sen ? "border-red-500" : ""
                }`}
              />
              {errors.sen && (
                <span className="text-red-500 text-sm">
                  {errors.sen.message}
                </span>
              )}
              <label className="label">ایزوله </label>
              <input
                type="number"
                {...register("sen", { required: "ایزوله   الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.isoleh ? "border-red-500" : ""
                }`}
              />
              {errors.isoleh && (
                <span className="text-red-500 text-sm">
                  {errors.isoleh.message}
                </span>
              )}

              {/* توضیح کاردکس */}
              <label className="label">توضیح کاردکس</label>
              <input
                type="text"
                {...register("toz_kardeks", {
                  required: "توضیح کاردکس الزامی است",
                })}
                className={`input input-bordered w-full ${
                  errors.toz_kardeks ? "border-red-500" : ""
                }`}
              />
              {errors.toz_kardeks && (
                <span className="text-red-500 text-sm">
                  {errors.toz_kardeks.message}
                </span>
              )}

              {/* نوع تغذیه */}
              <label className="label">نوع تغذیه</label>
              <input
                type="text"
                {...register("feed", { required: "نوع تغذیه الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.feed ? "border-red-500" : ""
                }`}
              />
              {errors.feed && (
                <span className="text-red-500 text-sm">
                  {errors.feed.message}
                </span>
              )}

              {/* شماره اتاق */}
              <label className="label">شماره اتاق</label>
              <input
                type="text"
                {...register("room_no", { required: "شماره اتاق الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.room_no ? "border-red-500" : ""
                }`}
              />
              {errors.room_no && (
                <span className="text-red-500 text-sm">
                  {errors.room_no.message}
                </span>
              )}

              {/* ممنوعیت تجویز */}
              <label className="label">ممنوعیت تجویز</label>
              <input
                type="text"
                {...register("blood_Ban", {
                  required: "ممنوعیت تجویز الزامی است",
                })}
                className={`input input-bordered w-full ${
                  errors.blood_Ban ? "border-red-500" : ""
                }`}
              />
              {errors.blood_Ban && (
                <span className="text-red-500 text-sm">
                  {errors.blood_Ban.message}
                </span>
              )}

              {/* وضعیت حرکت */}
              <label className="label">وضعیت حرکت</label>
              <input
                type="text"
                {...register("movement_Status", {
                  required: "وضعیت حرکت الزامی است",
                })}
                className={`input input-bordered w-full ${
                  errors.movement_Status ? "border-red-500" : ""
                }`}
              />
              {errors.movement_Status && (
                <span className="text-red-500 text-sm">
                  {errors.movement_Status.message}
                </span>
              )}

              {/* نوع شکستگی */}
              <label className="label">نوع شکستگی</label>
              <input
                type="number"
                {...register("fracture_Type", {
                  required: "نوع شکستگی الزامی است",
                  valueAsNumber: true,
                })}
                className={`input input-bordered w-full ${
                  errors.fracture_Type ? "border-red-500" : ""
                }`}
              />
              {errors.fracture_Type && (
                <span className="text-red-500 text-sm">
                  {errors.fracture_Type.message}
                </span>
              )}

              {/* دستبند */}
              <label className="label">دستبند</label>
              <select
        {...register("braceelet", {
          required: "انتخاب دستبند الزامی است",
        })}
        className={`select select-bordered w-full ${
          errors.braceelet ? "border-red-500" : ""
        }`}
      >
        <option value="">لطفاً انتخاب کنید</option>
        {braceelet?.map((item) => (
            <option key={item.id} value={item.value}>
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-1 inline-block"
                  style={{
                    backgroundColor: `rgb(${(item.color >> 16) & 255}, ${
                      (item.color >> 8) & 255
                    }, ${item.color & 255})`,
                  }}
                ></div>
                {item.value}
              </div>
            </option>
          ))}
      </select>
      {errors.braceelet && (
        <span className="text-red-500 text-sm">{errors.braceelet.message}</span>
      )}

              {/* time-j */}
              <label className="label">مدت بستری</label>
              <input
                type="text"
                {...register("time_j", { required: "time-j الزامی است" })}
                className={`input input-bordered w-full ${
                  errors.time_j ? "border-red-500" : ""
                }`}
              />
              {errors.time_j && (
                <span className="text-red-500 text-sm">
                  {errors.time_j.message}
                </span>
              )}

              {/* سریال تخت */}
              <label className="label">سریال تخت</label>
              <input
                type="number"
                {...register("bed_serial", {
                  required: "سریال تخت الزامی است",
                  valueAsNumber: true,
                })}
                className={`input input-bordered w-full ${
                  errors.bed_serial ? "border-red-500" : ""
                }`}
              />
              {errors.bed_serial && (
                <span className="text-red-500 text-sm">
                  {errors.bed_serial.message}
                </span>
              )}

              {/* نیاز به ویلچر */}
              <label className="label">نیاز به ویلچر</label>
              <select
                {...register("need_Wheelchair", {
                  required: "انتخاب ویلچر الزامی است",
                })}
                className={`select select-bordered w-full ${
                  errors.need_Wheelchair ? "border-red-500" : ""
                }`}
              >
                <option value="">لطفاً انتخاب کنید</option>
                <option value="true">بله</option>
                <option value="false">خیر</option>
              </select>
              {errors.need_Wheelchair && (
                <span className="text-red-500 text-sm">
                  {errors.need_Wheelchair.message}
                </span>
              )}
            </div>
          </div>
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              بستن
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isEditMode ? "ذخیره تغییرات" : "ثبت"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientModal;
