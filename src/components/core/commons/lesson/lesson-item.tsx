import React, { useState, useEffect } from "react";
import {
    useCreateLessonListMutations,
    useLessonsQuery,
} from "@/api/lesson/query";
import { LessonDetail, NewLessonData } from "@/api/lesson/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
    IconLoader2,
    IconPlus,
    IconTrash,
    IconFileText,
} from "@tabler/icons-react";
import LessonCard from "./lesson-card";

interface LessonItemProps {
    chapterId: string;
}

export const LessonItem = ({ chapterId }: LessonItemProps) => {
    const { toast } = useToast();

    const [lessonList, setLessonList] = useState<LessonDetail[]>([]);
    const [newLessons, setNewLessons] = useState<NewLessonData[]>([]);
    const [addOption, setAddOption] = useState<"one" | "multiple">("one");

    const {
        data: initialLessonData,
        isLoading,
        isSuccess: getSuccess,
    } = useLessonsQuery({
        chapterId: chapterId,
        pageNumber: 1,
        pageSize: 100,
    });

    const {
        mutate: createLessonList,
        isPending,
        isSuccess: createSuccess,
    } = useCreateLessonListMutations({ chapterId: chapterId });

    useEffect(() => {
        if (getSuccess && initialLessonData) {
            setLessonList(initialLessonData.data as LessonDetail[]);
        }
    }, [getSuccess, initialLessonData]);

    const handleAddLesson = () => {
        const newLessonNumber = lessonList.length + newLessons.length + 1;
        const newLesson: NewLessonData = {
            lessonName: `New Lesson ${newLessonNumber}`,
            lessonMaterial: "",
            displayOrder: newLessonNumber,
        };

        if (addOption === "multiple") {
            setNewLessons([...newLessons, newLesson]);
        } else {
            setNewLessons([newLesson]);
        }
    };

    const handleSaveChanges = () => {
        if (newLessons.some((lesson) => !lesson.lessonName.trim())) {
            toast({
                title: "Validation Error",
                description: "All lessons must have a valid name.",
                variant: "destructive",
            });
            return;
        }
        createLessonList({ chapterId: chapterId, lessonData: newLessons });
    };

    useEffect(() => {
        if (createSuccess) {
            setNewLessons([]);
        }
    }, [createSuccess]);

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center">
                <IconLoader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <h3 className="font-semibold text-lg">Lessons</h3>
                <div className="flex flex-row gap-2">
                    <Select
                        disabled={addOption === "one" && newLessons.length > 0}
                        value={addOption}
                        onValueChange={(value: "one" | "multiple") => {
                            setAddOption(value);
                            if (value === "one") {
                                setNewLessons(newLessons.slice(0, 1));
                            }
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="one">Add one lesson</SelectItem>
                            <SelectItem value="multiple">
                                Add multiple lessons
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        size="sm"
                        onClick={handleAddLesson}
                        disabled={addOption === "one" && newLessons.length > 0}
                    >
                        <IconPlus className="mr-1" /> Add Lesson
                    </Button>
                    {newLessons.length > 0 && (
                        <Button
                            size="sm"
                            onClick={handleSaveChanges}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <IconLoader2 className="animate-spin" />
                            ) : (
                                "Save changes"
                            )}
                        </Button>
                    )}
                </div>
            </div>

            {lessonList.length === 0 && newLessons.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center gap-2 py-10">
                    <IconFileText size={48} className="text-gray-400" />
                    <p className="text-gray-500 text-sm">
                        No lessons available. Start by adding a new lesson.
                    </p>
                    <Button
                        size="sm"
                        onClick={handleAddLesson}
                        className="mt-4"
                    >
                        <IconPlus className="mr-1" /> Add First Lesson
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {lessonList.map((lesson) => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                    ))}
                </div>
            )}

            {newLessons.map((lesson, index) => (
                <div
                    key={index}
                    className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                    <Label className="block mb-1 text-sm font-medium">
                        Lesson Name
                    </Label>
                    <Input
                        value={lesson.lessonName}
                        onChange={(e) =>
                            setNewLessons((prev) =>
                                prev.map((l, i) =>
                                    i === index
                                        ? { ...l, lessonName: e.target.value }
                                        : l
                                )
                            )
                        }
                        placeholder="Enter lesson name"
                        className="mb-2"
                    />
                    <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={() =>
                            setNewLessons((prev) =>
                                prev.filter((_, i) => i !== index)
                            )
                        }
                    >
                        <IconTrash className="mr-1" /> Remove
                    </Button>
                </div>
            ))}
        </div>
    );
};
