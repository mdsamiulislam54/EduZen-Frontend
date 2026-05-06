
import { Meta } from "./subject.type";
export enum StudentStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED"
}

export type GenderType = "MALE" | "FEMALE" | "OTHER";


export enum BloodGroup {
    A_POSITIVE = 'A_POSITIVE',
    A_NEGATIVE = 'A_NEGATIVE',
    B_POSITIVE = 'B_POSITIVE',
    B_NEGATIVE = 'B_NEGATIVE',
    AB_POSITIVE = 'AB_POSITIVE',
    AB_NEGATIVE = 'AB_NEGATIVE',
    O_POSITIVE = 'O_POSITIVE',
    O_NEGATIVE = 'O_NEGATIVE'
}

export interface ICreateStudent {
    batchId: string[];
    studentData: {
        name: string;
        fatherName: string;
        matherName: string;
        age: number;
        address: string;
        email: string;
        phone: string;
        image: File | null
        dateOfBirth: string | null;
        gender: GenderType
        bloodGroup: BloodGroup
    }
}
export interface IStudentUpdate {
    batchIds: string[];
    studentData: {
        status?: StudentStatus;
        fatherName?: string;
        matherName?: string;
        age?: number;
        address?: string;

        name?: string;
        email?: string;
        phone?: string;
        image?: File | null
        dateOfBirth?: Date | null;
        gender?: GenderType
        bloodGroup?: BloodGroup
    }
}
export interface IStudent {
    id: string;
    status: StudentStatus;
    isDeleted: boolean;
    name: string;
    email: string;
    image: string;
    fatherName: string,
    matherName: string,
    age: number,
    address: string,
    emailVerified: boolean;
    needPasswordChange: boolean;
    dateOfBirth: Date | null;
    deletedAt: Date | null;
    hasSubscription: boolean;
    teamPassword: string | null;
    phone: string;
    gender?: GenderType;
    bloodGroup: BloodGroup
    batchStudents?: {
        batch: {
            id: string;
        }
    }[]
}

export interface IStudentResponse {
    data: IStudent[];
    meta?: Meta;
}

export interface StudentFee {
    id: string;
    amount: number;
    paidAmount: number;
    dueAmount: number;
    paymentStatus: string;
}

export interface BatchStudent {
    batch: {
        batchName: string
        status: string
    }
    id: string;
    batchId: string;
    status: string;
    batchName: string
}

export interface CoachingCenter {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface SingleStudent {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    image: string | null;
    rollNumber: string;
    gender: string;
    bloodGroup: string | null;
    dateOfBirth: string;
    status: string;
    coachingCenter?: CoachingCenter;
    studentFees: StudentFee[];
    batchStudents: BatchStudent[];
}
