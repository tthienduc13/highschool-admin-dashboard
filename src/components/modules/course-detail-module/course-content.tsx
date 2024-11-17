"use client";

import { useChaptersByCourseQuery } from "@/api/chapter/query";

import { Skeleton } from "@/components/ui/skeleton";
import { Chapters } from "@/components/core/commons/chapter/chapters";
import { useChapterStore } from "@/stores/use-chapter-store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LessonItem } from "./lesson-item";
interface CourseContentProps {
    courseId: string;
}

export const CourseContent = ({ courseId }: CourseContentProps) => {
    const isOpenDetail = useChapterStore((s) => s.isOpenDetail);
    const selectedChapterId = useChapterStore((s) => s.selectedChapterId);
    const { data, isLoading } = useChaptersByCourseQuery({
        courseId: courseId,
        pageNumber: 1,
        pageSize: 100,
    });

    if (isLoading) {
        return (
            <div className="border rounded-xl bg-background">
                <div className="p-5 border-b flex items-center justify-between">
                    <h1 className="text-xl font-bold">Chapters in course</h1>
                </div>
                <div className="p-5 flex flex-col gap-5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-14 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-row ", isOpenDetail && "gap-4")}>
            <motion.div
                className="bg-background flex-1 p-4 rounded-xl transition-all duration-300"
                animate={{
                    flexBasis: isOpenDetail ? "calc(100% - 50%)" : "100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="p-5 border-b flex items-center justify-between">
                    <h1 className="text-xl font-bold">
                        Chapters in course ({data?.totalCount})
                    </h1>
                </div>
                <div className="p-5 flex flex-col gap-5">
                    <Chapters courseId={courseId} mode="view" />
                </div>
            </motion.div>
            <AnimatePresence>
                {isOpenDetail && <LessonItem chapterId={selectedChapterId!} />}
            </AnimatePresence>
        </div>
    );
};
