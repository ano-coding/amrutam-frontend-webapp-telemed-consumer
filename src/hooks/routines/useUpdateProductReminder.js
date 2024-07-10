import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateProductReminder } from "../../services/apiConsumerRoutine";

const useUpdateProductReminder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: updateProductReminderMutate,
    status: updateProductReminderStatus,
  } = useMutation({
    mutationFn: ([reminderData, token, reminderId]) =>
      updateProductReminder(reminderData, token, reminderId),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderlist");
      navigate(-1);
    },
  });

  return {
    updateProductReminderMutate,
    updateProductReminderStatus,
  };
};

export default useUpdateProductReminder;
