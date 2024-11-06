import { endPointVideo } from "@/helpers/endpoint";
import axiosServices, { axiosClientUpload } from "@/lib/axios";

export const mergeVideo = async ({
    fileName,
    id,
}: {
    fileName: string;
    id: string;
}) => {
    const response = await axiosServices.post(
        `${endPointVideo.MERGE_VIDEO(id)}`,
        {
            fileName,
        },
        {
            timeout: 10000,
        }
    );

    return response.data;
};

export const uploadVideo = async ({ formData }: { formData: FormData }) => {
    const response = await axiosClientUpload.post(
        `${endPointVideo.UPLOAD_VIDEO}`,
        formData
    );

    return response.data;
};
