"use client";

import { Chapter, NewChapterData } from "@/api/chapter/type";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IconLoader2, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import {
    useChaptersByCourseQuery,
    useCreateChapterListMutation,
} from "@/api/chapter/query";
import { ChapterList } from "./chapter-list";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface ChaptersProps {
    courseId: string;
    mode: "view" | "editable";
}

export const Chapters = ({ courseId, mode = "view" }: ChaptersProps) => {
    const { toast } = useToast();
    const [addOption, setAddOption] = useState<"one" | "multiple">("one");
    const [selectedSemester, setSelectedSemester] = useState<number>(1);
    const [chapterList, setChapterList] = useState<Chapter[]>([]);
    const [newChapters, setNewChapters] = useState<NewChapterData[]>([]);

    const handleAddChapter = () => {
        const currentSemesterChapters = [
            ...chapterList.filter(
                (chapter) => chapter.semester === selectedSemester
            ),
            ...newChapters.filter(
                (chapter) => chapter.semester === selectedSemester
            ),
        ];

        const lastOrder = currentSemesterChapters.length
            ? Math.max(...currentSemesterChapters.map((ch) => ch.chapterLevel))
            : selectedSemester === 1
            ? 1
            : 51;

        const newChapterNumber = lastOrder + 1;

        const newChapter: NewChapterData = {
            chapterName: `New Chapter ${newChapterNumber}`,
            semester: selectedSemester,
            description: "",
            chapterLevel: newChapterNumber,
        };

        setNewChapters([...newChapters, newChapter]);
    };

    const { data: chaptersData, isSuccess: getSuccess } =
        useChaptersByCourseQuery({
            courseId: courseId,
            pageNumber: 1,
            pageSize: 100,
        });

    const {
        mutate: createChapterList,
        isPending,
        isSuccess: createSuccess,
    } = useCreateChapterListMutation({ courseId: courseId });

    useEffect(() => {
        if (getSuccess && chaptersData) {
            setChapterList(chaptersData.data);
        }
    }, [getSuccess, chaptersData]);

    const handleRemoveNewChapter = (index: number) => {
        setNewChapters(newChapters.filter((_, i) => i !== index));
    };

    const handleUpdateNewChapter = (
        index: number,
        updatedData: Partial<NewChapterData>
    ) => {
        const updatedChapters = [...newChapters];
        updatedChapters[index] = { ...updatedChapters[index], ...updatedData };
        setNewChapters(updatedChapters);
    };

    const handleSaveChanges = () => {
        const isValid = newChapters.every(
            (chapter) =>
                chapter.chapterName.trim() !== "" &&
                chapter.description.trim() !== "" &&
                chapter.description.length <= 1000 &&
                chapter.semester !== undefined &&
                chapter.chapterLevel !== undefined
        );

        if (!isValid) {
            toast({
                title: "Validation Error",
                description:
                    "Please ensure all chapters have a name, description (max 1000 characters), and valid display order.",
                variant: "destructive",
            });
            return;
        }

        createChapterList({ courseId: courseId, chapterData: newChapters });
    };

    useEffect(() => {
        if (createSuccess) {
            setNewChapters([]);
        }
    }, [createSuccess]);

    return (
        <div className="flex flex-col gap-4">
            {mode === "editable" && (
                <div className="px-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Select
                            value={addOption}
                            onValueChange={(value: "one" | "multiple") => {
                                setAddOption(value);
                                if (value === "one") {
                                    setNewChapters(newChapters.slice(0, 1)); // Keep only one chapter for single add mode
                                }
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="one">
                                    Add one chapter
                                </SelectItem>
                                <SelectItem value="multiple">
                                    Add multiple chapters
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={selectedSemester.toString()}
                            onValueChange={(value) =>
                                setSelectedSemester(Number(value))
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Semester 1</SelectItem>
                                <SelectItem value="2">Semester 2</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            className="w-fit"
                            onClick={handleAddChapter}
                            disabled={
                                addOption === "one" && newChapters.length > 0
                            }
                        >
                            <IconPlus className="mr-2" />
                            Add New Chapter
                        </Button>
                    </div>
                </div>
            )}
            {newChapters.length > 0 && (
                <Button onClick={handleSaveChanges} disabled={isPending}>
                    {isPending ? (
                        <IconLoader2 className="animate-spin" />
                    ) : (
                        "Save changes"
                    )}
                </Button>
            )}
            {newChapters.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {newChapters.map((chapter, index) => (
                        <NewChapter
                            key={index}
                            chapterData={chapter}
                            onRemove={() => handleRemoveNewChapter(index)}
                            onUpdate={(updatedData) =>
                                handleUpdateNewChapter(index, updatedData)
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="px-4 flex flex-col gap-4">
                    <ChapterList chapters={chapterList} courseId={courseId} />
                </div>
            )}
        </div>
    );
};

interface NewChapterProps {
    chapterData: NewChapterData;
    onRemove: () => void;
    onUpdate: (updatedData: Partial<NewChapterData>) => void;
}
export const NewChapter = ({
    chapterData,
    onRemove,
    onUpdate,
}: NewChapterProps) => {
    return (
        <div className="flex flex-col">
            <div className="px-4 py-2 bg-secondary rounded-t-lg border flex items-center justify-between">
                <h2 className="text-lg font-semibold">New chapter</h2>
                <Button onClick={onRemove} variant="outline" size="icon">
                    <IconTrash />
                </Button>
            </div>
            <div className="border border-t-0 flex rounded-b-lg p-4 flex-col gap-4">
                <div className="flex flex-col w-full space-y-2">
                    <Input
                        id={`chapter-name-${chapterData.chapterLevel}`}
                        value={chapterData.chapterName}
                        onChange={(e) =>
                            onUpdate({ chapterName: e.target.value })
                        }
                        placeholder="Enter chapter name"
                        required
                    />
                </div>
                <div className="flex flex-col w-full space-y-2">
                    <Label
                        htmlFor={`chapter-description-${chapterData.chapterLevel}`}
                    >
                        Description
                    </Label>
                    <Textarea
                        id={`chapter-description-${chapterData.chapterLevel}`}
                        value={chapterData.description}
                        onChange={(e) =>
                            onUpdate({ description: e.target.value })
                        }
                        placeholder="Enter chapter description"
                        required
                        maxLength={1000}
                    />
                    <p className="text-sm text-muted-foreground">
                        {chapterData.description.length}/1000 characters
                    </p>
                </div>
            </div>
        </div>
    );
};
