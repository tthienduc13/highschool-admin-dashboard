"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/core/commons/table";
import { useMajorCategoryStore } from "@/stores/use-major";
import { ControlBar } from "@/components/core/commons/table/control-bar";
import { useGetMajorCategoryQuery } from "@/api/major/query";
import { MajorCategoryColumns } from "@/components/core/commons/tables/major-category-table/column";
import { MajorCategoryAction } from "./major-category-action";
import { ImportMajorCategoryButton } from "./button-import";

function MajorCategoryManagement() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debounceSearch = useDebounceValue(searchQuery, 300);
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useGetMajorCategoryQuery({
        pageNumber: pageIndex,
        pageSize: pageSize,
        search: debounceSearch,
    });

    const isOpenCreate = useMajorCategoryStore((s) => s.isOpenCreate);
    const isOpenEdit = useMajorCategoryStore((s) => s.isOpenEdit);
    const openCreate = useMajorCategoryStore((s) => s.openCreate);


    return (
        <div
            className={cn(
                "w-full flex flex-row h-[calc(100dvh-64px-16px)]",
                (isOpenCreate || isOpenEdit) && "gap-4"
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
                            Major Category ({data?.totalCount})
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
                            <ImportMajorCategoryButton />
                            <Button onClick={openCreate}>
                                <IconPlus /> Add new
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-scroll">
                        <DataTable
                            columns={MajorCategoryColumns}
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
                    <MajorCategoryAction key="create-course" mode="create" />
                )}
                {isOpenEdit && <MajorCategoryAction key={"edit-course"} mode="edit" />}
            </AnimatePresence>
        </div>
    )
}

export default MajorCategoryManagement;