import { useDeleteCourseMutation } from "@/api/course/query";
import { Button } from "@/components/ui/button";
import useMasterCourseStore from "@/stores/use-master-course-store";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";
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
    const openEdit = useMasterCourseStore((s) => s.openEdit);

    return (
        <>
            <Alert
                isOpen={openAlert}
                onClose={() => setOpenAlert(false)}
                onConfirm={() => deleteCourse(courseId)}
                loading={isPending}
            />
            <div className="flex flex-row gap-2">
                <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => openEdit(courseId)} // Pass the courseId here
                >
                    <IconEditCircle />
                </Button>
                <Button
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => setOpenAlert(true)}
                >
                    <IconTrash />
                </Button>
            </div>
        </>
    );
};
