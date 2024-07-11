import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUnit } from "../../services/apiConsumerRoutine";

const useCreateUnit = () => {
  const queryClient = useQueryClient();
  const { mutate: createUnitMutate, status: createUnitStatus } = useMutation({
    mutationFn: ([unitData, token]) => createUnit(unitData, token),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("units");
    },
  });
  return {
    createUnitMutate,
    createUnitStatus,
  };
};

export default useCreateUnit;
