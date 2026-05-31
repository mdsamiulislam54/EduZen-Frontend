"use server"

import { httpClient } from "@/lib/httpClient/axios";
import { handleAxiosError } from "@/lib/utils";

export interface ChangePasswordFormData {
    currentPassword: string;
    newPassword: string;
}
export const changePassword = async (payload: ChangePasswordFormData) => {
    try {
        const res = await httpClient.post("/auth/change-password", payload);
        return res.data;
    } catch (error) {
        console.error("Error changing password:", error);
        handleAxiosError(error);
    }
}