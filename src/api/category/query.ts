import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "./api";

export const useCategoriesQuery = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });
};
