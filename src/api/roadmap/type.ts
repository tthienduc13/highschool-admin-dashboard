export type RoadmapCreate = {
    roadmapName: string;
    roadmapDescription: string;
    roadmapSubjectIds: string[];
    roadmapDocumentIds: string[];
    typeExam: string[];
};

export type RoadmapDetailCreate = {
    roadmapId: string;
    contentJson: string;
    nodes: {
        positionX: number;
        positionY: number;
        type: string;
        dataLabel: string;
        nodeId: string;
        dataId: string;
    }[];
    edges: {
        source: string;
        target: string;
        sourceHandle: string;
        targetHandle: string;
        type: string;
        edgeId: string;
        animated: boolean;
    }[];
};
