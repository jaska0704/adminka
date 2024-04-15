import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeletBrand = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/brand/${id}/`).then((res) => res.data),
  });
};
