import { useDeleteCourseMutation } from "@/api/course/query";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots, IconEditCircle, IconTrash } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const Alert = dynamic(
    () =>
        import("@/components/core/commons/modals/alert-modal").then(
            (mod) => mod.AlertModal
        ),
    { ssr: false }
);

interface OptionActionProps {
    courseId: string;
}

export const OptionAction = ({ courseId }: OptionActionProps) => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const { mutate: deleteCourse, isPending } = useDeleteCourseMutation();
    return (
        <>
            <Alert
                isOpen={openAlert}
                onClose={() => setOpenAlert(false)}
                onConfirm={() => deleteCourse(courseId)}
                loading={isPending}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                        <IconDots />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <div className="flex flex-col gap-1">
                        <DropdownMenuItem>
                            <IconEditCircle />
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                            <IconTrash />
                            Delete
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
