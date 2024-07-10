import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createProductReminder } from "../../services/apiConsumerRoutine";

const useCreateProductReminder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: createProductReminderMutate,
    status: createProductReminderStatus,
  } = useMutation({
    mutationFn: ([reminderData, token]) =>
      createProductReminder(reminderData, token),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderlist");
      navigate(-1);
    },
  });

  return {
    createProductReminderMutate,
    createProductReminderStatus,
  };
};

export default useCreateProductReminder;
