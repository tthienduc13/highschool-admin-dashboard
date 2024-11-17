"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useMasterCourseStore from "@/stores/use-master-course-store";
import { useCourseIdQuery } from "@/api/course/query";
import { ImageUploader } from "@/components/core/commons/image-uploader";
import { formatDate } from "@/lib/utils";

export const CourseDetail = () => {
    const closeDetail = useMasterCourseStore((s) => s.closeDetail);
    const selectedCourse = useMasterCourseStore((s) => s.detailCourseId);
    const { data: courseData, isLoading } = useCourseIdQuery(selectedCourse!);

    const courseInfo = [
        { label: "Category", value: courseData?.categoryName || "N/A" },
        { label: "Users", value: courseData?.numberEnrollment ?? 0 },
        { label: "Likes", value: courseData?.like ?? 0 },
        { label: "Views", value: courseData?.view ?? 0 },
        {
            label: "Last Updated",
            value: courseData?.updatedAt
                ? formatDate(new Date(courseData.updatedAt).getTime())
                : "N/A",
        },
    ];

    if (isLoading) {
        return (
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "35%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full w-full flex flex-col gap-4"
            >
                <Skeleton className="h-3/4 w-full" />
            </motion.div>
        );
    }

    if (!courseData) {
        return (
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "35%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full flex rounded-lg flex-col gap-4 overflow-auto items-center justify-center"
            >
                <p className="text-lg font-bold text-muted-foreground">
                    No data available
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "35%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full  w-full flex flex-col gap-4"
        >
            <div className="bg-background rounded-lg p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b">
                    <h2 className="text-xl font-semibold text-primary">
                        Course Details
                    </h2>
                    <Button size="icon" variant="ghost" onClick={closeDetail}>
                        <X />
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold">Thumbnail</h3>
                    <div className="w-full h-[200px] relative overflow-hidden rounded-lg border bg-muted">
                        {courseData?.image ? (
                            <Image
                                src={courseData.image}
                                alt={courseData.subjectName || "Course Image"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <ImageUploader />
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-background rounded-lg p-4 flex flex-col gap-4">
                <section className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Information</h3>
                        <p className="text-sm text-muted-foreground">
                            {courseData?.information ||
                                "No information available."}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">
                            Course Description
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {courseData?.subjectDescription ||
                                "No description available."}
                        </p>
                    </div>
                </section>
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        Further Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {courseInfo.map((info, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-1 rounded-lg border p-3 bg-muted"
                            >
                                <span className="font-medium text-muted-foreground">
                                    {info.label}
                                </span>
                                <span className="font-bold text-primary">
                                    {info.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </motion.div>
    );
};
