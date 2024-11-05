import axiosServices, { axiosClientUpload } from "@/lib/axios";
import { Metadata, ModelResponse, Pagination } from "../common/type";
import { endpointSubject } from "@/helpers/endpoint";
import { Course } from "./type";
import { z } from "zod";
import { CourseSchema } from "@/schemas/course";

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

export const createSubject = async (
    values: z.infer<typeof CourseSchema>
): Promise<ModelResponse<string>> => {
    try {
        const response = await axiosClientUpload.post(
            `${endpointSubject.CREATE_SUBJECT}`,
            {
                subjectName: values.subjectName,
                imageRaw: values.imageRaw ?? undefined,
                subjectDescription: values.subjectDescription,
                information: values.information,
                categoryId: values.categoryId,
                subjectCode: values.subjectCode,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error while creating course", error);
        throw error;
    }
};

export const deleteCourse = async (
    courseId: string
): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.delete(
            endpointSubject.DELETE_COURSE(courseId)
        );
        return data;
    } catch (error) {
        console.error("Error while deleting course", error);
        throw error;
    }
};

export const getCourseById = async (courseId: string): Promise<Course> => {
    try {
        const { data } = await axiosServices.get(
            endpointSubject.GET_BY_ID(courseId)
        );
        return data;
    } catch (error) {
        console.error("Error while getting course detail", courseId, error);
        throw error;
    }
};
