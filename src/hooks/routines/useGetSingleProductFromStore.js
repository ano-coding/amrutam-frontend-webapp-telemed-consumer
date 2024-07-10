import { useQuery } from "@tanstack/react-query";
import { getSingleProductFromStore } from "../../services/apiConsumerRoutine";

const useGetSingleProductFromStore = ([token, productId]) => {
  return useQuery({
    queryKey: ["singleProductFromStore", productId],
    queryFn: () => getSingleProductFromStore(token, productId),
  });
};

export default useGetSingleProductFromStore;
