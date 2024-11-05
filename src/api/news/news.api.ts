import { endPointBlog } from "@/helpers/endpoint";
import axiosServices, { axiosClientUpload } from "@/lib/axios";
import { News } from "./news.type";

export const createBlog = async (data: News) => {
    const reponse = await axiosClientUpload.postForm(`${endPointBlog.CREATE_BLOG}`, data);

    return reponse.data;
};