import axiosServices from "@/lib/axios";
import { Metadata, Pagination } from "./type";

type QueryParams = Record<string, string | number | boolean | undefined>;

async function fetchPaginatedData<T>(
    endpoint: string,
    params: QueryParams = {}
): Promise<Pagination<T>> {
    try {
        const response = await axiosServices.get(endpoint, { params });
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
        console.error("Error while fetching paginated data:", error);
        throw error;
    }
}
export default fetchPaginatedData;
