import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLikeReminderList } from "../../services/apiConsumerRoutine";

const useCreateLikeReminderList = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addLikeReminderListMutate,
    status: addLikeReminderListStatus,
  } = useMutation({
    mutationFn: ([token, reminderListId]) =>
      addLikeReminderList(token, reminderListId),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderTemplates");
    },
  });
  return {
    addLikeReminderListMutate,
    addLikeReminderListStatus,
  };
};

export default useCreateLikeReminderList;
