import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";

// Define the shape of the form data
interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { mutate, isPending } = useLogin(); 

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    const loginData = { userName: data.username, password: data.password, logintype: 1 };
    mutate(loginData); 
  };

  return (
    <div className="w-full sm:w-full md:w-2/3 container mx-auto h-full p-3 text-right flex flex-col items-center md:justify-center sm:justify-start justify-start order-2 md:order-1">
      <div className="flex flex-col text-right gap-y-4 mt-4 w-full container">
        <h1 className="text-gray-700 font-bold text-xl font-sans">ورود</h1>
      </div>

      <div className="mt-6 w-full text-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-sx p-2 text-gray-600 font-semibold">نام کاربری</label>
            <input
              id="username"
              {...register("username", { 
                required: "نام کاربری را وارد کنید", 
                minLength: { value: 4, message: "نام کاربری حداقل 4 کاراکتر باشد" } 
              })}
              className="block w-full mt-2 font-sans bg-slate-50 text-sm leading-5 text-[#404448] border items-start 
              border-slate-200 focus:outline-none shadow-sm focus:border-blue-300 rounded-xl p-3
              transition-all duration-300 placeholder:text-right ease-in-out"
              placeholder="نام کاربری"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-sx p-2 text-gray-600 font-semibold">رمز عبور</label>
            <input
              id="password"
              type="password"
              {...register("password", { 
                required: "رمز عبور را وارد کنید", 
                minLength: { value: 4, message: "رمز عبور حداقل 4 کاراکتر باشد" } 
              })}
              className="block w-full mt-2 shadow-sm font-sans bg-slate-50 text-sm items-center leading-5 text-[#404448] border 
              border-slate-200 focus:outline-none placeholder:text-right focus:border-blue-300 rounded-xl p-3
              transition-all duration-300 ease-in-out"
              placeholder="رمزعبور"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            className="text-sm sm:text-base items-center justify-center cursor-pointer md:text-lg bg-blue-600 hover:bg-blue-700 text-gray-100 font-medium px-6 py-2 rounded-md"
            disabled={isPending} 
          >
            {isPending ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
