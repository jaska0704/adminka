import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeletProduct = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/product/${id}/`).then((res) => res.data),
  });
};
