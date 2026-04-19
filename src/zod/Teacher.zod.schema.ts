import { z } from "zod";

export const GenderEnum = z.enum(["MALE", "FEMALE"]);
export const TeacherStatusEnum = z.enum(["ACTIVE", "INACTIVE", "ON_LEAVE"]);

export const teacherCreateSchema = z.object({
    subjectIds: z
        .array(z.string())
        .min(1, "At least one subject is required"),

    teacherData: z.object({
        name: z.string("Name is required"),
        email: z.string("Invalid email"),

        education: z.string("Education is required").optional(),
        address: z.string("Address is required").optional(),

        phone: z.string("Phone must be at least 10 digits"),

        image: z.union([
            z.instanceof(File),
            z.string().min(1)
        ]).optional(),

        experience: z
            .number()
            .min(0, "Experience must be a positive number"),

        gender: GenderEnum.optional(),

        dateOfBirth: z.string().transform((val) => (val ? new Date(val) : undefined)),
    }),
});
export const teacherUpdateSchema = z.object({
    id: z.string(),
    subjectIds: z
        .array(z.string())
        .min(1, "At least one subject is required")
        .optional(),
    teacherData: z.object({
        name: z.string().min(1, "Name is required"),
        education: z.string().min(1, "Education is required"),
        address: z.string().min(1, "Address is required").optional(),
        image: z.string().url("Image must be a valid URL").optional(),
        experience: z.number().min(0, "Experience must be positive").optional(),
    })

});