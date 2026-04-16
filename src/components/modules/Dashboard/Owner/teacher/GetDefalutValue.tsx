import { Gender, ITeacher, ITeacherCreate, ITeacherUpdate } from "@/types/teacher.type";

export const getDefaultValues = (
  mode: "create" | "edit",
  initialData?: ITeacher | null
): ITeacherUpdate => {
  if (mode === "edit" && initialData) {
    return {
      subjectIds: initialData.teacherSubjects.map((s) => s.subjectId) ?? [],
      teacherData: {
        name: initialData.name ?? "",
        education: initialData.education ?? "",
        address: initialData.address ?? "",
        image: initialData.image ?? "",
        experience: initialData.experience ?? 0

      },
    };
  }

  // create mode
  return {
    subjectIds: [],
    teacherData: {
      name: "",
      email: "",
      education: "",
      address: "",
      phone: "",
      image: "",
      experience: 0,
      gender: Object.values(Gender)[0],
      dateOfBirth: "",
    },
  };
};