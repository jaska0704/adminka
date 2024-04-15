import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetSingleProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["editproduct", id],
    queryFn: () => request.get(`/product/${id}/`).then((res) => res.data),
  });
};
