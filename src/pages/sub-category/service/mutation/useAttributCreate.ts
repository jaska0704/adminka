import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";
import { AttributType, attributType } from "../../../category/types/type-category";


export const useAttributCreate = () => {
  return useMutation({
    mutationFn: (dataa:AttributType) =>
      request.patch(`/api/category_edit/`, dataa).then((res) => res.data),
  });
};
