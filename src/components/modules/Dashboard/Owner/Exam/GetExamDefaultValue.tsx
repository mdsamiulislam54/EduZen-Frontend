import { ExamStatus, ICreateExam } from "@/app/(dashboardLayout)/dashboard/owner/exam/_actions";
import { formatDate } from "@/lib/utils";
export const formatTime = (date?: string | Date) => {
    if (!date) return "";

    const d = new Date(date);

    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
};
export const getExamDefaultValue = (
    mode: "create" | "edit",
    initialData?: ICreateExam
) => {
    if (mode === "edit" && initialData) {

        return {
            batchId: initialData?.batchId ?? "",
            subjectId: initialData?.subjectId ?? "",
            name: initialData?.name ?? "",
            totalMarks: initialData?.totalMarks ?? 0,
            passMarks: initialData?.passMarks ?? 0,
            examDate: formatDate(initialData?.examDate) ?? "",
            startTime: formatTime(initialData?.startTime) ?? "",
            endTime: formatTime(initialData?.endTime) ?? "",
            status: initialData?.status ?? "UPCOMING" as ExamStatus
        }
    }

    return {

        batchId: "",
        subjectId: "",
        name: "",
        totalMarks: 0,
        passMarks: 0,
        examDate: "",
        startTime: "",
        endTime: "",
        status: "UPCOMING" as ExamStatus

    }
}