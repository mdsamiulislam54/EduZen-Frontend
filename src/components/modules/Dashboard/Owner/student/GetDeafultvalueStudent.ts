import {  GenderType, IStudent, StudentStatus } from "@/types/student.type";



export const getDefaultValueStudent = (
    mode: "create" | "edit",
    initialData?: IStudent
) => {
    if (mode === "edit" && initialData) {
        return {
            batchIds: initialData.batchStudents?.map(bs => bs.batch.id) || [],
            studentData: {
                name: initialData.name ?? "",
                fatherName: initialData.fatherName ?? "",
                matherName: initialData.matherName ?? "",
                age: initialData.age ?? 0,
                address: initialData.address ?? "",
                phone: initialData.phone ?? "",
                status: initialData.status as StudentStatus,
                image: null as File  | null,
                dateOfBirth: initialData.dateOfBirth?? null,
                BloodGroup: initialData.bloodGroup ?? "",

            }
        };
    } else {
        return {
            status: "ACTIVE",
            isDeleted: false,
            fatherName: "",
            matherName: "",
            age: 0,
            address: "",
            name: "",
            email: "",
            image: null,
            emailVerified: false,
            needPasswordChange: false,
            deletedAt: null,
            hasSubscription: false,
            teamPassword: null,
            phone: "",
            bloodGroup: initialData?.bloodGroup ?? undefined,
            dateOfBirth: null,
            gender: initialData?.gender as GenderType ?? ""


        };
    }
};


