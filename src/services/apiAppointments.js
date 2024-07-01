import axios from "axios";
export const getUpcomingAppointments = async (patientId, token) => {
  if (!patientId) return Promise.resolve([]);
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://amrutam-dev-backend.azurewebsites.net/api/v1/patient/appointments/upcoming/${patientId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
