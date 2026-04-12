

enum BatchStatus {
    ACTIVE,
    INACTIVE,
    COMPLETED
}

enum FeeType {
    MONTHLY,
    COURSE,
    ADMISSION,
    EXAM
}

export interface ICreateBatchPayload {
    amount: number;
    feeType: FeeType;
    teacherIds: string[];
    batchData: {
        batchName: string;
        batchCode?: string;
        max_students: number;
        startTime: Date;
        endTime: Date;
        daysOfWeek: (
            | "SUNDAY"
            | "MONDAY"
            | "TUESDAY"
            | "WEDNESDAY"
            | "THURSDAY"
            | "FRIDAY"
            | "SATURDAY"
        )[];
        status: BatchStatus
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
    daysOfWeek: DayOfWeek;
    status: BatchStatus;
    isDeleted: boolean;
    batchFee: {
        amount: number
    }[]
}