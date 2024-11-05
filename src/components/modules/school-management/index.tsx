"use client";
import { useGetProvincesQuery } from "@/api/province/query";
import { useCreateSchoolMutation } from "@/api/schools/query";
import { CsvImporter } from "@/components/core/commons/csv-importer";
import { DataTable } from "@/components/core/commons/table";
import { ControlBar } from "@/components/core/commons/table/control-bar";
import { ProvinceColumn } from "@/components/core/commons/tables/province-table/columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

const BATCH_SIZE = 200;

function RegionModule() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debounceSearch = useDebounceValue(searchQuery, 300);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { data, isLoading } = useGetProvincesQuery({
        pageNumber: pageIndex,
        pageSize: pageSize,
        search: debounceSearch,
    });

    const { mutate: createSchool, isPending } = useCreateSchoolMutation();

    return (
        <>
            <div className="w-full flex flex-col h-[calc(100vh-64px-32px)] rounded-lg bg-background p-4 gap-4 ">
                <div className="flex flex-row items-center justify-between">
                    <div className="text-3xl font-bold text-primary">
                        Schools ({data?.totalCount ?? 0})
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
                        <CsvImporter
                            disabled={isPending}
                            fields={[
                                { label: "SchoolName", value: "name" },
                                {
                                    label: "Region Id",
                                    value: "regionId",
                                },
                                {
                                    label: "Location Detail",
                                    value: "locationDetail",
                                },
                            ]}
                            onImport={async (parsedData) => {
                                const formattedData = parsedData.map(
                                    (item) => ({
                                        provinceId: Number(item.regionId),
                                        schoolName: String(item.name ?? ""),
                                        locationDetail: String(
                                            item.locationDetail
                                        ),
                                    })
                                );

                                const batches = [];
                                for (
                                    let i = 0;
                                    i < formattedData.length;
                                    i += BATCH_SIZE
                                ) {
                                    batches.push(
                                        formattedData.slice(i, i + BATCH_SIZE)
                                    );
                                }

                                // Process each batch
                                for (const batch of batches) {
                                    try {
                                        await createSchool(batch);
                                        console.log(
                                            `Successfully created batch of ${batch.length} schools`
                                        );
                                    } catch (error) {
                                        console.error(
                                            "Error creating batch of schools",
                                            error
                                        );
                                        // Handle error (e.g., log it, retry, etc.)
                                    }
                                }
                            }}
                        />
                        <Button>
                            <IconPlus />
                            Add new
                        </Button>
                    </div>
                </div>
                <div className="flex-1 overflow-scroll">
                    <DataTable
                        columns={ProvinceColumn}
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
        </>
    );
}

export default RegionModule;
