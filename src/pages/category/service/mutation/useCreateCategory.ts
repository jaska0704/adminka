import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface taypes {
  data: {
    id: number;
    title: string;
    image?: string
    parent: string;
  };
}

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<taypes>(`/category/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
        
  });
};
