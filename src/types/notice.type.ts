// notice.interface.ts

import { Meta } from "./subject.type";

export interface ICreateNotice {
    title: string;
    description: string;

    type?: "GENERAL" | "EXAM" | "HOLIDAY" | "PAYMENT" | "CLASS";

    priority?: "LOW" | "NORMAL" | "HIGH" | "URGENT";

    coachingCenterId: string;

    createdBy?: string;
}

export interface IUpdateNotice {
    title?: string;
    description?: string;

    type?: "GENERAL" | "EXAM" | "HOLIDAY" | "PAYMENT" | "CLASS";

    priority?: "LOW" | "NORMAL" | "HIGH" | "URGENT";

    isPinned?: boolean;

    isPublished?: boolean;
}

export interface INotice {
    title: string;
    description: string;
    type?: "GENERAL" | "EXAM" | "HOLIDAY" | "PAYMENT" | "CLASS";
    priority?: "LOW" | "NORMAL" | "HIGH" | "URGENT";
    coachingCenterId: string;
    isPublished: boolean,
    createdAt: string,
    updatedAt: string
}

export interface INoticeResponse {
    data: INotice[],
    meta: Meta
}