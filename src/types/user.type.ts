export type Role = "ADMIN" | "OWNER" | "TEACHER" | "STUDENT";

export type IUser = {
    userId: string;
    role: Role;
    name: string;
    email: string;
};