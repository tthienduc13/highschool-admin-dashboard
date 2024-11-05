export type Pagination<T> = {
    data: T[];
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
};

export type Metadata = {
    TotalCount: number;
    PageSize: number;
    TotalPages: number;
    CurrentPage: number;
};

export type ModelResponse<T> = {
    status: number;
    message: string;
    data?: T;
};

export type BasicResponse<T> = {
    data: T;
};