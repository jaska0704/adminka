import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface supCategory {
  id: number;
  title: string;
  image: string;
  parent: {title:string, id:number};
  children: {}[];
  attributes: {}[];
}

export const useEditSubcategory = (id: string | undefined) => {
  return useQuery({
    queryKey: ["categoredit", id],
    queryFn: () =>
      request.get<supCategory>(`/category/${id}/`).then((res) => res.data),
  });
};
