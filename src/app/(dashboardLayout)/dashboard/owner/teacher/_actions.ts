"use server"

import { httpClient } from "@/lib/httpClient/axios";
import { ITeacher } from "@/types/teacher.type";

export const getAllTeacher = async (query: string) => {
    try {
        const res = await httpClient.get(query ? `/teacher?${query}` : "/teacher")
        return await res.data as ITeacher[]
    } catch (error) {
        console.log("Teacher  failed", error);

        return []
    }
}