import { endPointBlog } from "@/helpers/endpoint";
import axiosServices, { axiosClientUpload } from "@/lib/axios";
import { News, NewsDetail } from "./news.type";
import { Metadata, Pagination } from "../common/type";

export const createBlog = async (data: News) => {
    const reponse = await axiosClientUpload.postForm(`${endPointBlog.CREATE_BLOG}`, data);

    return reponse.data;
};

export const getNews = async ({
    page,
    eachPage,
    search,
    location,
    newsTagId,
}: {
    page: number,
    eachPage: number,
    search?: string,
    location?: string | null,
    newsTagId?: string | null
}): Promise<Pagination<NewsDetail>> => {
    const response = await axiosServices.get(`${endPointBlog.GET_NEWS}`, {
        params: {
            PageSize: eachPage,
            PageNumber: page,
            Search: search,
            Location: location,
            newsTagId: newsTagId
        }
    });

    const paginationHeader = response.headers["x-pagination"];
    const metadata: Metadata = JSON.parse(paginationHeader || "{}");

    return {
        data: response.data,
        currentPage: metadata.CurrentPage,
        pageSize: metadata.PageSize,
        totalCount: metadata.TotalCount,
        totalPages: metadata.TotalPages,
    };
}

export const getNewsDetail = async (slug: string): Promise<NewsDetail> => {
    const response = await axiosServices.get(`${endPointBlog.GET_NEWS_DETAIL(slug)}`);

    return response.data;
}