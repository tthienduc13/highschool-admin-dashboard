import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PageContainer({
    children,
    scrollable = true,
}: {
    children: React.ReactNode;
    scrollable?: boolean;
}) {
    return (
        <>
            {scrollable ? (
                <ScrollArea className="h-[calc(100dvh-64px-16px)] no-scrollbar">
                    {children}
                </ScrollArea>
            ) : (
                <div className="h-full p-4 pb-0">{children}</div>
            )}
        </>
    );
}
