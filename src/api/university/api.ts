import { endPointUniversity } from "@/helpers/endpoint";
import fetchPaginatedData from "../common/api";
import { ModelResponse, Pagination } from "../common/type";
import { University, UniversityCreate } from "./type";
import axiosServices from "@/lib/axios";

export const getUniversity = async ({
    search,
    pageNumber,
    pageSize,
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>): Promise<Pagination<University>> => {
    return fetchPaginatedData<University>(
        endPointUniversity.GET_UNIVERSITY,
        {
            search,
            pageNumber,
            pageSize
        }
    )
}

export const createUniversityList = async (
    universityList: UniversityCreate[]
): Promise<ModelResponse<University[]>> => {
    try {
        const { data } = await axiosServices.post(
            endPointUniversity.CREATE_UNIVERSITY,
            universityList
        )

        return data
    } catch (error) {
        console.error("Error while create university list ", error)
        throw error
    }
}

export const updateUniversity = async (
    university: University
): Promise<ModelResponse<University>> => {
    try {
        const { data } = await axiosServices.put(
            endPointUniversity.UPDATE_UNIVERSITY(university.id),
            {
                uniCode: university.uniCode,
                name: university.name,
                description: university.description,
                region: university.region,
                contactPhone: university.contactPhone,
                contactEmail: university.contactEmail,
                websiteLink: university.websiteLink
            }
        )

        return data
    } catch (error) {
        console.error("Error while update university ", error)
        throw error
    }
}

export const deleteUniversity = async (
    universityId: string
): Promise<ModelResponse<University>> => {
    try {
        const { data } = await axiosServices.delete(
            endPointUniversity.DELETE_UNIVERSITY(universityId)
        )

        return data
    } catch (error) {
        console.error("Error while delete university ", error)
        throw error
    }
}