import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWeeklyBenefit } from "../../services/apiConsumerRoutine";

const useDeleteWeeklyBenefits = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteWeeklyBenefitsMutate,
    status: deleteWeeklyBenefitsStatus,
  } = useMutation({
    mutationFn: ([token, benefitId]) => deleteWeeklyBenefit(token, benefitId),

    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("reminderList");
    },
  });
  return {
    deleteWeeklyBenefitsMutate,
    deleteWeeklyBenefitsStatus,
  };
};

export default useDeleteWeeklyBenefits;
