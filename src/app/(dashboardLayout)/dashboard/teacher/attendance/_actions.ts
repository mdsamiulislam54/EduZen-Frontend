"use server"
import { AxiosError } from "axios";
import { httpClient } from "@/lib/httpClient/axios"
import { Meta } from "@/types/subject.type"
import { IStudentAttendanceResponse } from "@/types/attendance.type";
export interface IAttendanceStudent {
    data: {
        name: string,
        id: string,
        rollNumber: string
    }[],
    meta: Meta
}
type AttendanceStatus = "PRESENT" | "ABSENT" | null;
export interface ICreateAttendance {
    batchId: string;
    studentId: string;
    date: Date;
    status: AttendanceStatus
    markBy: string
    remarks?: string
}[]






export const createAttendance = async (payload: ICreateAttendance[]) => {
    try {
        const res = await httpClient.post("/attendance", payload);
        return res.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const message =
                error.response?.data?.message ||
                "Attendance already exists for this date";

            console.log("Backend Error:", error.response?.data);

            throw new Error(message);
        }

        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Something went wrong");
    }
};
export const getAllStudentAttendance = async (id: string, query?: string) => {
    try {
        const res = await httpClient.get<IAttendanceStudent>(query ? `/attendance/student/${id}?{query}` : `/attendance/student/${id}`);


        return {
            data: res.data.data,
            meta: res.data.meta
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
            throw new Error(error?.message)
        }
        throw new Error("Something went wrong");
    }
};
export const getAttendanceByStudentId = async (studentId: string, query?: string) => {
    try {
        const url = query ? `/attendance/${studentId}?${query}` : `/attendance/${studentId}`
        const res = await httpClient.get<IStudentAttendanceResponse>(url);

        return {
            data: res?.data?.data,
            meta: res?.data?.meta
        }


    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
            throw new Error(error?.message)
        }
        throw new Error("Something went wrong");
    }
}


