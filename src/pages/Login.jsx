import { Link } from "react-router-dom";
import { PhoneNumberInput } from "../features/Auth/components/PhoneNumberInput";
import { useState } from "react";
import {
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import useSendOTP from "../hooks/useSendOTP";
import useVerifyOTP from "../hooks/useVerifyOTP";

const Login = () => {
  const [value, setValue] = useState();
  const { sendOTPMutate, sendOTPStatus } = useSendOTP();
  const { verifyOTPMutate, verifyOTPStatus } = useVerifyOTP();
  const [otp, setOtp] = useState("");
  const [showOTPBox, setShowOTPBox] = useState(false);
  console.log(showOTPBox);

  const isProcessing = sendOTPStatus === "pending";
  const isVerifying = verifyOTPStatus === "pending";

  return (
    <div className="grid h-svh grid-cols-1 lg:grid-cols-2">
      <img
        src={"/login-banner.jpeg"}
        alt="Decorative"
        className="h-svh w-full object-cover"
      />

      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-gray-300/30 p-2 sm:p-6 lg:relative lg:bg-gray-50">
        <div className="w-full max-w-[38rem] rounded-lg bg-white px-5 py-4 shadow-[0px_80px_80px_rgba(58,_100,_59,_0.03)] sm:px-[50px] sm:py-[32px]">
          <div className="mb-6 flex">
            <img src="/logo.png" alt="Amrutam Logo" className="h-[95.8px]" />
          </div>

          <h2 className="mb-6 text-2xl font-semibold leading-[31.2px] sm:text-[32px]">
            {"Login"}
          </h2>

          <p className="text-sm leading-[24px] text-[#6c757d] sm:text-[16px]">
            {showOTPBox
              ? "Please Provide the OTP send to your Mobile Number"
              : "Please provide your registered phone number for SMS OTP."}
          </p>

          <form>
            {!showOTPBox && (
              <>
                <div disabled={isProcessing} className={`my-4`}>
                  <PhoneNumberInput
                    value={value}
                    isProcessing={isProcessing}
                    setValue={setValue}
                  />
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!value) return;
                    if (!isPossiblePhoneNumber(value)) return;
                    const { countryCallingCode, nationalNumber } =
                      parsePhoneNumber(value);
                    console.log(countryCallingCode, nationalNumber);
                    sendOTPMutate([countryCallingCode, nationalNumber], {
                      onSuccess: (res) => {
                        if (res?.data?.otp) setShowOTPBox(true);
                      },
                      onError: (error) => {
                        console.error(error);
                      },
                    });
                  }}
                  type="submit"
                  disabled={isProcessing}
                  className={`text-md w-full rounded-lg bg-[#3a643b] ${isProcessing ? "bg-opacity-55" : ``} py-3 leading-[24px] text-white sm:text-[20px]`}
                >
                  {isProcessing ? "Processing..." : "Send OTP"}
                </button>
              </>
            )}
            {showOTPBox && (
              <>
                <div className="my-4">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full rounded-lg border-[1px] border-[#e5e7eb] px-3 py-3 shadow-sm focus:border-[#e5e7eb] focus:ring-0"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!otp) return;
                    if (!value) return;
                    if (!isPossiblePhoneNumber(value)) return;
                    const { countryCallingCode, nationalNumber } =
                      parsePhoneNumber(value);
                    verifyOTPMutate([countryCallingCode, nationalNumber, otp]);
                  }}
                  type="submit"
                  disabled={isProcessing}
                  className={`text-md w-full rounded-lg bg-[#3a643b] ${isProcessing ? "bg-opacity-55" : ``} py-3 leading-[24px] text-white sm:text-[20px]`}
                >
                  {isProcessing ? "Processing..." : "Send OTP"}
                </button>
              </>
            )}
          </form>
        </div>
        <div className="mt-4 text-center text-base sm:text-[20px]">
          <p>
            {"Don't have an account? "}
            <Link
              to="/signup"
              className="font-semibold text-[#3a643b] underline"
            >
              {"Sign up here"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
