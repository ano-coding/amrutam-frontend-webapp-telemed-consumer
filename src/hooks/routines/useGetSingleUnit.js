import { useQuery } from "@tanstack/react-query";
import { getSingleUnit } from "../../services/apiConsumerRoutine";

const useGetSingleUnit = ([token, unitId]) => {
  return useQuery({
    queryKey: ["units", unitId],
    queryFn: () => getSingleUnit(token, unitId),
  });
};

export default useGetSingleUnit;
