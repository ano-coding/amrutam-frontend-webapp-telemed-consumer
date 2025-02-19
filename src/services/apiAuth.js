import axios from "axios";

export const sendOTP = async (countryCallingCode, nationalNumber) => {
  const data = JSON.stringify({
    countryCode: `+${countryCallingCode}`,
    phoneNumber: nationalNumber,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/send-OTP",
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyOTP = async (countryCallingCode, nationalNumber, otp) => {
  const data = JSON.stringify({
    countryCode: `+${countryCallingCode}`,
    phoneNumber: nationalNumber,
    otpInput: otp,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://amrutam-dev-backend.azurewebsites.net//api/v1/patient/verify-OTP",
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const registerCustomer = async (
  firstName,
  lastName,
  email,
  countryCode,
  phoneNumber,
) => {
  const data = JSON.stringify({
    countryCode: `+${countryCode}`,
    phoneNumber: phoneNumber,
    email: email,
    firstName: firstName,
    lastName: lastName,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/register-customer",
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
