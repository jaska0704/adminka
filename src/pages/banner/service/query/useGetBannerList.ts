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

export const useGetBannerList = (pages:number) => {
  return useQuery({
    queryKey: ["bannerList", pages],
    queryFn: () => {
      return request.get<Category>(`/banner/`, {params:{offset:pages, limit:7}}).then((res) => {
        return {
          data: res.data.results,
          pagesSize:Math.ceil(res.data.count)
        };
      });
    },
  });
};
