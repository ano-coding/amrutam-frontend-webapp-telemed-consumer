import { useQuery } from "@tanstack/react-query";
import { getTodayReminders } from "../../services/apiConsumerRoutine";

const useGetTodayReminders = (token) => {
  return useQuery({
    queryKey: ["todayReminders"],
    queryFn: () => getTodayReminders(token),
  });
};

export default useGetTodayReminders;
