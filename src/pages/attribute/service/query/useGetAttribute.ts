import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface atributType {
  count: number;
  next: string;
  previous: string;
  results: {
    id: number;
    title: string;
    category: [];
    category_title: 
      {
        title:string;
      }[];
    values: 
      {
        id: number;
        value: string;
      }[],
  }[];
}
export const useGetAttribute = () => {
  return useQuery({
    queryKey: ["attributeList"],
    queryFn: () =>
      request.get<atributType>("/attribute/").then((res) => res.data),
  });
};
