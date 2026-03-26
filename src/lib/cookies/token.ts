"use server"
import jwt from "jsonwebtoken"
import { handleError } from "../error/handleError"
import { setCookie } from "./cookie"
const jwtSecret = process.env.JWT_SECRET
const getTokenRemaining = (token: string): number => {
    if (!token) {
        return 0
    };

    try {
        const decoded = jwt.verify(token, jwtSecret!) as { exp: number }
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


export const setTokenCookie = async (token: string, name: string) => {
    const maxAge = getTokenRemaining(token);
    await setCookie(name, token, maxAge)
}