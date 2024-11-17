import { endpointDocument, endpointDocumentMedia } from "@/helpers/endpoint";
import { ModelResponse } from "../common/type";
import { CreatePayload } from "./type";
import axiosServices, { axiosClientUpload } from "@/lib/axios";

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
