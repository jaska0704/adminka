import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";


export const useGetSearch = (search:string) => {
    return useQuery({
        queryKey:["getSearch", search],
        queryFn:() => request.get("/category/", {params: {search}}).then((res)=> res.data.results),
    })
}