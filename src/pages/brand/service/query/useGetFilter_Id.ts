import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetFilter_Id = (id:string) => {
  return useQuery({
    queryKey: [`brandFilter_List`, id],
    queryFn: () =>
      request.get(`/brand/?ordering=${id}`).then((res) => res.data.results),
  });
};
