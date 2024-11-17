"use client";

import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconLoader2 } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PageContainer from "@/components/core/layouts/page-container";

import { usePublishMutation } from "@/api/course-curriculum/query";
import { Separator } from "@/components/ui/separator";
import { useChapterStore } from "@/stores/use-chapter-store";
import dynamic from "next/dynamic";
import { Chapters } from "@/components/core/commons/chapter/chapters";

const ChapterDetail = dynamic(
    () => import("./chapter-detail").then((mod) => mod.ChapterDetail),
    { ssr: false }
);

interface UnpublishedCourseDetailModuleProps {
    courseId: string;
}

function UnpublishedCourseDetailModule({
    courseId,
}: UnpublishedCourseDetailModuleProps) {
    const searchParams = useSearchParams();
    const courseName = searchParams.get("courseName");
    const isOpenChapterDetail = useChapterStore((s) => s.isOpenDetail);

    const { mutate: publish, isPending } = usePublishMutation();
    const router = useRouter();
    const pathName = usePathname();

    const handleBack = () => {
        const coursePath = pathName.split(`/${courseId}`)[0];
        router.push(coursePath!);
    };

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
                            <h2 className="text-2xl font-bold">{courseName}</h2>
                            <div className="text-xs font-semibold bg-primary text-background px-2 py-1 rounded-full">
                                Draft
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => publish(courseId)}
                        className="font-semibold"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            "   Publish course"
                        )}
                    </Button>
                </div>
                <Separator />
                {isOpenChapterDetail ? (
                    <ChapterDetail />
                ) : (
                    <Chapters courseId={courseId} mode="editable" />
                )}
            </div>
        </PageContainer>
    );
}

export default UnpublishedCourseDetailModule;
