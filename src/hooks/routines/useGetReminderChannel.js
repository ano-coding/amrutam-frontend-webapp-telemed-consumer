import { useQuery } from "@tanstack/react-query";
import { getReminderChannel } from "../../services/apiConsumerRoutine";

const useGetReminderChannel = (token) => {
  return useQuery({
    queryKey: ["reminderChannel"],
    queryFn: () => getReminderChannel(token),
  });
};

export default useGetReminderChannel;
