import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

interface LoginData {
  phone_number: string;
  password: string;
}
interface responseData {
  token:string
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) =>
      request.post<responseData>("/api/admin-login/", data).then((res) => res.data),
  });
};
