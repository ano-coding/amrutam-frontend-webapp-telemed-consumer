import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateActivityReminder } from "../../services/apiConsumerRoutine";

const useUpdateActivityReminder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: updateActivityReminderMutate,
    status: updateActivityReminderStatus,
  } = useMutation({
    mutationFn: ([reminderData, token, reminderId]) =>
      updateActivityReminder(reminderData, token, reminderId),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderlist");
      navigate(-1);
    },
  });

  return {
    updateActivityReminderMutate,
    updateActivityReminderStatus,
  };
};

export default useUpdateActivityReminder;
