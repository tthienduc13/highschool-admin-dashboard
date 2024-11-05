"use client";

import { useUsersQuery } from "@/api/user/query";
import { UserRole } from "@/api/user/type";
import { DataTable } from "@/components/core/commons/table";
import { ControlBar } from "@/components/core/commons/table/control-bar";
import { Columns } from "@/components/core/commons/tables/user-table/collumns";
import { CreateModerator } from "@/components/core/commons/tables/user-table/create-moderator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { cn } from "@/lib/utils";
import { useUserTableContext } from "@/stores/use-user-table-store";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { PaginationState } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";

const UserInfo = dynamic(
    () =>
        import("@/components/core/commons/tables/user-table/user-info").then(
            (mod) => mod.UserInfo
        ),
    { ssr: false }
);

export const InternalModeratorManagement = () => {
    const isOpenUserInfo = useUserTableContext((s) => s.openUserInfo);
    const isOpenCreateModer = useUserTableContext((s) => s.openCreateModer);

    const onOpenCreate = useUserTableContext((s) => s.onOpenCreateModer);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const debounceSearch = useDebounceValue(searchQuery, 300);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useUsersQuery({
        page: pageIndex,
        eachPage: pageSize,
        roleName: UserRole.Moderator,
        search: debounceSearch,
    });
    return (
        <div
            className={cn(
                "w-full flex flex-row h-[calc(100dvh-64px-32px)]",
                isOpenUserInfo && "gap-4",
                isOpenCreateModer && "gap-4"
            )}
        >
            <motion.div
                className="bg-background flex-1 p-4 rounded-lg transition-all duration-300"
                animate={{
                    flexBasis: isOpenUserInfo ? "calc(100% - 400px)" : "100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="w-full h-full flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-3xl font-bold text-primary">
                            Moderator ({data?.totalCount})
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-row items-center px-2 border rounded-md">
                                <IconSearch size={18} />
                                <Input
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search by name"
                                    className="border-none outline-none shadow-none focus-visible:ring-0 min-w-[200px]"
                                />
                            </div>
                            <Button
                                disabled={isOpenCreateModer}
                                onClick={onOpenCreate}
                            >
                                <IconPlus />
                                Add moderator
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-scroll">
                        <DataTable
                            columns={Columns}
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
                {isOpenUserInfo && <UserInfo key="user-info" />}
                {isOpenCreateModer && <CreateModerator />}
            </AnimatePresence>
        </div>
    );
};
