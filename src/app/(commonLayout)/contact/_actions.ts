"use server";

import { httpClient } from "@/lib/httpClient/axios";
import { handleAxiosError } from "@/lib/utils";
import { meta } from "zod/v4/core";


export type ContactStatusType = "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";
export interface ContactMessage {
    fullName: string;
    email: string;
    message: string;
    phone?: string;
    subject: string;
    status?: ContactStatusType;
    source?: string;
};

export interface ContactMessagesResult {
    data: {
        id: string;
        email: string;
        status: ContactStatusType;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        phone: string | null;
        subject: string;
        message: string;
        source: string | null;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export const createContactMessage = async (data:ContactMessage) =>{
    try {
        const res = await httpClient.post("/contact", data);
        return res.data;
    } catch (error) {
        console.error("Error creating contact message:", error);
        handleAxiosError(error);
    }
};

export const getContactMessages = async () => {
    try {
        const res = await httpClient.get<ContactMessagesResult>("/contact");
        return {
            data: res.data.data,
            meta: res.data.meta,
        }
    } catch (error) {
        console.error("Error fetching contact messages:", error);
        handleAxiosError(error);
    }
};