import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface Category {
  title: string;
  id: number;
  image: string;
}

export const useGetCategoryList = (): UseQueryResult<Category[], Error> => {
  return useQuery({
    queryKey: ["categoryList"],
    queryFn: () => request.get("/category/").then((res) => res.data.results),
  });
};
