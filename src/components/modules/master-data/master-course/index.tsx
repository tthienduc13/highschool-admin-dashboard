"use client";

import { useCoursesQuery } from "@/api/course/query";
import { DataTable } from "@/components/core/commons/table";
import { ControlBar } from "@/components/core/commons/table/control-bar";
import { CourseColumns } from "@/components/core/commons/tables/course-table/columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { cn } from "@/lib/utils";
import useMasterCourseStore from "@/stores/use-master-course-store";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useCategoriesQuery } from "@/api/category/query";
import { Class } from "@/api/course/type";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CourseAction = dynamic(
    () => import("./course-action").then((mod) => mod.CourseAction),
    { ssr: false }
);

const CourseDetail = dynamic(
    () => import("./detail").then((mod) => mod.CourseDetail),
    { ssr: false }
);
function MasterCourseModule() {
    const { data: categoryData, isLoading: isLoadingCategory } =
        useCategoriesQuery();
    const isOpenCreate = useMasterCourseStore((s) => s.isOpenCreate);
    const isOpenEdit = useMasterCourseStore((s) => s.isOpenEdit);
    const isOpenDetail = useMasterCourseStore((s) => s.isOpenDetail);

    const openCreate = useMasterCourseStore((s) => s.openCreate);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const debounceSearch = useDebounceValue(searchQuery, 300);
    const [selectedGrade, setSelectedGrade] = useState<Class | null>(null);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useCoursesQuery({
        pageNumber: pageIndex,
        grade: selectedGrade,
        pageSize: pageSize,
        search: debounceSearch,
    });
    return (
        <div
            className={cn(
                "w-full flex flex-row h-[calc(100dvh-64px-16px)]",
                (isOpenCreate || isOpenEdit || isOpenDetail) && "gap-4"
            )}
        >
            <motion.div
                className="bg-background flex-1 p-4 rounded-lg transition-all duration-300"
                animate={{
                    flexBasis:
                        isOpenCreate || isOpenEdit
                            ? "calc(100% - 35%)"
                            : "100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="w-full h-full flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-3xl font-bold text-primary">
                            Master course ({data?.totalCount})
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
                            <Select
                                disabled={isLoadingCategory}
                                onValueChange={(value) =>
                                    setSelectedGrade(value as Class)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a category" />
                                </SelectTrigger>
                                <SelectContent align="end">
                                    {categoryData?.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.categoryName}
                                        >
                                            {category.categoryName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={openCreate}>
                                <IconPlus /> Add new
                            </Button>
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
            </motion.div>
            <AnimatePresence>
                {isOpenCreate && (
                    <CourseAction key="create-course" mode="create" />
                )}
                {isOpenEdit && <CourseAction key={"edit-course"} mode="edit" />}
                {isOpenDetail && <CourseDetail key={"course-detail"} />}
            </AnimatePresence>
        </div>
    );
}

export default MasterCourseModule;
