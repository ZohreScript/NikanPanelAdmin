import React from "react";
import { useForm } from "react-hook-form";
import { RegisterPatientData } from "../../types/types";

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

  // پر کردن مقادیر اولیه هنگام باز شدن مودال
  React.useEffect(() => {
    if (isOpen) {
      Object.entries(patientData).forEach(([key, value]) => {
        setValue(key as keyof RegisterPatientData, value);
      });
      console.log("patient data", patientData);
    }
  }, [isOpen, patientData, setValue]);

  // بررسی شماره پذیرش برای جلوگیری از تکراری بودن
  const validateDuplicate = (no_pazir: string) => {
    return (
      !existingPatients.some(
        (patient) => patient.no_pazir === no_pazir
      ) || "این شماره پذیرش قبلاً ثبت شده است!"
    );
  };

  // تابع نهایی برای پردازش داده‌های فرم
  const onSubmit = (data: RegisterPatientData) => {
    console.log("data submit", data);
    onSubmitmodal(data); // داده‌ها را به والد ارسال می‌کند
    onClose(); // مودال را می‌بندد
  };

  // فراخوانی هندلر برای ارسال فرم
  const submitHandler = handleSubmit(onSubmit);

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

        {/* ارسال داده‌ها از طریق تابع submitHandler */}
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
              <label className="label">شماره پذیرش</label>
              <input
                type="text"
                {...register("no_pazir", {
                  required: "شماره پذیرش الزامی است",
                  validate: validateDuplicate,
                })}
                className={`input input-bordered w-full ${
                  errors.no_pazir ? "border-red-500" : ""
                }`}
              />
              {errors.no_pazir && (
                <span className="text-red-500 text-sm">
                  {errors.no_pazir.message}
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
