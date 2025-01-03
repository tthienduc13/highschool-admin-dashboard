"use client";

import { useDeleteTheoryMutation, useGetTheoryQuery } from "@/api/theory/query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { NewTheory } from "./new-theory";

interface TheoryProps {
    theoryId: string;
    setAddNew: (value: boolean) => void;
}

const Alert = dynamic(
    () =>
        import("@/components/core/commons/modals/alert-modal").then(
            (mod) => mod.AlertModal
        ),
    {
        ssr: false,
    }
);
export const Theory = ({ theoryId, setAddNew }: TheoryProps) => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const { mutate: deleteTheory, isPending: deletePending } =
        useDeleteTheoryMutation();
    const { data, isLoading } = useGetTheoryQuery({ theoryId: theoryId });
    const [isUpdated, setIsUpdated] = useState<boolean>(true);

    if (isLoading) {
        return <Skeleton className="w-full h-[400px]" />;
    }
    if (!data) {
        return;
    }

    const handleClose = () => {
        setAddNew(false);
        setIsUpdated(true);
    }

    return (
        <>
            <Alert
                isOpen={openAlert}
                onClose={() => setOpenAlert(false)}
                onConfirm={() => deleteTheory({ theoryId: theoryId })}
                loading={deletePending}
            />
            {
                isUpdated ? (
                    <div className="w-full min-h-[500px] flex flex-col">
                        <div className="p-4 rounded-t-xl bg-background flex flex-row justify-between gap-10 items-start border  ">
                            <div className="flex flex-col w-full gap-2">
                                <div className="text-lg font-bold">
                                    {data?.theoryName}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {data?.theoryDescription}
                                </p>
                            </div>
                            <div className="flex flex-row items-center gap-2 flex-1">
                                <Button variant={"outline"} onClick={() => setIsUpdated(false)}>
                                    <IconEditCircle />
                                    Edit
                                </Button>
                                <Button
                                    disabled={deletePending}
                                    onClick={() => setOpenAlert(true)}
                                    size={"icon"}
                                    variant={"destructive"}
                                >
                                    <IconTrash />
                                </Button>
                            </div>
                        </div>
                        <div className="p-4 border bg-background rounded-b-xl border-t-0">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data?.theoryContentHtml,
                                }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <NewTheory
                        lessonId={data.lessonId}
                        onClose={handleClose}
                        initTheory={data}
                    />
                )
            }

        </>
    );
};
