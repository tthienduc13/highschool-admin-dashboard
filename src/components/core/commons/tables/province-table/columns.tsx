import { ColumnDef } from "@tanstack/react-table";
import { IconEditCircle } from "@tabler/icons-react";
import { Province } from "@/api/province/type";
import { Button } from "@/components/ui/button";

export const ProvinceColumn: ColumnDef<Province>[] = [
    {
        accessorKey: "provinceId",
        header: "Province Id",
    },
    {
        accessorKey: "provinceName",
        header: "Name",
    },
    {
        accessorKey: "numberSchool",
        header: "Number of schools",
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
