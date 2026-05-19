import { z } from "zod";

export const loginZodSchema = z.object({
    email: z
        .string({ error: "Email is required" })
        .email("Invalid email address"),

    password: z
        .string({ error: "Password is required" })
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be at most 32 characters"),
});

export type ILogin = z.infer<typeof loginZodSchema>




export const RegisterZodSchema = z.object({
    name:z.string().min(5,"Name is required"),
    email: z
        .string({ error: "Email is required" })
        .email("Invalid email address"),

    password: z
        .string({ error: "Password is required" })
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be at most 32 characters"),
});

export type IRegister = z.infer<typeof RegisterZodSchema>