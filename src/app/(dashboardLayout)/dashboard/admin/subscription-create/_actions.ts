import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios"
import {  TSubscriptionPlan } from "@/zod/subscription.zod.schema"

export const createSubscriptionPlan = async (data: TSubscriptionPlan) => {

    try {
        const response = await httpClient.post<TSubscriptionPlan>("/subscription-plan", data);
        return response.data;
    } catch (error) {
        const message = handleError(error);
        console.error("Error creating subscription plan:", message);
        throw new Error("Failed to create subscription plan", { cause: message });
    }
}