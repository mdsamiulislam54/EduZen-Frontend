import { Meta } from "./subject.type";

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
    meta: {
        page: number,
        totalPage: number,
        limit: number,
        total: number
    }
}
export interface ITeacherCreate {
    subjectIds: string[],
    teacherData: {
        education?: string,
        address?: string,
        name: string,
        email: string,
        dateOfBirth?: string,
        phone: string,
        image?: File | string | undefined | null,
        experience?: number,
        gender: "MALE" | "FEMALE"
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
        image?: File | string | undefined | null,
        experience?: number
        gender?: "MALE" | "FEMALE"
    }
}



export interface ITeacherResponse {
    data: ITeacher[];
    meta?: Meta;
}

export interface ISingleTeacher {

    id: string
    coachingCenterId: string
    userId: string

    education: string | null
    address: string | null
    name: string
    email: string
    dateOfBirth: string | null
    phone: string
    image: string | null
    experience: number | null
    gender: "MALE" | "FEMALE" | null

    status: "ACTIVE" | "INACTIVE"
    isDeleted: boolean
    batchTeachers: {
      id: string
      teacherId: string
    
    }[]

    teacherSubjects: {
      id: string
      teacherId: string
      subjectId: string
      isDeleted: boolean

    }[]

    coachingCenter: {
      id: string
      ownerId: string
      name: string
      email: string
      phone: string

      image: string | null
      address: string
      city: string
      area: string
      logo: string | null

      currency: string
      plan: string | null
      status: "ACTIVE" | "PENDING"
      isDeleted: boolean
     
    }

    user: {
      id: string
      name: string
      email: string
      emailVerified: boolean

      role: "ADMIN" | "OWNER" | "TEACHER" | "STUDENT"
      status: "ACTIVE" | "INACTIVE"

      needPasswordChange: boolean
      isDeleted: boolean
      image: string | null
      hasSubscription: boolean
    
    }
  }
