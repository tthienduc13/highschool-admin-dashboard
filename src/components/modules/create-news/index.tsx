"use client";

import { getProvince } from "@/api/external/country/country.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useState } from "react";
import { ComboboxTag } from "./combobox-tag";
import { ContentEditor } from "../../core/commons/editor/content-editor";
import { useCreateBlogMutation } from "@/api/news/news.query";
import { useToast } from "@/hooks/use-toast";
import { Editor } from "@tiptap/core";
import { useUploadImageToCloudinary } from "@/api/external/cloudinary/upload-image.query";

function CreateNewsModule() {
    const titleHeading = "Create News";
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [tag, setTag] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
    const { mutateAsync: uploadImage } = useUploadImageToCloudinary();
    const { toast } = useToast();
    const contentHtml = editorInstance?.getHTML() ?? "";

    const { mutateAsync: createBlogMutation, isPending: isLoading } =
        useCreateBlogMutation();

    const { data: countryData } = useQuery({
        queryKey: ["province"],
        queryFn: getProvince,
    });

    const handleUploadImage = async (buffer: ArrayBuffer) => {
        const file = new File([new Blob([buffer])], "avatar.png", {
            type: "image/png",
        });

        try {
            return await uploadImage({ file });
        } catch (error) {
            console.error("Upload failed:", error);
            return "";
        }
    };

    const handleFetchContent = async () => {
        if (editorInstance) {
            const textContent = editorInstance.getText();
            let htmlContent = editorInstance.getHTML();
            const uploadedImages =
                editorInstance.storage.storageCustom.uploadedImages;
            const replacementPromises = uploadedImages.map(
                async (image: string) => {
                    const urlImage = await handleUploadImage(
                        image as unknown as ArrayBuffer
                    );
                    htmlContent = htmlContent.replaceAll(image, urlImage);
                }
            );

            // Wait for all replacements to complete
            await Promise.all(replacementPromises);

            return { textContent, htmlContent };
        }

        return { textContent: "", htmlContent: "" };
    };

    const handleThumbnailUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnail(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateBlog = async () => {
        toast({
            title: "Creating...",
            variant: "default",
            description: "Blog is being created",
        });

        try {
            const { textContent, htmlContent } = await handleFetchContent();

            const result = await createBlogMutation({
                newsTagId: tag,
                newName: title,
                content: textContent,
                contentHtml: htmlContent,
                image: image as File,
                location: selectedProvince,
            });

            toast({
                title: "Success",
                variant: "default",
                description: result.message,
            });

            window.location.reload();
        } catch {
            toast({
                title: "Failed",
                variant: "destructive",
                description: "Failed to create news",
            });
        }
    };

    return (
        <div className="w-full flex flex-col  rounded-lg bg-background p-4">
            <div className="text-3xl font-bold text-primary">
                {titleHeading}
            </div>
            <Card className="mt-4">
                <CardContent className="space-y-8">
                    <div className="space-y-2 mt-4">
                        <Label
                            htmlFor="title"
                            className="text-lg font-semibold"
                        >
                            Title News
                        </Label>
                        <Input
                            id="title"
                            placeholder="Enter your article title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-6 text-[0.9rem]"
                        />
                    </div>

                    <div className="flex">
                        <div className="w-[45vw]">
                            <Label
                                htmlFor="thumbnail"
                                className="text-lg font-semibold"
                            >
                                Thumbnail News
                            </Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                                {thumbnail ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={thumbnail}
                                        alt="Thumbnail preview"
                                        className="max-h-48 mx-auto"
                                    />
                                ) : (
                                    <div className="py-8">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Click to upload or drag and drop
                                        </p>
                                    </div>
                                )}
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailUpload}
                                    className="hidden"
                                />
                                <Button
                                    onClick={() =>
                                        document
                                            .getElementById("thumbnail")
                                            ?.click()
                                    }
                                    variant="outline"
                                    className="mt-4"
                                >
                                    Upload Image
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center ml-6 w-[18vw]">
                            <div className="flex flex-col w-full">
                                <Label
                                    htmlFor="province"
                                    className="text-lg font-semibold"
                                >
                                    Select Province
                                </Label>
                                <Select
                                    value={selectedProvince ?? ""}
                                    onValueChange={setSelectedProvince}
                                >
                                    <SelectTrigger className="mr-4 rounded-lg border-2 bg-background text-left">
                                        <SelectValue
                                            placeholder="Select your province"
                                            className="px-4"
                                        />
                                    </SelectTrigger>
                                    <SelectContent
                                        onCloseAutoFocus={(e) =>
                                            e.preventDefault()
                                        }
                                        className="h-[50vh] overflow-y-auto placeholder:text-muted-foreground"
                                    >
                                        {countryData?.map((country) => (
                                            <SelectItem
                                                key={country.code}
                                                value={country.name}
                                            >
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col w-full mt-6">
                                <Label
                                    htmlFor="tags"
                                    className="text-lg font-semibold"
                                >
                                    Tags
                                </Label>
                                <ComboboxTag setTag={setTag} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label
                            htmlFor="content"
                            className="text-lg font-semibold"
                        >
                            Content News
                        </Label>
                        <ContentEditor
                            setEditor={setEditorInstance}
                            contentHtml={contentHtml}
                        />
                    </div>
                    <Button
                        className="w-full"
                        onClick={handleCreateBlog}
                        disabled={isLoading}
                    >
                        Save News
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateNewsModule;
