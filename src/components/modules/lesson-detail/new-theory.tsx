"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconLoader2, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCreateTheoryMutation, useUpdateTheoryMutation } from "@/api/theory/query";
import { Theory } from "@/api/theory/type";
import MinimalTiptapEditor from "@/components/ui/minimal-editor/minimal-tiptap";
import { ContentData } from "@/components/ui/minimal-editor/types";

interface NewTheoryProps {
    lessonId: string;
    onClose: () => void;
    initTheory?: Theory;
}

export const NewTheory = ({ lessonId, onClose, initTheory }: NewTheoryProps) => {
    const { toast } = useToast();
    const [name, setName] = useState(initTheory?.theoryName ?? "Theory name");
    const [description, setDescription] = useState(initTheory?.theoryDescription ?? "");
    const [contentData, setContentData] = useState<ContentData>();

    const {
        mutate: createTheory,
        isSuccess,
        isPending,
    } = useCreateTheoryMutation({
        lessonId: lessonId,
    });

    const {
        mutate: updateTheory,
        isSuccess: updateSuccess,
        isPending: updatePending,
    } = useUpdateTheoryMutation({
        theoryId: initTheory?.id as string,
    });

    const handleSubmit = async () => {
        if (name.length < 10) {
            toast({
                title: "Validation Error",
                description: "Name must be at least 10 characters long.",
                variant: "destructive",
            });
            return;
        }
        if (description.length < 10) {
            toast({
                title: "Validation Error",
                description: "Description must be at least 10 characters long.",
                variant: "destructive",
            });
            return;
        }
        const textEditor = contentData?.contentText as string;
        if (textEditor.length < 10) {
            toast({
                title: "Validation Error",
                description: "Content must be at least 10 characters long.",
                variant: "destructive",
            });
            return;
        }

        const content = await contentData?.onGetContentData();

        if (!content) {
            toast({
                title: "Failed",
                variant: "destructive",
                description: "Failed to create news",
            });

            return;
        }

        if (initTheory) {
            updateTheory({
                theoryId: initTheory.id,
                theoryName: name,
                theoryDescription: description,
                theoryContentJson: content?.contentText as string,
                theoryContentHtml: content?.contentHtml as string,
            });
        } else {
            createTheory({
                lessonId: lessonId,
                theoryName: name,
                theoryDescription: description,
                theoryContent: content?.contentText as string,
                theoryContentHtml: content?.contentHtml as string,
            });
        }
    };

    useEffect(() => {
        if (isSuccess || updateSuccess) {
            onClose();
            setName("");
            setDescription("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, updateSuccess]);

    return (
        <div className="w-full">
            <div className="rounded-t-xl p-4 bg-background border flex flex-row items-center justify-between">
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="border-none text-xl font-bold text-primary focus-visible:ring-0 shadow-none"
                />
                <Button variant={"ghost"} size={"icon"} onClick={onClose}>
                    <IconX />
                </Button>
            </div>
            <div className="p-4 rounded-b-xl border border-t-0 bg-background flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description" className="font-semibold">
                        Description
                    </Label>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        className="resize-none"
                    ></Textarea>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="content" className=" font-semibold">
                        Content News
                    </Label>
                    <MinimalTiptapEditor
                        value={initTheory?.theoryContentHtml}
                        setContentData={setContentData}
                        className="w-full"
                        editorContentClassName="p-5"
                        placeholder="Type your description here..."
                        autofocus={true}
                        editable={true}
                        editorClassName="focus:outline-none"
                    />
                </div>
                <div className="flex flex-row justify-end">
                    <Button disabled={isPending || updatePending} onClick={handleSubmit}>
                        {(isPending || updatePending) ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            "Save change"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
