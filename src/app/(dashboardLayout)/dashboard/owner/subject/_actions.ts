"use server"

import { httpClient } from "@/lib/httpClient/axios"
import { ISubject } from "@/types/subject.type"


export const getAllSubject = async () => {
    try {
        const res = await httpClient.get("/subject")
        return res.data as ISubject[]
    } catch (error) {
        console.error("Error fetching subject data:", error);
        return []
    }
}

export const updateSubject = async (data: Partial<ISubject>, id:string) => {
    try {
        const res = await httpClient.patch<{ message?: string }>(`/subject/${id}`, data)
        return {
            success: true,
            message: res.data.message || "Subject Update successfully",
        };
    } catch (error) {
        console.error("Error fetching subject update:", error);
        return []
    }
}
export const deleteSubject = async (id:string) => {
    try {
        const res = await httpClient.delete<{ message?: string }>(`/subject/${id}`,)
        return {
            success: true,
            message: res.data.message || "Subject Delete successfully",
        };
    } catch (error) {
        console.error("Error fetching subject Delete:", error);
        return []
    }
}