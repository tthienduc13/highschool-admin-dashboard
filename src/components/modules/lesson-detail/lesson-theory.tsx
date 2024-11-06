import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { NewTheory } from "./new-theory";
import { useGetLessonTheoryQuery } from "@/api/theory/query";
import { Skeleton } from "@/components/ui/skeleton";
import { Theory } from "./theory";

interface LessonTheoryProps {
    lessonId: string;
}

export const LessonTheory = ({ lessonId }: LessonTheoryProps) => {
    const [addNew, setAddNew] = useState<boolean>(false);
    const [selectedTheoryId, setSelectedTheoryId] = useState<string | null>(
        null
    );
    const { data: theoryList, isLoading } = useGetLessonTheoryQuery({
        lessonId: lessonId,
        pageNumber: 1,
        pageSize: 100,
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-4 gap-4">
                <div className="p-4 flex flex-col gap-5">
                    <Skeleton className="h-5 w-[150px]" />
                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-10 w-[250px]" />
                        <Skeleton className="h-10 w-[250px]" />
                        <Skeleton className="h-10 w-[250px]" />
                    </div>
                </div>
                <div className="col-span-3">
                    <Skeleton className="w-full h-[400px]" />
                </div>
            </div>
        );
    }

    if (!theoryList?.data) {
        return null;
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="p-4 flex flex-col gap-5">
                <h2 className="text-xl font-bold">Content</h2>
                <div className="flex flex-col gap-4">
                    {theoryList.data.map((theory) => (
                        <div
                            key={theory.id}
                            onClick={() => {
                                setSelectedTheoryId(theory.id);
                                setAddNew(false);
                            }}
                            className={cn(
                                "px-3 py-2 transition-all duration-200 w-full font-semibold hover:bg-primary/10 hover:border rounded-lg cursor-pointer",
                                selectedTheoryId === theory.id &&
                                    "bg-primary/10 border-primary border"
                            )}
                        >
                            {theory.theoryName}
                        </div>
                    ))}
                </div>
                <Button
                    variant={"outline"}
                    disabled={addNew}
                    className="w-fit text-primary font-semibold"
                    onClick={() => {
                        setAddNew(true);
                        setSelectedTheoryId(null);
                    }}
                >
                    <IconPlus /> Add new
                </Button>
            </div>
            <div className="col-span-3">
                {addNew ? (
                    <NewTheory
                        lessonId={lessonId}
                        onClose={() => setAddNew(false)}
                    />
                ) : (
                    selectedTheoryId && <Theory theoryId={selectedTheoryId} />
                )}
            </div>
        </div>
    );
};
