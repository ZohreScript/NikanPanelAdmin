import { Outlet } from "react-router-dom";

const IdentityLayout = () => {
  return (
    <section className="h-screen w-full flex flex-col md:flex-row overflow-hidden">
      {/* Right side */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-gradient-to-r from-blue-600 to-violet-600 flex justify-center items-center sm:order-1 md:order-2">
        <div className="flex flex-col p-2 gap-y-5 justify-center items-center text-center">
          <h1 className="font-semibold text-base sm:text-lg md:text-3xl text-white font-sans">
            کاوش صانع تهران
          </h1>
          <p className="text-white text-base md:text-lg ">
            پنل تنظیمات سیستم مانیتور مشخصات بیمار
          </p>
          <div className="flex flex-row gap-x-4 mt-1 sm:mt-2 md:mt-4">
            <a
              href="#"
              className="relative text-sm bg-slate-50/10 hover:shadow-md md:text-base  text-gray-200 font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-gray-50/15"
            >
              آشنایی بیشتر
            </a>
            <a
              href="#"
              className="relative text-sm md:text-base  text-gray-100 font-medium px-6 py-3 rounded-lg shadow-sm after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full"
            >
              ورژن نرم افزار
            </a>
          </div>
        </div>
      </div>
      
      {/* Left side */}
      <div className="w-full bg-gray-50 md:w-1/2 h-full sm:h-full md:h-full flex flex-col items-center md:justify-center  sm:justify-start justify-start md:items-start p-4 md:order-1">
        <div className="flex flex-col items-center md:items-start  w-full">
          <Outlet />
        </div>
        <div className="w-full absolute bottom-0 left-0 text-center md:text-left text-sm text-gray-400 p-4 md:bottom-0 md:left-0">
    © 2024 - Kavosh Sane Tehran 2023.9.11
  </div>
      </div>
    </section>
  );
};

export default IdentityLayout;
