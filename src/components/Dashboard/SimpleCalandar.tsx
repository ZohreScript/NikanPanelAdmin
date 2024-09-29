import { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, CalendarProvider,  } from "zaman";

const SimpleCalandar: React.FC = () => {
  const [calendarValue, setCalendarValue] = useState<Date | undefined>(new Date());

  const handleChange = () => {
    setCalendarValue(new Date());
  };

  return (
    <div className="mt-2 p-6 grid grid-cols-12 gap-2">
      <div className="card flex flex-col col-span-12 md:col-span-5 md:col-end-13 bg-white w-full text-gray-600 p-4 shadow-2xl">
        <p className="md:text-lg text-sm text-gray-700 font-bold text-right mb-4">
          تقویم ساده
        </p>
        <div className="flex justify-center items-center">
          <CalendarProvider locale="fa" round="x2">
            <Calendar
              defaultValue={calendarValue}
              onChange={handleChange}
            />
          </CalendarProvider>
        </div>
      </div>
    </div>
  );
};

export default SimpleCalandar;
