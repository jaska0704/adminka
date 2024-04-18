import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
import { BrandType } from "../../../category/types/type-category";



export const usePageFilter = (pages: number, id:string) => {
  return useQuery({
    queryKey: [`brand_List`,id, pages],
    queryFn: () => {
      return request
        .get<BrandType>(`/brand/${id}`, { params: { offset: pages, limit: 7 } })
        .then((res) => {
          return {
            data: res.data.results,
            pagesSize: Math.ceil(res.data.count),
          };
        });
    },
  });
};
