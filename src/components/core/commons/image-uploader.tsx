"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";

import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconUpload } from "@tabler/icons-react";

export const ImageUploader: React.FC = () => {
    const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
        ""
    );

    const formSchema = z.object({
        image: z
            .instanceof(File)
            .refine((file) => file.size !== 0, "Please upload an image"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            image: new File([""], "filename"),
        },
    });

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0]);
                form.setValue("image", acceptedFiles[0]);
                form.clearErrors("image");
            } catch (error) {
                setPreview(null);
                form.resetField("image");
                throw error;
            }
        },
        [form]
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            maxSize: 1000000,
            accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
        });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        toast.success(`Image uploaded successfully 🎉 ${values.image.name}`);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                        <FormItem className="w-full">
                            <FormLabel
                                className={`${
                                    fileRejections.length !== 0 &&
                                    "text-destructive"
                                }`}
                            >
                                <h2 className="text-xl font-semibold tracking-tight">
                                    <span
                                        className={
                                            form.formState.errors.image ||
                                            fileRejections.length !== 0
                                                ? "text-destructive"
                                                : "text-muted-foreground"
                                        }
                                    ></span>
                                </h2>
                            </FormLabel>
                            <FormControl>
                                <div
                                    {...getRootProps()}
                                    className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border p-4 shadow-sm text-sm "
                                >
                                    {preview && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={preview as string}
                                            alt="Uploaded image"
                                            className="max-h-[400px] rounded-lg"
                                        />
                                    )}
                                    <IconUpload
                                        className={`size-10 ${
                                            preview ? "hidden" : "block"
                                        }`}
                                    />

                                    <Input {...getInputProps()} type="file" />
                                    {isDragActive ? (
                                        <p>Drop the image!</p>
                                    ) : (
                                        <p>
                                            Click here or drag an image to
                                            upload it
                                        </p>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage>
                                {fileRejections.length !== 0 && (
                                    <p>
                                        Image must be less than 1MB and of type
                                        png, jpg, or jpeg
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                {preview && (
                    <div className="w-full flex justify-end">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            // className="mx-auto block h-auto rounded-lg px-8 py-3 text-xl"
                        >
                            Save
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    );
};
