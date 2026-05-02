"use server"

import { httpClient } from "@/lib/httpClient/axios"
import { Meta } from "@/types/subject.type";
import { AxiosError } from "axios";

export type ExamStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED"
export interface IExam {
    id: string,
    batchId: string,
    subjectsId: string,
    name: string,
    totalMarks: number,
    passMarks: number,
    examDate: string,
    startTime: string,
    endTime: string,
    status: ExamStatus
}
export interface ICreateExam {
    batchId: string,
    subjectsId: string,
    name: string,
    totalMarks: number,
    passMarks: number,
    examDate: string,
    startTime: string,
    endTime: string
}
interface IExamResponse {
    data: IExam[],
    meta: Meta
}
export const createExam = async (payload: ICreateExam) => {
    try {
        const res = await httpClient.post(`/exam`, payload);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const message = error.response?.data.message || "something is wrong!"
            throw new Error(message)
        }

        throw error

    }
}

export const getAllExam = async (query?: string) => {
    try {
        console.log({query})
        const res = await httpClient.get<IExamResponse>(query ? `/exam?${query}` : `/exam`);
        return {
            data: res?.data?.data,
            meta: res.data.meta
        }

    } catch (error) {
        console.error(error)
        return {
            data: [],
            meta: {
                page: 1,
                total: 0,
                totalPages: 1,
                limit: 10,
            },
        };
    }
}