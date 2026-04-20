import { IBatch, IBatchUpdate } from "@/types/batch.type";

export const getBatchDefaultValues = (
  mode: "create" | "edit",
  initialData?: IBatch | null
): IBatchUpdate => {

  //  EDIT MODE
  if (mode === "edit" && initialData) {
    return {
      teacherIds: initialData.teacherIds?.map(t => t.teacherId) ?? [],
      batchData: {
        batchName: initialData.batchName ?? "",
        batchCode: initialData.batchCode ?? "",
        max_students: initialData.max_students ?? 0,
        startTime: initialData.startTime ?? new Date(),
        endTime: initialData.endTime ?? new Date(),
        daysOfWeek: initialData.daysOfWeek ?? [],
        status: initialData.status,
      },
      amount: initialData.batchFee?.[0]?.amount ?? 0,
    };
  }

  //  CREATE MODE
  return {
    teacherIds: [],
    batchData: {
      batchName: "",
      batchCode: "",
      max_students: 0,
      startTime: new Date(),
      endTime: new Date(),
      daysOfWeek: [],  
    },
    amount: 0,
  };
};