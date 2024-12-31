import { useOutsideClick } from "@/hooks/use-outside-click";
import { useState, memo, useCallback } from "react";
import {
    Handle,
    Node,
    NodeProps,
    NodeToolbar,
    Position,
    useConnection,
} from "@xyflow/react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export type InitNodeData = {
    label: string;
    forceToolbarVisible?: boolean;
};

const Init = ({ data, id }: NodeProps<Node<InitNodeData>>) => {
    const [newLabel, setNewLabel] = useState(data.label);
    const [isHovered, setIsHovered] = useState(false);
    const connection = useConnection();
    const isTarget = connection.inProgress && connection.fromNode.id !== id;
    const label = isTarget ? "Drop here" : data.label;

    const handleLabelChange = () => {
        if (newLabel.trim()) {
            data.label = newLabel.trim();
        }
        data.forceToolbarVisible = false;
    };

    const ref = useOutsideClick(() => {
        handleLabelChange();
    });

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NodeToolbar
                isVisible={data.forceToolbarVisible || undefined}
                position={Position.Top}
                className="flex flex-row gap-x-3 rounded-md border border-black bg-background px-4 py-2"
            >
                <div className="flex flex-row items-center gap-x-2">
                    <label>Title:</label>
                    <Input
                        className="text-lg font-medium"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        onBlur={handleLabelChange}
                    />
                </div>
            </NodeToolbar>
            <div
                ref={ref}
                className={cn(
                    "flex h-full items-center justify-center p-[10px] text-center text-xl font-bold",
                    "transition-border border-2 border-transparent duration-300 ease-in-out",
                    isHovered && "rounded-md border-[#1a5fff]"
                )}
            >
                <div>{label}</div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="init-source-bottom"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 300ms ease-in-out",
                }}
            />
        </div>
    );
};

export const InitNode = memo(Init);
