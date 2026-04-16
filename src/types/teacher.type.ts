enum TeacherStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ON_LEAVE = "ON_LEAVE"
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export interface ITeacher {
    id: string;
    coachingCenterId: string;
    userId: string;
    education: string
    address: string
    name: string;
    email: string;
    dateOfBirth: Date
    phone: string;
    image: string
    experience: number
    gender: Gender
    status: TeacherStatus;
    isDeleted: boolean;
    teacherSubjects: {
        subjectId: string
    }[];
    meta:{
        page:number,
        totalPage:number,
        limit:number,
        total:number
    }
}
export interface ITeacherCreate {
    subjectIds: string[],
    teacherData: {
        education?: string
        address?: string
        name: string;
        email: string;
        dateOfBirth?: string
        phone: string;
        image?: File | string
        experience?: number
        gender?: "MALE" | "FEMALE"
    }
}
export interface ITeacherUpdate {
    id?: string,
    subjectIds?: string[],
    teacherData: {
        education?: string
        address?: string
        name?: string
        email?: string
        phone?: string
        dateOfBirth?: string
        image?: string
        experience?: number
        gender?: "MALE" | "FEMALE"
    }
}



