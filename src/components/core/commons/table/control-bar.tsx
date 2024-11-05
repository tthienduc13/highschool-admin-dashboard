import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { RowPerPageOptions } from "@/constants/table-pagination";
import { cn } from "@/lib/utils";
import {
    IconCheck,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";
import { PaginationState } from "@tanstack/react-table";

interface ControlBarProps {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    setPagination: (pagination: PaginationState) => void;
}

export const ControlBar = ({
    setPagination,
    totalCount,
    currentPage,
    pageSize,
    totalPage,
}: ControlBarProps) => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalCount);
    return (
        <div className="flex w-full items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                    {start}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                    {end}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                    {totalCount}
                </span>{" "}
                results
            </div>
            <div className="flex items-center space-x-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 h-[38px]"
                        >
                            <strong>{pageSize}</strong> per page
                            <IconChevronDown size={16} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-48">
                        <div className="flex flex-col gap-1">
                            {RowPerPageOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={cn(
                                        "flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors",
                                        pageSize.toString() === option.value
                                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    )}
                                    onClick={() =>
                                        setPagination({
                                            pageIndex: 1,
                                            pageSize: parseInt(option.value),
                                        })
                                    }
                                >
                                    <Checkbox
                                        checked={
                                            pageSize.toString() === option.value
                                        }
                                        className="border-blue-500"
                                    >
                                        {pageSize.toString() ===
                                            option.value && (
                                            <IconCheck size={16} />
                                        )}
                                    </Checkbox>
                                    <Label className="text-sm cursor-pointer">
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
                <div className="flex items-center rounded-md border border-gray-200 dark:border-gray-700">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setPagination({
                                pageIndex: currentPage - 1,
                                pageSize,
                            })
                        }
                        disabled={currentPage === 1}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <IconChevronLeft size={16} />
                    </Button>
                    <Separator orientation="vertical" className="h-8" />
                    <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                        Page{" "}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {currentPage}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {totalPage}
                        </span>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setPagination({
                                pageIndex: currentPage + 1,
                                pageSize,
                            })
                        }
                        disabled={totalPage === 0 || currentPage === totalPage}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <IconChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
