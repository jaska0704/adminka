import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface Category {
  title: string;
  id: number;
  image: string;
}

export const useGetSubCategoryList = (): UseQueryResult<Category[], Error> => {
  return useQuery({
    queryKey: ["subcategoryList"],
    queryFn: () => request.get("/api/subcategory/").then((res) => res.data.results),
  });
};