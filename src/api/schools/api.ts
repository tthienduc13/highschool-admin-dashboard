import axiosServices from "@/lib/axios";
import { ModelResponse, Pagination } from "../common/type";
import { endpointInformation } from "@/helpers/endpoint";
import { CreateSchoolData, School } from "./type";
import fetchPaginatedData from "../common/api";

export const createSchools = async (
    schoolList: CreateSchoolData[]
): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.post(
            endpointInformation.CREATE_SCHOOLS,
            schoolList
        );
        return data;
    } catch (error) {
        console.error("Error while create school list ", error);
        throw error;
    }
};

export const getSchools = async ({
    search,
    pageNumber,
    pageSize,
}: {
    search?: string;
    pageNumber: number;
    pageSize: number;
}): Promise<Pagination<School>> => {
    return fetchPaginatedData<School>(endpointInformation.GET_SCHOOLS, {
        search,
        pageNumber,
        pageSize,
    });
};

export const getProvinceSchools = async ({
    provinceId,
    search,
    pageNumber,
    pageSize,
}: {
    provinceId: string;
    search?: string;
    pageNumber: number;
    pageSize: number;
}): Promise<Pagination<School>> => {
    return fetchPaginatedData<School>(
        endpointInformation.GET_ALL_PROVINCE_SCHOOL(provinceId),
        {
            search,
            pageNumber,
            pageSize,
        }
    );
};
