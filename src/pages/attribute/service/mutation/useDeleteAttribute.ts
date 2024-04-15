import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const usedeletCategory = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/attribute/${id}/`).then((res) => res.data),
  });
};
