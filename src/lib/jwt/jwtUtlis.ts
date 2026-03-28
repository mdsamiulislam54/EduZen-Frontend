import jwt, { JwtPayload as JwtPayloadBase } from "jsonwebtoken";

export type JwtPayload = {
  userId: string;
  role: "ADMIN" | "OWNER" | "TEACHER" | "STUDENT";
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  isDeleted: boolean;
  emailVerified: boolean;
  hasSubscription?: boolean;
};


export type JwtVerifySuccess<T> = { success: true; data: T };
export type JwtVerifyFail = { success: false; error: string };

export const verifyToken = <T>(token: string, secret: string): JwtVerifySuccess<T> | JwtVerifyFail => {
  try {
    const decoded = jwt.verify(token, secret) as T;
    return { success: true, data: decoded };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
};


export const decodeToken = <T = JwtPayload>(token: string): T | null => {
  const decoded = jwt.decode(token);
  if (!decoded) return null;
  return decoded as T;
};


export const jwtUtils = {
  verifyToken,
  decodeToken,
};