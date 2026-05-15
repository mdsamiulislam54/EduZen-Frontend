"use server"

import { httpClient } from "@/lib/httpClient/axios"
import { handleAxiosError } from "@/lib/utils";
import { AxiosError } from "axios";

export interface ICreatePayment {
    subscriptionId: string
}

interface ICheckout{
    checkoutUrl:string
}
export const createPayment = async (payload: ICreatePayment) => {
    try {
        const res = await httpClient.post('/subscription-plan/subscription-buy', payload);
        return res.data as ICheckout
    } catch (error) {
      
        handleAxiosError(error)
    }
}