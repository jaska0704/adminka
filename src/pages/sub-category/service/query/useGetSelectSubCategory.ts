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

export const useGetSelectSubcategory = () => {
  return useQuery({
    queryKey: ["subcategory_List"],
    queryFn: () => {
      return request
        .get<Category>(`/category/`)
        .then((res) => res.data.results);
    },
  });
};
