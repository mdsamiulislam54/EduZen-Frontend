"use server";

import { cookies } from "next/headers";
import { jwtUtils } from "@/lib/jwt/jwtUtlis";
import { getTokenRemaining, setTokenCookie } from "@/lib/cookies/token";
import { httpClient } from "@/lib/httpClient/axios";
import { boolean } from "zod";
import { handleAxiosError } from "@/lib/utils";

export type Role = "ADMIN" | "OWNER" | "TEACHER" | "STUDENT";

export type JwtPayload = {
    userId: string;
    role: Role;
    name: string;
    email: string;
};

export interface ICheckOwnerSubscription {
    hasSubscription: boolean,
    hasCoachingCenter: boolean
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}
export const getCurrentUser = async (): Promise<JwtPayload | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    const result = jwtUtils.verifyToken<JwtPayload>(
        token,
        process.env.NEXT_PUBLIC_JWT_SCRECT!
    );

    if (!result.success) return null;

    return result.data as JwtPayload;
};
export const logout = async (): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
};

export const getNewAccessToken = async (refreshToken: string): Promise<boolean> => {
    try {

        const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}`
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            return false;
        };

        const data = await response.json();
        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if (!accessToken || !newRefreshToken || !token) {
            return false;
        }

        setTokenCookie("accessToken", accessToken);
        setTokenCookie("refreshToken", newRefreshToken);
        setTokenCookie("better-auth.session_token", token)

        return true;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
    }

};

export const isTokenExpiredSoon = async (token: string, thresholdInSeconds: number = 60): Promise<boolean> => {
    const remainingTime = await getTokenRemaining(token);
    return remainingTime > 0 && remainingTime < thresholdInSeconds;
};

export const isTokenExpired = async (token: string): Promise<boolean> => {
    const remainingTime = await getTokenRemaining(token);
    return remainingTime === 0;
}
export const isAuthenticated = async (): Promise<boolean> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) return false;
    return !await isTokenExpired(token);
}

export const getOnboardStatus = async () => {
    try {
        const res = await httpClient.get("/subscription-plan/onboarding-status");
        return res.data as ICheckOwnerSubscription
    } catch (error) {
        console.error(error);
        handleAxiosError(error)
    }
}