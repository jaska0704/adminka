import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetProductSearch = (search: string) => {
  return useQuery({
    queryKey: ["getSearch", search],
    queryFn: () =>
      request
        .get("/product/", { params: { search } })
        .then((res) => res.data.results),
  });
};
