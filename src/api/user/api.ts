import { endpointUser } from "@/helpers/endpoint";
import axiosServices from "@/lib/axios";
import { Metadata, ModelResponse, Pagination } from "../common/type";
import { Student, Teacher, UserCreate, UserPreview, UserRole, UserStatus } from "./type";

export const getUsers = async ({
    page,
    eachPage,
    status = UserStatus.All,
    search,
    roleName,
}: {
    page: number;
    eachPage: number;
    status: UserStatus;
    search?: string;
    roleName: UserRole;
}): Promise<Pagination<UserPreview>> => {
    try {
        const response = await axiosServices.get(`${endpointUser.GET_USER}`, {
            params: { page, eachPage, status, search, roleName },
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
    } catch (error) {
        console.error("Error while getting user", error);
        throw error;
    }
};

export const getUserDetail = async ({
    email,
}: {
    email: string;
}): Promise<ModelResponse<Student | Teacher>> => {
    try {
        const response = await axiosServices.get(
            endpointUser.GET_USER_DETAIL(email)
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};

export const createAccount = async ({
    user
}: {
    user: UserCreate
}): Promise<ModelResponse<string>> => {
    try {
        const response = await axiosServices.post(endpointUser.CREATE_USER, {
            user
        });

        return response.data;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
}

// export const updateStatusUser = async ({
//     userId,
//     status,
// }: {
//     userId: string;
//     status: string;
// }): Promise<ModelResponse<>> => {
//     try {
//         const response = await axiosServices.put(
//             endpointUser.UPDATE_STATUS_USER,
//             {
//                 userId: userId,
//                 status: status,
//             }
//         );

//         return response.data;
//     } catch (error) {
//         // eslint-disable-next-line no-console
//         console.error("Error fetching subjects:", error);
//         throw error;
//     }
// };
