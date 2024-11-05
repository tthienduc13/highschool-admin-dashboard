import axiosServices from "@/lib/axios";
import { ModelResponse } from "../common/type";
import { endpointInformation } from "@/helpers/endpoint";
import { CreateSchoolData } from "./type";

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

// export const getProvinces = async ({
//     search,

//     pageNumber,
//     pageSize,
// }: {
//     search: string;
//     pageNumber: number;
//     pageSize: number;
// }): Promise<Pagination<Province>> => {
//     try {
//         const response = await axiosServices.get(
//             endpointInformation.GET_PROVINCES,
//             {
//                 params: {
//                     search,
//                     pageNumber,
//                     pageSize,
//                 },
//             }
//         );
//         const paginationHeader = response.headers["x-pagination"];
//         const metadata: Metadata = JSON.parse(paginationHeader || "{}");

//         return {
//             data: response.data,
//             currentPage: metadata.CurrentPage,
//             pageSize: metadata.PageSize,
//             totalCount: metadata.TotalCount,
//             totalPages: metadata.TotalPages,
//         };
//     } catch (error) {
//         console.error("Error while getting provinces", error);
//         throw error;
//     }
// };
