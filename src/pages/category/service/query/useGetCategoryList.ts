import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface Category {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    id: number;
    title: string;
    image: string;
    parent: number;
  }[];
}

export const useGetCategoryList = (
  id: string = "id",
  pages?: number
) => {
  return useQuery({
    queryKey: ["categoryList", id, pages],
    queryFn: () => {
      return request
        .get<Category>(`/category/?ordering=${id}`, {
          params: { offset: pages, limit: 5 },
        })
        .then((res) =>{
         return {
           data: res.data,
           pagesSize: Math.ceil(res.data.count),
         };
        });
    },
  });
};


