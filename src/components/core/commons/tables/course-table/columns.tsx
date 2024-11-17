import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { Course } from "@/api/course/type";
import { OptionAction } from "./option-action";

import { DetailOption } from "./detail-option";

export const CourseColumns: ColumnDef<Course>[] = [
    {
        accessorKey: "image",
        header: "Course",
        cell: ({ row }) => <DetailOption row={row} />,
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
        cell: ({ row }) => <OptionAction courseId={row.original.id} />,
    },
];
