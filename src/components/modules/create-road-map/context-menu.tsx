import React, { useCallback } from "react";
import { useReactFlow, Node } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    label: string;
    top: number | false;
    left: number | false;
    right: number | false;
    bottom: number | false;
}

export default function ContextMenu({
    id,
    top,
    left,
    right,
    bottom,
    ...props
}: ContextMenuProps) {
    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

    const duplicateNode = useCallback(() => {
        const node = getNode(id) as Node;
        if (!node) return;

        const position = {
            x: node.position.x + 50,
            y: node.position.y + 50,
        };

        addNodes({
            ...node,
            selected: false,
            dragging: false,
            id: uuidv4(),
            position,
        });
    }, [id, getNode, addNodes]);

    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }, [id, setNodes, setEdges]);

    return (
        <div
            style={{
                top: top !== false ? top : undefined,
                left: left !== false ? left : undefined,
                right: right !== false ? right : undefined,
                bottom: bottom !== false ? bottom : undefined,
                position: "absolute",
            }}
            className="z-10 flex flex-col gap-y-2 rounded-md border-2 border-black bg-white p-2"
            {...props}
        >
            <Button onClick={duplicateNode} variant={"ghost"}>
                Duplicate
            </Button>
            <Button onClick={deleteNode} variant={"destructive"}>
                Delete
            </Button>
        </div>
    );
}
