import { useUpdateChapterMutation } from "@/api/chapter/query";
import { Chapter } from "@/api/chapter/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
    IconChevronDown,
    IconChevronUp,
    IconEditCircle,
    IconLoader2,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LessonItem = dynamic(
    () => import("./lesson-item").then((mod) => mod.LessonItem),
    { ssr: false }
);

interface ChapterItemProps {
    chapter: Chapter;
    index: number;
}

export const ChapterItem = ({ chapter, index }: ChapterItemProps) => {
    const { toast } = useToast();
    const [openLessonList, setOpenLessonList] = useState<boolean>(false);
    const [editingChapterId, setEditingChapterId] = useState<string | null>(
        null
    );
    const [editableChapterData, setEditableChapterData] =
        useState<Partial<Chapter> | null>(null);

    const {
        mutate: updateChapter,
        isPending: updatePending,
        isSuccess: updateSuccess,
    } = useUpdateChapterMutation({
        courseId: chapter.subjectId,
    });
    const handleEditClick = (chapter: Chapter) => {
        if (editingChapterId) {
            handleCancelEdit();
            return;
        }
        if (openLessonList) {
            setOpenLessonList(false);
        }
        setEditingChapterId(chapter.id);
        setEditableChapterData({
            chapterName: chapter.chapterName,
            description: chapter.description,
        });
    };

    const handleInputChange = (field: keyof Chapter, value: string) => {
        setEditableChapterData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleCancelEdit = () => {
        setEditableChapterData(null);
        setEditingChapterId(null);
    };

    const handleSaveChapter = () => {
        if (editingChapterId && editableChapterData) {
            const { chapterName, description } = editableChapterData;
            if (
                !chapterName ||
                chapterName.trim().length < 10 ||
                !description ||
                description.trim().length < 10
            ) {
                toast({
                    title: "Validation Error",
                    description:
                        "Lesson name or description must be at least 10 characters long.",
                    variant: "destructive",
                });
                return;
            }
            updateChapter({
                chapterId: editingChapterId,
                chapterName: editableChapterData.chapterName ?? "",
                chapterDescription: editableChapterData.description ?? "",
                chapterLevel: editableChapterData.chapterLevel!,
            });
        }
    };

    useEffect(() => {
        if (updateSuccess) {
            handleCancelEdit();
        }
    }, [updateSuccess]);

    return (
        <div key={chapter.id} className="flex flex-col rounded-lg">
            <div
                className={cn(
                    "px-4 py-3 bg-secondary/70  border flex flex-row items-center justify-between",
                    openLessonList || editingChapterId
                        ? "rounded-t-lg "
                        : "rounded-lg"
                )}
            >
                <h2 className="text-lg font-semibold">
                    Chương {index + 1} {chapter.chapterName}
                </h2>
                <div className="flex items-center gap-2">
                    <Button
                        size={"icon"}
                        variant={openLessonList ? "default" : "outline"}
                        disabled={!!editingChapterId}
                        onClick={() => setOpenLessonList(!openLessonList)}
                    >
                        {openLessonList ? (
                            <IconChevronUp />
                        ) : (
                            <IconChevronDown />
                        )}
                    </Button>
                    <Button
                        size={"icon"}
                        variant={editingChapterId ? "default" : "outline"}
                        onClick={() => handleEditClick(chapter)}
                    >
                        <IconEditCircle />
                    </Button>
                </div>
            </div>
            {openLessonList && <LessonItem chapterId={chapter.id} />}
            {editingChapterId === chapter.id && (
                <div className="w-full px-4 py-3 border border-t-0 rounded-b-lg flex flex-col gap-4">
                    <div className="flex flex-col w-full space-y-2">
                        <Label
                            className="font-semibold"
                            htmlFor={`chapter-name-${chapter.chapterLevel}`}
                        >
                            Chapter name
                        </Label>
                        <Input
                            id={`chapter-name-${chapter.chapterLevel}`}
                            value={editableChapterData?.chapterName || ""}
                            onChange={(e) =>
                                handleInputChange("chapterName", e.target.value)
                            }
                            placeholder="Enter chapter name"
                            className="flex-grow"
                            required
                        />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                        <Label
                            className="font-semibold"
                            htmlFor={`chapter-description-${chapter.chapterLevel}`}
                        >
                            Description
                        </Label>
                        <Textarea
                            id={`chapter-description-${chapter.chapterLevel}`}
                            value={editableChapterData?.description}
                            onChange={(e) =>
                                handleInputChange("description", e.target.value)
                            }
                            placeholder="Enter chapter description"
                            className="flex-grow"
                            required
                            maxLength={1000}
                        />
                        <p className="text-sm text-muted-foreground">
                            {editableChapterData?.description?.length ?? 0}
                            /1000 characters
                        </p>
                    </div>
                    <div className="w-full flex justify-end items-center">
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleCancelEdit}
                                variant={"outline"}
                            >
                                Cancel
                            </Button>
                            <Button
                                size={"sm"}
                                onClick={handleSaveChapter}
                                disabled={updatePending}
                            >
                                {updatePending ? (
                                    <IconLoader2 className="animate-spin" />
                                ) : (
                                    "Save changes"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
