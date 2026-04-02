"use server"
import jwt from "jsonwebtoken"
import { handleError } from "../error/handleError"
import { setCookie } from "./cookie"
export const getTokenRemaining = async (token: string): Promise<number> => {
    if (!token) {
        return 0
    };

    try {

        const decoded = jwt.decode(token!) as { exp: number }
        if (decoded && !decoded.exp) {
            return 0
        }
        const now = Math.floor(Date.now() / 1000)
        return decoded.exp - now

    } catch (error) {
        const message = handleError(error);
        console.log({
            message,
            error
        })
        return 0
    }
}


export const setTokenCookie = async (name: string, token: string) => {
    const maxAge = await getTokenRemaining(token);
    await setCookie(name, token, maxAge)
}