
import { getNewAccessToken, isTokenExpiredSoon } from "@/service/auth.service";
import { ApiResponse } from "@/types/apiTypes";
import axios from "axios";
import { cookies, headers } from "next/headers";
const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
if(!base_url) {
    throw new Error("BACKEND_URL is required");
}
export interface ApiRequestOptions {
    params?: Record<string, unknown>,
    headers?: Record<string, string>,
    withCredentials?: true
}
if (!base_url) {
    throw new Error("Api base_url is required")
}

const newAccessToken = async (refreshToken: string) => {
    if (!await isTokenExpiredSoon(refreshToken)) {
        return
    };

    const RequestHeaders = await headers();
    if (RequestHeaders.get("X-Token-Refreshed") === "1") {
        return
    }

    try {
        const response = await getNewAccessToken(refreshToken);
        return response;
    } catch (error) {
        console.error("Error refreshing token:", error);
    }
}

const axiosInstance = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const accessToken = cookieStore.get("accessToken")?.value;

    if (refreshToken && accessToken) {
        await newAccessToken(refreshToken);
    }

    const cookieHeader = cookieStore.getAll()
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join("; ");

    const instance = axios.create({
        baseURL: base_url,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader
        },

        withCredentials: true
    });
    return instance;
}


const httpGet = async <T>(endPoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    try {
        const instance = await axiosInstance();
        const res = await instance.get<ApiResponse<T>>(endPoint, {
            params: options?.params,
            headers: options?.headers,
            withCredentials: options?.withCredentials
        });

        return res.data;
    } catch (error) {
        console.error(`GET request Error ${endPoint} failed, ${error}`);
        throw error
    }
}
const httpPost = async <T>(endPoint: string, data: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    try {
        const instance = await axiosInstance();
        const res = await instance.post<ApiResponse<T>>(endPoint, data, {
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
        const instance = await axiosInstance();
        const res = await instance.patch<ApiResponse<T>>(endPoint, data, {
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
        const instance = await axiosInstance();
        const res = await instance.delete<ApiResponse<T>>(endPoint, {
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