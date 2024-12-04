import { endPointUniversity } from "@/helpers/endpoint";
import fetchPaginatedData from "../common/api";
import { ModelResponse, Pagination } from "../common/type";
import { University, UniversityCreate, UniversityMajor } from "./type";
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

export const getUniversityMajor = async ({
    uniCode,
    pageNumber,
    pageSize
}: Partial<{
    uniCode: string;
    pageNumber: number;
    pageSize: number;
}>): Promise<Pagination<UniversityMajor>> => {
    try {
        return fetchPaginatedData<UniversityMajor>(
            endPointUniversity.GET_UNIVERSITY_MAJOR,
            {
                search: uniCode,
                pageNumber,
                pageSize
            }
        )
    } catch (error) {
        console.error("Error while get university major ", error)
        throw error
    }
}

export const createUniversityMajorList = async ({
    universityMajorList
}: {
    universityMajorList: UniversityMajor[]
}): Promise<ModelResponse<UniversityMajor[]>> => {
    try {
        const { data } = await axiosServices.post(
            endPointUniversity.CREATE_UNIVERSITY_MAJOR,
            universityMajorList
        )

        return data
    } catch (error) {
        console.error("Error while create university major list ", error)
        throw error
    }
}

export const updateUniversityMajor = async ({
    universityMajor
}: {
    universityMajor: UniversityMajor
}): Promise<ModelResponse<UniversityMajor>> => {
    try {
        const { data } = await axiosServices.put(
            endPointUniversity.UPDATE_UNIVERSITY_MAJOR(universityMajor.id ?? ""),
            {
                uniCode: universityMajor.uniCode,
                majorCode: universityMajor.majorCode,
                admissionMethod: universityMajor.admissionMethod,
                quota: universityMajor.quota,
                degreeLevel: universityMajor.degreeLevel
            }
        )

        return data
    } catch (error) {
        console.error("Error while update university major ", error)
        throw error
    }
}

export const deleteUniversityMajor = async ({
    universityMajorId
}: {
    universityMajorId: string
}): Promise<ModelResponse<UniversityMajor>> => {
    try {
        const { data } = await axiosServices.delete(
            endPointUniversity.DELETE_UNIVERSITY_MAJOR(universityMajorId)
        )

        return data
    } catch (error) {
        console.error("Error while delete university major ", error)
        throw error
    }
}

export const getUniversityName = async ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>): Promise<Pagination<University>> => {
    return fetchPaginatedData<University>(
        endPointUniversity.GET_UNIVERSITY_NAME,
        {
            search,
            pageNumber,
            pageSize
        }
    )
}

export const getUniversityMajorName = async ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>): Promise<Pagination<UniversityMajor>> => {
    return fetchPaginatedData<UniversityMajor>(
        endPointUniversity.GET_UNIVERSITY_MAJOR_NAME,
        {
            search,
            pageNumber,
            pageSize
        }
    )
}