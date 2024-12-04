import axiosServices from "@/lib/axios";
import { Curriculum } from "./type";
import { endpointCurriculum } from "@/helpers/endpoint";
import { ModelResponse } from "../common/type";

export const getCurriculum = async (): Promise<Curriculum[]> => {
    try {
        const { data } = await axiosServices.get(endpointCurriculum.GET);
        return data;
    } catch (error) {
        console.error("Error while getting curriculum", error);
        throw error;
    }
};

export const createCurriculum = async (curriculumName: string): Promise<ModelResponse<string>> => {
    try {
        const { data } = await axiosServices.post(endpointCurriculum.CREATE, { curriculumName });

        return data;
    } catch (error) {
        console.error("Error while creating curriculum", error);
        throw error;
    }
}
