"use server"

import { httpClient } from "@/lib/httpClient/axios";

export interface IStudentClassSchedule {
    batchId: string;
    batchName: string;
    startTime: string;
    endTime: string;
    teacherName: string;
    day: string;
}


export const getMyClassToday = async () => {
    try {
        const res = await httpClient.get('/student/class-schedule')
        return res.data as IStudentClassSchedule[]
    } catch (error) {
        console.log("My Class Data fetch failed", error)
        throw error
    }
}