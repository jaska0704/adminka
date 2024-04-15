import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetFilterId = () => {
  return useQuery({
    queryKey: ["brandFilterList"],
    queryFn: () =>
      request
        .get(`/brand/?ordering=id`)
        .then((res) => res.data.results),
  });
};
