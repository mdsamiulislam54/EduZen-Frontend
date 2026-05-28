"use server"

import { httpClient } from "@/lib/httpClient/axios";
import { handleAxiosError } from "@/lib/utils";

type PaymentMethod = "CASH" | "BKASH" | "NAGAD" | "BANK";
type PaymentStatus = "PENDING" | "PARTIAL" | "PAID" | "OVERDUE" | "FAILED";
type FeeType = "MONTHLY" | "COURSE" | "ADMISSION" | "EXAM";
export interface IStudentPaymentAction {
    id: string;
    studentId: string;
    batchFeeId: string;
    amount: number;
    paidAmount: number;
    paymentMethod: PaymentMethod;
    dueAmount: number;
    paymentStatus: PaymentStatus;
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
    }
    studentFees: IStudentFee[]
};

interface IProcessPaymentPayload {
    studentId: string;
    paymentMethod: string;
    fees: {
        batchFeeId: string;
        amount: number;
        paidAmount: number;
        dueAmount: number;
    }[]
}


export interface IStudentFee {
    id: string
    amount: number
    paidAmount: number
    dueAmount: number

    paymentStatus: "PENDING" | "PARTIAL" | "PAID"
    paymentMethod: "CASH" | "ONLINE" | "BANK"

    studentId: string
    batchFeeId: string

    batchFee: {
        id: string
        batchId: string

        amount: number
        feeType: "COURSE" | "MONTHLY" | "EXAM"

        status: boolean
        isDeleted: boolean

        createdAt: string
        updatedAt: string
    }
}
export const getStudentRollNumber = async (studentRoll?: string) => {
    try {
        const res = await httpClient.get(`/coaching/${studentRoll}`)
        return res.data as IStudentPaymentAction
    } catch (error) {
        console.log(error);
        handleAxiosError(error)
    }
}

export const processStudentPayment = async (payload: IProcessPaymentPayload) => {
    try {
        const res = await httpClient.post(`/coaching/paymentFee`, payload)
        return res.data
    } catch (error) {
        console.log(error);
        handleAxiosError(error)
    }
}