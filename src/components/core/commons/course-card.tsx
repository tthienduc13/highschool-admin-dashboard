import { CourseCurriculum } from "@/api/course-curriculum/type";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface CourseCardProps {
    course: CourseCurriculum;
}

export const CourseCard = ({ course }: CourseCardProps) => {
    const router = useRouter();
    const handleEdit = () => {
        console.log(
            `Editing subject curriculum with ID: ${course.subjectCurriculumId}`
        );
        // Implement edit functionality here
    };

    const handleDelete = () => {
        console.log(
            `Deleting subject curriculum with ID: ${course.subjectCurriculumId}`
        );
        // Implement delete functionality here
    };

    return (
        <Card className="w-full max-w-sm shadow-lg border border-muted rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-primary text-primary-foreground p-4">
                <CardTitle
                    onClick={() =>
                        router.push(
                            `/course-management/unpublished-courses/${course.subjectCurriculumId}?courseName=${course.subjectCurriculumName}`
                        )
                    }
                    className="text-xl font-semibold cursor-pointer truncate"
                    title={course.subjectCurriculumName}
                >
                    {course.subjectCurriculumName}
                </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="font-medium text-foreground">
                            Subject:
                        </span>{" "}
                        {course.subjectName}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="font-medium text-foreground">
                            Curriculum:
                        </span>{" "}
                        {course.curriculumName}
                    </p>
                </div>
            </CardContent>

            {/* Footer Section */}
            <CardFooter className="flex justify-between items-center p-4 bg-muted">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-primary"
                    onClick={handleEdit}
                >
                    <IconEditCircle className="h-5 w-5" />
                    Edit
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleDelete}
                >
                    <IconTrash className="h-5 w-5" />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
};
