'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconCalendarClock, IconMapPin, IconTrash, IconUserCircle } from "@tabler/icons-react";
import { useState } from "react";
import Image from 'next/image';
import { convertDateString, convertTimeAgo } from "@/utils/time";
import { Eye, Flame, Tag } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNewsDetailQuery } from "@/api/news/news.query";
import { Skeleton } from "@/components/ui/skeleton";
import MinimalTiptapEditor from "@/components/ui/minimal-editor/minimal-tiptap";
import { ContentData } from "@/components/ui/minimal-editor/types";

interface NewsDetailModuleProps {
    slug: string;
}

function NewsDetailModule({ slug }: NewsDetailModuleProps) {
    const titleHeading = "Update News";

    const [contentData, setContentData] = useState<ContentData>();
    const {
        data: initialNewsData,
        isLoading,
    } = useNewsDetailQuery(slug);

    if (isLoading) {
        if (contentData) {
            console.log("ok");
        }

        return (
            <div className="w-full flex flex-col rounded-lg bg-background p-4">
                <Skeleton className="h-[30vh] w-full" />
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col rounded-lg bg-background p-4">
            <div className="text-3xl font-bold text-primary">
                {titleHeading}
            </div>

            <Card className="mt-4">

                <CardHeader>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="text-muted-foreground gap-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                <Tag size={14} />
                                <span>{initialNewsData?.newsTagName}</span>
                            </div>
                            <div className="bg-destructive-foreground text-muted-foreground gap-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                <IconMapPin size={14} />
                                <span>{initialNewsData?.location}</span>
                            </div>
                            {
                                initialNewsData?.hot && (
                                    <div className="bg-red-500 text-white text-muted-foreground gap-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                        <Flame size={14} />
                                        <span>Hot</span>
                                    </div>
                                )
                            }

                            {
                                initialNewsData?.isDeleted && (
                                    <div className="bg-slate-500 text-white text-muted-foreground gap-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                        <IconTrash size={14} />
                                        <span>Deleted</span>
                                    </div>
                                )
                            }


                        </div>
                    </div>
                    <span className="font-bold text-[1.5rem]">
                        {initialNewsData?.newName}
                    </span>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <IconUserCircle size={18} />
                            <span className="text-muted-foreground ml-1 text-sm">{initialNewsData?.author?.authorName}</span>
                        </div>
                        <div className="flex items-center mt-0">
                            <Eye className="w-4 h-4" />
                            <span className="text-muted-foreground ml-1 text-sm">{initialNewsData?.view.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center mt-0">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center mt-0">
                                            <IconCalendarClock size={18} />
                                            <span className="text-muted-foreground ml-1 text-sm">{convertDateString(initialNewsData?.updatedAt)} ({convertTimeAgo(initialNewsData?.updatedAt)})</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Created {convertDateString(initialNewsData?.createdAt)}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div>
                        <Image
                            src={initialNewsData?.image ?? ""}
                            alt="thumbnail"
                            layout="responsive"
                            width={700}
                            height={475}
                            className="w-full object-cover rounded-lg"
                        />
                    </div>

                    <MinimalTiptapEditor
                        value={initialNewsData?.contentHtml}
                        setContentData={setContentData}
                        className="w-full"
                        editorContentClassName="p-5"
                        placeholder="Type your description here..."
                        autofocus={true}
                        editable={true}
                        editorClassName="focus:outline-none"
                    />
                </CardContent>
            </Card>

        </div>
    );
}

export default NewsDetailModule;