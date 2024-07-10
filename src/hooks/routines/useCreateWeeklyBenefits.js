// hooks/useCreateWeeklyBenefits.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createWeeklyBenefits } from "../../services/apiConsumerRoutine";

const useCreateWeeklyBenefits = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: createWeeklyBenefitsMutate,
    status: createWeeklyBenefitsStatus,
  } = useMutation({
    mutationFn: ([benefitData, token]) =>
      createWeeklyBenefits(benefitData, token),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderlist");
      navigate(-1);
    },
  });

  return {
    createWeeklyBenefitsMutate,
    createWeeklyBenefitsStatus,
  };
};

export default useCreateWeeklyBenefits;
