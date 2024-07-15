import { useQuery } from "@tanstack/react-query";
import { getTodayActivityReminders } from "../../services/apiConsumerRoutine";

const useGetTodayActivityReminders = (token) => {
  return useQuery({
    queryKey: ["todayActivityReminders"],
    queryFn: () => getTodayActivityReminders(token),
  });
};

export default useGetTodayActivityReminders;
