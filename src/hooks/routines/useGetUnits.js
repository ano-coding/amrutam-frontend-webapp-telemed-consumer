import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../../services/apiConsumerRoutine";

const useGetUnits = (token) => {
  return useQuery({
    queryKey: ["units"],
    queryFn: () => getUnits(token),
  });
};

export default useGetUnits;
