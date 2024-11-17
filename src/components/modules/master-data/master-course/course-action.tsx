"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { z } from "zod";

import { useCategoriesQuery } from "@/api/category/query";
import {
    useCourseIdQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
} from "@/api/course/query";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { CourseSchema } from "@/schemas/course";
import useMasterCourseStore from "@/stores/use-master-course-store";
import { IconLoader2 } from "@tabler/icons-react";
import { Category } from "@/api/category/type";
import { EditCoursePayload } from "@/api/course/type";

interface CourseActionProps {
    mode: "create" | "edit";
}

export const CourseAction = ({ mode }: CourseActionProps) => {
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        null
    );
    const closeCreate = useMasterCourseStore((s) => s.closeCreate);
    const closeEdit = useMasterCourseStore((s) => s.closeEdit);
    const selectedCourse = useMasterCourseStore((s) => s.editCourseId);

    const { data: categoryData, isLoading: isLoadingCategory } =
        useCategoriesQuery();
    const { mutate: createCourse, isPending: isCreating } =
        useCreateCourseMutation();
    const {
        data: courseData,
        isLoading: isLoadingCourse,
        isSuccess: successGetCourse,
    } = useCourseIdQuery(selectedCourse!);
    const { mutate: updateCourse, isPending: isUpdating } =
        useUpdateCourseMutation();

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        mode: "onChange",
        defaultValues: {
            subjectName: "",
            subjectCode: "",
            information: "",
            categoryId: "",
            subjectDescription: "",
            imageRaw: undefined,
        },
    });

    const handleOnChangeSelectImage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target?.files?.[0];
        if (file) {
            form.setValue("imageRaw", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            form.setValue("imageRaw", undefined);
            setThumbnailPreview(null);
        }
    };

    useEffect(() => {
        if (mode === "edit" && successGetCourse) {
            const matchedCategory = categoryData!.find(
                (category: Category) =>
                    category.categoryName.trim().toLowerCase() ===
                    courseData.categoryName.trim().toLowerCase()
            );
            form.reset({
                subjectName: courseData.subjectName,
                subjectCode: courseData.subjectCode,
                information: courseData.information,
                subjectDescription: courseData.subjectDescription,
                categoryId: matchedCategory?.id,
                imageRaw: undefined,
            });
            console.log(form.getValues());
            if (courseData.image) {
                setThumbnailPreview(courseData.image);
            }
        }
    }, [successGetCourse, mode, form, categoryData, courseData]);

    const onSubmit = (values: z.infer<typeof CourseSchema>) => {
        if (mode === "create") {
            createCourse(values);
        } else if (mode === "edit" && selectedCourse) {
            const payload: EditCoursePayload = {
                id: selectedCourse,
                subjectName: values.subjectName,
                subjectCode: values.subjectCode,
                subjectDescription: values.subjectDescription,
                information: values.information,
                categoryId: values.categoryId,
                image: values.imageRaw ? "" : courseData?.image || "",
                imageRaw: values.imageRaw || null,
            };

            updateCourse(payload);
        }
    };

    const isLoading = isLoadingCategory || isLoadingCourse;
    const isPending = isCreating || isUpdating;
    const isDisabled = isPending || isLoading;

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

    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "35%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full flex rounded-lg flex-col gap-4 overflow-auto"
        >
            <div className="bg-background  p-4 flex flex-col gap-4">
                <div className="w-full flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold">Create Course</h2>
                    <div className="flex flex-row gap-2">
                        <Button
                            disabled={isDisabled}
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            {isCreating || isUpdating ? (
                                <IconLoader2 className="animate-spin" />
                            ) : mode === "create" ? (
                                "Create"
                            ) : (
                                "Update"
                            )}
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={
                                mode === "create" ? closeCreate : closeEdit
                            }
                        >
                            <X />
                        </Button>
                    </div>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5 px-1 w-full "
                    >
                        <FormField
                            control={form.control}
                            name="subjectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="subjectName"
                                        className="flex gap-1 items-center font-bold"
                                    >
                                        Name{" "}
                                        <span className="text-xs text-primary">
                                            (required)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isDisabled}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subjectCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="subjectCode"
                                        className="flex gap-1 items-center font-bold"
                                    >
                                        Code{" "}
                                        <span className="text-xs text-primary">
                                            (required)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isDisabled}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="information"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="information"
                                        className="flex gap-1 items-center font-bold"
                                    >
                                        Information{" "}
                                        <span className="text-xs text-primary">
                                            (required)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={isDisabled}
                                            placeholder="A brief of course"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subjectDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="subjectDescription"
                                        className="flex gap-1 items-center font-bold"
                                    >
                                        Description{" "}
                                        <span className="text-xs text-primary">
                                            (required)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={isDisabled}
                                            placeholder="Detail description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="categoryId"
                                        className="flex gap-1 items-center font-bold"
                                    >
                                        Category{" "}
                                        <span className="text-xs text-primary">
                                            (required)
                                        </span>
                                    </FormLabel>
                                    <Select
                                        disabled={isDisabled}
                                        onValueChange={field.onChange}
                                        value={field.value || ""}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent align="end">
                                            {categoryData?.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.categoryName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageRaw"
                            render={() => (
                                <FormItem>
                                    <FormLabel
                                        htmlFor="imageRaw"
                                        className="flex gap-1 items-center font-bold"
                                    >
                                        Thumbnail{" "}
                                        <span className="text-xs text-primary">
                                            (required)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={handleOnChangeSelectImage}
                                            disabled={isDisabled}
                                            className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </FormControl>
                                    {thumbnailPreview && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="mt-2 max-w-full h-auto"
                                        />
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </motion.div>
    );
};
