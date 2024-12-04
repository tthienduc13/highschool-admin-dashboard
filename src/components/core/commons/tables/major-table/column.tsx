import { ColumnDef } from "@tanstack/react-table";
import { Major } from "@/api/major/type";
import { Hint } from "../../hint";
import { OptionAction } from "./option-action";

export const MajorColumns: ColumnDef<Major>[] = [
    {
        accessorKey: "majorCode",
        header: "Code",
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "skillYouLearn",
        header: "Skill You Learn",
    },
    {
        accessorKey: "majorCategoryCode",
        header: "Category",
        cell: ({ row }) =>
        (
            <Hint label={`code: ${row.original.majorCategoryCode}`} side="bottom">
                <span>{row.original.majorCategory?.name}</span>
            </Hint>
        )
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <OptionAction major={row.original} />,
    },
];
