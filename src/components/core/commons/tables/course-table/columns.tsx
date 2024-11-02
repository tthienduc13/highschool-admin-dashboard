import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { Course } from "@/api/course/type";
import { IconArrowsUpDown } from "@tabler/icons-react";
import { OptionAction } from "./option-action";

export const CourseColumns: ColumnDef<Course>[] = [
    {
        accessorKey: "image",
        header: "Course",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <Avatar className="size-8">
                    <AvatarImage
                        src={row.original.image ?? ""}
                        alt={row.original.subjectName}
                    />
                    <AvatarFallback>{row.original.subjectName}</AvatarFallback>
                </Avatar>
                <span>{row.original.subjectName}</span>
            </div>
        ),
    },
    {
        accessorKey: "categoryName",
        header: "Category",
    },
    {
        accessorKey: "subjectCode",
        header: "Code",
    },
    {
        accessorKey: "numberOfChapters",
        header: ({ column }) => (
            <div
                className="flex items-center gap-x-1 cursor-pointer"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Chapters
                <IconArrowsUpDown size={16} />
            </div>
        ),
        cell: ({ row }) => <span>{row.original.numberOfChapters}</span>,
        enableSorting: true,
        sortUndefined: "last",
        sortingFn: (rowA, rowB) => {
            return (
                rowA.original.numberOfChapters - rowB.original.numberOfChapters
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
            <p>{formatDate(row.original.createdAt.toString())}</p>
        ),
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => (
            <p>{formatDate(row.original.updatedAt.toString())}</p>
        ),
    },
    {
        accessorKey: "view",
        header: "Views",
        cell: ({ row }) => <span>{row.original.view ?? 0}</span>,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="w-full flex justify-center">
                <OptionAction courseId={row.original.id} />
            </div>
        ),
    },
];
