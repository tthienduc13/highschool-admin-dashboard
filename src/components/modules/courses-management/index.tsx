"use client";

import { useCoursesQuery } from "@/api/course/query";
import { DataTable } from "@/components/core/commons/table";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { CourseColumns } from "./columns";
import { useDebounceValue } from "@/hooks/use-debounce-value";

function CoursesModule() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const debounceSearch = useDebounceValue(searchQuery, 300);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useCoursesQuery({
        pageNumber: pageIndex,
        pageSize: pageSize,
        search: debounceSearch,
    });
    return (
        <div className="w-full flex flex-row h-[calc(100dvh-64px-16px)] rounded-lg bg-background p-4">
            <DataTable
                setSearchQuery={setSearchQuery}
                data={data?.data ?? []}
                columns={CourseColumns}
                page={pageIndex}
                pageSize={pageSize}
                totalCount={data?.totalCount ?? 0}
                isLoading={isLoading}
                totalPage={data?.totalPages ?? 0}
                setPagination={setPagination}
                sectionTitle="All courses"
            />
        </div>
    );
}

export default CoursesModule;
