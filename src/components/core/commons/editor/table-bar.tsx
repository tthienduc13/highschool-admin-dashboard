import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { IconColorPicker, IconSquareToggleHorizontal, IconTable, IconTableColumn } from '@tabler/icons-react';
import { Editor } from '@tiptap/core';
import { BetweenHorizonalStart, BetweenVerticalStart, Columns2, Columns3, Rows2, Rows3, Table, TableCellsMerge, TableCellsSplit } from 'lucide-react';
import React from 'react'

export interface TableBarProps {
    activeEditor: Editor | null;
}

export const TableBar: React.FC<TableBarProps> = ({ activeEditor }) => {


    return (
        <TooltipProvider>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        className={cn(
                            "rounded-full"
                        )}
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <IconTable size={18} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>table</p>
                            </TooltipContent>
                        </Tooltip>
                    </Button>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Format Table</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className='h-[50vh] overflow-y-auto'>
                        <DropdownMenuItem
                            className='px-4 py-3'
                            onClick={() => activeEditor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                        >
                            <div className='flex items-center'>
                                <Table size={18} />
                                <p className='ml-4'>Insert table</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className='px-4 py-3'
                            onClick={() => activeEditor?.chain().focus().addColumnBefore().run()}
                            disabled={!activeEditor?.can().addColumnBefore()}
                        >
                            <div className="flex items-center">
                                <Columns2 size={18} />
                                <p className='ml-4'>Add column before</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().addColumnAfter().run()}
                            disabled={!activeEditor?.can().addColumnAfter()}
                        >
                            <div className="flex items-center">
                                <Columns3 size={18} />
                                <p className="ml-4">Add column after</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().deleteColumn().run()}
                            disabled={!activeEditor?.can().deleteColumn()}
                        >
                            <div className="flex items-center">
                                <BetweenVerticalStart size={18} />
                                <p className="ml-4">Delete column</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().addRowBefore().run()}
                            disabled={!activeEditor?.can().addRowBefore()}
                        >
                            <div className="flex items-center">
                                <Rows2 size={18} />
                                <p className="ml-4">Add row before</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().addRowAfter().run()}
                            disabled={!activeEditor?.can().addRowAfter()}
                        >
                            <div className="flex items-center">
                                <Rows3 size={18} />
                                <p className="ml-4">Add row after</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().deleteRow().run()}
                            disabled={!activeEditor?.can().deleteRow()}
                        >
                            <div className="flex items-center">
                                <BetweenHorizonalStart size={18} />
                                <p className="ml-4">Delete row</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().mergeCells().run()}
                            disabled={!activeEditor?.can().mergeCells()}
                        >
                            <div className="flex items-center">
                                <TableCellsMerge size={18} />
                                <p className="ml-4">Merge cells</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().splitCell().run()}
                            disabled={!activeEditor?.can().splitCell()}
                        >
                            <div className="flex items-center">
                                <TableCellsSplit size={18} />
                                <p className="ml-4">Split cell</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().toggleHeaderColumn().run()}
                            disabled={!activeEditor?.can().toggleHeaderColumn()}
                        >
                            <div className="flex items-center">
                                <IconTableColumn size={18} />
                                <p className="ml-4">Toggle header column</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().toggleHeaderRow().run()}
                            disabled={!activeEditor?.can().toggleHeaderRow()}
                        >
                            <div className="flex items-center">
                                <IconSquareToggleHorizontal size={18} />
                                <p className="ml-4">Toggle header row</p>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="px-4 py-3"
                            onClick={() => activeEditor?.chain().focus().toggleHeaderCell().run()}
                            disabled={!activeEditor?.can().toggleHeaderCell()}
                        >
                            <div className="flex items-center">
                                <IconColorPicker size={18} />
                                <p className="ml-4">Toggle header cell</p>
                            </div>
                        </DropdownMenuItem>


                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>
    )
}