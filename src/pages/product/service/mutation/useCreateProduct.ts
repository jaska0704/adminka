import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface typeProduct {
  results: {
    title: string;
    image?: string;
    id?: number;
    is_available: boolean;
    is_new: boolean;
    price: string;
    category: number;
  }[];
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<typeProduct>("/product/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
