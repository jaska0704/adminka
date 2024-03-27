import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface Category {
  title: string;
  id: number;
  image: string;
}

export const useEditCategory = (
  id: string | undefined
): UseQueryResult<Category, Error> => {
  return useQuery({
    queryKey: ["categoredit"],
    queryFn: () =>
      request.get(`/category/${id}/`).then((res) => res.data),
  });
};
