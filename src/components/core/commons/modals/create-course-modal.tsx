import { useCategoriesQuery } from "@/api/category/query";
import { useCreateCourseMutation } from "@/api/course/query";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CourseSchema } from "@/schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBook, IconLoader2 } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateCourseModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreateCourseModal = ({
    open,
    onClose,
}: CreateCourseModalProps) => {
    const { data: categoryData, isLoading } = useCategoriesQuery();

    const {
        mutate: createCourse,
        isPending,
        isSuccess,
    } = useCreateCourseMutation();

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        mode: "onChange",
        defaultValues: {
            subjectName: "",
            // imageRaw: undefined,
            subjectCode: "",
            information: "",
            subjectDescription: "",
        },
    });
    const handleOnChangeSelectImage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target?.files?.[0];
        if (file) {
            form.setValue("imageRaw", file);
        } else {
            form.setValue("imageRaw", undefined);
        }
    };
    const onSubmit = (values: z.infer<typeof CourseSchema>) => {
        console.log(values);
        createCourse(values);
    };

    const isDisabled = isPending || isLoading;

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
        <Credenza open={open} onOpenChange={onClose}>
            <CredenzaContent>
                <CredenzaHeader className="flex flex-col justify-center">
                    <CredenzaTitle className="flex justify-center">
                        <div className="flex flex-col gap-y-1 items-center text-xl text-primary">
                            <IconBook size={24} />
                            Create new course
                        </div>
                    </CredenzaTitle>
                    <CredenzaDescription className="text-center">
                        Start creating course
                    </CredenzaDescription>
                </CredenzaHeader>
                <Separator />
                <CredenzaBody className="pb-4 pt-2 max-h-[500px] overflow-y-scroll no-scrollbar">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5 px-1 w-full"
                        >
                            <FormField
                                control={form.control}
                                name="subjectName"
                                render={({ field }) => (
                                    <FormItem className="w-full gap-0">
                                        <FormLabel
                                            htmlFor="subjectName"
                                            className="flex gap-1 items-center font-bold"
                                        >
                                            Name
                                            <p className="text-xs text-primary">
                                                (required)
                                            </p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                disabled={isDisabled}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subjectCode"
                                render={({ field }) => (
                                    <FormItem className="w-full gap-0">
                                        <FormLabel
                                            htmlFor="subjectName"
                                            className="flex gap-1 items-center font-bold"
                                        >
                                            Code
                                            <p className="text-xs text-primary">
                                                (required)
                                            </p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isDisabled}
                                                type="text"
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
                                    <FormItem className="w-full gap-0">
                                        <FormLabel
                                            htmlFor="information"
                                            className="flex gap-1 items-center font-bold"
                                        >
                                            Information
                                            <p className="text-xs text-primary">
                                                (required)
                                            </p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={isDisabled}
                                                placeholder="  A brief of course"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subjectDescription"
                                render={({ field }) => (
                                    <FormItem className="w-full gap-0">
                                        <FormLabel
                                            htmlFor="subjectDescription"
                                            className="flex gap-1 items-center font-bold"
                                        >
                                            Description
                                            <p className="text-xs text-primary">
                                                (required)
                                            </p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={isDisabled}
                                                placeholder="Detail description"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel
                                            htmlFor="categoryId"
                                            className="flex gap-1 items-center font-bold"
                                        >
                                            Category
                                            <p className="text-xs text-primary">
                                                (required)
                                            </p>
                                        </FormLabel>
                                        <Select
                                            disabled={isDisabled}
                                            onValueChange={(value) =>
                                                field.onChange(value)
                                            }
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent align="end">
                                                {categoryData!.map(
                                                    (category) => (
                                                        <SelectItem
                                                            // disabled={isPending}
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {
                                                                category.categoryName
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
                            <FormField
                                control={form.control}
                                name="imageRaw"
                                render={() => (
                                    <FormItem className="w-full gap-0">
                                        <FormLabel
                                            htmlFor="subjectName"
                                            className="flex gap-1 items-center font-bold"
                                        >
                                            Thumbnail
                                            <p className="text-xs text-primary">
                                                (required)
                                            </p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                onChange={
                                                    handleOnChangeSelectImage
                                                }
                                                disabled={isDisabled}
                                                className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CredenzaBody>
                <Separator />
                <CredenzaFooter>
                    <Button
                        disabled={isDisabled}
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {isPending ? (
                            <>
                                <IconLoader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Creating
                            </>
                        ) : (
                            "Create"
                        )}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
};
