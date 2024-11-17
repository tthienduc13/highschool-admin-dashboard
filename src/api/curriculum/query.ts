import { useQuery } from "@tanstack/react-query";
import { getCurriculum } from "./api";

export const useCurriculumQuery = () => {
    return useQuery({
        queryKey: ["curriculum"],
        queryFn: getCurriculum,
    });
};
