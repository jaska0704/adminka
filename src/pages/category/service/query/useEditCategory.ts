import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface Category {
  id: number;
  title: string;
  image: string;
  parent: number;
  children: [
    {
      id: number;
      title: string;
      image: string;
    }
  ];
  attributes: {
    id: number | undefined;
    title: string;
    values: {
      value: string;
      id: number | undefined;
    }[];
  }[];
  category_id:number | undefined
}

export const useEditCategory = (id: string | undefined) => {
  return useQuery({
    queryKey: ["categoredit", id],
    queryFn: () =>
      request.get<Category>(`/category/${id}/`).then((res) => res.data),
  });
};
