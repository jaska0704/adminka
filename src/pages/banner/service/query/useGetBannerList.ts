import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface Category {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    created_at: string;
    description: string;
    id: number;
    image: string;
    title: string;
    updated_at: string;
  }[];
}

export const useGetBannerList = () => {
  return useQuery({
    queryKey: ["bannerList"],
    queryFn: () => {
      return request.get<Category>(`/banner/`).then((res) => res.data.results);
    },
  });
};
