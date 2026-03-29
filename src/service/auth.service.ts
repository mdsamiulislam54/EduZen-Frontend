"use server";

import { cookies } from "next/headers";
import { jwtUtils } from "@/lib/jwt/jwtUtlis";

export type Role = "ADMIN" | "OWNER" | "TEACHER" | "STUDENT";

export type JwtPayload = {
    userId: string;
    role: Role;
    name: string;
    email: string;
};

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