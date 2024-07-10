import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateRoutine } from "../../services/apiConsumerRoutine";

const useUpdateRoutine = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updateRoutineMutate, status: updateRoutineStatus } =
    useMutation({
      mutationFn: ([routineData, token, routineId]) =>
        updateRoutine(routineData, token, routineId),

      onSuccess: (data) => {
        console.log(data);

        queryClient.invalidateQueries("reminderList");
        navigate("/routines");
      },
    });
  return {
    updateRoutineMutate,
    updateRoutineStatus,
  };
};

export default useUpdateRoutine;
