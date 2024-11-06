"use client";

import {
    useCreateChapterListMutation,
    useGetChaptersQuery,
} from "@/api/chapter/query";
import { Chapter, NewChapterData } from "@/api/chapter/type";
import { Button } from "@/components/ui/button";
import { IconLoader2, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ChapterItem } from "./chapter-item";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface CourseContentProps {
    courseId: string;
}

export const CourseContent = ({ courseId }: CourseContentProps) => {
    const { toast } = useToast();

    const [chapterList, setChapterList] = useState<Chapter[]>([]);
    const [newChapters, setNewChapters] = useState<NewChapterData[]>([]);
    const [addOption, setAddOption] = useState<"one" | "multiple">("one");

    const {
        data,
        isLoading,
        isSuccess: getSuccess,
    } = useGetChaptersQuery({
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
        if (getSuccess && data) {
            setChapterList(data.data);
        }
    }, [getSuccess, data]);

    const handleAddChapter = () => {
        const newChapterNumber = chapterList.length + newChapters.length + 1;
        const newChapter: NewChapterData = {
            chapterName: `New Chapter ${newChapterNumber}`,
            description: "",
            chapterLevel: newChapterNumber,
        };

        if (addOption === "multiple") {
            setNewChapters([...newChapters, newChapter]);
        } else {
            setNewChapters([newChapter]);
        }
    };

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
                chapter.description.length <= 1000
        );

        if (!isValid) {
            toast({
                title: "Validation Error",
                description:
                    "Please ensure all chapters have a name and a description (max 1000 characters).",
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

    const isAddButtonDisabled = addOption === "one" && newChapters.length > 0;

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
        <div className="border rounded-xl bg-background">
            <div className="p-5 border-b flex items-center justify-between">
                <h1 className="text-xl font-bold">Chapters in course</h1>
            </div>
            <div className="p-5 flex flex-col gap-5">
                {chapterList.map((chapter, index) => (
                    <ChapterItem
                        key={chapter.id}
                        chapter={chapter}
                        index={index}
                    />
                ))}
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
                <div className="w-full flex items-center justify-between mt-5">
                    <div className="flex items-center space-x-4">
                        <Select
                            disabled={isAddButtonDisabled}
                            value={addOption}
                            onValueChange={(value: "one" | "multiple") => {
                                setAddOption(value);
                                if (value === "one") {
                                    setNewChapters(newChapters.slice(0, 1));
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
                        {!isAddButtonDisabled && (
                            <Button
                                className="w-fit"
                                onClick={handleAddChapter}
                                disabled={isAddButtonDisabled}
                            >
                                <IconPlus className="mr-2" />
                                Add New Chapter
                            </Button>
                        )}
                    </div>
                    {newChapters.length > 0 && (
                        <Button
                            onClick={handleSaveChanges}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <IconLoader2 className="animate-spin" />
                            ) : (
                                "  Save changes"
                            )}{" "}
                        </Button>
                    )}
                </div>
            </div>
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
                    <Label htmlFor={`chapter-name-${chapterData.chapterLevel}`}>
                        Chapter name
                    </Label>
                    <Input
                        id={`chapter-name-${chapterData.chapterLevel}`}
                        value={chapterData.chapterName}
                        onChange={(e) =>
                            onUpdate({ chapterName: e.target.value })
                        }
                        placeholder="Enter chapter name"
                        className="flex-grow"
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
                        className="flex-grow"
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
