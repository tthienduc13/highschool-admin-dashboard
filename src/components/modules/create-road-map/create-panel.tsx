"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Panel } from "@xyflow/react";
import { EdgeType } from ".";

const edgeTypes: EdgeType[] = ["custom", "dashed"];

interface CreatePanelProps {
    selectedNodeId?: string;
    selectedEdgeId?: string;
    onDeleteEdge: () => void;
    onSave: () => void;
    onChangeEdgeType: (edgeType: EdgeType) => void;
    edgeType: EdgeType;
}

export const CreatePanel = ({
    selectedEdgeId,
    onSave,
    onDeleteEdge,
    onChangeEdgeType,
    edgeType,
}: CreatePanelProps) => {
    return (
        <Panel position="top-right" className="flex flex-row gap-x-4">
            {selectedEdgeId && (
                <div className="border p-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>{edgeType}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {edgeTypes.map((edge) => (
                                <DropdownMenuItem
                                    onClick={() => onChangeEdgeType(edge)}
                                    key={edge}
                                >
                                    {EdgeOptionRender(edge)}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={onDeleteEdge}> Delete</Button>
                </div>
            )}
            <Button onClick={onSave}>Save</Button>
        </Panel>
    );
};

const EdgeOptionRender = (edgeType: EdgeType) => {
    switch (edgeType) {
        case "custom":
            return <div className="h-1 w-full bg-[#1a5fff]"></div>;
        case "dashed":
            return (
                <div className="h-0 w-full border-t-2 border-dashed border-[#1a5fff]"></div>
            );
    }
};
