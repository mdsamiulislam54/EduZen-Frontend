"use server"

import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios"
import { AwardIcon } from "lucide-react";

interface AdminDashboardData {
    totalOwners: number;
    totalRevenue: number;
    activeSubscription: number;
    totalCoachingCenter: number;
}

export interface ChartItem {
  date: string;
  count: number;
};
export const adminDashboardActionCards = async (): Promise<AdminDashboardData> => {
    try {
        const res = await httpClient.get("/admin/dashboard-data");
        return res.data as AdminDashboardData;

    } catch (error) {
        console.error("Error fetching admin dashboard action cards:", error)
        throw error
    }
};

export const adminChartData = async () => {
    try {
        const res = await httpClient.get("/admin/chart-data");
        return res.data as ChartItem[];
    } catch (error) {
        console.error("Error fetching admin chart data:", error)
        handleError(error)
    }
}