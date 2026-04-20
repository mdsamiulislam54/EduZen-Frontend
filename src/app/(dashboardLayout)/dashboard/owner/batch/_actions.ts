"use server"

import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios";
import { IBatch, IBatchResponses, IBatchUpdate, ICreateBatchPayload } from "@/types/batch.type"
export interface IBatchResponse {
    success: boolean,
    message: string
}

export const getAllBatch = async () => {
    try {
        const res = await httpClient.get<IBatchResponses>("/batch",)
        return {
            data: res.data.data,
            meta: res.data.meta,
        };
    } catch (error) {
        console.log("Batch create failed", error);

        return {
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 0,
            },
        };
    }
}
export const createBatch = async (payload: ICreateBatchPayload) => {
    try {
        const res = await httpClient.post("/batch", payload)
        console.log("batch, ", res.data)
        return await res.data as IBatchResponse
    } catch (error) {
        console.log("Batch create failed", error);
        const message = handleError(error)
        throw new Error(message || "Batch create failed")
    }
}
export const updateBatch = async (payload: Partial<IBatchUpdate>, id: string) => {
    try {
        const res = await httpClient.patch(`/batch/${id}`, payload)
        return await res.data as IBatchResponse
    } catch (error) {
        console.log("Batch update failed", error);
        const message = handleError(error)
        throw new Error(message)
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