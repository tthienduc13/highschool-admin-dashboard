import { useUserDetailQuery } from "@/api/user/query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserTableContext } from "@/stores/use-user-table-store";
import { Display } from "../../../../ui/editor/text-display";
import {
    IconBrandGoogleFilled,
    IconMail,
    IconMapPin,
    IconSchool,
} from "@tabler/icons-react";
import { isStudent } from "@/lib/user-role-check";
import { motion } from "framer-motion";

export const UserInfo = () => {
    const selectedUser = useUserTableContext((s) => s.selectedUser);
    const { data, isLoading } = useUserDetailQuery(selectedUser);

    if (isLoading) {
        return (
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 400, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="h-full max-w-[400px] w-full flex flex-col gap-4"
            >
                <Skeleton className="h-1/4 w-full" />
                <Skeleton className="h-2/4 w-full" />
            </motion.div>
        );
    }
    return (
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full max-w-[400px] w-full flex flex-col gap-4"
        >
            <div className="bg-background rounded-lg p-4 flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-center">
                    <Avatar className="size-16">
                        <AvatarImage
                            fetchPriority="low"
                            src={data?.data?.profilePicture}
                            alt={data?.data?.fullname}
                        />
                        <AvatarFallback>HS</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-lg font-semibold">
                                {data?.data?.fullname}
                            </h2>
                            {data?.data?.provider.toLocaleLowerCase() ===
                                "google" ? (
                                <IconBrandGoogleFilled size={18} />
                            ) : (
                                <IconMail size={18} />
                            )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {data?.data?.email}
                        </div>
                        {data?.data?.bio ? (
                            <Display
                                text={""}
                                richText={JSON.parse(data.data.bio)}
                            />
                        ) : (
                            <p className="text-muted-foreground text-sm">
                                No bio is set yet
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {isStudent(data?.data) && (
                <div className="bg-background rounded-lg p-4 flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Education</h2>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center font-medium gap-1 ">
                            <IconMapPin size={18} />
                            {data.data.schoolName ?? "Unknown school"}
                        </div>
                        <div className="flex flex-row items-center font-medium gap-1 ">
                            <IconSchool size={18} />
                            Grade: {data.data.grade}
                        </div>
                    </div>
                </div>
            )}

            {isStudent(data?.data) && (
                <div className="bg-background rounded-lg p-4 flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Studying courses</h2>
                    {data?.data.enrollments.length > 0
                        ? "List enroll"
                        : "Not study yet"}
                </div>
            )}
        </motion.div>
    );
};
