import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mergeVideo, uploadVideo } from "./api";

export const useUploadVideoMutation = () => {
    return useMutation({
        mutationFn: ({ formData }: { formData: FormData }) =>
            uploadVideo({ formData }),
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            // eslint-disable-next-line no-console
            console.log("error", error);
        },
    });
};

export const useMergeVideoMutation = ({ lessonId }: { lessonId: string }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ fileName }: { fileName: string }) =>
            mergeVideo({ fileName, id: lessonId }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["lesson", lessonId] });
            return data;
        },
        onError: (error) => {
            // eslint-disable-next-line no-console
            console.log("error", error);
        },
    });
};
