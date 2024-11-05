import React, { useState, useEffect } from "react";
import { useWardEvents } from "../../hooks/useWardEvents";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const DetailsParts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const { ward, year, month } = useSelector(
    (state: RootState) => state.selectedWard
  );
  const { data, isLoading, error, refetch } = useWardEvents(
    page,
    count,
    year,
    month,
    ward
  );

  useEffect(() => {
    refetch();
  }, [count, page, year, month, ward, refetch]);

  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(Number(e.target.value));
    setPage(1);
  };


  const wardEvents = data?.wardEventsDetailes || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / count);
  const dynamicHeight = `${Math.min(wardEvents.length, count) * 50}px`; // 50px for each row height, adjust as needed

  const filteredWardEvents = ward === null || ward === ""
    ? wardEvents 
    : wardEvents.filter((wardEvent) => wardEvent.wardName === ward); 

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="mt-2 p-6 grid grid-cols-1 gap-5">
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
        <p className="text-lg text-gray-700 font-bold text-right mb-4 justify-end">
          جزییات بخش
        </p>

        {/* Dynamic Table Height */}
        <div
          className="overflow-y-auto"
          style={{ height: dynamicHeight }}
          dir="rtl"
        >
          <table className="w-full text-left text-gray-500">
            <thead className="mt-2 text-right">
              <tr>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  نام بخش
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  زنگ عادی
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  زنگ استف
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  زنگ اضطراری
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  میانگین پاسخ دهی
                </th>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  جزئیات
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredWardEvents.map((ward, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 text-center"
                >
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {ward.wardName}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {ward.ring}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {ward.staffRing}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {ward.emergencyRing}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {ward.averageOfAnswerinSecond}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    <a
                      href={`/roomdetails/${ward.wardName}`}
                      className="text-blue-500 "
                    >
                      مشاهده اتاقها
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
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

export default DetailsParts;