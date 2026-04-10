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
        const user = await httpClient.post<ILoginApiResponse>("/auth/login", payload);
        console.log(user)
        if (!user.success) {
           throw new Error ("Invalid credentials")
        }
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

