import { useUserTableContext } from "@/stores/use-user-table-store";
import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CreateModerator = () => {
    const onCloseCreateModer = useUserTableContext((s) => s.onCloseCreateModer);

    // if (isLoading) {
    //     return (
    //         <motion.div
    //             initial={{ width: 0, opacity: 0 }}
    //             animate={{ width: 400, opacity: 1 }}
    //             exit={{ width: 0, opacity: 0 }}
    //             transition={{ type: "spring", stiffness: 300, damping: 30 }}
    //             className="h-full max-w-[400px] w-full flex flex-col gap-4"
    //         >
    //             <Skeleton className="h-1/4 w-full" />
    //             <Skeleton className="h-2/4 w-full" />
    //         </motion.div>
    //     );
    // }
    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 450, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full w-[450px]  flex flex-col gap-4 "
        >
            <div className="bg-background rounded-lg p-4 flex flex-row justify-between items-center ">
                <h2 className=" font-bold">Add new moderator</h2>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={onCloseCreateModer}
                >
                    <IconX />
                </Button>
            </div>
            <div className="flex flex-col gap-y-4 rounded-lg p-4 bg-background"></div>
        </motion.div>
    );
};
