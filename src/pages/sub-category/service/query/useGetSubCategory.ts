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
    parent: {
      id: number;
      title: string;
    };
  }[];
}

export const useGetSubCategoryList = ( pages?: number) => {
  return useQuery({
    queryKey: ["subcategoryList", pages],
    queryFn: () =>
      request
        .get<Category>(`/api/subcategory/`, {
          params: { offset: pages, limit: 5 },
        })
        .then((res) => {
          return {
            data: res.data,
            pagesSize: Math.ceil(res.data.count),
          };
        }),
  });
};
