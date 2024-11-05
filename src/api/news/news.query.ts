import { useMutation } from "@tanstack/react-query";
import { createBlog } from "./news.api";

export const useCreateBlogMutation = () => {
    return useMutation({
        mutationFn: ({
            newsTagId,
            newName,
            content,
            contentHtml,
            image,
            location
        }: {
            newsTagId: string;
            newName: string;
            content: string;
            contentHtml: string;
            image: File;
            location: string;
        }) =>
            createBlog({ newsTagId, newName, content, contentHtml, image, location }),
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            // eslint-disable-next-line no-console
            return error;
        }
    });
};