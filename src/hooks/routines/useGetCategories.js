import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiConsumerRoutine";

const useGetCategories = (token) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(token),
  });
};

export default useGetCategories;
