import { useMutation } from "@tanstack/react-query";
import { registerCustomer } from "../services/apiAuth";

const useRegisterCustomer = () => {
  const { mutate: registerCustomerMutate, status: registerCustomerStatus } =
    useMutation({
      mutationFn: ([firstName, lastName, email, countryCode, phoneNumber]) =>
        registerCustomer(firstName, lastName, email, countryCode, phoneNumber),
    });
  return {
    registerCustomerMutate,
    registerCustomerStatus,
  };
};

export default useRegisterCustomer;
