import { useDeleteMajorCategoryMutation } from "@/api/major/query";
import { MajorCategory } from "@/api/major/type";
import { Button } from "@/components/ui/button";
import { useMajorCategoryStore } from "@/stores/use-major";
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
    majorCategory: MajorCategory;
}

export const OptionAction = ({ majorCategory }: OptionActionProps) => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const { mutate: deleteMajor, isPending } = useDeleteMajorCategoryMutation();
    const openEdit = useMajorCategoryStore((s) => s.openEdit);

    return (
        <>
            <Alert
                isOpen={openAlert}
                onClose={() => setOpenAlert(false)}
                onConfirm={() => deleteMajor(majorCategory.id!)}
                loading={isPending}
            />
            <div className="flex flex-row gap-2">
                <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => openEdit(majorCategory)} // Pass the courseId here
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
