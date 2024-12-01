import React from "react";
import { useWardEvents } from "../../hooks/useWardEvents";

interface RoomDetailsProps {
  wardName: string;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ wardName }) => {
  const { data, isLoading, error } = useWardEvents(
    1,
    10,
    null,
    null,
    wardName,
    false // مقداردهی `isInitialLoad`
  );

  const roomDetails = data?.wardEventsDetailes?.[0]?.roomDetail || [];

  if (isLoading) return <p>Loading room details...</p>;
  if (error) return <p>Error loading room details</p>;

  return (
    <div className="card flex flex-col bg-white w-full text-gray-600 p-4 mt-8 shadow-2xl">
      <p className="text-lg text-gray-700 font-bold text-right mb-4 justify-end">
        جزییات اتاق
      </p>
      <div className="overflow-y-auto" dir="rtl">
        <table className="w-full text-left text-gray-500">
          <thead className="mt-2 text-right">
            <tr>
              <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                نام اتاق
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
            </tr>
          </thead>
          <tbody>
            {roomDetails.map((room, index) => (
              <tr key={index} className="border-b border-gray-200 text-center">
                <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                  {room.roomName}
                </td>
                <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                  {room.ring}
                </td>
                <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                  {room.staffRing}
                </td>
                <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                  {room.emergencyRing}
                </td>
                <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                  {room.averageOfAnswerinSecond}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomDetails;
