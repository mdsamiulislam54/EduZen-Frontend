"use server";

import { handleError } from "@/lib/error/handleError";
import { httpClient } from "@/lib/httpClient/axios";
import { ISubject } from "@/types/subject.type";

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