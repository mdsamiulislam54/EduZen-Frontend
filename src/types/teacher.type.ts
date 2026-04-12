enum TeacherStatus {
    ACTIVE,
    INACTIVE,
    ON_LEAVE
}

enum Gender {
    MALE,
    FEMALE,
    OTHER
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