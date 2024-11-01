"use client";

import { useUsersQuery } from "@/api/user/query";
import { UserRole } from "@/api/user/type";
import { DataTable } from "@/components/core/commons/table";
import { Columns } from "@/components/core/commons/tables/user-table/collumns";
import { UserInfo } from "@/components/core/commons/tables/user-table/user-info";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { cn } from "@/lib/utils";
import { useUserTableContext } from "@/stores/use-user-table-store";
import { PaginationState } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const InternalStudenManagement = () => {
    const isOpenUserInfo = useUserTableContext((s) => s.openUserInfo);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const debounceSearch = useDebounceValue(searchQuery, 300);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useUsersQuery({
        page: pageIndex,
        eachPage: pageSize,
        roleName: UserRole.Student,
        search: debounceSearch,
    });
    return (
        <div
            className={cn(
                "w-full flex flex-row h-[calc(100dvh-64px-16px)]",
                isOpenUserInfo && "gap-4"
            )}
        >
            <motion.div
                className="bg-background flex-1 p-4 rounded-lg transition-all duration-300"
                animate={{
                    flexBasis: isOpenUserInfo ? "calc(100% - 400px)" : "100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <DataTable
                    setSearchQuery={setSearchQuery}
                    sectionTitle="Students"
                    columns={Columns}
                    pageSize={pageSize}
                    data={data?.data ?? []}
                    page={pageIndex}
                    totalPage={data?.totalPages ?? 0}
                    setPagination={setPagination}
                    totalCount={data?.totalCount ?? 0}
                    isLoading={isLoading}
                />
            </motion.div>
            <AnimatePresence>
                {isOpenUserInfo && <UserInfo key="user-info" />}
            </AnimatePresence>
        </div>
    );
};
