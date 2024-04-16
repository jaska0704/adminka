import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";


interface Type {
    id:number,
    title:string,
    description:string,
    image:string,
}

export const useGetBanner = (id:string | undefined) => {
  return useQuery({
    queryKey: ["bannerList", id],
    queryFn: () => {
      return request.get<Type>(`/banner/${id}/`).then((res) => res.data);
    },
  });
};
