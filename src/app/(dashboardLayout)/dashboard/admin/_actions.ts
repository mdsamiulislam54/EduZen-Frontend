"use server"

import { httpClient } from "@/lib/httpClient/axios"

interface AdminDashboardData {
    totalOwners: number;
    totalRevenue: number;
    activeSubscription: number;
    totalCoachingCenter: number;
}

export const adminDashboardActionCards = async(): Promise<AdminDashboardData>=>{
    try {
        const res = await httpClient.get("/admin/dashboard-data");
        return res.data as AdminDashboardData;
        
    } catch (error) {
        console.error("Error fetching admin dashboard action cards:", error)
        throw error
    }
}