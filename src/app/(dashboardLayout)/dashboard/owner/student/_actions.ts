"use server"

import { httpClient } from "@/lib/httpClient/axios";
import { ICreateStudent, IStudentResponse, IStudentUpdate, SingleStudent } from "@/types/student.type";
import { AxiosError } from "axios";

export const createStudent = async (payload: ICreateStudent) => {
    try {
        const response = await httpClient.post("/student", payload);
        return response.data;
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

export const getAllStudents = async (query?: string) => {
    try {
        const url = query ? `/student?${query}` : "/student";
        const response = await httpClient.get<IStudentResponse>(url);
        return {
            data: response.data.data ?? [],
            meta: response.data.meta ?? {
                totalPages: 0,
                page: 1,
                limit: 10,
                total: 0,
            },
        }
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;

    }
}

export const getStudentById = async (id: string) => {
    try {
        const response = await httpClient.get(`/student/${id}`);
        return response.data as SingleStudent
    } catch (error) {
        console.error("Error fetching student:", error);
        throw error;
    }
}

export const updateStudent = async (id: string, payload: Partial<IStudentUpdate>) => {
    try {
        const response = await httpClient.patch(`/student/${id}`, payload);
        return response.data;
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

export const deleteStudent = async (id: string) => {
    try {
        const response = await httpClient.patch(`/student/delete/${id}`, {});
        return response.data;
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


