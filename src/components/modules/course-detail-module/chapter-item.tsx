import { Chapter } from "@/api/chapter/type";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    IconChevronDown,
    IconChevronUp,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

interface ChapterItemProps {
    isEdit: boolean;
    chapter: Chapter;
    index: number;
}

export const ChapterItem = ({ chapter, index, isEdit }: ChapterItemProps) => {
    const [openLessonList, setOpenLessonList] = useState<boolean>(false);
    return (
        <div key={chapter.id} className="flex flex-col rounded-lg">
            <div
                className={cn(
                    "px-4 py-3 bg-secondary/70  border flex flex-row items-center justify-between",
                    openLessonList ? "rounded-t-lg " : "rounded-lg"
                )}
            >
                <h2 className="text-lg font-semibold">
                    Chương {index + 1} {chapter.chapterName}
                </h2>
                <div className="flex items-center gap-2">
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => setOpenLessonList(!openLessonList)}
                    >
                        {openLessonList ? (
                            <IconChevronUp />
                        ) : (
                            <IconChevronDown />
                        )}
                    </Button>
                    {isEdit && (
                        <Button size={"icon"} variant={"ghost"}>
                            <IconTrash />
                        </Button>
                    )}
                </div>
            </div>
            {openLessonList && (
                <div className="px-4 py-3 border border-t-0 rounded-b-lg flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                        {chapter.description}
                    </p>
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="font-semibold">Lessons</h3>
                        <Button size={"sm"}>
                            <IconPlus /> Add Lesson
                        </Button>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className=""></div>
                    </div>
                </div>
            )}
        </div>
    );
};
