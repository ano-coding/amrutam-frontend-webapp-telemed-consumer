import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../services/apiAuth";

const useSendOTP = () => {
  const { mutate: sendOTPMutate, status: sendOTPStatus } = useMutation({
    mutationFn: ([countryCallingCode, nationalNumber]) =>
      sendOTP(countryCallingCode, nationalNumber),
  });
  return {
    sendOTPMutate,
    sendOTPStatus,
  };
};

export default useSendOTP;
