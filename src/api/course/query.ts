import { useQuery } from "@tanstack/react-query";
import { Class } from "./type";
import { getAllCourses } from "./api";

export const useCoursesQuery = ({
    search,
    grade,
    pageNumber,
    pageSize,
}: {
    search?: string;
    grade?: Class;
    pageNumber: number;
    pageSize: number;
}) => {
    return useQuery({
        queryKey: ["courses", search, grade, pageNumber, pageSize],
        queryFn: () =>
            getAllCourses({
                search: search,
                pageNumber: pageNumber,
                pageSize: pageSize,
                grade: grade,
            }),
    });
};
