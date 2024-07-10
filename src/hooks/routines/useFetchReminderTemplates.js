import { useQuery } from "@tanstack/react-query";
import { fetchReminderTemplates } from "../../services/apiConsumerRoutine";

const useGetReminderTemplates = (token) => {
  return useQuery({
    queryKey: ["reminderTemplates"],
    queryFn: () => fetchReminderTemplates(token),
  });
};

export default useGetReminderTemplates;
