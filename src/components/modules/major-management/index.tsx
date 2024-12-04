"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { PaginationState } from "@tanstack/react-table";
import { useGetMajorQuery } from "@/api/major/query";
import { useMajorStore } from "@/stores/use-major";
import { DataTable } from "@/components/core/commons/table";
import { ControlBar } from "@/components/core/commons/table/control-bar";
import { MajorColumns } from "@/components/core/commons/tables/major-table/column";
import { MajorAction } from "./major-action";
import { ImportMajorButton } from "./button-import";

function MajorManagement() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debounceSearch = useDebounceValue(searchQuery, 300);
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useGetMajorQuery({
        pageNumber: pageIndex,
        pageSize: pageSize,
        search: debounceSearch,
    });

    const isOpenCreate = useMajorStore((s) => s.isOpenCreate);
    const isOpenEdit = useMajorStore((s) => s.isOpenEdit);

    const openCreate = useMajorStore((s) => s.openCreate);

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
                            Major ({data?.totalCount})
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
                            <ImportMajorButton />
                            <Button onClick={openCreate}>
                                <IconPlus /> Add new
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-scroll">
                        <DataTable
                            columns={MajorColumns}
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
                    <MajorAction key="create-course" mode="create" />
                )}
                {isOpenEdit && <MajorAction key={"edit-course"} mode="edit" />}
            </AnimatePresence>
        </div>
    )
}

export default MajorManagement;