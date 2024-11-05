"use client";

import { useGetCourseByIdQuery } from "@/api/course/query";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs } from "./tabs";
import PageContainer from "@/components/core/layouts/page-container";
import dynamic from "next/dynamic";

const CourseContent = dynamic(
    () => import("./course-content").then((mod) => mod.CourseContent),
    { ssr: false }
);

interface CourseDetailModuleProps {
    courseId: string;
}

export type Tab = "detail" | "flashcard" | "quiz" | "content";

function CourseDetailModule({ courseId }: CourseDetailModuleProps) {
    const { data } = useGetCourseByIdQuery(courseId);
    const router = useRouter();
    const pathName = usePathname();

    const handleBack = () => {
        const coursePath = pathName.split(`/${courseId}`)[0];
        router.push(coursePath!);
    };

    const [tab, setTab] = useState<Tab>("detail");

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
                                {data?.subjectName}
                            </h2>
                            <div className="text-xs font-semibold bg-primary text-background px-2 py-1 rounded-full">
                                Draft
                            </div>
                        </div>
                    </div>
                    <Button className="font-semibold">Publish course</Button>
                </div>
                <Tabs onTabChange={setTab} tab={tab} />
                <div className="w-full">
                    {tab === "content" && <CourseContent courseId={courseId} />}
                </div>
            </div>
        </PageContainer>
    );
}

export default CourseDetailModule;
