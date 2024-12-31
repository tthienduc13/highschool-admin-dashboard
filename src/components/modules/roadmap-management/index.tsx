"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
const CreateRoadmapModal = dynamic(
    () => import("./create-modal").then((mod) => mod.CreateRoadmapModal),
    {
        ssr: false,
    }
);

function RoadmapListModule() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [open, setOpen] = useState(false);

    console.log(searchQuery);
    return (
        <>
            <CreateRoadmapModal open={open} onClose={() => setOpen(false)} />
            <div
                className={cn(
                    "w-full flex flex-row h-[calc(100dvh-64px-32px)]"
                )}
            >
                <motion.div
                    className="bg-background flex-1 p-4 rounded-lg transition-all duration-300"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="w-full h-full flex flex-col gap-4">
                        <div className="flex flex-row items-center justify-between">
                            <div className="text-3xl font-bold text-primary">
                                Roadmap List
                            </div>
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-row items-center px-2 border rounded-md">
                                    <IconSearch size={18} />
                                    <Input
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Search by student name"
                                        className="border-none outline-none shadow-none focus-visible:ring-0 min-w-[200px]"
                                    />
                                </div>
                                <Button onClick={() => setOpen(true)}>
                                    <IconPlus />
                                    Add new
                                </Button>
                            </div>
                        </div>
                        {/* <div className="flex-1 overflow-scroll">
                        <DataTable
                            columns={Columns}
                            pageSize={pageSize}
                            data={data?.data ?? []}
                            page={pageIndex}
                            totalPage={data?.totalPages ?? 0}
                            isLoading={isLoading}
                        />
                    </div> */}
                        {/* <ControlBar
                        currentPage={pageIndex}
                        totalCount={data?.totalCount ?? 0}
                        totalPage={data?.totalPages ?? 0}
                        setPagination={setPagination}
                        pageSize={pageSize}
                    /> */}
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default RoadmapListModule;
