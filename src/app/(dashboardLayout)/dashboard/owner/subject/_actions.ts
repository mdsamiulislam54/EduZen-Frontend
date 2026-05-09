"use server"

import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios"

import { ISubject, SubjectResponse } from "@/types/subject.type"

export const createSubject = async (data: Partial<ISubject>) => {
  try {
    const res = await httpClient.post<{ message?: string }>("/subject", data);
    return {
      success: true,
      message: res.data.message || "Subject created successfully",
    };

  } catch (error) {
    console.error("Create subject error:", error);

    const message = handleError(error);

    return {
      success: false,
      message,
    };
  }
};
export const getAllSubject = async (query?: string) => {
    try {
        const res = await httpClient.get<SubjectResponse>(
            `/subject?${query}`
        );
     
        return {
            data: res.data.data,
            meta: res.data.meta,
        };
    } catch (error) {
        console.error("Error fetching subject data:", error);

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
};


export const updateSubject = async (data: Partial<ISubject>, id: string) => {
    try {
        const res = await httpClient.patch<{ message?: string }>(`/subject/${id}`, data)
        return {
            success: true,
            message: res.data.message || "Subject Update successfully",
        };
    } catch (error) {
        console.error("Error fetching subject update:", error);
        return []
    }
}
export const deleteSubject = async (id: string) => {
    try {
        const res = await httpClient.delete<{ message?: string }>(`/subject/${id}`,)
        return {
            success: true,
            message: res.data.message || "Subject Delete successfully",
        };
    } catch (error) {
        console.error("Error fetching subject Delete:", error);
        return []
    }
}