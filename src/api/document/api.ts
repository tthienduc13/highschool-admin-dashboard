import { endpointDocument, endpointDocumentMedia } from "@/helpers/endpoint";
import { ModelResponse, Pagination } from "../common/type";
import { CreatePayload } from "./type";
import axiosServices, { axiosClientUpload } from "@/lib/axios";
import { Document } from "./type";
import fetchPaginatedData from "../common/api";

export const createDocument = async (
    payload: CreatePayload
): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.post(
            endpointDocument.CREATE,
            payload
        );

        return data;
    } catch (error) {
        console.error("Error while creating document", error);
        throw error;
    }
};

export const uploadDocument = async ({
    documentId,
    file,
}: {
    documentId: string;
    file: File;
}) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await axiosClientUpload.postForm(
            `${endpointDocumentMedia.CREATE(documentId)}`,
            formData
        );

        return data;
    } catch (error) {
        console.error("Error while uploading file");
        throw error;
    }
};

export const getDocument = async ({
    pageSize,
    pageNumber,
    seach,
    sortPopular,
    schoolId,
    subjectIds,
    semester,
    documentYear,
    provinceId,
    categoryIds,
    curriculumIds
}: Partial<{
    pageSize: number;
    pageNumber: number;
    seach?: string;
    sortPopular?: boolean;
    schoolId?: string | null;
    subjectIds?: string;
    semester?: number | null;
    documentYear?: number | null;
    provinceId?: string | null;
    categoryIds?: string;
    curriculumIds?: string;
}>): Promise<Pagination<Document>> => {

    schoolId = schoolId ?? undefined;
    semester = semester ?? undefined;
    documentYear = documentYear ?? undefined;
    provinceId = provinceId ?? undefined;

    return fetchPaginatedData<Document>(endpointDocument.GET_DOCUMENTS,
        {
            pageSize,
            pageNumber,
            seach,
            sortPopular,
            schoolId,
            subjectIds,
            semester,
            documentYear,
            provinceId,
            categoryIds,
            curriculumIds
        })
}

export const deleteDocument = async (documentId: string) => {
    try {
        const { data } = await axiosServices.delete(
            endpointDocument.DELETE(documentId)
        );

        return data;
    } catch (error) {
        console.error("Error while deleting document");
        throw error;
    }
}