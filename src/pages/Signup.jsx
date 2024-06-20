import { Link } from "react-router-dom";
import { PhoneNumberInput } from "../features/Auth/components/PhoneNumberInput";

const Signup = () => {
  return (
    <div className="grid h-svh grid-cols-1 lg:grid-cols-2">
      <img
        src={"/signup-banner.jpeg"}
        alt="Decorative"
        className="h-svh w-full object-cover"
      />

      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-gray-300/30 p-2 sm:p-6 lg:relative lg:bg-gray-50">
        <div className="w-full max-w-[38rem] rounded-lg bg-white px-5 py-4 shadow-[0px_80px_80px_rgba(58,_100,_59,_0.03)] sm:px-[50px] sm:py-[32px]">
          <div className="mb-6 flex">
            <img src="/logo.png" alt="Amrutam Logo" className="h-[95.8px]" />
          </div>

          <h2 className="mb-6 text-2xl font-semibold leading-[31.2px] sm:text-[32px]">
            {"Sign Up"}
          </h2>

          <form className="my-10 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="full-name"
                className="text-[18px] font-medium leading-[18px]"
              >
                <span>{`Full Name `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <input
                id="full-name"
                className="w-full rounded-lg border-[2px] border-solid border-[#e5e7eb] px-4 py-2.5 focus:border-[#e5e7eb] focus:outline-none focus:ring-0"
              />
            </div>
            <PhoneNumberInput />
            <div className="flex flex-col gap-4">
              <label
                htmlFor="full-name"
                className="text-[18px] font-medium leading-[18px]"
              >
                <span>{`Create Password `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <input
                type="password"
                id="full-name"
                className="w-full rounded-lg border-[2px] border-solid border-[#e5e7eb] px-4 py-2.5 focus:border-[#e5e7eb] focus:ring-0"
              />
            </div>

            <button
              type="submit"
              className="text-md w-full rounded-lg bg-[#3a643b] py-3 leading-[24px] text-white sm:text-[20px]"
            >
              {"Send OTP"}
            </button>
          </form>
        </div>
        <div className="mt-4 text-center text-base sm:text-[20px]">
          <p>
            {"Don't have an account? "}
            <Link
              to="/login"
              className="font-semibold text-[#3a643b] underline"
            >
              {"Log in here"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
