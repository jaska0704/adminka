import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface typeProduct {
  count: number;
  next: string;
  previous: string;
  results: {
    id: number;
    image: string;
    title: string;
    price: string;
    is_available: boolean;
    category: number;
    is_new: boolean;
  }[];
}

export const useGetProduct = (id: string = "id", pages: number) => {
  return useQuery({
    queryKey: ["productList", id, pages],
    queryFn: () => {
      return request.get<typeProduct>(`/product/?ordering=${id}`, {
        params: { offset: pages, limit: 8 },
      }).then((res) => {
        return {
            data: res.data,
            pagesSize: Math.ceil(res.data.count)
        }
      });
    },
  });
};
