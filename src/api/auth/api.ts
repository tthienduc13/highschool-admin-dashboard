import { endpointAuth } from "@/helpers/endpoint";
import axiosServices from "@/lib/axios";
import { ModelResponse } from "../common/type";

type LoginResponse = {
    userId: string;
    email: string;
    username: string | null;
    fullname: string;
    image: string;
    progresStage: boolean;
    roleName: string | null;
    lastLoginAt: Date;
    accessToken: string;
};

export const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<ModelResponse<LoginResponse>> => {
    const response = await axiosServices.post(endpointAuth.SIGN_IN, {
        email: email,
        password: password,
    });
    return response.data;
};
