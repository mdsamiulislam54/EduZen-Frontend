"use server"

import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios";
import { IBatch, ICreateBatchPayload } from "@/types/batch.type"
export interface IBatchResponse {
    success: boolean,
    message: string
}

export const getAllBatch = async () => {
    try {
        const res = await httpClient.get("/batch",)
        return await res.data as IBatch[]
    } catch (error) {
        console.log("Batch create failed", error);
       
        return []
    }
}
export const createBatch = async (payload: ICreateBatchPayload) => {
    try {
        const res = await httpClient.post("/batch", payload)
        return await res.data as IBatchResponse
    } catch (error) {
        console.log("Batch create failed", error);
        const message = handleError(error)
        return {
            success: false,
            message: message || "Batch create failed"
        }
    }
}
export const updateBatch = async (payload: Partial<ICreateBatchPayload>, id: string) => {
    try {
        const res = await httpClient.patch(`/batch/${id}`, payload)
        return await res.data as IBatchResponse
    } catch (error) {
        console.log("Batch update failed", error);
        const message = handleError(error)
        return {
            success: false,
            message: message || "Batch update failed"
        }
    }
}
export const deleteBatch = async (id: string) => {
    try {
        const res = await httpClient.patch(`/batch/delete/${id}`, {})
        return await res.data as IBatchResponse
    } catch (error) {
        console.log("Batch Delete failed", error);
        const message = handleError(error)
        return {
            success: false,
            message: message || "Batch Delete failed"
        }
    }
}