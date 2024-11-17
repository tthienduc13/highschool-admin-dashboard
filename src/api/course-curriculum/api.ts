import axiosServices from "@/lib/axios";
import { ModelResponse, Pagination } from "../common/type";
import { CourseCurriculum, CreatePayload, CreateResponse } from "./type";
import { endpointSubjectCurriculum } from "@/helpers/endpoint";
import fetchPaginatedData from "../common/api";

export const create = async (
    payload: CreatePayload
): Promise<ModelResponse<CreateResponse>> => {
    try {
        const { data } = await axiosServices.post(
            endpointSubjectCurriculum.CREATE,
            payload
        );
        return data;
    } catch (error) {
        console.error("Error while createing subject curriculum");
        throw error;
    }
};

export const getPublished = async ({
    search,
    pageNumber,
    pageSize,
}: {
    search?: string;
    pageNumber: number;
    pageSize: number;
}): Promise<Pagination<CourseCurriculum>> => {
    return fetchPaginatedData<CourseCurriculum>(
        endpointSubjectCurriculum.GET_PUBLISH,
        {
            search,
            pageNumber,
            pageSize,
        }
    );
};

export const getUnpublished = async ({
    search,
    pageNumber,
    pageSize,
}: {
    search?: string;
    pageNumber: number;
    pageSize: number;
}): Promise<Pagination<CourseCurriculum>> => {
    return fetchPaginatedData<CourseCurriculum>(
        endpointSubjectCurriculum.GET_UNPUBLISH,
        {
            search,
            pageNumber,
            pageSize,
        }
    );
};

export const publishCourse = async (
    courseId: string
): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.patch(
            endpointSubjectCurriculum.PUBLISH_COURSE(courseId)
        );
        return data;
    } catch (error) {
        console.error("Error while publish course", error);
        throw error;
    }
};

export const unpublishCourse = async (
    courseId: string
): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.patch(
            endpointSubjectCurriculum.UNPUBLISH_COURSE(courseId)
        );
        return data;
    } catch (error) {
        console.error("Error while unpublish course", error);
        throw error;
    }
};
