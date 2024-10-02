import { FaBars, FaTimes } from 'react-icons/fa';
import { useAppContext } from '../../context/app/App-context';
import CustomSelectBox from '../../components/CustomSelectBox';

// Define the arrays with types
const part: string[] = ['همه', 'بخش یک', 'بخش دو', 'بخش سه', 'بخش چهار'];
const mounth: string[] = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

const TopNav: React.FC = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  const handleLogout = () => {
    console.log('User logged out');
    localStorage.removeItem('user');
    window.location.href = '/login';
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
          <div className="flex-none gap-2 flex items-center">
            {/* Profile Image */}
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>

              <ul
                dir="rtl"
                tabIndex={0}
                className="menu menu-sm dropdown-content gap-y-2 bg-white border border-gray-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                style={{ textAlign: 'right' }}
              >
                <li className="flex justify-end">
                  <a className="text-right w-full">پروفایل</a>
                </li>
                <li className="flex justify-end">
                  <a className="text-right w-full">فعالیت</a>
                </li>
                <li className="flex justify-end">
                  <a className="text-right w-full">پیام ها</a>
                </li>
                <li className="flex justify-end text-red-600">
                  <a className="text-right w-full" onClick={handleLogout}>
                    خروج
                  </a>
                </li>
              </ul>
            </div>

            {/* Notification Icon */}
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>

            {/* Search Button */}
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </ul>
      <div className="flex items-center gap-3 md:ms-auto ms-0 me-3">
        <ul className="flex space-x-4 pb-2 justify-center items-center">
          <li>
            <CustomSelectBox options={mounth} defaultOption="انتخاب ماه" />
          </li>
          <li>
            <CustomSelectBox options={part} defaultOption="انتخاب بخش" />
          </li>
          <li className="font-medium text-sm px-4 py-2 hover:bg-slate-100 rounded-xl">
            <a href="#">خانه</a>
          </li>
        </ul>
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
