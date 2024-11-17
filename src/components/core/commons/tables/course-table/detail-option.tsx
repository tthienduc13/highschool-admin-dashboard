import { Course } from "@/api/course/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMasterCourseStore from "@/stores/use-master-course-store";
import { Row } from "@tanstack/react-table";

interface DetailOptionProps {
    row: Row<Course>;
}

export const DetailOption = ({ row }: DetailOptionProps) => {
    const openDetail = useMasterCourseStore((s) => s.openDetail);
    return (
        <div
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={() => openDetail(row.original.id)}
        >
            <Avatar className="size-8">
                <AvatarImage
                    src={row.original.image ?? ""}
                    alt={row.original.subjectName}
                />
                <AvatarFallback>{row.original.subjectName}</AvatarFallback>
            </Avatar>
            <span>{row.original.subjectName}</span>
        </div>
    );
};
