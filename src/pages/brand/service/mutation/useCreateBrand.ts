import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { BrandType } from "../../../category/types/type-category";

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<BrandType>(`/brand/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
