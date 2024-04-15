import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetFilter_Title = () => {
  return useQuery({
    queryKey: ["brandFilter_Title_List"],
    queryFn: () =>
      request.get(`/brand/?ordering=-title`).then((res) => res.data.results),
  });
};
