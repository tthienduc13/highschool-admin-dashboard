import { useDeleteMajorMutation } from "@/api/major/query";
import { Major } from "@/api/major/type";
import { Button } from "@/components/ui/button";
import { useMajorStore } from "@/stores/use-major";
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
    major: Major;
}

export const OptionAction = ({ major }: OptionActionProps) => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const { mutate: deleteMajor, isPending } = useDeleteMajorMutation();
    const openEdit = useMajorStore((s) => s.openEdit);

    return (
        <>
            <Alert
                isOpen={openAlert}
                onClose={() => setOpenAlert(false)}
                onConfirm={() => deleteMajor(major.id!)}
                loading={isPending}
            />
            <div className="flex flex-row gap-2">
                <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => openEdit(major)} // Pass the courseId here
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
