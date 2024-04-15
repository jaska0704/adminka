import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface Category {
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

export const useGetSubCategoryList = () => {
  return useQuery({
    queryKey: ["subcategoryList"],
    queryFn: () => request.get<Category>(`/api/subcategory/`).then((res) => res.data.results),
  });
};