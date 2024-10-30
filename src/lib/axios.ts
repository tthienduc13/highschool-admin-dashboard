import webCookieStorage from "./web-cookie-storage";
import axios, { AxiosError, AxiosResponse } from "axios";
import { camelizeKeys } from "humps";

const axiosServices = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 50000,
});

axiosServices.interceptors.request.use(
    function (config) {
        const accessToken = webCookieStorage.getToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosServices.interceptors.response.use(
    (res: AxiosResponse) => {
        if (
            res.headers["content-type"]?.includes("application/json") &&
            res.data
        ) {
            res.data = camelizeKeys(res.data);
        }
        return res;
    },
    async (err) => {
        return Promise.reject(err);
    }
);

const axiosUpload = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 50000,
});

axiosUpload.interceptors.request.use(
    function (config) {
        const accessToken = webCookieStorage.getToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        config.headers["Content-Type"] = "multipart/form-data";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error);
}

export const axiosClientUpload = axiosUpload;
export default axiosServices;
