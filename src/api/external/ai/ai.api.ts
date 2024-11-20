import { ModelResponse } from "@/api/common/type";
import { ContentAI } from "./ai.type";
import axios from "axios";

export const generateAIContent = async (contentAI: ContentAI): Promise<ModelResponse<object>> => {
    const reponse = await axios.post("https://fai-ai.azurewebsites.net/api/v1/write", contentAI);

    return reponse.data;
}