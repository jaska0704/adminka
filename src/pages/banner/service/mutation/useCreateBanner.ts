import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { typeBanner } from "../../../category/types/type-category";


export const useCreateBanner = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<typeBanner>(`/banner/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
