import { UserPreview } from "@/api/user/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { StatusAction } from "./status-action";
import { ViewAction } from "./view-action";
import { formatDate } from "@/lib/utils";

export const Columns: ColumnDef<UserPreview>[] = [
    {
        accessorKey: "profilePicture",
        header: "Info",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <Avatar className="size-8">
                    <AvatarImage
                        src={row.original.profilePicture ?? ""}
                        alt={row.original.fullname}
                    />
                    <AvatarFallback>{row.original.fullname[0]}</AvatarFallback>
                </Avatar>
                <span>{row.original.fullname}</span>
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusAction status={row.original.status} />,
    },
    {
        accessorKey: "createdAt",
        header: "Join date",
        cell: ({ row }) => (
            <p>{formatDate(row.original.createdAt.toString())}</p>
        ),
    },
    {
        id: "actions",
        header: "View",
        cell: ({ row }) => <ViewAction email={row.original.email} />,
    },
];
