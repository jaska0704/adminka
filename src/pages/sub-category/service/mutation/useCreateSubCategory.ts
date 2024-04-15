import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface CreateType {
  data: {
    id: number;
    title: string;
    image?: {
      file: File;
      fileList: FileList;
    };
    parent: string;
  };
}

export const useCreateSubCategory = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<CreateType>(`/category/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
