import { Button } from "@/components/ui/button";
import { useChapterStore } from "@/stores/use-chapter-store";
import { IconArrowBackUp } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { Separator } from "@/components/ui/separator";
import { LessonItem } from "@/components/core/commons/lesson/lesson-item";

export const ChapterDetail = () => {
    const selectedChapterId = useChapterStore((s) => s.selectedChapterId);
    const selectedChapterName = useChapterStore((s) => s.selectedChapterName);
    const closeChapter = useChapterStore((s) => s.closeChapter);
    return (
        <motion.div className="h-full flex rounded-lg bg-background p-4 flex-col gap-4 overflow-auto">
            <div className="flex flex-row gap-2 items-center">
                <Button
                    onClick={() => closeChapter()}
                    size={"icon"}
                    variant={"ghost"}
                >
                    <IconArrowBackUp />
                </Button>
                <div className="text-lg font-semibold">
                    {selectedChapterName}
                </div>
            </div>
            <Separator />
            <div className="flex flex-row justify-center">
                <LessonItem chapterId={selectedChapterId!} />
            </div>
        </motion.div>
    );
};
