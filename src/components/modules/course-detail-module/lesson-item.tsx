import { useLessonsQuery } from "@/api/lesson/query";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useParams } from "next/navigation";

interface LessonItemProps {
    chapterId: string;
}

export const LessonItem = ({ chapterId }: LessonItemProps) => {
    const params = useParams();
    const courseId = params.id;
    const { data: initialLessonData, isLoading } = useLessonsQuery({
        chapterId: chapterId,
        pageNumber: 1,
        pageSize: 100,
    });

    if (isLoading) {
        return (
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "40%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full w-full flex flex-col gap-4"
            >
                <Skeleton className="h-3/4 w-full" />
            </motion.div>
        );
    }

    if (!initialLessonData) {
        return (
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "40%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full flex rounded-lg flex-col gap-4 overflow-auto items-center justify-center"
            >
                <p className="text-lg font-bold text-muted-foreground">
                    No data available
                </p>
            </motion.div>
        );
    }
    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "40%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full  w-full flex flex-col gap-4 bg-background p-4 rounded-xl"
        >
            <div className="flex flex-row items-center justify-between">
                <h3 className="font-semibold">Lessons</h3>
            </div>
            {initialLessonData.data.map((lesson) => (
                <div
                    key={lesson.id}
                    className="w-full border px-4 py-2 rounded-lg border-l-4 border-l-primary"
                >
                    <div className="w-full flex items-center justify-between">
                        <Link
                            href={`/course-management/courses/${courseId}/${lesson.id}`}
                            className="text-sm font-semibold"
                        >
                            {lesson.lessonName}
                        </Link>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};
