import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";


export const useDeletAttributValues = () => {
    return useMutation({
      mutationFn: (id: number|undefined) =>
        request.delete(`/attribute-value/${id}/`).then((res) => res.data),
    });
}