import { Meta } from "./subject.type";


 export enum BatchStatus {
    ACTIVE,
    INACTIVE,
    COMPLETED
}

 export enum FeeType {
    MONTHLY,
    COURSE,
    ADMISSION,
    EXAM
}

export enum DaysOfWeek {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}
export interface ICreateBatchPayload {
    amount: number;
    feeType: FeeType;
    teacherIds: string[];
    batchData: {
        batchName: string;
        batchCode?: string;
        max_students: number;
        startTime: string;
        endTime: string;
        daysOfWeek: DayOfWeek[];
        status: BatchStatus
    }
}
export interface IBatchUpdate {
    amount?: number;
    feeType?: FeeType;
    teacherIds?: string[];
    batchData: {
        batchName?: string;
        batchCode?: string;
        max_students?: number;
        startTime?: Date;
        endTime?: Date;
        daysOfWeek:DayOfWeek[];
        status?: BatchStatus
    }
}
export enum DayOfWeek {
    SUNDAY = "SUNDAY",
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
}

export interface IBatch {
    id: string;
    coachingCenterId: string;
    batchName: string;
    batchCode: string | null;
    max_students: number;
    startTime: Date;
    endTime: Date;
    daysOfWeek: DayOfWeek[];
    status: BatchStatus;
    isDeleted: boolean;
    teacherIds?: {
        teacherId:string
    }[];
    batchFee: {
        amount: number
    }[]
}



export interface IBatchResponses {
    data: IBatch[];
    meta?: Meta;
}