import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoutine } from "../../services/apiConsumerRoutine";

const useDeleteRoutine = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteRoutineMutate, status: deleteRoutineStatus } =
    useMutation({
      mutationFn: ([routineId, token]) => deleteRoutine(routineId, token),

      onSuccess: (data) => {
        console.log(data);

        queryClient.invalidateQueries("reminderList");
      },
    });
  return {
    deleteRoutineMutate,
    deleteRoutineStatus,
  };
};

export default useDeleteRoutine;
