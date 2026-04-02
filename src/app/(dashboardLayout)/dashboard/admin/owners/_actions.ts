"use server"

import { httpClient } from "@/lib/httpClient/axios";
import { TOwner } from "@/types/owner.type";
import { cookies } from "next/headers";


export const getAllOwners = async (): Promise<TOwner[]> => {
    try {
        const cookieStore = await cookies()
        const response = await httpClient.get("/admin/owners", {
            headers: {
                Cookie: cookieStore.toString()
            }
        });
        return response.data as TOwner[];
    } catch (error) {
        console.error("Error fetching owners:", error);
        throw new Error("Failed to fetch owners", { cause: error });

    }
}
export const getAllOwnersById = async (id: string): Promise<TOwner> => {
    try {
        const cookieStore = await cookies()
        const response = await httpClient.get(`/admin/owner/${id}`, {
            headers: {
                Cookie: cookieStore.toString()
            }
        })
        return response.data as TOwner;
    } catch (error) {
        console.error("Error fetching owner:", error);
        throw new Error("Failed to fetch owner", { cause: error });

    }
}
export const deleteOwner = async (id: string): Promise<void> => {
    try {
        const cookieStore = await cookies()
        const response = await httpClient.delete(`/admin/owners/${id}`, {
            headers: {
                Cookie: cookieStore.toString()
            }
        })
        return response.data as void;
    } catch (error) {
        console.error("Error deleting owner:", error);
        throw new Error("Failed to delete owner", { cause: error });

    }
}