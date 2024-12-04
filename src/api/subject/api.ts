import { endpointSubject } from "@/helpers/endpoint";
import fetchPaginatedData from "../common/api";
import { Pagination } from "../common/type";
import { Subject } from "./type";

export const getSubjects = async ({
    search,
    grade,
    pageNumber,
    pageSize,
}: {
    search?: string;
    grade?: string;
    pageNumber: number;
    pageSize: number;
}): Promise<Pagination<Subject>> => {
    return fetchPaginatedData<Subject>(
        endpointSubject.GET_SUBJECTS,
        {
            search,
            class: grade,
            pageNumber,
            pageSize,
        }
    );
}