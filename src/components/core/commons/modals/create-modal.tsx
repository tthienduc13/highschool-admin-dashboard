"use client";

import { useState, useEffect } from "react";
import { useCoursesQuery } from "@/api/course/query";
import { useCurriculumQuery } from "@/api/curriculum/query";
import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateMutation } from "@/api/course-curriculum/query";
import { IconLoader2 } from "@tabler/icons-react";

interface CreateModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreateModal = ({ open, onClose }: CreateModalProps) => {
    const { data: curriculums, isLoading: curriculumLoading } =
        useCurriculumQuery();
    const { data: courses, isLoading: courseLoading } = useCoursesQuery({
        pageSize: 100,
        pageNumber: 1,
    });
    const { mutate: create, isPending: createPending } =
        useCreateMutation(onClose);

    const [selectedCourse, setSelectedCourse] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [selectedCurriculum, setSelectedCurriculum] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [courseName, setCourseName] = useState<string>("");

    const isLoading = curriculumLoading || courseLoading;

    useEffect(() => {
        if (selectedCourse && selectedCurriculum) {
            setCourseName(
                `${selectedCourse.name} - ${selectedCurriculum.name}`
            );
        }
    }, [selectedCourse, selectedCurriculum]);

    const isCreateDisabled =
        !selectedCourse ||
        !selectedCurriculum ||
        courseName.trim().length < 10 ||
        createPending;

    const handleCreate = () => {
        if (selectedCourse && selectedCurriculum) {
            create({
                subjectId: selectedCourse.id,
                curriculumId: selectedCurriculum.id,
                subjectCurriculumName: courseName.trim(),
            });
            setSelectedCourse(null);
            setSelectedCurriculum(null);
            setCourseName("");
        }
    };

    return (
        <Credenza open={open} onOpenChange={onClose}>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle className="text-center text-2xl md:text-start md:text-3xl font-semibold">
                        Create Course
                    </CredenzaTitle>
                    <CredenzaDescription className="text-center md:text-start text-muted-foreground">
                        Select the master course and curriculum. The course name
                        will be auto-generated but can be edited.
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4">
                            <section className="flex flex-col gap-2 w-full">
                                <Label htmlFor="masterCourse">
                                    Master Course
                                </Label>
                                <Select
                                    disabled={isLoading || createPending}
                                    onValueChange={(value) => {
                                        const course = courses?.data?.find(
                                            (c) => c.id === value
                                        );
                                        setSelectedCourse(
                                            course
                                                ? {
                                                      id: course.id,
                                                      name: course.subjectName,
                                                  }
                                                : null
                                        );
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses?.data?.map((course) => (
                                            <SelectItem
                                                key={course.id}
                                                value={course.id}
                                            >
                                                {course.subjectName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </section>
                            <section className="flex flex-col gap-2 w-full">
                                <Label htmlFor="curriculum">Curriculum</Label>
                                <Select
                                    disabled={isLoading || createPending}
                                    onValueChange={(value) => {
                                        const curriculum = curriculums?.find(
                                            (c) => c.id === value
                                        );
                                        setSelectedCurriculum(
                                            curriculum
                                                ? {
                                                      id: curriculum.id,
                                                      name: curriculum.curriculumName,
                                                  }
                                                : null
                                        );
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose curriculum" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {curriculums?.map((curriculum) => (
                                            <SelectItem
                                                key={curriculum.id}
                                                value={curriculum.id}
                                            >
                                                {curriculum.curriculumName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </section>
                        </div>
                        <section className="flex flex-col gap-2">
                            <Label htmlFor="name">Course Name:</Label>
                            <Input
                                id="name"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                disabled={isLoading}
                                placeholder="Enter course name"
                            />
                        </section>
                    </div>
                </CredenzaBody>
                <CredenzaFooter>
                    <Button
                        disabled={createPending}
                        variant="ghost"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={isCreateDisabled}>
                        {createPending ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            "Create"
                        )}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};
