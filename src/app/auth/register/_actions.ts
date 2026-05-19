"use server"
import { setCookie } from "@/lib/cookies/cookie";
import { setTokenCookie } from "@/lib/cookies/token";
import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios";
import { IRegisterApiResponse } from "@/types/auth.types";
import { IRegister, } from "@/zod/auth.zod";

export const register = async (payload: IRegister) => {
   
    try {
        const user = await httpClient.post<IRegisterApiResponse>("/auth/register", payload);
        const { accessToken, refreshToken, token } = user.data;
        await setTokenCookie("accessToken", accessToken!);
        await setTokenCookie("refreshToken", refreshToken!);
        await setCookie("better-auth.session_token", token!, 60 * 60 * 24);
        return {
            success: true,
            message: user.message || "Login Failed"
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

