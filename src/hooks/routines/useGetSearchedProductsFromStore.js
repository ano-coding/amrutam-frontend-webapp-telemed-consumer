import { useQuery } from "@tanstack/react-query";
import { getSearchedProductsFromStore } from "../../services/apiConsumerRoutine";

const useGetSearchedProductsFromStore = (token, searchQuery) => {
  return useQuery({
    queryKey: ["searchedProductsFromStore", searchQuery],
    queryFn: () => getSearchedProductsFromStore(token, searchQuery),
    enabled: !!token && searchQuery.length > 2,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetSearchedProductsFromStore;
