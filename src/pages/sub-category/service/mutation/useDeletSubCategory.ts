import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeletSubCategory = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/category/${id}/`).then((res) => res.data),
  });
};
