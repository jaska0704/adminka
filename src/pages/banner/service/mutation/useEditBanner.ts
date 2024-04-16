import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { TypeBanner } from "../../../category/types/type-category";

export const useEditBanner = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch<TypeBanner>(`/banner/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
