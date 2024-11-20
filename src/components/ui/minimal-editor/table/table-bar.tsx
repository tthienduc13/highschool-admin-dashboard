import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconColorPicker, IconSquareToggleHorizontal, IconTable, IconTableColumn } from '@tabler/icons-react';
import { Editor } from '@tiptap/core';
import { BetweenHorizonalStart, BetweenVerticalStart, Columns2, Columns3, Rows2, Rows3, Table, TableCellsMerge, TableCellsSplit } from 'lucide-react';
import React from 'react'
import ToolbarButton from '../../../core/commons/minimal-editor/toolbar-button';

export interface TableBarProps {
    editor: Editor | null;
}

export const TableBar: React.FC<TableBarProps> = ({ editor }) => {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ToolbarButton
                    tooltip="Table"
                    aria-label="Table"
                    variant="default"
                >
                    <IconTable size={18} />
                </ToolbarButton>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Format Table</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className='h-[50vh] overflow-y-auto'>
                    <DropdownMenuItem
                        className='px-4 py-3'
                        onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                    >
                        <div className='flex items-center'>
                            <Table size={18} />
                            <p className='ml-4'>Insert table</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className='px-4 py-3'
                        onClick={() => editor?.chain().focus().addColumnBefore().run()}
                        disabled={!editor?.can().addColumnBefore()}
                    >
                        <div className="flex items-center">
                            <Columns2 size={18} />
                            <p className='ml-4'>Add column before</p>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().addColumnAfter().run()}
                        disabled={!editor?.can().addColumnAfter()}
                    >
                        <div className="flex items-center">
                            <Columns3 size={18} />
                            <p className="ml-4">Add column after</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().deleteColumn().run()}
                        disabled={!editor?.can().deleteColumn()}
                    >
                        <div className="flex items-center">
                            <BetweenVerticalStart size={18} />
                            <p className="ml-4">Delete column</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().addRowBefore().run()}
                        disabled={!editor?.can().addRowBefore()}
                    >
                        <div className="flex items-center">
                            <Rows2 size={18} />
                            <p className="ml-4">Add row before</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().addRowAfter().run()}
                        disabled={!editor?.can().addRowAfter()}
                    >
                        <div className="flex items-center">
                            <Rows3 size={18} />
                            <p className="ml-4">Add row after</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().deleteRow().run()}
                        disabled={!editor?.can().deleteRow()}
                    >
                        <div className="flex items-center">
                            <BetweenHorizonalStart size={18} />
                            <p className="ml-4">Delete row</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().mergeCells().run()}
                        disabled={!editor?.can().mergeCells()}
                    >
                        <div className="flex items-center">
                            <TableCellsMerge size={18} />
                            <p className="ml-4">Merge cells</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().splitCell().run()}
                        disabled={!editor?.can().splitCell()}
                    >
                        <div className="flex items-center">
                            <TableCellsSplit size={18} />
                            <p className="ml-4">Split cell</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
                        disabled={!editor?.can().toggleHeaderColumn()}
                    >
                        <div className="flex items-center">
                            <IconTableColumn size={18} />
                            <p className="ml-4">Toggle header column</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
                        disabled={!editor?.can().toggleHeaderRow()}
                    >
                        <div className="flex items-center">
                            <IconSquareToggleHorizontal size={18} />
                            <p className="ml-4">Toggle header row</p>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="px-4 py-3"
                        onClick={() => editor?.chain().focus().toggleHeaderCell().run()}
                        disabled={!editor?.can().toggleHeaderCell()}
                    >
                        <div className="flex items-center">
                            <IconColorPicker size={18} />
                            <p className="ml-4">Toggle header cell</p>
                        </div>
                    </DropdownMenuItem>


                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}