import { useState } from "react";
import { useRegisterPatient } from "../../hooks/useRegisterPatient";
import PatientTable from "./PatientTable";
import { RegisterPatientData, RegisterPatientResponse } from "../../types/types";
import PatientModal from "./PatientModal";
import "react-toastify/dist/ReactToastify.css";
import useUpdatePatientMutation from "../../hooks/useEditPatient";
import { ToastContainer, toast } from "react-toastify";
import { usePatientInformations } from "../../hooks/usePatientInformations";

const initialPatientData: RegisterPatientData = {
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
};

const CardexRegister = () => {
  const [patientData, setPatientData] = useState<RegisterPatientData>(initialPatientData);
  const [isModalOpen, setModalOpen] = useState(false);
  const { mutate } = useRegisterPatient();
  const { mutate: editPatient } = useUpdatePatientMutation();
  const { data: patientInfos, refetch } = usePatientInformations(1, 10);
  const [isEditMode, setEditMode] = useState(false);
  const [patients, setPatients] = useState<RegisterPatientData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);  // اضافه کردن وضعیت برای در حال ارسال بودن

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSuccess = (newPatientData: RegisterPatientData) => {
    if (isEditMode) {
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.no_pazir === newPatientData.no_pazir ? newPatientData : patient
        )
      );
      toast.success("اطلاعات بیمار با موفقیت ویرایش شد.");
    } else {
      setPatients((prevPatients) => [...prevPatients, newPatientData]);
      toast.success("بیمار جدید با موفقیت ثبت شد.");
    }
    refetch();
  };

  const handleSubmit = () => {
    setIsSubmitting(true); // حالت در حال ارسال
  
    if (isEditMode) {
      // ویرایش بیمار
      editPatient(patientData, {
        onSuccess: (updatedData: RegisterPatientResponse | null) => {
          if (updatedData && updatedData.data) { 
            handleSuccess(updatedData.data);
            setIsSubmitting(false); 
            toggleModal();
          } else {
            setIsSubmitting(false); 
            toast.error("ویرایش اطلاعات بیمار ناموفق بود. لطفاً دوباره تلاش کنید.");
            console.log(updatedData?.data)
          }
        },
        onError: () => {
          setIsSubmitting(false); 
          toast.error("خطا در ویرایش اطلاعات بیمار.");
        },
      });
    } else {
      mutate(patientData, {
        onSuccess: (newData: RegisterPatientResponse | null) => {
          if (newData && newData.data) {  
            handleSuccess(newData.data);
            setIsSubmitting(false); 
            toast.success("ثبت بیمار با موفقیت انجام شد.");
            console.log("newData:", newData.data);
          } else {
            setIsSubmitting(false);
            toast.error("ثبت بیمار ناموفق بود. لطفاً دوباره تلاش کنید.");
            console.log(newData?.data)
          }
        },
        onError: () => {
          setIsSubmitting(false); 
          toast.error("خطا در ثبت بیمار.");
        },
      });
    }
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

  const patientsData = patientInfos ? (Array.isArray(patientInfos) ? patientInfos : []) : [];

  return (
    <>
      <div className="flex flex-col w-full text-gray-600 rounded-lg p-4 mt-8">
        <p className="text-lg text-gray-700 font-bold text-right mb-4 justify-end">مشخصات بیمار</p>
        <div className="flex gap-2 mb-4 justify-end w-full">
          <button onClick={openRegisterModal} className="btn btn-primary w-auto" disabled={isSubmitting}>
            ثبت مشخصات بیمار +
          </button>
          <input
            type="text"
            placeholder="جستجوی بیمار"
            className="input input-bordered w-full text-right"
          />
        </div>
        <PatientModal
          isOpen={isModalOpen}
          patientData={patientData}
          isEditMode={isEditMode}
          onClose={toggleModal}
          onSubmit={handleSubmit}
          onChange={handleChange}
          existingPatients={patients}
        />
      </div>
      <PatientTable patients={patientsData} openEditModal={openEditModal} />
      <ToastContainer />
    </>
  );
};

export default CardexRegister;
