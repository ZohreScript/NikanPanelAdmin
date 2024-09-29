import React from 'react';

interface DataItem {
  name: string;
  progress: string;
  quantity: number;
  date: string;
  hasCheckbox?: boolean; // Optional if not all items have checkboxes
}

const DetailsParts: React.FC = () => {
  const data: DataItem[] = [
    {
      name: "1",
      progress: "تست",
      quantity: 2458,
      date: "تست",
    },
  ];

  return (
    <div className="mt-2 p-6 grid grid-cols-1 gap-5 ">
      <div className="card flex flex-col bg-white w-full text-gray-600 p-4 shadow-2xl">
        <p className="text-lg text-gray-700 font-bold text-right mb-4 justify-end">جزییات بخش</p>
        <div className="overflow-x-auto" dir="rtl">
          <table className="w-full text-left text-gray-500">
            <thead className="mt-2 text-right">
              <tr>
                <th className="border-b border-gray-200 pr-8 pb-2 text-sm font-bold tracking-wide text-gray-400">
                  ردیف
                </th>
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
              {data.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 text-center">
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    <div className="flex items-center gap-2">
                      {row.hasCheckbox && (
                        <input
                          type="checkbox"
                          className="h-5 w-5 border-gray-300 rounded-md hover:cursor-pointer"
                        />
                      )}
                      {row.name}
                    </div>
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.progress}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.quantity}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.date}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.progress}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.quantity}
                  </td>
                  <td className="pt-4 pb-4 text-sm font-bold text-navy-700">
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailsParts;
