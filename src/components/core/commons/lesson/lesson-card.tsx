import { FileTextIcon, ListIcon, VideoIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LessonDetail } from "@/api/lesson/type";
import { IconEditCircle, IconLoader2, IconTrash } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUpdateLesson } from "@/api/lesson/query";

export default function LessonCard({ lesson }: { lesson: LessonDetail }) {
    const params = useParams();
    const { toast } = useToast();
    const courseId = params.id;
    const [edit, setEdit] = useState<boolean>(false);
    const [editableLessonData, setEditableLessonData] =
        useState<Partial<LessonDetail> | null>(null);

    const {
        mutate: updateLesson,
        isPending: updatePending,
        isSuccess: updateSuccess,
    } = useUpdateLesson({ chapterId: lesson.chapterId });

    const handleEditClick = () => {
        setEdit(true);
        setEditableLessonData({
            lessonName: lesson.lessonName,
            lessonMaterial: lesson.lessonMaterial,
        });
    };

    const handleInputChange = (field: keyof LessonDetail, value: string) => {
        setEditableLessonData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSaveLesson = () => {
        if (edit && editableLessonData) {
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
                lessonId: lesson.id,
                lessonName: lessonName ?? "",
                lessonMaterial: lessonMaterial ?? "",
                displayOrder: editableLessonData.displayOrder ?? 1,
            });
        }
    };

    const handleCancelEdit = () => {
        setEdit(false);
        setEditableLessonData(null);
    };

    const isDataUnchanged = (): boolean => {
        return (
            editableLessonData?.lessonName === lesson.lessonName &&
            editableLessonData?.lessonMaterial === lesson.lessonMaterial
        );
    };

    useEffect(() => {
        if (updateSuccess) {
            handleCancelEdit();
        }
    }, [updateSuccess]);
    return (
        <Card className="w-full hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold truncate">
                    <Link
                        href={`/course-management/unpublished-courses/${courseId}/${lesson.id}`}
                    >
                        {lesson.lessonName}
                    </Link>
                </CardTitle>
                <FileTextIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {edit ? (
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
                                value={editableLessonData?.lessonMaterial || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "lessonMaterial",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter lesson material"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                            <ListIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{lesson.quizCount} Quizzes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <VideoIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{lesson.theoryCount} Theories</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Created:</span>
                            <span>
                                {new Date(
                                    lesson.createdAt
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Order:</span>
                            <span>{lesson.displayOrder}</span>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex  items-center space-x-2">
                <Button
                    className="w-full"
                    variant={"outline"}
                    disabled={updatePending}
                    onClick={edit ? handleCancelEdit : handleEditClick}
                >
                    {!edit ? (
                        <>
                            <IconEditCircle />
                            Edit
                        </>
                    ) : (
                        "Cancel"
                    )}
                </Button>
                {edit ? (
                    <Button
                        disabled={updatePending || isDataUnchanged()}
                        className="w-full"
                        onClick={handleSaveLesson}
                    >
                        {updatePending ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            " Save change"
                        )}
                    </Button>
                ) : (
                    <Button className="w-full" variant="destructive">
                        <IconTrash />
                        Delete
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
