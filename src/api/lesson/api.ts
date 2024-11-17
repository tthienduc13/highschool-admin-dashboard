import { endpointLesson } from "@/helpers/endpoint";
import fetchPaginatedData from "../common/api";
import { ModelResponse, Pagination } from "../common/type";
import { Lesson, LessonDetail, NewLessonData } from "./type";
import axiosServices from "@/lib/axios";

export const getLessonsByChapter = async ({
    search,
    chapterId,
    pageNumber,
    pageSize,
}: {
    search?: string;
    chapterId: string;
    pageNumber: number;
    pageSize: number;
}): Promise<Pagination<Lesson>> => {
    return fetchPaginatedData<Lesson>(
        endpointLesson.GET_ALL_LESSONS_BY_CHAPTER(chapterId),
        { search, pageNumber, pageSize }
    );
};

export const createLessonList = async ({
    chapterId,
    lessonData,
}: {
    chapterId: string;
    lessonData: NewLessonData[];
}): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.post(
            endpointLesson.CREATE_LESSON_LIST(chapterId),
            lessonData
        );
        return data;
    } catch (error) {
        console.error("Error while creating lessons for", chapterId, error);
        throw error;
    }
};

export const getLessonById = async ({
    lessonId,
}: {
    lessonId: string;
}): Promise<LessonDetail> => {
    try {
        const { data } = await axiosServices.get(
            endpointLesson.GET_LESSON_BY_ID(lessonId)
        );
        return data;
    } catch (error) {
        console.error("Error while getting lesson", lessonId, error);
        throw error;
    }
};

export const updateLesson = async ({
    lessonId,
    lessonName,
    lessonMaterial,
    displayOrder,
}: {
    lessonId: string;
    lessonName: string;
    lessonMaterial: string;
    displayOrder: number;
}) => {
    try {
        const { data } = await axiosServices.patch(
            endpointLesson.PATCH_LESSON,
            {
                lessonId: lessonId,
                lessonName: lessonName,
                lessonMaterial: lessonMaterial,
                displayOrder: displayOrder,
            }
        );
        return data;
    } catch (error) {
        console.error("Error while update lesson", error);
        throw error;
    }
};

export const deleteLesson = async (
    lessonIds: string[]
): Promise<ModelResponse<string>> => {
    const response = await axiosServices.delete(endpointLesson.DELETE_LESSONS, {
        data: lessonIds,
    });
    return response.data;
};
