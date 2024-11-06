import { useState, useEffect } from "react";
import {
    useCreateLessonListMutations,
    useLessonsQuery,
    useUpdateLesson,
} from "@/api/lesson/query";
import { Lesson, LessonDetail, NewLessonData } from "@/api/lesson/type";
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
    IconEditCircle,
    IconLoader2,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

interface LessonItemProps {
    chapterId: string;
    chapterDescription: string;
}

export const LessonItem = ({
    chapterId,
    chapterDescription,
}: LessonItemProps) => {
    const { toast } = useToast();
    const { id } = useParams();
    const router = useRouter();

    const [lessonList, setLessonList] = useState<Lesson[]>([]);
    const [newLessons, setNewLessons] = useState<NewLessonData[]>([]);
    const [addOption, setAddOption] = useState<"one" | "multiple">("one");
    const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
    const [editableLessonData, setEditableLessonData] =
        useState<Partial<LessonDetail> | null>(null);

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

    const {
        mutate: updateLesson,
        isPending: updatePending,
        isSuccess: updateSuccess,
    } = useUpdateLesson({ chapterId: chapterId });

    useEffect(() => {
        if (getSuccess && initialLessonData) {
            setLessonList(initialLessonData.data);
        }
    }, [getSuccess, initialLessonData]);

    const handleAddLesson = () => {
        const newLessonNumber = lessonList.length + newLessons.length + 1;
        const newLesson: NewLessonData = {
            lessonName: `New Chapter ${newLessonNumber}`,
            lessonMaterial: "",
            displayOrder: newLessonNumber,
        };

        if (addOption === "multiple") {
            setNewLessons([...newLessons, newLesson]);
        } else {
            setNewLessons([newLesson]);
        }
    };

    const handleRemoveLesson = (index: number) => {
        setNewLessons(newLessons.filter((_, i) => i !== index));
    };

    const handleUpdateNewLesson = (
        index: number,
        updatedData: Partial<NewLessonData>
    ) => {
        const updateLesson = [...newLessons];
        updateLesson[index] = { ...updateLesson[index], ...updatedData };
        setNewLessons(updateLesson);
    };

    const handleSaveChanges = () => {
        const isValid = newLessons.every(
            (lesson) => lesson.lessonName.trim() !== ""
        );

        if (!isValid) {
            toast({
                title: "Validation Error",
                description:
                    "Please ensure all lessons have a name  (max 1000 characters).",
                variant: "destructive",
            });
            return;
        }

        createLessonList({ chapterId: chapterId, lessonData: newLessons });
    };

    const handleEditClick = ({
        lessonId,
        lessonName,
        lessonMaterial,
    }: {
        lessonId: string;
        lessonName: string;
        lessonMaterial: string;
    }) => {
        setEditingLessonId(lessonId);
        setEditableLessonData({
            lessonName: lessonName,
            lessonMaterial: lessonMaterial,
        });
    };

    const handleInputChange = (field: keyof LessonDetail, value: string) => {
        setEditableLessonData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSaveLesson = () => {
        if (editingLessonId && editableLessonData) {
            const { lessonName, lessonMaterial } = editableLessonData;

            if (!lessonName || lessonName.trim().length < 10) {
                toast({
                    title: "Validation Error",
                    description:
                        "Lesson name must be at least 10 characters long.",
                    variant: "destructive",
                });
                return;
            }

            updateLesson({
                lessonId: editingLessonId,
                lessonName: lessonName ?? "",
                lessonMaterial: lessonMaterial ?? "",
                displayOrder: editableLessonData.displayOrder ?? 1,
            });
        }
    };

    const handleCancelEdit = () => {
        setEditingLessonId(null);
        setEditableLessonData(null);
    };

    useEffect(() => {
        if (createSuccess) {
            setNewLessons([]);
        }
    }, [createSuccess]);

    useEffect(() => {
        if (updateSuccess) {
            handleCancelEdit();
        }
    }, [updateSuccess]);

    const isAddButtonDisabled = addOption === "one" && newLessons.length > 0;

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center">
                <IconLoader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="px-4 py-3 border border-t-0 rounded-b-lg flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
                {chapterDescription}
            </p>
            <div className="flex flex-row items-center justify-between">
                <h3 className="font-semibold">Lessons</h3>
                <div className="flex flex-row gap-2">
                    <Select
                        disabled={isAddButtonDisabled}
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
                    {!isAddButtonDisabled && (
                        <Button
                            disabled={isAddButtonDisabled}
                            size={"sm"}
                            onClick={handleAddLesson}
                        >
                            <IconPlus /> Add Lesson
                        </Button>
                    )}
                    {newLessons.length > 0 && (
                        <Button
                            size={"sm"}
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
            {lessonList.map((lesson) => (
                <div
                    key={lesson.id}
                    onClick={() => {
                        if (!editingLessonId) {
                            router.push(
                                `/course-management/courses/${id}/${lesson.id}`
                            );
                        }
                    }}
                    className="w-full border p-4 rounded-lg border-l-4 border-l-primary"
                >
                    {editingLessonId === lesson.id ? (
                        <div className="w-full flex flex-col gap-2">
                            <div className="flex flex-col w-full space-y-2">
                                <Label
                                    className="text-xs font-semibold"
                                    htmlFor={`lesson-name-${lesson.id}`}
                                >
                                    Lesson name
                                </Label>
                                <Input
                                    id={`lesson-name-${lesson.id}`}
                                    value={editableLessonData?.lessonName || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "lessonName",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter lesson name"
                                    className="flex-grow"
                                    required
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <Label
                                    className="text-xs font-semibold"
                                    htmlFor={`lesson-material-${lesson.id}`}
                                >
                                    Lesson Material
                                </Label>
                                <Input
                                    id={`lesson-material-${lesson.id}`}
                                    value={
                                        editableLessonData?.lessonMaterial || ""
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            "lessonMaterial",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter lesson material"
                                />
                            </div>
                            <div className="w-full flex justify-end">
                                <div className="flex gap-1">
                                    <Button
                                        onClick={handleCancelEdit}
                                        size={"sm"}
                                        variant={"outline"}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size={"sm"}
                                        onClick={handleSaveLesson}
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
                    ) : (
                        <div className="w-full flex items-center justify-between">
                            <div className="text-sm font-semibold">
                                {lesson.lessonName}
                            </div>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick({
                                        lessonId: lesson.id,
                                        lessonName: lesson.lessonName,
                                        lessonMaterial: "",
                                    });
                                }}
                                size={"icon"}
                                variant={"ghost"}
                            >
                                <IconEditCircle />
                            </Button>
                        </div>
                    )}
                </div>
            ))}
            {newLessons.map((lesson, index) => (
                <NewLesson
                    key={index}
                    lessonData={lesson}
                    onRemove={() => handleRemoveLesson(index)}
                    onUpdate={(updatedData) =>
                        handleUpdateNewLesson(index, updatedData)
                    }
                />
            ))}
        </div>
    );
};

interface NewLessonProps {
    lessonData: NewLessonData;
    onRemove: () => void;
    onUpdate: (updatedData: Partial<NewLessonData>) => void;
}

export const NewLesson = ({
    lessonData,
    onRemove,
    onUpdate,
}: NewLessonProps) => {
    return (
        <div className="flex flex-col">
            <div className="px-4 py-2 bg-secondary rounded-t-lg border flex items-center justify-between">
                <h2 className="text-lg font-semibold">New lesson</h2>
                <Button onClick={onRemove} variant="outline" size="icon">
                    <IconTrash />
                </Button>
            </div>
            <div className="border border-t-0 flex rounded-b-lg p-4 flex-col gap-4">
                <div className="flex flex-col w-full space-y-2">
                    <Label htmlFor={`lesson-name-${lessonData.displayOrder}`}>
                        Lesson name
                    </Label>
                    <Input
                        id={`lesson-name-${lessonData.displayOrder}`}
                        value={lessonData.lessonName}
                        onChange={(e) =>
                            onUpdate({ lessonName: e.target.value })
                        }
                        placeholder="Enter lesson name"
                        className="flex-grow"
                        required
                    />
                </div>
                <div className="flex flex-col w-full space-y-2">
                    <Label
                        htmlFor={`lesson-material-${lessonData.displayOrder}`}
                    >
                        Lesson material (optional)
                    </Label>
                    <Input
                        id={`lesson-material-${lessonData.displayOrder}`}
                        value={lessonData.lessonMaterial}
                        onChange={(e) =>
                            onUpdate({ lessonMaterial: e.target.value })
                        }
                        placeholder="Enter lesson material"
                        className="flex-grow"
                    />
                </div>
            </div>
        </div>
    );
};
