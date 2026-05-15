"use server"

import { httpClient } from "@/lib/httpClient/axios"
import { handleAxiosError } from "@/lib/utils"
import { IStudentFee } from "@/types/student.type"

export const getStudentFee = async () => {
    try {
        const res = await httpClient.get("/student/student-fee")
        return res.data as IStudentFee

    } catch (error) {
        handleAxiosError(error)
    }
}