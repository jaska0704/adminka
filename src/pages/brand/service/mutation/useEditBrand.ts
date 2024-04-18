import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { brand } from "../../../category/types/type-category";

export const useEditBrand = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch<brand>(`/brand/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
