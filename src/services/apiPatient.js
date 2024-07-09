import axios from "axios";

export const getPatientProfile = async (token) => {
  if (!token) return Promise.resolve({});
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/profile",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const updatePatientProfile = async (
  token,
  email,
  firstName,
  lastName,
  phone,
  state,
  country,
  heightUnit,
  heightValue,
  dob,
  weightUnit,
  weightValue,
  bio,
  gender,
  timezone,
  photo,
  sleepPattern,
) => {
  const data = JSON.stringify({
    email: email,
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    state: state,
    country: country,
    height: {
      unit: heightUnit,
      value: heightValue,
    },
    dob: dob,
    weight: {
      unit: weightUnit,
      value: weightValue,
    },
    gender: gender,
    photo: photo,
    // bio: bio,
    // timezone: timezone,
    // sleepPattern: sleepPattern,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/profile",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  console.log(config);

  try {
    const response = await axios.request(config);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
