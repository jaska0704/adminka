import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { TypeCategory } from "../../types/type-category";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<TypeCategory>(`/category/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
        
  });
};
