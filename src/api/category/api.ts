import axiosServices from "@/lib/axios";
import { Category } from "./type";
import { endpointCategory } from "@/helpers/endpoint";

export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const { data } = await axiosServices.get(
            endpointCategory.GET_ALL_CATEGORY
        );
        return data;
    } catch (error) {
        console.error("Error while getting category", error);
        throw error;
    }
};
