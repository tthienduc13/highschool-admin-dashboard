import { useQuery } from "@tanstack/react-query";
import { getProvince } from "./country.api";

export const useQueryCountry = () => {
    return useQuery({
        queryKey: ["province"],
        queryFn: getProvince,
    });
}