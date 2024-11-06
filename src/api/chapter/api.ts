import axiosServices from "@/lib/axios";
import { Metadata, ModelResponse, Pagination } from "../common/type";
import { Chapter, NewChapterData } from "./type";
import { endpoinChapter } from "@/helpers/endpoint";

export const getChaptersByCourse = async ({
    search,
    courseId,
    pageNumber,
    pageSize,
}: {
    search?: string;
    courseId: string;
    pageNumber: number;
    pageSize: number;
}): Promise<Pagination<Chapter>> => {
    try {
        const response = await axiosServices.get(
            endpoinChapter.GET_ALL_CHAPTER_BY_COURSE(courseId),
            {
                params: {
                    search,
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
        console.error("Error while getting chapters for", courseId, error);
        throw error;
    }
};

export const createChapterList = async ({
    courseId,
    chapterData,
}: {
    courseId: string;
    chapterData: NewChapterData[];
}) => {
    try {
        const { data } = await axiosServices.post(
            endpoinChapter.CREATE_CHAPTER_LIST(courseId),
            chapterData
        );
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error while creating chapters for", courseId, error);
        throw error;
    }
};

export const updateChapter = async ({
    chapterId,
    chapterName,
    chapterDescription,
    chapterLevel,
}: {
    chapterId: string;
    chapterName: string;
    chapterDescription: string;
    chapterLevel: number;
}): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.patch(
            endpoinChapter.UPDATE_CHAPTER,
            {
                id: chapterId,
                chapterName: chapterName,
                description: chapterDescription,
                chapterLevel: chapterLevel,
            }
        );
        return data;
    } catch (error) {
        console.error("Error while update chapter", error);
        throw error;
    }
};
