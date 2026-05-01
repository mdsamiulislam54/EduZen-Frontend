"use server"

import { httpClient } from "@/lib/httpClient/axios"

interface IDashboardCard {
    totalStudent:string,
    totalBatches: string,
    totalSubjects:string

}

export const getTeacherDashboardCard = async () => {
    try {
        const res = await httpClient.get(`/teacher/dashboard/card`);
        return res.data as IDashboardCard
    } catch (error) {
        console.log("Dashboard card fetch failed", error)
        throw error
    }
}