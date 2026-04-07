"use server"
import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios"
import {  TSubscriptionPlan, TUpdateSubscriptionPlan } from "@/zod/subscription.zod.schema"

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

export const updateSubscriptionPlan = async (planId: string, data: Partial<TUpdateSubscriptionPlan>): Promise<TUpdateSubscriptionPlan> => {
    try {
        const response = await httpClient.patch(`/subscription-plan/${planId}`, data)   
        return response.data as TUpdateSubscriptionPlan
    } catch (error) {
        const message = handleError(error);
        console.error("Error updating subscription plan:", message);
        throw new Error("Failed to update subscription plan", { cause: message });
    }
}

export const deleteSubscriptionPlan = async (planId: string): Promise<TSubscriptionPlan> => {
    try {
        const response = await httpClient.delete(`/subscription-plan/${planId}`)
        return response.data as TSubscriptionPlan
    } catch (error) {
        const message = handleError(error);
        console.error("Error deleting subscription plan:", message);
        throw new Error("Failed to delete subscription plan", { cause: message });
    }
}