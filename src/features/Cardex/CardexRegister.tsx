// src/components/CardexRegister.tsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPatient, updatePatient, setLoading } from '../../slices/patientsSlice';
import { RegisterPatientData, RegisterPatientResponse } from '../../types/types';
import PatientTable from './PatientTable';
import PatientModal from './PatientModal';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { useRegisterPatient } from '../../hooks/useRegisterPatient';
import useUpdatePatientMutation from '../../hooks/useEditPatient';
import { usePatientInformations } from '../../hooks/usePatientInformations';
import { RootState } from '../../store/store';

const initialPatientData: RegisterPatientData = {
  no_pazir: '',
  id: 0,
  name_b: '',
  bed_name: '',
  room_name: '',
  name_bakhsh: '',
  bast_date: '',
  name_p: '',
  name_bimari: '',
  sex: 0,
  sen: 0,
  isoleh: 0,
  feed: '',
  room_no: '',
  p_morning: '',
  p_Evening: '',
  p_Night: '',
  toz_kardeks: '',
  movement_Status: '',
  blood_Ban: 0,
  fracture_Type: 0,
  braceelet: 0,
  need_Wheelchair: false,
  time_j: '',
  bed_serial: 0,
};

const CardexRegister = () => {
  const [patientData, setPatientData] = useState<RegisterPatientData>(initialPatientData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const patients = useSelector((state: RootState) => state.patients.patients);

  const { mutate } = useRegisterPatient();
  const { mutate: editPatient } = useUpdatePatientMutation(patientData);
  const { data: patientInfos, refetch } = usePatientInformations(1, 10);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleSubmit = (data: RegisterPatientData) => {
    console.log("Submitted data from modal:", data); // داده‌های جدید
    setIsSubmitting(true);
    dispatch(setLoading(true));
    if (isEditMode) {
      editPatient(data, { // اینجا باید `data` استفاده شود
        onSuccess: (response: RegisterPatientResponse | null) => {
          if (response?.resualt === true) { 
            handleSuccess(data); // مقدار ویرایش‌شده
            toast.success("اطلاعات بیمار با موفقیت ویرایش شد.");
            console.log("Response Data:", response);
          } else {
            console.log("Response Data:false", response);
            toast.error(response?.msg || "ویرایش اطلاعات بیمار ناموفق بود.");
          }
          setIsSubmitting(false);
        },
        onError: () => {
          toast.error("خطا در ویرایش اطلاعات بیمار.");
          setIsSubmitting(false);
        },
      });
    } else {
      mutate(data, { // اینجا هم مقدار `data` برای ثبت بیمار جدید
        onSuccess: (response: RegisterPatientResponse | null) => {
          if (response?.resualt === true) { 
            toast.success("بیمار جدید با موفقیت ثبت شد.");
            handleSuccess(data); // مقدار جدید ثبت‌شده
            console.log("Response Data:", data);
          } else {
            toast.error(response?.msg || "ثبت مشخصات بیمار ناموفق بود.");
            console.log("Response Data:", response);
          }
          setIsSubmitting(false);
        },
        onError: () => {
          toast.error("خطا در ثبت بیمار.");
          setIsSubmitting(false);
        },
      });
    }
  };
  

  const handleSuccess = (newPatientData: RegisterPatientData) => {
    console.log("Data received in handleSuccess:", newPatientData);
    if (isEditMode) {
      dispatch(updatePatient(newPatientData));
      console.log("update",newPatientData)
      console.log( dispatch(updatePatient(newPatientData)));

    } else {
      dispatch(addPatient(newPatientData));
    }
    refetch();
    toggleModal();
  };

  useEffect(() => {
    if (!isSubmitting) {
      refetch(); 
    }
  }, [isSubmitting, refetch]);

  const openEditModal = (data: RegisterPatientData) => {
    console.log("Opening edit modal with data:", data);
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
          onSubmitmodal={handleSubmit}
          // onChange={handleChange}
          existingPatients={patients}
        />
      </div>
      <PatientTable patients={patientsData} openEditModal={openEditModal} />
      <ToastContainer />
    </>
  );
};

export default CardexRegister;
