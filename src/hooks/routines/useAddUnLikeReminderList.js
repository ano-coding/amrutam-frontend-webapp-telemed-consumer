import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUnLikeReminderList } from "../../services/apiConsumerRoutine";

const useAddUnLikeReminderList = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addUnLikeReminderListMutate,
    status: addUnLikeReminderListStatus,
  } = useMutation({
    mutationFn: ([token, reminderListId]) =>
      addUnLikeReminderList(token, reminderListId),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderTemplates");
    },
  });
  return {
    addUnLikeReminderListMutate,
    addUnLikeReminderListStatus,
  };
};

export default useAddUnLikeReminderList;
