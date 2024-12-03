import { useDeleteUniversityMutation } from "@/api/university/query";
import { University } from "@/api/university/type";
import { Button } from "@/components/ui/button";
import { useUniversityStore } from "@/stores/use-university";
import { IconEditCircle, IconExclamationCircle, IconTrash } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Alert = dynamic(
    () =>
        import("@/components/core/commons/modals/alert-modal").then(
            (mod) => mod.AlertModal
        ),
    { ssr: false }
);

interface OptionActionProps {
    university: University;
}

export const OptionAction = ({ university }: OptionActionProps) => {
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const { mutate: deleteUniversity, isPending } = useDeleteUniversityMutation();
    const openEdit = useUniversityStore((s) => s.openEdit);
    const router = useRouter();

    return (
        <>
            <Alert
                isOpen={openAlert}
                onClose={() => setOpenAlert(false)}
                onConfirm={() => deleteUniversity(university.id)}
                loading={isPending}
            />
            <div className="flex flex-row gap-2">
                <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => openEdit(university)} // Pass the courseId here
                >
                    <IconEditCircle />
                </Button>
                <Button
                    size={"icon"}
                    variant={"secondary"}
                    onClick={() => router.push(`/master-data/university/${university.uniCode}`)}
                >
                    <IconExclamationCircle />
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
