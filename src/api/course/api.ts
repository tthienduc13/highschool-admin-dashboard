import axiosServices from "@/lib/axios";
import { Metadata, Pagination } from "../common/type";
import { endpointSubject } from "@/helpers/endpoint";
import { Course } from "./type";

export const getAllCourses = async ({
    search,
    grade,
    pageNumber,
    pageSize,
}: Partial<{
    search: string;
    grade: string;
    pageNumber: number;
    pageSize: number;
}>): Promise<Pagination<Course>> => {
    try {
        const response = await axiosServices.get(
            `${endpointSubject.GET_ALL_COURSES}`,
            {
                params: {
                    search,
                    grade,
                    pageNumber,
                    pageSize,
                },
            }
        );

        const paginationHeader = response.headers["x-pagination"];
        const metadata: Metadata = JSON.parse(paginationHeader || "{}");

        return {
            data: response.data,
            currentPage: metadata.CurrentPage,
            pageSize: metadata.PageSize,
            totalCount: metadata.TotalCount,
            totalPages: metadata.TotalPages,
        };
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};
