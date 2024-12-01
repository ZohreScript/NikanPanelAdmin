
import React, { useState, useEffect } from "react";
import { usePatientInformations } from "../../hooks/usePatientInformations";
import { BsThreeDots } from "react-icons/bs";
import { PatientInfo } from "../../types/types";

interface PatientTableProps {
  openEditModal: (patientData: PatientInfo) => void;
  patients: PatientInfo[]; 

}


const PatientTable: React.FC<PatientTableProps> = ({ openEditModal }) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const { data, isLoading, error, refetch } = usePatientInformations(
    page,
    count
  );

  useEffect(() => {
    refetch();
  }, [page, count, refetch]);

 
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / count);

  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(Number(e.target.value));
    setPage(1);
  };
  
  const patientdetails = data?.patientInfos || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="p-6 grid grid-cols-1 gap-5">
      <div className="flex justify-between items-center">
        <select
          value={count}
          onChange={handleCountChange}
          className="border p-2"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
        <p>
          صفحه {page} از {totalPages}
        </p>
      </div>

      <div className="card flex flex-col bg-white w-full text-gray-600 p-4 shadow-2xl">
        <div className="overflow-x-auto overflow-y-auto max-w-11/12" dir="rtl">
          <table className="w-full text-left text-gray-500">
            <thead className="text-right">
              <tr>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  ردیف
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  شماره پذیرش
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  نام بیمار
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  نام پزشک
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  بخش
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  شماره اتاق
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  نام اتاق
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  شماره تخت
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  نام تخت
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  نوع تغذیه
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  وضعیت حرکت
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  تاریخ بستری
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  نام بیماری
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  پزشک صبح
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  پزشک عصر
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  پزشک شب
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  توضیح کاردکس
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  ممنوعیت تجویز
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  رنگ دستبند
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  نوع شکستگی
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  ایزوله
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  نیاز به ویلچر
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  time-j
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400 whitespace-nowrap">
                  تنظیمات
                </th>
              </tr>
            </thead>
            <tbody>
              {patientdetails.map((patient, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 text-center hover:bg-blue-100" 
                >
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {index + 1 + (page - 1) * count}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.no_pazir}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.name_b}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700 whitespace-nowrap px-4">
                    {patient.name_p}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.name_bakhsh}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.room_no}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.room_name}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.bed_serial}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.bed_name}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.feed}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.movement_Status}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.bast_date}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.name_bimari}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.p_morning}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.p_Evening}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.p_Night}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 whitespace-nowrap">
                    {patient.toz_kardeks}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.blood_Ban}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.braceelet}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.fracture_Type}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.isoleh}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.need_Wheelchair ? "Yes" : "No"}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700">
                    {patient.time_j}
                  </td>
                  <td className="py-4 px-0.5 text-sm font-bold text-navy-700 items-center justify-center flex">
                    <div className="dropdown dropdown-left " >
                      <div tabIndex={0} role="button" className=" m-1">
                        <BsThreeDots className="text-2xl" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content  menu bg-slate-50 rounded-sm z-[1] p-1 w-52 mt-2  shadow-lg"
                      >
                        <li>
                          <a className="whitespace-nowrap" 
                          onClick={() => openEditModal(patient)}
                          >ویرایش مشخصات بیمار </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="text-sm px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            بعدی
          </button>
          <span>
            صفحه {page} از {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="text-sm px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            قبلی
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;
