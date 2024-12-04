import { useMutation } from "@tanstack/react-query";
import { uploadImageToCloudinary, uploadNewsToCloudinary } from "./upload-image";
import { isAxiosError } from "axios";

export const useUploadImageToCloudinary = () => {
    return useMutation({
        mutationFn: ({ file }: { file: File }) => uploadImageToCloudinary(file),
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage =
                    error.response?.data.message ||
                    "Unexpected error occurred!";
                return Promise.reject(new Error(errorMessage));
            }
            return Promise.reject(new Error("An unexpected error occurred."));
        },
    });
};

export const useUploadNewsToCloudinary = () => {
    return useMutation({
        mutationFn: ({ file }: { file: File }) => uploadNewsToCloudinary(file),
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage =
                    error.response?.data.message ||
                    "Unexpected error occurred!";
                return Promise.reject(new Error(errorMessage));
            }
            return Promise.reject(new Error("An unexpected error occurred."));
        },
    });
};
