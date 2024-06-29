// useGetPatientProfile.js
import { useQuery } from "@tanstack/react-query";
import { getPatientProfile } from "../services/apiPatient";

const useGetPatientProfile = (token) => {
  return useQuery({
    queryKey: ["patientProfile"],
    queryFn: () => getPatientProfile(token),
  });
};

export default useGetPatientProfile;
