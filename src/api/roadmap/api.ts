import axiosServices from "@/lib/axios";
import { ModelResponse } from "../common/type";
import { RoadmapCreate, RoadmapDetailCreate } from "./type";
import { endpointRoadmap } from "@/helpers/endpoint";

type CreateResponse = string;

export const createRoadmap = async (
    values: RoadmapCreate
): Promise<ModelResponse<CreateResponse>> => {
    const response = await axiosServices.post(
        `${endpointRoadmap.CREATE_ROADMAP}`,
        {
            roadmapName: values.roadmapName,
            roadmapDescription: values.roadmapDescription,
            roadmapSubjectIds: values.roadmapSubjectIds,
            roadmapDocumentIds: values.roadmapDocumentIds,
            typeExam: values.typeExam,
        }
    );
    return response.data;
};

export const createRoadmapDetail = async (
    values: RoadmapDetailCreate
): Promise<ModelResponse<CreateResponse>> => {
    try {
        const response = await axiosServices.post(
            `${endpointRoadmap.CREATE_ROADMAP_DETAIL}`,
            {
                roadmapId: values.roadmapId,
                contentJson: values.contentJson,
                nodes: values.nodes,
                edges: values.edges,
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error create detail", error);
        throw error;
    }
};
