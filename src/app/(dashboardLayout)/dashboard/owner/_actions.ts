"use server"

import { httpClient } from "@/lib/httpClient/axios";
interface OwnerDashboardData {
    totalStudents: number;
    totalBatches: number;
    totalRevenue: number;
    totalTeachers: number;
    totalSubjects: number;
}

interface OwnerDashboardChartData {
    date: string;
    count: number;
    totalFee:number;
}
export const getOwnerDashboardData = async (): Promise<{ success: boolean; data?: OwnerDashboardData; message?: string }> => {
    try {
        const response = await httpClient.get("/coaching/owner/dashboard");
        return {
            success: true,
            data: response.data as OwnerDashboardData
        }
    } catch (error) {
        console.error("Error fetching owner dashboard data:", error);
        return {
            success: false,
            message: "Failed to fetch dashboard data"
        }
    }
};

export const getOwnerDashboardChartData = async (): Promise<{ success: boolean; data?: OwnerDashboardChartData[]; message?: string }> => {
    try {
        const response = await httpClient.get("/coaching/owner/dashboard/student-growth");
        return {
            success: true,
            data: response.data as OwnerDashboardChartData[]
        }
    } catch (error) {

        console.log("Error fetching owner dashboard chart data:", error);
        return {
            success: false,
            message: "Failed to fetch dashboard chart data"
        }
    }
}