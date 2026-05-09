"use server"

import { httpClient } from "@/lib/httpClient/axios"
import { IStudentDashboardData, IStudentDashboardResponse } from "@/types/student.dashboard.type"


export const getStudentDashboardData = async () => {
    try {
        const res = await httpClient.get("/student/dashboard-card");
        return res.data as IStudentDashboardData
    } catch (error) {
        console.log("Dashboard card fetch failed", error)
        throw error
    }
}