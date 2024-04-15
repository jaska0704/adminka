import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetFilterTitle = () => {
  return useQuery({
    queryKey: ["brandFilterTitle_List"],
    queryFn: () =>
      request.get(`/brand/?ordering=title`).then((res) => res.data.results),
  });
};
