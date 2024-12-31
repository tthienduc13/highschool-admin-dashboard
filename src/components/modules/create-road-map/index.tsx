"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./roadmap.css";

import {
    ReactFlow,
    addEdge,
    Background,
    ReactFlowInstance,
    NodeMouseHandler,
    EdgeMouseHandler,
    ReactFlowProvider,
    OnConnect,
    type Node,
    type Edge,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
    FitViewOptions,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
    useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/base.css";
import { InitNode } from "@/components/roadmap/init-node";
import { DefaultNode } from "@/components/roadmap/default-node";
import { CustomEdge } from "@/components/roadmap/custom-edge";
import { SecondaryNode } from "@/components/roadmap/secondary-node";
import { DashedEdge } from "@/components/roadmap/dashed-edge";
import CustomConnectionLine from "@/components/roadmap/custom-connection-line";
import { DnDProvider, useDnD } from "./dnd-context";
import Sidebar from "./sidebar";
import ContextMenu from "./context-menu";
import { useSearchParams } from "next/navigation";
import { useCreateRoadmapDetailMutation } from "@/api/roadmap/mutation";
import FullContainer from "@/components/core/layouts/full-container";

interface ContextMenuProps {
    id: string;
    label: string;
    top: number | false;
    left: number | false;
    right: number | false;
    bottom: number | false;
}

export type EdgeType = "custom" | "dashed";

const connectionLineStyle = {
    strokeWidth: 2,
    stroke: "#1a5fff",
};

const fitViewOptions: FitViewOptions = {
    padding: 0.2,
};

function CreateRoadmapModule() {
    const { mutate: createRoadmapDetail, isPending } =
        useCreateRoadmapDetailMutation();

    const params = useSearchParams();

    // Define using dnd kit
    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: uuidv4(),
                type,
                position,
                data: {
                    label: `New node`,
                    resourceId: "",
                    forceToolbarVisible: false,
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type]
    );

    const createNewNode = useCallback(
        (x: number, y: number, nodeType: string) => {
            const position = screenToFlowPosition({ x, y });
            const newNode = {
                id: uuidv4(),
                type: nodeType,
                position,
                data: {
                    label: `New activity`,
                    resourceId: "",
                    forceToolbarVisible: false,
                },
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition]
    );

    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(
        null
    );
    const [seletecdEdgeId, setSelectedEdgeId] = useState<string | null>(null);
    const [edgeType, setEdgeType] = useState<EdgeType>("custom");

    // Define nodes and edges
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    // Define on Connect
    const onConnect: OnConnect = useCallback(
        (params) =>
            setEdges((els) => addEdge({ ...params, type: edgeType }, els)),
        [setEdges, edgeType]
    );

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            console.log(JSON.stringify(flow));
            createRoadmapDetail({
                roadmapId: params.get("id") as string,
                contentJson: JSON.stringify(flow),
                nodes: flow.nodes.map((node) => {
                    return {
                        positionX: Math.round(node.position.x),
                        positionY: Math.round(node.position.y),
                        type: node.type as string,
                        dataLabel: node.data.label as string,
                        nodeId: node.id,
                        dataId: "0191df70-6649-73da-93ed-11432ee38ab6",
                    };
                }),
                edges: flow.edges.map((edge) => {
                    return {
                        source: edge.source!,
                        target: edge.target!,
                        sourceHandle: edge.sourceHandle!,
                        targetHandle: edge.targetHandle!,
                        type: edge.type!,
                        edgeId: edge.id!,
                        animated: false,
                    };
                }),
            });
        }
    }, [rfInstance, createRoadmapDetail, params]);

    // Get the id of selected Node
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
        setSelectedNodeId(node.id);
    }, []);

    // Get the id of selected Edge
    const onEdgeClick: EdgeMouseHandler = useCallback(
        (_, edge) => {
            setSelectedEdgeId(edge.id);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setEdges]
    );

    // Context Menu
    const [menu, setMenu] = useState<ContextMenuProps | null>(null);
    const reactFlowRef = useRef<HTMLDivElement | null>(null);

    const onNodeContextMenu = useCallback(
        (event: React.MouseEvent, node: Node) => {
            event.preventDefault();

            if (reactFlowRef.current) {
                const pane = reactFlowRef.current.getBoundingClientRect();

                setMenu({
                    id: node.id,
                    label: node.data.label as string,
                    top: event.clientY < pane.height - 200 && event.clientY,
                    left: event.clientX < pane.width - 200 && event.clientX,
                    right:
                        event.clientX >= pane.width - 200 &&
                        pane.width - event.clientX,
                    bottom:
                        event.clientY >= pane.height - 200 &&
                        pane.height - event.clientY,
                });
            }
        },
        [setMenu]
    );

    // Close the context menu if it's open whenever the window is clicked.
    const onPaneClick = useCallback(() => {
        setMenu(null);
        setSelectedNodeId(null);
        setSelectedEdgeId(null);
    }, [setMenu, setSelectedNodeId, setSelectedEdgeId]);

    const onNodesDelete = useCallback(
        (deleted: Node[]) => {
            setEdges(
                deleted.reduce((acc, node) => {
                    const incomers = getIncomers(node, nodes, edges);
                    const outgoers = getOutgoers(node, nodes, edges);
                    const connectedEdges = getConnectedEdges([node], edges);

                    const remainingEdges = acc.filter(
                        (edge) => !connectedEdges.includes(edge)
                    );

                    const createdEdges = incomers.flatMap(({ id: source }) =>
                        outgoers.map(({ id: target }) => ({
                            id: `${source}->${target}`,
                            source,
                            target,
                        }))
                    );

                    return [...remainingEdges, ...createdEdges];
                }, edges)
            );
        },
        [nodes, edges]
    );

    const changeEdgeType = useCallback(
        (type: EdgeType) => {
            setEdgeType(type);
            if (seletecdEdgeId) {
                setEdges((eds) =>
                    eds.map((edge) =>
                        edge.id === seletecdEdgeId
                            ? { ...edge, type: type }
                            : edge
                    )
                );
            }
        },
        [setEdges, seletecdEdgeId]
    );

    const nodeTypes = useMemo(
        () => ({
            init: InitNode,
            def: DefaultNode,
            secondary: SecondaryNode,
        }),
        []
    );

    const edgeTypes = useMemo(
        () => ({
            custom: CustomEdge,
            dashed: DashedEdge,
        }),
        []
    );

    return (
        <FullContainer>
            <div className="dndflow h-full w-full">
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        ref={reactFlowRef}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        onEdgeClick={onEdgeClick}
                        onInit={setRfInstance}
                        fitView
                        fitViewOptions={fitViewOptions}
                        onNodesDelete={onNodesDelete}
                        connectionLineStyle={connectionLineStyle}
                        connectionLineComponent={CustomConnectionLine}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onPaneClick={onPaneClick}
                        onNodeContextMenu={onNodeContextMenu}
                    >
                        {menu && (
                            <ContextMenu
                                onClick={onPaneClick}
                                id={menu.id}
                                label={menu.label}
                                top={menu.top !== null ? menu.top : false}
                                left={menu.left !== null ? menu.left : false}
                                right={menu.right !== null ? menu.right : false}
                                bottom={
                                    menu.bottom !== null ? menu.bottom : false
                                }
                            />
                        )}
                        <Background />
                    </ReactFlow>
                </div>
                <Sidebar
                    isPending={isPending}
                    onCreateNode={createNewNode}
                    selectedNodeId={selectedNodeId}
                    selectedEdgeId={seletecdEdgeId}
                    onEdgeChange={changeEdgeType}
                    onSave={onSave}
                />
            </div>
        </FullContainer>
    );
}

function CreateRoadmapWithProviders() {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <CreateRoadmapModule />
            </DnDProvider>
        </ReactFlowProvider>
    );
}

CreateRoadmapWithProviders.displayName = "CreateRoadmapWithProviders";

export default CreateRoadmapWithProviders;
