"use client";

import { useLessonQuery } from "@/api/lesson/query";
import PageContainer from "@/components/core/layouts/page-container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Tabs } from "./tabs";
import { useState } from "react";
import { LessonDetail } from "./lesson-detail";
import dynamic from "next/dynamic";

interface LessonDetailModuleProps {
    lessonId: string;
}

export type Tab = "detail" | "theory" | "flashcard" | "quiz";

const LessonTheory = dynamic(
    () => import("./lesson-theory").then((mod) => mod.LessonTheory),
    { ssr: false }
);

function LessonDetailModule({ lessonId }: LessonDetailModuleProps) {
    const router = useRouter();

    const [tab, setTab] = useState<Tab>("detail");

    const handleBack = () => {
        router.back();
    };

    const { data: lessonData, isLoading } = useLessonQuery({
        lessonId: lessonId,
    });

    if (isLoading) {
        return (
            <PageContainer scrollable>
                <div className="w-full h-full flex flex-col gap-y-5">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 items-center py-4">
                            <div className="flex flex-row items-center gap-2">
                                <Skeleton className="h-8 w-[400px]" />
                            </div>
                        </div>
                        <Skeleton className="h-8 w-[100px]" />
                    </div>
                    <Tabs
                        isLoading={isLoading}
                        onTabChange={setTab}
                        tab={tab}
                    />
                    <div className="w-full">
                        <div className="grid grid-cols-3 gap-4">
                            <Skeleton className="h-[400px] col-span-2 w-full" />
                            <Skeleton className="h-[400px] w-full" />
                        </div>
                    </div>
                </div>
            </PageContainer>
        );
    }
    return (
        <PageContainer scrollable>
            <div className="w-full h-full flex flex-col gap-y-5">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center py-4">
                        <Button
                            onClick={handleBack}
                            size={"icon"}
                            variant={"ghost"}
                        >
                            <IconArrowLeft />
                        </Button>
                        <div className="flex flex-row items-center gap-2">
                            <h2 className="text-2xl font-bold">
                                {lessonData?.lessonName}
                            </h2>
                        </div>
                    </div>
                </div>
                <Tabs isLoading={isLoading} onTabChange={setTab} tab={tab} />
                <div className="w-full">
                    {tab === "detail" && (
                        <LessonDetail
                            isLoading={isLoading}
                            lessonDetail={lessonData!}
                        />
                    )}
                    {tab === "theory" && <LessonTheory lessonId={lessonId} />}
                </div>
            </div>
        </PageContainer>
    );
}

export default LessonDetailModule;
