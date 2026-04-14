enum TeacherStatus {
    ACTIVE,
    INACTIVE,
    ON_LEAVE
}

enum Gender {
    MALE,
    FEMALE,
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
}
export interface ITeacherCreate {
    id?: string,
    subjectIds: string[],
    teacherData: {
        education: string
        address: string
        name: string;
        email: string;
        dateOfBirth: string
        phone: string;
        image: string
        experience: number
        gender: Gender
    }
}

export interface ITeacherUp {
    id: string,
    education: string
    address: string
    name: string;
    image: string
    experience: number

}

export type ITeacherUpdate = Partial<ITeacherUp>;