import { z } from "zod";

export const subjectZodSchema = z.object({
    name: z
        .string()
        .min(2, "Subject name must be at least 2 characters"),

});

export type SubjectFormValues = z.infer<typeof subjectZodSchema>;