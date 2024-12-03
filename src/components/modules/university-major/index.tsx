"use client"

import { UniversityMajorCard } from "./university-major-card";
import { School } from "lucide-react";
import { UniversityInformationCard } from "./university-information-card";
import { useUniversityMajorQuery, useUniversityQuery } from "@/api/university/query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { ImportUniversityMajorButton } from "./button-import";
import { AnimatePresence, motion } from "framer-motion";
import { useUniversityMajorStore } from "@/stores/use-university";
import { UniversityMajorAction } from "./university-major-action";
import { cn } from "@/lib/utils";

interface UniversityMajorModuleProps {
    uniCode: string;
}

function UniversityMajorModule({ uniCode }: UniversityMajorModuleProps) {

    const { data: universities, isPending: isUniversityLoading } = useUniversityQuery({
        pageNumber: 1,
        pageSize: 1,
        search: uniCode,
    });

    const { data, isPending: isUniversityMajorLoading } = useUniversityMajorQuery({
        pageNumber: 1,
        pageSize: 10,
        search: uniCode,
    })

    const university = universities?.data[0];
    const universityMajor = data?.data;

    const isOpenCreate = useUniversityMajorStore((s) => s.isOpenCreate);
    const isOpenEdit = useUniversityMajorStore((s) => s.isOpenEdit);
    const openCreate = useUniversityMajorStore((s) => s.openCreate);

    return (
        <div className={cn(
            "w-full flex flex-row",
            (isOpenCreate || isOpenEdit) && "gap-4"
        )}>

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
                {/* Header Section */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <School className="h-8 w-8" />
                            <h1 className="text-3xl font-bold tracking-tight">{university?.name}</h1>
                        </div>
                        <div className="flex gap-4">
                            <ImportUniversityMajorButton uniCode={uniCode} />
                            <Button onClick={openCreate}>
                                <IconPlus /> Create Program
                            </Button>
                        </div>
                    </div>
                    <p className="text-muted-foreground max-w-3xl">{university?.description}</p>
                </div>

                {
                    !isUniversityLoading ? (
                        <div className="my-8">
                            <UniversityInformationCard university={university} />
                        </div>
                    ) : (
                        <div className="group bg-white rounded-lg overflow-hidden border border-border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                        >
                            <Skeleton className="h-[30vh] w-full" />
                        </div>
                    )
                }

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Available Programs</h2>
                    {
                        !isUniversityMajorLoading ? (
                            <UniversityMajorCard data={universityMajor} />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="group bg-white rounded-lg overflow-hidden border border-border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                                    >
                                        <Skeleton className="h-[30vh] w-full" />
                                    </div>
                                ))}

                            </div>
                        )
                    }
                </div>

            </motion.div>

            <AnimatePresence>
                {isOpenCreate && (
                    <UniversityMajorAction uniCode={uniCode} key="create-university" mode="create" />
                )}
                {isOpenEdit && <UniversityMajorAction uniCode={uniCode} key={"edit-university"} mode="edit" />}
            </AnimatePresence>
        </div>
    );
}

export default UniversityMajorModule;