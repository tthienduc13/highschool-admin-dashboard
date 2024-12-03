"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { PaginationState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/core/commons/table";
import { ControlBar } from "@/components/core/commons/table/control-bar";
import { useCreateUniversityListMutation, useUniversityQuery } from "@/api/university/query";
import { UniversityColumns } from "../../core/commons/tables/university-table/university-colum";
import { CsvImporter } from "@/components/core/commons/csv-importer";
import { UniversityAction } from "./university-action";
import { useUniversityStore } from "@/stores/use-university";


function UniverstyManagementModule() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debounceSearch = useDebounceValue(searchQuery, 300);
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useUniversityQuery({
        pageNumber: pageIndex,
        pageSize: pageSize,
        search: debounceSearch,
    });

    const { mutate: createUniversityList, isPending } = useCreateUniversityListMutation();

    const isOpenCreate = useUniversityStore((s) => s.isOpenCreate);
    const isOpenEdit = useUniversityStore((s) => s.isOpenEdit);
    const openCreate = useUniversityStore((s) => s.openCreate);

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
                            University ({data?.totalCount})
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
                            <CsvImporter
                                disabled={isPending}
                                fields={[
                                    {
                                        label: "UniCode",
                                        value: "uniCode",
                                    },
                                    {
                                        label: "University Name",
                                        value: "name",
                                    },
                                    {
                                        label: "Description",
                                        value: "description",
                                    },
                                    {
                                        label: "Region",
                                        value: "region",
                                    },
                                    {
                                        label: "Contact Phone",
                                        value: "contactPhone",
                                    },
                                    {
                                        label: "Contact Email",
                                        value: "contactEmail",
                                    },
                                    {
                                        label: "Website Link",
                                        value: "websiteLink",
                                    }
                                ]}
                                onImport={async (parsedData) => {
                                    const formattedData = parsedData.map(
                                        (item) => ({
                                            uniCode: String(item.uniCode),
                                            name: String(item.name ?? ""),
                                            description: String(
                                                item.description
                                            ),
                                            region: String(item.region),
                                            contactPhone: String(item.contactPhone),
                                            contactEmail: String(item.contactEmail),
                                            websiteLink: String(item.websiteLink)
                                        })
                                    );

                                    try {
                                        createUniversityList(formattedData);
                                    } catch (error) {
                                        console.error(
                                            "Error creating batch of schools",
                                            error
                                        );
                                    }
                                }}
                            />
                            <Button onClick={openCreate}>
                                <IconPlus /> Add new
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-scroll">
                        <DataTable
                            columns={UniversityColumns}
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
                    <UniversityAction key="create-university" mode="create" />
                )}
                {isOpenEdit && <UniversityAction key={"edit-university"} mode="edit" />}
            </AnimatePresence>
        </div>
    )
}

export default UniverstyManagementModule;