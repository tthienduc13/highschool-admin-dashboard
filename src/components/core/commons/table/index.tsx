"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    IconCheck,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconLoader2,
    IconSearch,
} from "@tabler/icons-react";
import { RowPerPageOptions } from "@/constants/table-pagination";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    page: number;
    totalPage: number;
    pageSize: number;
    totalCount: number;
    setPagination: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;
    isLoading: boolean;
    sectionTitle: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    page,
    pageSize,
    totalPage,
    totalCount,
    setPagination,
    isLoading,
    sectionTitle,
    setSearchQuery,
}: DataTableProps<TData, TValue>) {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: totalPage,
        state: {
            pagination: { pageIndex: page - 1, pageSize },
            sorting,
        },
        onSortingChange: setSorting,
    });

    const start = (page - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalCount);

    return (
        <div className="w-full h-full flex flex-col gap-y-4 ">
            <div className="flex flex-row items-center justify-between">
                <div className="text-3xl font-bold text-primary">
                    {sectionTitle}
                </div>
                <div className="flex flex-row items-center px-2 border rounded-md">
                    <IconSearch />
                    <Input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by course name"
                        className="border-none outline-none shadow-none focus-visible:ring-0"
                    />
                </div>
            </div>
            <ScrollArea className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="bg-gray-100 dark:bg-gray-800 text-base"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <IconLoader2 className="mx-auto  animate-spin text-gray-500" />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    onMouseEnter={() => setHoveredRow(index)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    className={cn(
                                        "transition-colors duration-200",
                                        hoveredRow === index
                                            ? "bg-blue-50 dark:bg-blue-900/20"
                                            : "odd:bg-gray-50 dark:odd:bg-gray-800/50"
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="py-3"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>
            <div className="flex items-center justify-between">
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
                                                pageSize: parseInt(
                                                    option.value
                                                ),
                                            })
                                        }
                                    >
                                        <Checkbox
                                            checked={
                                                pageSize.toString() ===
                                                option.value
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
                                setPagination({ pageIndex: page - 1, pageSize })
                            }
                            disabled={page === 1}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <IconChevronLeft size={16} />
                        </Button>
                        <Separator orientation="vertical" className="h-8" />
                        <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                            Page{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                {page}
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
                                setPagination({ pageIndex: page + 1, pageSize })
                            }
                            disabled={page === totalPage}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <IconChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
