"use server"
import { setTokenCookie } from "@/lib/cookies/token";
import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios";
import { ILoginApiResponse } from "@/types/auth.types";
import { ILogin, loginZodSchema } from "@/zod/auth.zod";
import { redirect } from "next/navigation";

export const loginAction = async (payload: ILogin): Promise<ILoginApiResponse> => {
    const parsedPayload = loginZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const errorMessage = parsedPayload.error.issues[0].message || "Invalid Input";
        return {
            success: false,
            message: errorMessage
        }
    }
    try {
        const response = await httpClient.post<ILoginApiResponse>("/login", payload);
        const { accessToken, refreshToken, token } = response.data;
        await setTokenCookie("accessToken", accessToken!);
        await setTokenCookie("refreshToken", refreshToken!);
        await setTokenCookie("better-auth.session_token", token!);
        redirect("/dashboard")
    } catch (error) {
        const errorMessage = handleError(error);
        console.log(error)
        throw new Error(errorMessage);
    }
}