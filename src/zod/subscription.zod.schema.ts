import { z } from "zod";

export const subscriptionPlanSchema = z.object({
  name: z.string("Plan name is required").min(1, "Plan name cannot be empty"),
  price: z.number("Price is required").min(1, "Price must be at least 1"),
  duration_days: z.number("Duration is required").min(1, "Duration must be at least 1 day"),
  max_students: z.number("Maximum students is required").min(1, "There must be at least 1 student allowed"),
  max_teachers: z.number("Maximum teachers is required").min(1, "There must be at least 1 teacher allowed"),
  max_batches: z.number("Maximum batches is required").min(1, "There must be at least 1 batch allowed"),
  has_attendance: z.boolean("Attendance feature is required").optional(),
  has_sms: z.boolean("SMS feature is required").optional(),
  has_exam: z.boolean("Exam feature is required").optional(),
  features: z.array(z.string()).default([]),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});
export const updateSubscriptionPlanSchema = z.object({
  name: z.string("Plan name is required").min(1, "Plan name cannot be empty").optional(),
  price: z.number("Price is required").min(1, "Price must be at least 1").optional(),
  duration_days: z.number("Duration is required").min(1, "Duration must be at least 1 day").optional(),
  max_students: z.number("Maximum students is required").min(1, "There must be at least 1 student allowed").optional(),
  max_teachers: z.number("Maximum teachers is required").min(1, "There must be at least 1 teacher allowed").optional(),
  max_batches: z.number("Maximum batches is required").min(1, "There must be at least 1 batch allowed").optional(),
  has_attendance: z.boolean().optional(),
  has_sms: z.boolean().optional(),
  has_exam: z.boolean().optional(),
  features: z.array(z.string()).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type TSubscriptionPlan = {
  id?: string,
  name: string;
  price: number;
  duration_days: number;
  max_students: number;
  max_teachers: number;
  max_batches: number;
  has_attendance?: boolean;
  has_sms?: boolean;
  has_exam?: boolean;
  features: string[]
  status?: "ACTIVE" | "INACTIVE";
};
export type TUpdateSubscriptionPlan = {
  id?: string,
  name?: string;
  price?: number;
  duration_days?: number;
  max_students?: number;
  max_teachers?: number;
  max_batches?: number;
  has_attendance?: boolean;
  has_sms?: boolean;
  has_exam?: boolean;
  features?: string[] | undefined;
  status?: "ACTIVE" | "INACTIVE";
};
