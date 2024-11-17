import axiosServices from "@/lib/axios";
import { Curriculum } from "./type";
import { endpointCurriculum } from "@/helpers/endpoint";

export const getCurriculum = async (): Promise<Curriculum[]> => {
    try {
        const { data } = await axiosServices.get(endpointCurriculum.GET);
        return data;
    } catch (error) {
        console.error("Error while getting curriculum", error);
        throw error;
    }
};
