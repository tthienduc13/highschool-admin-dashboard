import { ColumnDef } from "@tanstack/react-table";
import { MajorCategory, MBTIDictionary } from "@/api/major/type";
import { Hint } from "../../hint";
import { OptionAction } from "./oprion-action";
import { HelpCircle } from "lucide-react";

export const MajorCategoryColumns: ColumnDef<MajorCategory>[] = [
    {
        accessorKey: "majorCategoryCode",
        header: "Major Category Code",
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "mbtiTypes",
        header: () => (
            <div className="flex items-center gap-2">
                <span>MBTI Types</span>
                <Hint label={(
                    <div className="flex flex-col gap-2">
                        {
                            MBTIDictionary.map((mbti, index) => (
                                <span key={index}>{mbti}</span>
                            ))
                        }
                    </div>
                )} side="top">
                    <span><HelpCircle size={16} /> </span>
                </Hint>
            </div>

        ),
        cell: ({ row }) => <span>{row.original.mbtiTypes.join(", ")}</span>
    },
    {
        accessorKey: "primaryHollandTrait",
        header: "Primary Holland Trait",
    },
    {
        accessorKey: "secondaryHollandTrait",
        header: "Secondary Holland Trait",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <OptionAction majorCategory={row.original} />,
    },
];
