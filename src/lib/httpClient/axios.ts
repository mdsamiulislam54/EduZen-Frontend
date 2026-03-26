import { ApiResponse } from "@/types/apiTypes";
import axios from "axios";
const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
export interface ApiRequestOptions {
    params?: Record<string, unknown>,
    headers?: Record<string, string>
}
if (!base_url) {
    throw new Error("Api base_url is required")
}

const axiosInstance = axios.create({
    baseURL: base_url,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});



const httpGet = async <T>(endPoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    try {
        const res = await axiosInstance.get<ApiResponse<T>>(endPoint, {
            params: options?.params,
            headers: options?.headers
        });

        return res.data;
    } catch (error) {
        console.error(`GET request Error ${endPoint} failed, ${error}`);
        throw error
    }
}
const httpPost = async <T>(endPoint: string, data: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    try {
        const res = await axiosInstance.post<ApiResponse<T>>(endPoint, data, {
            params: options?.params,
            headers: options?.headers
        });

        return res.data;
    } catch (error) {
        console.error(`POST request Error ${endPoint} failed, ${error}`);
        throw error
    }
}
const httpPatch = async <T>(endPoint: string, data: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    try {
        const res = await axiosInstance.patch<ApiResponse<T>>(endPoint, data, {
            params: options?.params,
            headers: options?.headers
        });

        return res.data;
    } catch (error) {
        console.error(`PATCH request Error ${endPoint} failed, ${error}`);
        throw error
    }
}
const httpDelete = async<T>(endPoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    try {
        const res = await axiosInstance.delete<ApiResponse<T>>(endPoint, {
            params: options?.params,
            headers: options?.headers
        });

        return res.data;
    } catch (error) {
        console.error("GET ERROR ", error);
        throw error
    }
}


export const httpClient = {
    get: httpGet,
    post: httpPost,
    patch: httpPatch,
    delete: httpDelete
}