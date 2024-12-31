import React, { useState } from "react";
import { useDnD } from "./dnd-context";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { EdgeType } from ".";
import {
    IconArrowBackUp,
    IconLine,
    IconLineDashed,
    IconLoader2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { Input } from "@/components/ui/input";

import { SearchType } from "@/api/search/type";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { useSearchQuery } from "@/api/search/query";
import {
    DocumentSearchResponse,
    FlashcardSearchResponse,
    SubjectSearchResponse,
} from "@/api/search/api";

type NodeType = "init" | "def" | "secondary";

const Sidebar: React.FC<{
    onCreateNode: (x: number, y: number, nodeType: string) => void;
    selectedNodeId: string | null;
    selectedEdgeId: string | null;
    onEdgeChange: (edgeType: EdgeType) => void;
    onSave: () => void;
    isPending: boolean;
}> = ({
    onCreateNode,
    selectedNodeId,
    selectedEdgeId,
    onEdgeChange,
    onSave,
    isPending,
}) => {
    const [_, setType] = useDnD();
    console.log(_);
    const edgeTypes: EdgeType[] = ["custom", "dashed"];

    const { getEdge, setNodes } = useReactFlow();

    const [searchQuery, setSearchQuery] = useState<string>();
    const [searchType, setSearchType] = useState<SearchType>(
        SearchType.Document
    );

    const searchDebounce = useDebounceValue(searchQuery, 300);

    const { data, isLoading } = useSearchQuery({
        value: searchDebounce,
        type: searchType ?? SearchType.All,
    });

    const handleChangeType = (type: SearchType) => {
        setSearchType(type);
    };

    const onDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        nodeType: NodeType
    ) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    const onClick = (
        event: React.MouseEvent<HTMLDivElement>,
        nodeType: NodeType
    ) => {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        onCreateNode(x, y, nodeType);
    };

    const onSelectResource = (resourceId: string) => {
        if (selectedNodeId) {
            setNodes((nds) =>
                nds.map((node) =>
                    node.id === selectedNodeId
                        ? { ...node, data: { ...node.data, resourceId } }
                        : node
                )
            );
        }
    };

    return (
        <aside className="flex w-full max-w-[300px] flex-col gap-4 rounded-l-xl bg-gray-50 p-4">
            <div className="flex flex-row items-center justify-between">
                <Button variant={"ghost"} size={"icon"}>
                    <IconArrowBackUp />
                </Button>
                <Button onClick={onSave} disabled={isPending}>
                    {isPending ? (
                        <IconLoader2 className="animate-spin" />
                    ) : (
                        "Save"
                    )}
                </Button>
            </div>
            <div className="flex flex-col gap-y-4">
                <div className="text-lg font-semibold">Add activity</div>
                <div className="flex flex-col gap-y-2">
                    {["init", "def", "secondary"].map((nodeType) => (
                        <div
                            key={nodeType}
                            onDragStart={(event) =>
                                onDragStart(event, nodeType as NodeType)
                            }
                            onClick={(event) =>
                                onClick(event, nodeType as NodeType)
                            }
                            draggable
                        >
                            {NodeOptionRender(nodeType)}
                        </div>
                    ))}
                </div>
            </div>
            {selectedEdgeId && (
                <div className="flex flex-col gap-y-4">
                    <div className="text-lg font-semibold">Edge type</div>
                    <Select onValueChange={onEdgeChange}>
                        <SelectTrigger className="bg-background">
                            <SelectValue
                                placeholder={EdgeOptionRender(
                                    (getEdge(selectedEdgeId)
                                        ?.type as EdgeType) ??
                                        ("Select Type" as EdgeType)
                                )}
                            />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                            <SelectGroup>
                                {edgeTypes.map((edge) => (
                                    <SelectItem key={edge} value={edge}>
                                        {EdgeOptionRender(edge)}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            )}
            {selectedNodeId && (
                <div className="flex flex-col gap-y-4">
                    <div className="text-lg font-semibold">Resource</div>
                    <div className="flex flex-col gap-x-2">
                        <Input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full  bg-background"
                            placeholder="Search for resource"
                        />
                        <div className="mt-2 flex flex-row  gap-x-2">
                            {Object.values(SearchType)
                                .filter((type) => type !== SearchType.All)
                                .map((type, index) => (
                                    <div key={index}>
                                        <Button
                                            className="w-full"
                                            disabled={isLoading}
                                            size={"sm"}
                                            variant={
                                                searchType === type
                                                    ? "default"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                handleChangeType(type)
                                            }
                                        >
                                            {type.charAt(0).toUpperCase() +
                                                type.slice(1)}
                                        </Button>
                                    </div>
                                ))}
                        </div>
                        <div className="no-scrollbar min-h-[20px] w-full overflow-y-scroll">
                            {isLoading && (
                                <div className="flex h-full w-full items-center justify-center">
                                    <IconLoader2
                                        color="#1a5fff"
                                        size={40}
                                        className="animate-spin"
                                    />
                                </div>
                            )}
                            {data?.flashcards && data.flashcards.length > 0 && (
                                <FlashcardResult
                                    data={data.flashcards}
                                    onSelectResource={onSelectResource}
                                />
                            )}
                            {data?.subjects && data.subjects.length > 0 && (
                                <SubjectResult
                                    data={data.subjects}
                                    onSelectResource={onSelectResource}
                                />
                            )}
                            {data?.documents && data.documents.length > 0 && (
                                <DocumentResult
                                    data={data.documents}
                                    onSelectResource={onSelectResource}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};

const NodeOptionRender = (nodeType: string) => {
    switch (nodeType) {
        case "init":
            return (
                <div className=" flex h-9 w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-background px-4 py-2 hover:opacity-60">
                    New activity
                </div>
            );
        case "def":
            return (
                <div className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#fdff00] px-4 py-2 hover:opacity-60">
                    New activity
                </div>
            );
        case "secondary":
            return (
                <div className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#ffe599] px-4 py-2 hover:opacity-60">
                    New activity
                </div>
            );
    }
};

const EdgeOptionRender = (edgeType: EdgeType) => {
    switch (edgeType) {
        case "custom":
            return (
                <div className="flex items-center gap-x-2">
                    Line <IconLine />
                </div>
            );
        case "dashed":
            return (
                <div className="flex items-center gap-x-2">
                    Dashed <IconLineDashed />
                </div>
            );
    }
};

interface SubjectResultProps {
    data: SubjectSearchResponse;
    onSelectResource: (resourceId: string) => void;
}

const SubjectResult = ({ data, onSelectResource }: SubjectResultProps) => {
    return (
        <div className="flex w-full flex-col gap-y-3 py-3">
            <div className="flex flex-col gap-y-2">
                {data.map((data) => (
                    <div
                        key={data.id}
                        className="flex flex-col rounded-md py-2 pl-4 hover:bg-secondary"
                        onClick={() => onSelectResource(data.id)} // Set resourceId on click
                    >
                        <div
                            className="search-result text-sm"
                            dangerouslySetInnerHTML={{
                                __html: data.highlightResult.subjectName.value,
                            }}
                        />
                        <div
                            className="search-result text-xs italic"
                            dangerouslySetInnerHTML={{
                                __html: data.highlightResult.subjectDescription
                                    .value,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// FlashcardResult component
interface FlashcardProps {
    data: FlashcardSearchResponse;
    onSelectResource: (resourceId: string) => void;
}

const FlashcardResult = ({ data, onSelectResource }: FlashcardProps) => {
    return (
        <div className="flex w-full flex-col gap-y-3 py-3">
            <div className="flex flex-col gap-y-2">
                {data.map((data) => (
                    <div
                        key={data.id}
                        className="flex flex-col rounded-md py-2 pl-4 hover:bg-secondary"
                        onClick={() => onSelectResource(data.id)} // Set resourceId on click
                    >
                        <div
                            className="search-result text-sm"
                            dangerouslySetInnerHTML={{
                                __html: data.highlightResult.flashcardName
                                    .value,
                            }}
                        />
                        <div
                            className="search-result text-xs italic"
                            dangerouslySetInnerHTML={{
                                __html: data.highlightResult
                                    .flashcardDescription.value,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// DocumentResult component
interface DocumentResultProps {
    data: DocumentSearchResponse;
    onSelectResource: (resourceId: string) => void;
}

const DocumentResult = ({ data, onSelectResource }: DocumentResultProps) => {
    return (
        <div className="flex w-full flex-col gap-y-3 py-3">
            <div className="flex flex-col gap-y-2">
                {data.map((data) => (
                    <div
                        key={data.id}
                        className="flex flex-col rounded-md py-2 pl-4 hover:bg-secondary"
                        onClick={() => onSelectResource(data.id)} // Set resourceId on click
                    >
                        <div
                            className="search-result text-sm"
                            dangerouslySetInnerHTML={{
                                __html: data.highlightResult.documentName.value,
                            }}
                        />
                        <div
                            className="search-result text-xs italic"
                            dangerouslySetInnerHTML={{
                                __html: data.highlightResult.documentDescription
                                    .value,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
