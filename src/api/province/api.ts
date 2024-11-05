import axiosServices from "@/lib/axios";
import { Metadata, ModelResponse, Pagination } from "../common/type";
import { Province } from "./type";
import { endpointInformation } from "@/helpers/endpoint";

export const createProvinces = async (
    provinceList: Omit<Province, "numberSchool">[]
): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.post(
            endpointInformation.CREATE_PROVINCES,
            provinceList
        );
        return data;
    } catch (error) {
        console.error("Error while create province list ");
        throw error;
    }
};

export const getProvinces = async ({
    search,

    pageNumber,
    pageSize,
}: {
    search: string;
    pageNumber: number;
    pageSize: number;
}): Promise<Pagination<Province>> => {
    try {
        const response = await axiosServices.get(
            endpointInformation.GET_PROVINCES,
            {
                params: {
                    search,
                    pageNumber,
                    pageSize,
                },
            }
        );
        const paginationHeader = response.headers["x-pagination"];
        const metadata: Metadata = JSON.parse(paginationHeader || "{}");

        return {
            data: response.data,
            currentPage: metadata.CurrentPage,
            pageSize: metadata.PageSize,
            totalCount: metadata.TotalCount,
            totalPages: metadata.TotalPages,
        };
    } catch (error) {
        console.error("Error while getting provinces", error);
        throw error;
    }
};
