import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../services/apiAuth";

const useVerifyOTP = () => {
  const { mutate: verifyOTPMutate, status: verifyOTPStatus } = useMutation({
    mutationFn: ([countryCallingCode, nationalNumber, otp]) =>
      verifyOTP(countryCallingCode, nationalNumber, otp),
  });
  return {
    verifyOTPMutate,
    verifyOTPStatus,
  };
};

export default useVerifyOTP;
