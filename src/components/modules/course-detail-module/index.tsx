"use client";

import { useCourseIdQuery } from "@/api/course/query";
import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconLoader2 } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Tabs } from "./tabs";
import PageContainer from "@/components/core/layouts/page-container";
import dynamic from "next/dynamic";
import { CourseDetail } from "./course-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { useUnpublishMutation } from "@/api/course-curriculum/query";

const CourseContent = dynamic(
    () => import("./course-content").then((mod) => mod.CourseContent),
    { ssr: false }
);

interface CourseDetailModuleProps {
    courseCurriculumId: string;
}

export type Tab = "detail" | "flashcard" | "quiz" | "content";

function CourseDetailModule({ courseCurriculumId }: CourseDetailModuleProps) {
    const searchParams = useSearchParams();
    const { data: courseData, isLoading } = useCourseIdQuery(
        searchParams.get("courseId" as string)!
    );
    const { mutate: unpublish, isPending } = useUnpublishMutation();
    const router = useRouter();
    const pathName = usePathname();

    const handleBack = () => {
        const coursePath = pathName.split(`/${courseCurriculumId}`)[0];
        router.push(coursePath!);
    };

    const [tab, setTab] = useState<Tab>("detail");

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
                        {tab === "detail" && (
                            <CourseDetail
                                isLoading={isLoading}
                                courseDetail={courseData}
                            />
                        )}
                        {tab === "content" && (
                            <CourseContent courseId={courseCurriculumId} />
                        )}
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
                                {searchParams.get("courseName" as string)}
                            </h2>
                        </div>
                    </div>
                    <Button
                        onClick={() => unpublish(courseCurriculumId)}
                        variant={"destructive"}
                        className="font-semibold"
                    >
                        {isPending ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            "   Unpublish course"
                        )}
                    </Button>
                </div>
                <Tabs isLoading={isLoading} onTabChange={setTab} tab={tab} />
                <div className="w-full">
                    {tab === "detail" && (
                        <CourseDetail
                            isLoading={isLoading}
                            courseDetail={courseData}
                        />
                    )}
                    {tab === "content" && (
                        <CourseContent courseId={courseCurriculumId} />
                    )}
                </div>
            </div>
        </PageContainer>
    );
}

export default CourseDetailModule;
