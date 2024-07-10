import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateWeeklyBenefit } from "../../services/apiConsumerRoutine";

const useUpdateWeeklyBenefit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: updateBenefitMutate,
    status: updateBenefitStatus,
    error: updateBenefitError,
  } = useMutation({
    mutationFn: ([benefitData, token, benefitId]) =>
      updateWeeklyBenefit(benefitData, token, benefitId),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderList");
      navigate(-1);
    },
  });

  return {
    updateBenefitMutate,
    updateBenefitStatus,
    updateBenefitError,
  };
};

export default useUpdateWeeklyBenefit;
