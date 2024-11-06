import { useGetTheoryQuery } from "@/api/theory/query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";

interface TheoryProps {
    theoryId: string;
}

export const Theory = ({ theoryId }: TheoryProps) => {
    const { data, isLoading } = useGetTheoryQuery({ theoryId: theoryId });
    if (isLoading) {
        return <Skeleton className="w-full h-[400px]" />;
    }
    console.log(data);
    if (!data) {
        return;
    }
    return (
        <div className="w-full min-h-[500px] flex flex-col">
            <div className="p-4 rounded-t-xl bg-background flex flex-row justify-between gap-10 items-start border  ">
                <div className="flex flex-col w-full gap-2">
                    <div className="text-lg font-bold">{data?.theoryName}</div>
                    <p className="text-sm text-muted-foreground">
                        {data?.theoryDescription}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2 flex-1">
                    <Button variant={"outline"}>
                        <IconEditCircle />
                        Edit
                    </Button>
                    <Button size={"icon"} variant={"destructive"}>
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
    );
};
