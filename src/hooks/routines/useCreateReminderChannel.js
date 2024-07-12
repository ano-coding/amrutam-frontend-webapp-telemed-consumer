import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createReminderChannel } from "../../services/apiConsumerRoutine";

const useCreateReminderChannel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: createReminderChannelMutate,
    status: createReminderChannelStatus,
  } = useMutation({
    mutationFn: ([channelData, token]) =>
      createReminderChannel(channelData, token),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderChannel");
      navigate(-1);
    },
  });

  return {
    createReminderChannelMutate,
    createReminderChannelStatus,
  };
};

export default useCreateReminderChannel;
