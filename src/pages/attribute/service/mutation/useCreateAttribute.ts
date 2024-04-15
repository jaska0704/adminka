import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface attype {
  category: [];
  title: string;
  values: {
    value: string;
  }[];
}

export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: (data) =>
      request
        .post("/attribute/", { attr_list: [data] })
        .then((res) => res.data),
  });
};
