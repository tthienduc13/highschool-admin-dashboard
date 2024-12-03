"use client"

import { useState } from "react"
import { DocumentCard } from "./document-card"
import { ControlBar } from "@/components/core/commons/table/control-bar"
import { PaginationState } from "@tanstack/react-table"
import { DocumentFilter, FilterDocument } from "./filter-document"
import { useDocumentQuery } from "@/api/document/query"
import { useDebounceValue } from "@/hooks/use-debounce-value"

function DocumentModule() {

    const [filters, setFilters] = useState<DocumentFilter>({
        schoolId: null,
        subjectIds: [] as string[],
        semester: null,
        documentYear: null as number | null,
        provinceId: null,
        categoryIds: [] as string[],
        curriculumIds: [] as string[],
        search: ""
    })

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const debounceSearch = useDebounceValue(filters.search, 300);

    const { data } = useDocumentQuery({
        pageSize,
        pageNumber: pageIndex,
        categoryIds: filters.categoryIds.join(","),
        curriculumIds: filters.curriculumIds.join(","),
        documentYear: filters.documentYear,
        provinceId: filters.provinceId,
        schoolId: filters.schoolId,
        semester: filters.semester,
        subjectIds: filters.subjectIds.join(","),
        seach: debounceSearch
    });

    const handleFilter = () => {
        console.log("filters: ", filters)
    }

    return (
        <div className="space-y-10">
            <div className="text-3xl font-bold text-primary">
                Documents
            </div>
            <FilterDocument
                filters={filters}
                setFilters={setFilters}
                handleFilter={handleFilter}
            />
            <DocumentCard documents={data?.data ?? []} />
            <ControlBar
                currentPage={data?.currentPage ?? 1}
                totalCount={data?.totalCount ?? 0}
                totalPage={data?.totalPages ?? 1}
                setPagination={setPagination}
                pageSize={pageSize}
            />
        </div>
    );
}

export default DocumentModule;
