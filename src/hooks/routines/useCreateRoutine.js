import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoutine } from "../../services/apiConsumerRoutine";
import { useNavigate } from "react-router-dom";

const useCreateRoutine = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createRoutineMutate, status: createRoutineStatus } =
    useMutation({
      mutationFn: ([routineData, token]) => createRoutine(routineData, token),

      onSuccess: (data) => {
        console.log(data);

        queryClient.invalidateQueries("reminderList");
        navigate("/routines");
      },
    });
  return {
    createRoutineMutate,
    createRoutineStatus,
  };
};

export default useCreateRoutine;
