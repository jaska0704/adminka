import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useGetBrand = () => {
    return useQuery({
        queryKey:["brandList"],
        queryFn: () => request.get("/brand/").then((res) => res.data.results)
    })
}