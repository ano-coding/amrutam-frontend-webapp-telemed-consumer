import { Link, useNavigate } from "react-router-dom";
import { PhoneNumberInput } from "../features/Auth/components/PhoneNumberInput";
import { useForm } from "react-hook-form";
import useRegisterCustomer from "../hooks/useRegisterCustomer";
import { parsePhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";

const Signup = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { registerCustomerMutate, registerCustomerStatus } =
    useRegisterCustomer();

  const onSubmit = (data) => {
    const { countryCallingCode, nationalNumber } = parsePhoneNumber(
      data.phoneNumber,
    );

    registerCustomerMutate(
      [
        data.firstName,
        data.lastName,
        data.email,
        countryCallingCode,
        nationalNumber,
      ],
      {
        onSuccess: (res) => {
          console.log(res);
        },
        onError: (error) => {
          const isRegistered =
            error.response.data.data.action ===
            "Cannot Register. User Already Exist. Login Directly from sendOTP.";
          if (isRegistered) {
            navigate("/login");
            toast.error(
              "User Already Exist. Please Login With your Phone Number!",
            );
          }
        },
        onSettled: () => {
          reset();
        },
      },
    );
  };

  return (
    <div className="grid h-svh grid-cols-1 lg:grid-cols-2">
      <img
        src={"/signup-banner.jpeg"}
        alt="Decorative"
        className="h-svh w-full object-cover"
      />

      <div className="absolute flex h-full w-full flex-col items-center justify-center bg-gray-300/30 p-2 sm:p-6 lg:relative lg:bg-gray-50">
        <div className="w-full max-w-[38rem] rounded-lg bg-white px-5 py-4 shadow-[0px_80px_80px_rgba(58,_100,_59,_0.03)] sm:px-[50px] sm:py-[32px]">
          <div className="mb-6 flex">
            <img src="/logo.png" alt="Amrutam Logo" className="h-[95.8px]" />
          </div>

          <h2 className="mb-6 text-2xl font-semibold leading-[31.2px] sm:text-[32px]">
            {"Sign Up"}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-10 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-5 xl:flex-row">
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="first-name"
                  className="text-[18px] font-medium leading-[18px]"
                >
                  <span>{`First Name `}</span>
                  <span className="font-bold text-[#dd461e]">*</span>
                </label>{" "}
                <div className="flex w-full flex-col gap-1">
                  <input
                    id="first-name"
                    className={`w-full rounded-lg border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.firstName ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && <ErrorElement />}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="last-name"
                  className="text-[18px] font-medium leading-[18px]"
                >
                  <span>{`Last Name `}</span>
                  <span className="font-bold text-[#dd461e]">*</span>
                </label>
                <div className="flex w-full flex-col gap-1">
                  <input
                    id="last-name"
                    className={`w-full rounded-lg border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.lastName ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && <ErrorElement />}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label
                htmlFor="email"
                className="text-[18px] font-medium leading-[18px]"
              >
                <span>{`Email `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <div className="flex w-full flex-col gap-1">
                <input
                  id="email"
                  className={`w-full rounded-lg border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.email ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorElement message={errors.email.message} />
                )}
              </div>
            </div>
            <PhoneNumberInput control={control} error={errors.phoneNumber} />

            <button
              type="submit"
              className="text-md w-full rounded-lg bg-[#3a643b] py-3 leading-[24px] text-white sm:text-[20px]"
            >
              {"Send OTP"}
            </button>
          </form>
        </div>
        <div className="my-4 text-center text-base sm:text-[20px]">
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

const ErrorElement = ({ message }) => (
  <span className="self-end pr-1 text-[13px] font-medium italic leading-4 text-red-600">
    {message || "*This field is required"}
  </span>
);
