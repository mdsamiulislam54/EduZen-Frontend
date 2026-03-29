// src/constants/role.ts

export const USER_ROLE = {
  ADMIN: "ADMIN",
  OWNER: "OWNER",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
} as const;

export type UserRole = keyof typeof USER_ROLE;