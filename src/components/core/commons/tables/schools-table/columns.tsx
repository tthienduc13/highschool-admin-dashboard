import { ColumnDef } from "@tanstack/react-table";
import { IconEditCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { School } from "@/api/schools/type";

export const SchoolColumn: ColumnDef<School>[] = [
    {
        accessorKey: "schoolName",
        header: "Name",
    },
    {
        accessorKey: "provinceName",
        header: "Province",
    },
    {
        accessorKey: "numberDocuments",
        header: "numberDocuments",
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => (
            <div className="flex gap-2">
                <Button variant={"outline"}>
                    <IconEditCircle />
                    Edit
                </Button>
            </div>
        ),
    },
];
