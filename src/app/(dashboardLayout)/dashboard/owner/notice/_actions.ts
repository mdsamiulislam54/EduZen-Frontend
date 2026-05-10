"use server"

import { httpClient } from "@/lib/httpClient/axios"
import { handleAxiosError } from "@/lib/utils"
import { ICreateNotice, INoticeResponse } from "@/types/notice.type"

export const createNotice = async (payload: ICreateNotice) => {
    try {
        const res = await httpClient.post("/notice/create", payload);
        return res.data;
    } catch (error) {
        console.log(error)
        handleAxiosError(error)
    }
}
export const updateNotice = async (payload: Partial<ICreateNotice>, id: string) => {
    try {
        const res = await httpClient.patch(`/notice/${id}`, payload);
        return res.data;
    } catch (error) {
        console.log(error)
        handleAxiosError(error)
    }
}
export const getAllNotice = async (query?: string) => {
    try {
        const res = await httpClient.get<INoticeResponse>(query ? `/notice?${query}` : "/notice");
        console.log("res:", res.data)
        return {
            data: res?.data?.data,
            meta: res?.data?.meta
        }
    } catch (error) {
        console.log(error)
        handleAxiosError(error)
    }
}
export const getNoticeById = async (id: string) => {
    try {
        const res = await httpClient.get(`/notice/${id}`);
        return res.data
    } catch (error) {
        console.log(error)
        handleAxiosError(error)
    }
}
export const deleteNotice = async (id: string) => {
    try {
        const res = await httpClient.delete(`/notice/${id}`);
        return res.data
    } catch (error) {
        console.log(error)
        handleAxiosError(error)
    }
}