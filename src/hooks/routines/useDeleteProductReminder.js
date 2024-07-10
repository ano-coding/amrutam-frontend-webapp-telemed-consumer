import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductReminder } from "../../services/apiConsumerRoutine";

const useDeleteProductReminder = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteProductReminderMutate,
    status: deleteProductReminderStatus,
  } = useMutation({
    mutationFn: ([token, reminderId]) =>
      deleteProductReminder(token, reminderId),

    onSuccess: () => {
      queryClient.invalidateQueries("reminderList");
    },
  });
  return {
    deleteProductReminderMutate,
    deleteProductReminderStatus,
  };
};

export default useDeleteProductReminder;
