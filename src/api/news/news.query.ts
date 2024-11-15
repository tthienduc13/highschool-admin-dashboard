import { useMutation, useQuery } from "@tanstack/react-query";
import { createBlog, getNews, getNewsDetail } from "./news.api";

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

export const useNewsQuery = ({
    search,
    page,
    eachPage,
    location,
    newsTagId,
}: {
    search?: string;
    page: number;
    eachPage: number;
    location?: string | null;
    newsTagId?: string | null;
}) => {
    return useQuery({
        queryKey: ["news", search, location, newsTagId, page, eachPage],
        queryFn: () =>
            getNews({
                search: search,
                page: page,
                eachPage: eachPage,
                location: location,
                newsTagId: newsTagId
            })
    });
};

export const useNewsDetailQuery = (slug: string) => {
    return useQuery({
        queryKey: ["news-detail", slug],
        queryFn: () => getNewsDetail(slug)
    });
}