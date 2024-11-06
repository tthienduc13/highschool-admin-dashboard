import axiosServices from "@/lib/axios";
import { ModelResponse, Pagination } from "./../common/type";
import { endPointTheory } from "@/helpers/endpoint";
import { Theory } from "./type";
import fetchPaginatedData from "../common/api";

export type CreateTheoryPayload = {
    lessonId: string;
    theoryName: string;
    theoryDescription: string;
    theoryContent: string;
    theoryContentHtml: string;
};
export const createTheory = async ({
    lessonId,
    theoryName,
    theoryDescription,
    theoryContent,
    theoryContentHtml,
}: CreateTheoryPayload): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.post(
            endPointTheory.CREATE_THEORY(lessonId),
            {
                theoryName: theoryName,
                theoryDescription: theoryDescription,
                theoryContentJson: theoryContent,
                theoryContentHtml: theoryContentHtml,
            }
        );
        return data;
    } catch (error) {
        console.error("Error while create theory");
        throw error;
    }
};

export const getLessonTheory = async ({
    search,
    id,
    pageNumber,
    pageSize,
}: {
    search?: string;
    id: string;
    pageNumber: number;
    pageSize: number;
}): Promise<Pagination<Theory>> => {
    return fetchPaginatedData<Theory>(endPointTheory.GET_LESSON_THEORY(id), {
        search,
        pageNumber,
        pageSize,
        id,
    });
};

export const getTheoryById = async ({
    theoryId,
}: {
    theoryId: string;
}): Promise<Theory> => {
    try {
        const { data } = await axiosServices.get(
            endPointTheory.GET_THEORY_BY_ID(theoryId)
        );
        return data;
    } catch (error) {
        console.error("Error while getting theory", theoryId, error);
        throw error;
    }
};
