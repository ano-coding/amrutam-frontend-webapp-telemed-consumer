import { PhoneNumberInput } from "../features/Auth/components/PhoneNumberInput";

const Login = () => {
  return (
    <div className="grid h-svh grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Image */}

      <img
        src={"/login-banner.jpeg"}
        alt="Decorative"
        className="h-svh w-full object-cover"
      />

      {/* Right Side - Login/Signup Form */}
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-gray-800/30 p-2 sm:p-6 lg:relative lg:bg-gray-50">
        <div className="w-full max-w-[38rem] rounded-lg bg-white px-5 py-4 shadow-[0px_80px_80px_rgba(58,_100,_59,_0.03)] sm:px-[50px] sm:py-[32px]">
          <div className="mb-6 flex">
            <img src="/logo.png" alt="Amrutam Logo" className="h-[95.8px]" />
          </div>

          <h2 className="mb-6 text-2xl font-semibold leading-[31.2px] sm:text-[32px]">
            {"Login"}
          </h2>

          <p className="text-sm leading-[24px] text-[#6c757d] sm:text-[16px]">
            {"Please provide your registered phone number for SMS OTP."}
          </p>

          <form>
            <div className="my-4">
              <PhoneNumberInput />
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
            <button className="font-semibold text-[#3a643b] underline">
              {"Sign up here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
