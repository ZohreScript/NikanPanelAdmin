import React, { useState, useEffect } from "react";
import { useWardEvents } from "../../hooks/useWardEvents";
import { useWardList } from "../../hooks/useWardList";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import RoomDetails from "./RoomDetails";

const DetailsParts: React.FC = () => {
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const { ward, year, month } = useSelector(
    (state: RootState) => state.selectedWard
  );

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {
    data: wardEventsData,
    isLoading,
    error,
    refetch,
  } = useWardEvents(
    1,
    1000,
    year ?? 0, 
    month ?? 0,
    ward,
    isInitialLoad
  );

  const { data: wardList, isLoading: isWardListLoading } = useWardList(true);

  const handleRoomDetailsClick = (wardName: string) => {
    setSelectedWard(wardName);
  };
  

  const wardEvents = wardEventsData?.wardEventsDetailes || [];

  const wardIdToNameMap = wardList?.reduce(
    (acc, ward) => ({ ...acc, [ward.wardId]: ward.wardName }), 
    {}
  );
  

  const enrichedWardEvents = wardEvents.map((event) => ({
    ...event,
    wardName: wardIdToNameMap ? event.wardName : event.wardName, // اصلاح نام بخش
  }));
  
  const filteredWardEvents =
    ward === null || ward === ""
      ? enrichedWardEvents
      : enrichedWardEvents.filter((wardEvent) => wardEvent.wardId === Number(ward)); // اصلاح شرط فیلتر
  
  useEffect(() => {
    if (wardEventsData) {
      setIsInitialLoad(false);
    }
  }, [wardEventsData]);

  useEffect(() => {
    if (!isInitialLoad) {
      console.log("Fetching with filters:", { ward, year, month });
      refetch();
    }
  }, [ward, year, month, refetch, isInitialLoad]);

  if (isLoading || isWardListLoading || isInitialLoad) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="mt-2 p-6 grid grid-cols-1 gap-5">
      <div className="card flex flex-col bg-white w-full text-gray-600 p-4 shadow-2xl">
        <p className="text-lg text-gray-700 font-bold text-right mb-4 justify-end">
          جزییات بخش
        </p>

        <div className="overflow-y-auto" dir="rtl">
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
                    <button
                      onClick={() => handleRoomDetailsClick(ward.wardName)}
                      className="text-blue-500"
                    >
                      مشاهده اتاقها
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedWard && <RoomDetails wardName={selectedWard} />}
    </div>
  );
};

export default DetailsParts;