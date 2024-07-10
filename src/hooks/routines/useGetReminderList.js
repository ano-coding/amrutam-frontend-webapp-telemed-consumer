import { useQuery } from "@tanstack/react-query";
import { getReminderList } from "../../services/apiConsumerRoutine";

const useGetReminderList = (token) => {
  return useQuery({
    queryKey: ["reminderList"],
    queryFn: () => getReminderList(token),
  });
};

export default useGetReminderList;
