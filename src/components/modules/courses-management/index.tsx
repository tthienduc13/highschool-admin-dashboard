"use client";

import { useCoursesQuery } from "@/api/course/query";
import { DataTable } from "@/components/core/commons/table";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { CourseColumns } from "../../core/commons/tables/course-table/columns";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { IconInfoCircle, IconPlus, IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Hint } from "@/components/core/commons/hint";
import { ControlBar } from "@/components/core/commons/table/control-bar";

const CreateCourseModal = dynamic(
    () =>
        import("@/components/core/commons/modals/create-course-modal").then(
            (mod) => mod.CreateCourseModal
        ),
    { ssr: false }
);

function CoursesModule() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

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
        <>
            <CreateCourseModal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
            />
            <div className="w-full flex flex-row h-[calc(100dvh-64px-32px)] rounded-lg bg-background p-4">
                <div className="flex flex-col gap-y-4 w-full h-full">
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-3xl font-bold text-primary">
                            Courses ({data?.totalCount})
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-row items-center px-2 border rounded-md">
                                <IconSearch size={18} />
                                <Input
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search by course name"
                                    className="border-none outline-none shadow-none focus-visible:ring-0 min-w-[200px]"
                                />
                            </div>
                            <Button
                                disabled={isLoading}
                                onClick={() => setOpenCreateModal(true)}
                            >
                                <IconPlus />
                                Add new
                            </Button>
                            <Hint label="Instruction" side="bottom">
                                <Button size={"icon"} variant={"ghost"}>
                                    <IconInfoCircle size={24} />
                                </Button>
                            </Hint>
                        </div>
                    </div>
                    <div className="flex-1 overflow-scroll">
                        <DataTable
                            columns={CourseColumns}
                            pageSize={pageSize}
                            data={data?.data ?? []}
                            page={pageIndex}
                            totalPage={data?.totalPages ?? 0}
                            isLoading={isLoading}
                        />
                    </div>
                    <ControlBar
                        currentPage={pageIndex}
                        totalCount={data?.totalCount ?? 0}
                        totalPage={data?.totalPages ?? 0}
                        setPagination={setPagination}
                        pageSize={pageSize}
                    />
                </div>
            </div>
        </>
    );
}

export default CoursesModule;
