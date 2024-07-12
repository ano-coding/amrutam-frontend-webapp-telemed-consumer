import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteActivityReminder } from "../../services/apiConsumerRoutine";

const useDeleteActivityReminder = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteActivityReminderMutate,
    status: deleteActivityReminderStatus,
  } = useMutation({
    mutationFn: ([token, reminderId]) =>
      deleteActivityReminder(token, reminderId),

    onSuccess: () => {
      queryClient.invalidateQueries("reminderList");
    },
  });
  return {
    deleteActivityReminderMutate,
    deleteActivityReminderStatus,
  };
};

export default useDeleteActivityReminder;
