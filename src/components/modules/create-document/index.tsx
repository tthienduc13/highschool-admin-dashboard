"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { useCurriculumQuery } from "@/api/curriculum/query";
import { useCoursesQuery } from "@/api/course/query";
import { useProvinceSchoolQuery } from "@/api/schools/query";
import { useCreateDocumentMutation } from "@/api/document/query";
import { IconLoader2 } from "@tabler/icons-react";
import { useProvincesQuery } from "@/api/province/query";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

const formSchema = z.object({
    documentName: z.string().min(1, "Document name is required"),
    documentDescription: z.string().min(1, "Document description is required"),
    schoolId: z.string().uuid("Invalid school ID"),
    curriculumId: z.string().uuid("Invalid curriculum ID"),
    subjectId: z.string().uuid("Invalid subject ID"),
    semester: z.enum(["1", "2"]),
    documentYear: z
        .number()
        .min(years[years.length - 1])
        .max(currentYear),
    file: z
        .instanceof(File)
        .refine(
            (file) => file.type === "application/pdf",
            "Only PDF files are allowed."
        )
        .refine((file) => file.size <= 5000000, "Max file size is 5MB."),
});

export default function CreateDocumentModule() {
    const [file, setFile] = useState<File | null>(null);
    const [selectedProvince, setSelectedProvince] = useState<string>("");

    const { data: curriculumData, isLoading: curriculumLoading } =
        useCurriculumQuery();
    const { data: courseData, isLoading: courseLoading } = useCoursesQuery({
        pageNumber: 1,
        pageSize: 100,
    });
    const { data: schoolData, isLoading: schoolLoading } =
        useProvinceSchoolQuery({
            provinceId: selectedProvince,
            pageNumber: 1,
            pageSize: 100,
        });
    const { data: provinceData, isLoading: provinceLoading } =
        useProvincesQuery({ pageSize: 63, pageNumber: 1 });
    const { mutate: createDocument, isPending: creating } =
        useCreateDocumentMutation({ file: file! });

    const isLoading =
        curriculumLoading || courseLoading || schoolLoading || provinceLoading;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            documentName: "",
            documentDescription: "",
            semester: "1",
            documentYear: currentYear,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        createDocument({
            documentName: values.documentName,
            documentDescription: values.documentDescription,
            schoolId: values.schoolId,
            semester: parseInt(values.semester),
            documentYear: values.documentYear,
            curriculumId: values.curriculumId,
            subjectId: values.subjectId,
        });
    }

    if (isLoading) {
        return (
            <div className="w-full flex flex-col gap-6 p-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6 rounded-lg bg-background p-6 shadow-md">
            <h1 className="text-3xl font-bold text-primary">Create Document</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="flex flex-row border rounded-lg">
                        <FormField
                            control={form.control}
                            name="semester"
                            render={({ field }) => (
                                <FormItem className="w-[150px] overflow-hidden">
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12 text-base font-semibold border-none shadow-none focus-visible:ring-0 rounded-none">
                                                <SelectValue placeholder="Select semester" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={"1"}>
                                                Semester 1
                                            </SelectItem>
                                            <SelectItem value={"2"}>
                                                Semester 2
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator className="h-12 w-[1px]" />
                        <FormField
                            control={form.control}
                            name="documentName"
                            render={({ field }) => (
                                <FormItem className="flex items-center w-full">
                                    <FormControl>
                                        <Input
                                            className="border-none shadow-none focus-visible:ring-0 h-12 text-lg"
                                            placeholder="Enter document name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="documentDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Document Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter document description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-2">
                        <Label>Place</Label>
                        <div className="flex flex-row border rounded-lg">
                            <Select
                                onValueChange={(value) =>
                                    setSelectedProvince(value)
                                }
                                value={selectedProvince}
                            >
                                <SelectTrigger className="w-1/2 h-10   border-none shadow-none focus-visible:ring-0 rounded-none">
                                    <SelectValue placeholder="Select a province" />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinceData?.data.map((province) => (
                                        <SelectItem
                                            key={province.provinceId}
                                            value={province.provinceId.toString()}
                                        >
                                            {province.provinceName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Separator className="h-10 w-[1px]" />
                            <FormField
                                control={form.control}
                                name="schoolId"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full h-10   border-none shadow-none focus-visible:ring-0 rounded-none">
                                                    <SelectValue placeholder="Select a school" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {schoolData?.data.map(
                                                    (school) => (
                                                        <SelectItem
                                                            key={school.id}
                                                            value={school.id}
                                                        >
                                                            {school.schoolName}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Course</Label>
                        <div className="flex flex-row border rounded-lg">
                            <FormField
                                control={form.control}
                                name="subjectId"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-10   border-none shadow-none focus-visible:ring-0 rounded-none">
                                                    <SelectValue placeholder="Select a course" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {courseData?.data.map(
                                                    (course) => (
                                                        <SelectItem
                                                            key={course.id}
                                                            value={course.id}
                                                        >
                                                            {course.subjectName}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Separator className="h-10 w-[1px]" />
                            <FormField
                                control={form.control}
                                name="curriculumId"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-10   border-none shadow-none focus-visible:ring-0 rounded-none">
                                                    <SelectValue placeholder="Select a curriculum" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {curriculumData?.map(
                                                    (curriculum) => (
                                                        <SelectItem
                                                            key={curriculum.id}
                                                            value={
                                                                curriculum.id
                                                            }
                                                        >
                                                            {
                                                                curriculum.curriculumName
                                                            }
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Document Year */}
                    <FormField
                        control={form.control}
                        name="documentYear"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Document Year</FormLabel>
                                <Select
                                    onValueChange={(value) =>
                                        field.onChange(parseInt(value))
                                    }
                                    defaultValue={field.value.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a year" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {years.map((year) => (
                                            <SelectItem
                                                key={year}
                                                value={year.toString()}
                                            >
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* File Upload */}
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload Document</FormLabel>
                                <FormControl>
                                    <Input
                                        className="file:bg-primary/10"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                field.onChange(file);
                                                setFile(file);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Only PDF files are allowed. Max file size:
                                    5MB.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Submit Button */}
                    <Button
                        className="w-fit float-end"
                        type="submit"
                        disabled={creating || isLoading}
                    >
                        {creating ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            "Create Document"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
