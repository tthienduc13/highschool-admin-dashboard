import { University } from "@/api/university/type";
import { OptionAction } from "@/components/core/commons/tables/university-table/option-action";
import { ColumnDef } from "@tanstack/react-table";

export const UniversityColumns: ColumnDef<University>[] = [
    {
        accessorKey: "uniCode",
        header: "Code",
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <a href={row.original.websiteLink} target="_blank" rel="noopener noreferrer">{row.original.name}</a>,
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "region",
        header: "Region",
    },
    {
        accessorKey: "contactPhone",
        header: "Phone"
    },
    {
        accessorKey: "contactEmail",
        header: "Email"
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <OptionAction university={row.original} />,
    },
];
