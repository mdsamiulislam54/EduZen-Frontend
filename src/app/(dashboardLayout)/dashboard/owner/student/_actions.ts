"use server"

import { httpClient } from "@/lib/httpClient/axios";
import { ICreateStudent, IStudentResponse, IStudentUpdate, SingleStudent } from "@/types/student.type";

export const createStudent = async (payload: ICreateStudent) => {
    try {
        const response = await httpClient.post("/student", payload);
        return response.data;
    } catch (error) {
        console.error("Error creating student:", error);
        throw error;
    }
};

export const getAllStudents = async (query?: string) => {
    try {
        console.log("Fetching students with query:", query);
        const response = await httpClient.get<IStudentResponse>(query ? `/student?${query}` : "/student");
        return {
            data: response.data.data,
            meta: response.data.meta
        }
    } catch (error) {
        console.error("Error fetching students:", error);
        return {
            data: [],
            meta: null
        };

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
        console.error("Error updating student:", error);
        throw error;
    }
}

export const deleteStudent = async (id: string) => {
    try {
        const response = await httpClient.patch(`/student/delete/${id}`,{});
        return response.data;
    } catch (error) {
        console.error("Error delete student:", error);
        throw error;
    }
}


