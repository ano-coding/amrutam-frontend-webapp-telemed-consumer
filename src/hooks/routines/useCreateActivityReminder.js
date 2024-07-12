import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createActivityReminder } from "../../services/apiConsumerRoutine";

const useCreateActivityReminder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: createActivityReminderMutate,
    status: createActivityReminderStatus,
  } = useMutation({
    mutationFn: ([reminderData, token]) =>
      createActivityReminder(reminderData, token),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderlist");
      navigate(-1);
    },
  });

  return {
    createActivityReminderMutate,
    createActivityReminderStatus,
  };
};

export default useCreateActivityReminder;
