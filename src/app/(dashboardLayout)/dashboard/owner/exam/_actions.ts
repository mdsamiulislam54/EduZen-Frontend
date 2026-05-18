"use server"

import { httpClient } from "@/lib/httpClient/axios"
import { handleAxiosError } from "@/lib/utils";
import { Meta } from "@/types/subject.type";
import { AxiosError } from "axios";

export type ExamStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED"
export interface IExam {
    id: string,
    batchId: string,
    subjectId: string,
    name: string,
    totalMarks: number,
    passMarks: number,
    examDate: string,
    startTime: string,
    endTime: string,
    status: ExamStatus
}
export interface ICreateExam {
    id?: string
    batchId: string,
    subjectId: string,
    name: string,
    totalMarks: number,
    passMarks: number,
    examDate: string,
    startTime: string,
    endTime: string,
    status: ExamStatus
}
export interface IUpdateExam {
    batchId?: string,
    subjectId?: string,
    name?: string,
    totalMarks?: number,
    passMarks?: number,
    examDate?: string,
    startTime?: string,
    endTime?: string,
    status?: ExamStatus
}
interface IExamResponse {
    data: IExam[],
    meta: Meta
}
export const createExam = async (payload: ICreateExam) => {
    try {
        const res = await httpClient.post(`/exam`, payload);
        console.log({res})
        return res.data;
    } catch (error) {
        console.log(error)
        handleAxiosError(error)

    }
}

export const getAllExam = async (query?: string) => {
    try {
    
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

export const updateExam = async (id: string, payload: Partial<IUpdateExam>) => {
    try {
        const res = await httpClient.patch(`/exam/${id}`, payload);
        return res.data;
    } catch (error) {
        console.log(error)
        handleAxiosError(error)

    }
}

export const deleteExamById = async (id: string) => {
    try {
        const res = await httpClient.delete(`/exam/${id}`);
        return res.data

    } catch (error) {
        console.log(error)
         handleAxiosError(error)

    }
}