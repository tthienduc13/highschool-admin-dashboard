import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { uploadImageToCloudinary } from './upload-image';

export const useUploadImageToCloudinary = () => {
  return useMutation({
    mutationFn: ({ file }: { file: File }) => uploadImageToCloudinary(file),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || 'Unexpected error occurred!';
        return Promise.reject(new Error(errorMessage));
      }
      return Promise.reject(new Error('An unexpected error occurred.'));
    }
  });
};
