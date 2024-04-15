import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeletAttribute = () => {
  return useMutation({
    mutationFn: (id: number | undefined) =>
      request.delete(`/attribute/${id}/`).then((res) => res.data),
  });
};
