"use client";

import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { ControlBar } from "@/components/core/commons/table/control-bar";
import { usePublishedQuery } from "@/api/course-curriculum/query";
import Link from "next/link";

export type CourseCurriculum = {
    subjectCurriculumId: string;
    subjectCurriculumName: string;
    subjectName: string;
    subjectId: string;
    curriculumName: string;
    curriculumId: string;
};

function CoursesModule() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const debounceSearch = useDebounceValue(searchQuery, 300);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = usePublishedQuery({
        pageNumber: pageIndex,
        pageSize: pageSize,
        search: debounceSearch,
    });

    return (
        <div className="w-full flex flex-col h-[calc(100dvh-64px-16px)] rounded-lg bg-background p-4">
            <div className="flex flex-col gap-y-4 w-full h-full ">
                <div className="flex flex-row items-center justify-between">
                    <div className="text-3xl font-bold text-primary">
                        Published Courses ({data?.totalCount})
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row items-center px-2 border rounded-md">
                            <IconSearch size={18} />
                            <Input
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by course name"
                                className="border-none outline-none shadow-none focus-visible:ring-0 min-w-[200px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 mt-5 overflow-auto">
                    {isLoading ? (
                        <div className="w-full flex justify-center items-center h-full">
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                            {data?.data.map((course: CourseCurriculum) => (
                                <Link
                                    href={`/course-management/courses/${course.subjectCurriculumId}?courseId=${course.subjectId}&courseName=${course.subjectCurriculumName}`}
                                    key={course.subjectCurriculumId}
                                    className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
                                >
                                    <h4 className="font-bold text-lg text-primary truncate">
                                        {course.subjectCurriculumName}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        <strong>Subject:</strong>{" "}
                                        {course.subjectName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Curriculum:</strong>{" "}
                                        {course.curriculumName}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Control Bar for Pagination */}
                <ControlBar
                    currentPage={pageIndex}
                    totalCount={data?.totalCount ?? 0}
                    totalPage={data?.totalPages ?? 0}
                    setPagination={setPagination}
                    pageSize={pageSize}
                />
            </div>
        </div>
    );
}

export default CoursesModule;
