import { Course } from "@/api/course/type";
import { ImageUploader } from "@/components/core/commons/image-uploader";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface CourseDetailProps {
    courseDetail?: Course;
    isLoading: boolean;
}

export const CourseDetail = ({
    courseDetail,
    isLoading,
}: CourseDetailProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-[400px] col-span-2 w-full" />
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }
    if (!courseDetail) {
        return;
    }
    const courseInfo = [
        { label: "Category", value: courseDetail.categoryName },
        { label: "Chapters", value: courseDetail.numberOfChapters ?? 0 },
        { label: "Users", value: courseDetail.numberEnrollment ?? 0 },
        { label: "Like", value: courseDetail.like ?? 0 },
        { label: "View", value: courseDetail.view ?? 0 },
        {
            label: "Last update",
            value: formatDate(
                (courseDetail.updatedAt instanceof Date
                    ? courseDetail.updatedAt
                    : new Date(courseDetail.updatedAt)
                ).getTime()
            ),
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 p-4 border rounded-lg shadow bg-background flex flex-col gap-10">
                <section className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Information</h2>
                    <p className="text-sm text-muted-foreground">
                        {courseDetail.information}
                    </p>
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">
                        Course Description
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {courseDetail.subjectDescription}
                    </p>
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">
                        Further Information
                    </h2>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                        {courseInfo.map((info, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 font-medium"
                            >
                                <p>{info.label}:</p>
                                <span>{info.value}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <div className="flex flex-col gap-4 border rounded-lg shadow p-4 bg-background">
                <h2 className="text-lg font-semibold">Thumbnail</h2>
                {courseDetail.image ? (
                    <div className="w-full h-[200px] relative">
                        <Image
                            src={courseDetail.image}
                            alt={courseDetail.subjectName || "Course Image"}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <ImageUploader />
                )}
            </div>
        </div>
    );
};
