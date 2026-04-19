"use server"

import { httpClient } from "@/lib/httpClient/axios";
import { ISingleTeacher, ITeacherCreate, ITeacherResponse, ITeacherUpdate } from "@/types/teacher.type";

export const getAllTeacher = async (query: string) => {
    try {
        const res = await httpClient.get<ITeacherResponse>(query ? `/teacher?${query}` : "/teacher")
        return {
            data: res.data.data,
            meta: res.data.meta,
        };
    } catch (error) {
        console.log("Teacher  failed", error);

        return {
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 0,
            },
        };
    }
}

export const getTeacherById = async (id: string) => {
    try {
        const res = await httpClient.get(`/teacher/${id}`)
        console.log("action", res.data)
        return res.data as ISingleTeacher
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createTeacher = async (payload: ITeacherCreate) => {
    try {
        console.log(payload)
        const response = await httpClient.post(`/teacher`, payload);
        console.log(response.data)
        return await response.data

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Teacher Create failed"
        }
    }
}
export const updateTeacher = async (payload: Partial<ITeacherUpdate>, id: string) => {
    try {
        const response = await httpClient.patch(`/teacher/${id}`, payload);
        return await response.data

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Teacher update failed"
        }
    }
}
export const deleteTeacher = async (id: string) => {
    try {
        const response = await httpClient.patch(`/teacher/delete/${id}`, {});
        return await response.data

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Teacher Delete failed"
        }
    }
}