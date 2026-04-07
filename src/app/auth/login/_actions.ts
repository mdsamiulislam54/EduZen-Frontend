"use server"
import { setCookie } from "@/lib/cookies/cookie";
import { setTokenCookie } from "@/lib/cookies/token";
import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios";
import { ILoginApiResponse } from "@/types/auth.types";
import { ILogin, loginZodSchema } from "@/zod/auth.zod";

export const loginAction = async (payload: ILogin) => {
    const parsedPayload = loginZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const errorMessage = parsedPayload.error.issues[0].message || "Invalid Input";
        return {
            success: false,
            message: errorMessage
        }
    }
    try {
        const response = await httpClient.post<ILoginApiResponse>("/auth/login", payload);
        const { accessToken, refreshToken, token } = response.data;
        await setTokenCookie("accessToken", accessToken!);
        await setTokenCookie("refreshToken", refreshToken!);
        await setCookie("better-auth.session_token", token!, 60*60*24);
        return {
            success: false,
            message: "Login successful"
        }
    } catch (error) {
       console.error("Login error:", error);
        const errorMessage = handleError(error);
        return {
            success: false,
            message: errorMessage
        }
    }
}