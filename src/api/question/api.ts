import axiosServices from "@/lib/axios";
import { ModelResponse } from "../common/type";
import { endPointQuiz } from "@/helpers/endpoint";
import { Question, Quiz } from "./type";

export const getQuestions = async ({
    questionCategory,
    categoryId
}: Partial<{
    questionCategory: string,
    categoryId: string
}>): Promise<ModelResponse<Quiz>> => {
    const data = await axiosServices.get(endPointQuiz.GET_QUIZ,
        {
            params: {
                questionCategory,
                categoryId
            }
        }
    );

    return {
        status: data.status,
        message: data.data.message,
        data: data.data.data
    }
}

export const createQuiz = async (data: Question[]): Promise<ModelResponse<string[]>> => {
    const response = await axiosServices.post(endPointQuiz.CREATE_QUIZ, data);

    return {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }
}