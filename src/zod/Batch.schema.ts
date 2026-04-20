
import { z } from "zod"
export const FeeType = {
  MONTHLY: 'MONTHLY',
  COURSE: 'COURSE',
  ADMISSION: 'ADMISSION',
  EXAM: 'EXAM'
} as const
export const createBatchSchema = z.object({
    amount: z
        .number()
        .min(1, "Amount must be greater than 0"),

     feeType: z.enum([FeeType.ADMISSION, FeeType.COURSE, FeeType.EXAM, FeeType.MONTHLY]).optional(),

    teacherIds: z
        .array(z.string())
        .min(1, "At least one teacher is required"),

    batchData: z.object({
        batchName: z
            .string()
            .min(1, "Batch name is required"),

        batchCode: z
            .string()
            .optional(),

        max_students: z
            .number()
            .min(1, "Max students must be at least 1"),

        startTime: z.string(),

        endTime: z.string(),

        daysOfWeek: z.array(
            z.enum([
                "SUNDAY",
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY"
            ])
        ).optional(),


    })
}).refine(
    (data) => data.batchData.endTime > data.batchData.startTime,
    {
        message: "End time must be greater than start time",
        path: ["batchData", "endTime"],
    }
)