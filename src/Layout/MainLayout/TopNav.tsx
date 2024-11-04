import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useAppContext } from "../../context/app/App-context";
import SelectBar from "./SelectBar";
import moment from "moment-jalaali";
import { useWardList } from "../../hooks/useWardList";

moment.loadPersian({ usePersianDigits: false });

const monthOptions = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const currentYear = moment().jYear();
const yearOptions = [String(currentYear), String(currentYear - 1)];

const TopNav: React.FC = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  const { data: wards, isPending: isLoadingWards } = useWardList(true);

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleMonthChange = () => {
    console.log("month change");
  };

  const handleYearChange = () => {
    console.log("yearchange");
  };

  return (
    <nav className="bg-white md:flex sm:flex relative text-gray-600 items-center shadow-md justify-between">
      <ul className="flex space-x-4">
        <button
          className="text-gray-800 p-2 focus:outline-none md:hidden block"
          onClick={toggleSidebar}
        >
          {showSidebar ? (
            <FaBars className="text-gray-600" />
          ) : (
            <FaTimes className="text-gray-600" />
          )}
        </button>
        <div className="navbar">
          <div className="flex-none gap-2 flex items-center justify-center">
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  className="w-10 h-10 rounded-full border border-gray-200 flex text-center items-center justify-center"
                  style={{ display: "flex" }}
                >
                  <FaUser className="w-4 h-4 text-center text-gray-600" />
                </div>
              </div>

              <ul
                dir="rtl"
                tabIndex={0}
                className="menu menu-sm dropdown-content gap-y-2 bg-white border border-gray-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                style={{ textAlign: "right" }}
              >
                <li className="flex justify-end text-red-600">
                  <a className="text-right w-full" onClick={handleLogout}>
                    خروج
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ul>

      <div className="flex items-center gap-3 md:ms-auto ms-0 me-3">
        <SelectBar
          yearOptions={yearOptions}
          monthOptions={monthOptions}
          wardOptions={wards?.map((ward) => ward.wardName) || []}
          isLoadingWards={isLoadingWards}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
        />
        <button
          className="text-gray-800 focus:outline-none md:block hidden"
          onClick={toggleSidebar}
        >
          {showSidebar ? (
            <FaBars className="text-gray-600" />
          ) : (
            <FaTimes className="text-gray-600" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
