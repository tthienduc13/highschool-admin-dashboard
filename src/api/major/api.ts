import { endPointMajor } from "@/helpers/endpoint";
import fetchPaginatedData from "../common/api";
import { ModelResponse, Pagination } from "../common/type";
import { Major, MajorCategory } from "./type";
import axiosServices from "@/lib/axios";

export const getMajor = async ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>): Promise<Pagination<Major>> => {
    return fetchPaginatedData<Major>(
        endPointMajor.GET_MAJOR,
        {
            search,
            pageNumber,
            pageSize
        }
    )
}

export const getMajorName = async ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>): Promise<Pagination<Major>> => {
    return fetchPaginatedData<Major>(
        endPointMajor.GET_MAJOR_NAME,
        {
            search,
            pageNumber,
            pageSize
        }
    )
}

export const deleteMajor = async (
    id: string
): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.delete(
            endPointMajor.DELETE_MAJOR(id)
        )

        return data
    } catch (error) {
        console.error("Error while delete major ", error)
        throw error
    }
}

export const createMajor = async ({
    majors
}: {
    majors: Major[]
}): Promise<ModelResponse<Major[]>> => {
    try {
        const { data } = await axiosServices.post(
            endPointMajor.CREATE_MAJOR,
            majors
        )

        return data
    } catch (error) {
        console.error("Error while create major ", error)
        throw error
    }
}

export const updateMajor = async ({
    major
}: {
    major: Major
}): Promise<ModelResponse<Major>> => {
    try {
        const { data } = await axiosServices.put(
            endPointMajor.UPDATE_MAJOR(major.id!),
            {
                majorCode: major.majorCode,
                name: major.name,
                description: major.description,
                skillYouLearn: major.skillYouLearn,
                majorCategoryCode: major.majorCategoryCode
            }
        )

        return data
    } catch (error) {
        console.error("Error while update major ", error)
        throw error
    }
}

export const getMajorCategory = async ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>): Promise<Pagination<MajorCategory>> => {
    return fetchPaginatedData<MajorCategory>(
        endPointMajor.GET_MAJOR_CATEGORY,
        {
            search,
            pageNumber,
            pageSize
        }
    )
}

export const getMajorCategoryName = async ({
    search,
    pageNumber,
    pageSize
}: Partial<{
    search: string;
    pageNumber: number;
    pageSize: number;
}>): Promise<Pagination<MajorCategory>> => {
    return fetchPaginatedData<MajorCategory>(
        endPointMajor.GET_MAJOR_CATEGORY_NAME,
        {
            search,
            pageNumber,
            pageSize
        }
    )
}

export const createMajorCategory = async ({
    majorCategories
}: {
    majorCategories: MajorCategory[]
}): Promise<ModelResponse<MajorCategory[]>> => {
    try {
        const { data } = await axiosServices.post(
            endPointMajor.CREATE_MAJOR_CATEGORY,
            majorCategories
        )

        return data;
    } catch (error) {
        console.error("Error while create major ", error)
        throw error
    }
}

export const updateMajorCategory = async ({
    majorCategory
}: {
    majorCategory: MajorCategory
}): Promise<ModelResponse<MajorCategory>> => {
    try {
        const { data } = await axiosServices.put(
            endPointMajor.UPDATE_MAJOR_CATEGORY(majorCategory.id!),
            {
                majorCategoryCode: majorCategory?.majorCategoryCode,
                name: majorCategory?.name,
                mbtiTypes: majorCategory?.mbtiTypes,
                primaryHollandTrait: majorCategory?.primaryHollandTrait,
                secondaryHollandTrait: majorCategory?.secondaryHollandTrait
            }
        )

        return data;
    } catch (error) {
        console.error("Error while update major ", error)
        throw error
    }
}

export const deleteMajorCategory = async (
    id: string
): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.delete(
            endPointMajor.DELETE_MAJOR_CATEGORY(id)
        )

        return data
    } catch (error) {
        console.error("Error while delete major ", error)
        throw error
    }
}