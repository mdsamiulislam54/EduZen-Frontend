"use server"

import { httpClient } from "@/lib/httpClient/axios";
import { handleAxiosError } from "@/lib/utils";

export interface ICoachingCenter {
    id: string;
    name: string;
    email: string;
}

export interface ISubscriptionPlan {
    id: string;
    name: string;
    price: number;
    features: string[];
}

export interface ISubscription {
    id: string;
    status: "ACTIVE" | "INACTIVE" | "TRIAL" | "EXPIRED";
    startDate: string;
    endDate: string;
    plan: ISubscriptionPlan;
}

export interface IOwnerSubscriptionResponse {
    coachingCenter: ICoachingCenter;
    subscription: ISubscription | null;
}


export const getOwnerSubscription = async () => {
    try {
        const res = await httpClient.get("/coaching/subscription");
        return res.data as IOwnerSubscriptionResponse
    } catch (error) {
        console.log(error)
        handleAxiosError(error)
    }
}