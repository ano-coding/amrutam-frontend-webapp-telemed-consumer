import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteWeeklyBenefit } from "../../services/apiConsumerRoutine";

const useDeleteWeeklyBenefits = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: deleteWeeklyBenefitsMutate,
    status: deleteWeeklyBenefitsStatus,
  } = useMutation({
    mutationFn: ([token, benefitId]) => deleteWeeklyBenefit(token, benefitId),

    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("reminderList");
      navigate(-1);
    },
  });
  return {
    deleteWeeklyBenefitsMutate,
    deleteWeeklyBenefitsStatus,
  };
};

export default useDeleteWeeklyBenefits;
