import { useQuery } from "@tanstack/react-query";
import { getSingleRoutine } from "../../services/apiConsumerRoutine";

const useGetSingleRoutine = (token, routineId) => {
  return useQuery({
    queryKey: ["reminderlist", routineId],
    queryFn: () => getSingleRoutine(token, routineId),
  });
};

export default useGetSingleRoutine;
