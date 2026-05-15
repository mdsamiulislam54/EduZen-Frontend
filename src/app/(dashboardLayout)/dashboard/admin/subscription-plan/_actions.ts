"use server"
import { httpClient } from "@/lib/httpClient/axios"
import { TSubscriptionPlan, TUpdateSubscriptionPlan } from "@/zod/subscription.zod.schema"

export const getAllSubscriptionPlans = async (): Promise<TSubscriptionPlan[]> => {
    try {
        const response = await httpClient.get("/subscription-plan", {
        })
        return response.data as TSubscriptionPlan[]
    } catch (error) {
        console.error("Error fetching subscription plans:", error)
        throw error
    }
}

export const getSubscriptionPlanById = async (id: string) => {
    try {
        const response = await httpClient.get(`/subscription-plan/${id}`, {
        })
        return response.data as TSubscriptionPlan
    } catch (error) {
        console.error("Error fetching subscription plans:", error)
        throw error
    }
}

export const updateSubscriptionPlan = async (planId: string, data: TUpdateSubscriptionPlan): Promise<TSubscriptionPlan> => {
    try {
        const response = await httpClient.patch(`/subscription-plan/${planId}`, data)
        return response.data as TSubscriptionPlan
    } catch (error) {
        console.error("Error updating subscription plan:", error)
        throw error
    }
}

export const deleteSubscriptionPlan = async (planId: string): Promise<TSubscriptionPlan> => {
    try {
        const response = await httpClient.delete(`/subscription-plan/${planId}`)
        return response.data as TSubscriptionPlan
    } catch (error) {
        console.error("Error deleting subscription plan:", error)
        throw error
    }
}