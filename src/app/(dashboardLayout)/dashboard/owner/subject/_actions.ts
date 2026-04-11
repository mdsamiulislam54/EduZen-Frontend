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