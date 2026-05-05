"use server"

import { httpClient } from "@/lib/httpClient/axios";
import { Meta } from "@/types/subject.type";
import { AxiosError } from "axios";

export interface IMark {
    mark: number;
    id: string;
    studentId: string;
    examId: string;
}
export interface IMarkCreate {
    examId: string;
    marks: {
        studentId: string;
        mark: number;
    }[];
}

export interface IStudentList {
    id: string,
    name: string,
    rollNumber: string,
    image: string | null
}

export interface IMarkResponse {
    data: IStudentList[]
    meta: Meta
}
export const createMarks = async (payload: IMarkCreate) => {
    try {
        const res = await httpClient.post("/mark", payload);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const message =
                error.response?.data?.message || "something went wrong"

            console.log("Backend Error:", error.response?.data);

            throw new Error(message);
        }

        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Something went wrong");
    }
};

export const getStudentByExamId = async (examId: string, query?: string) => {
    try {
        const res = await httpClient.get<IMarkResponse>(`/mark/student/${examId}?${query}`);
        return {
            data: res?.data?.data,
            meta: res?.data?.meta
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            const message =
                error.response?.data?.message || "something went wrong"

            console.log("Backend Error:", error.response?.data);

            throw new Error(message);
        }

        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Something went wrong");
    }
}