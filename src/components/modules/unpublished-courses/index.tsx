"use client";

import { useUnpublishedQuery } from "@/api/course-curriculum/query";
import { CourseCard } from "@/components/core/commons/course-card";
import { Hint } from "@/components/core/commons/hint";
import { ControlBar } from "@/components/core/commons/table/control-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { IconInfoCircle, IconPlus, IconSearch } from "@tabler/icons-react";
import { PaginationState } from "@tanstack/react-table";
import dynamic from "next/dynamic";

import { useState } from "react";

const CreateModal = dynamic(
    () =>
        import("@/components/core/commons/modals/create-modal").then(
            (mod) => mod.CreateModal
        ),
    {
        ssr: false,
    }
);

export default function UnpulishedCoursesModule() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

    const debounceSearch = useDebounceValue(searchQuery, 300);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useUnpublishedQuery({
        pageNumber: pageIndex,
        pageSize: pageSize,
        search: debounceSearch,
    });

    const skeletonArray = Array.from({ length: pageSize }, (_, i) => i);

    return (
        <>
            <CreateModal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
            />
            <div className="w-full flex flex-row min-h-[calc(100dvh-64px-16px)] rounded-lg bg-background p-4">
                <div className="flex flex-col gap-y-4 w-full h-full">
                    {/* Header Section */}
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-3xl font-bold text-primary">
                            Unpublished Courses ({data?.totalCount || 0})
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
                            <Button onClick={() => setOpenCreateModal(true)}>
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

                    {/* Courses Grid Section */}
                    <div className="flex-1 mt-5">
                        <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                            {isLoading
                                ? skeletonArray.map((index) => (
                                      <Skeleton
                                          key={index}
                                          className="h-48 rounded-md"
                                      />
                                  ))
                                : data?.data.map((course) => (
                                      <CourseCard
                                          course={course}
                                          key={course.subjectCurriculumId}
                                      />
                                  ))}
                        </div>
                    </div>

                    {isLoading ? (
                        <Skeleton className="h-12 w-full rounded-md" />
                    ) : (
                        <ControlBar
                            currentPage={pageIndex}
                            totalCount={data?.totalCount ?? 0}
                            totalPage={data?.totalPages ?? 0}
                            setPagination={setPagination}
                            pageSize={pageSize}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
