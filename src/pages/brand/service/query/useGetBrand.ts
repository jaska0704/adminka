import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { types } from "../../../category/types/type-category";




export const useGetBrand = (id: string | undefined) => {
  return useQuery({
    queryKey: ["brand_edit", id],
    queryFn: () => {
      return request.get<types>(`/brand/${id}/`).then((res) => res.data);
    },
  });
};
