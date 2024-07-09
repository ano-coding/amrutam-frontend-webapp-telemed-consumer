// useGetUpcomingAppointments.js
import { useQuery } from "@tanstack/react-query";
import { getUpcomingAppointments } from "../services/apiAppointments";

const useGetUpcomingAppointments = (patientId, token) => {
  return useQuery({
    queryKey: ["upcomingAppointments", patientId],
    queryFn: () => getUpcomingAppointments(patientId, token),
  });
};

export default useGetUpcomingAppointments;
