"use server"

import { httpClient } from "@/lib/httpClient/axios"

interface ISchedule {
    day: string,
    startTime: string,
    endTime: string
}
export const getClassSchedule = async () => {
    try {
        const res = await httpClient.get("/teacher/class/schedule");
        return res.data as ISchedule[] 
    } catch (error) {
        console.log(error)
        return []
    }
}