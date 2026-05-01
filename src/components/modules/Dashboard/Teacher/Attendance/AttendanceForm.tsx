"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import TableQueryController from "@/shared/Table/QueryController/TableQueryController"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { createAttendance } from "@/app/(dashboardLayout)/dashboard/teacher/attendance/_actions"
import { toast } from "sonner"
import { handleError } from "@/lib/error/handleError"

export interface IAttendanceProps {
    students: {
        name: string,
        id: string,
        rollNumber: string
    }[],


    batchId: string
    markBy?: string
}

type AttendanceStatus = "PRESENT" | "ABSENT" | null;

interface AttendanceFormValues {
    attendance: {
        studentId: string
        batchId: string
        date: Date
        status: AttendanceStatus
        markBy: string
        remarks?: string
    }[]
}

const AttendanceForm = ({ students, batchId, markBy }: IAttendanceProps) => {

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-attendance"],
        mutationFn: createAttendance,

    })

    const form = useForm({
        defaultValues: {
            attendance: students.map((s) => ({
                studentId: s.id,
                batchId,
                date: new Date(),
                status: "ABSENT",
                remarks: "",
                markBy,
            }))
        } as AttendanceFormValues,

        onSubmit: async ({ value }) => {

            try {
                const payload = value.attendance.map((att) => ({
                    ...att,

                }))
               await mutateAsync(payload)
                toast.success("Today Attendance Add Successfully!!")



                console.log("Final Attendance Data:", payload)
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message)
                }
            }

        }
    })

    return (
        <div className="w-full  mx-auto mt-4">

            {/* Header */}
            <div className="mb-6">
                <TableQueryController
                    searchKey="search"
                />
            </div>

            {
                !students.length && (
                    <p>Students Not Found </p>
                )
            }

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit()
                }}
                className="space-y-4"
            >

                {/* Rows */}
                <div className="space-y-3">
                    {students.map((student, index) => (
                        <div
                            key={student.id}
                            className="md:flex justify-between  gap-3  bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                        >

                            {/* Student Info */}
                            <div className="w-full">
                                <p className="font-semibold">{student.name}</p>
                                <p className="text-md text-green-500">
                                    Roll: {student.rollNumber}
                                </p>
                            </div>
                            {/* Remarks */}
                            <form.Field name={`attendance[${index}].remarks`}>
                                {(field) => (
                                    <div className="w-full">
                                        <Input
                                            type="text"
                                            placeholder="Add remarks..."
                                            value={field.state.value ?? ""}
                                            onChange={(e) => field.handleChange(e.target.value)}

                                        />
                                    </div>
                                )}
                            </form.Field>
                            {/* Status */}
                            <form.Field name={`attendance[${index}].status`}>
                                {(field) => {
                                    const status = field.state.value

                                    const getColor = () => {
                                        switch (status) {
                                            case "PRESENT":
                                                return "bg-green-500/10 text-green-600 border-green-500 "
                                            case "ABSENT":
                                                return "bg-red-500/10 text-red-600 border-red-500"

                                            default:
                                                return ""
                                        }
                                    }

                                    return (
                                        <Select
                                            value={status}
                                            onValueChange={(value: AttendanceStatus) =>
                                                field.handleChange(value)
                                            }
                                        >
                                            <SelectTrigger
                                                className={`w-full h-10 rounded-md border text-sm 
          focus:ring-2 focus:ring-primary ${getColor()}`}
                                            >
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="PRESENT">Present</SelectItem>
                                                <SelectItem value="ABSENT">Absent</SelectItem>

                                            </SelectContent>
                                        </Select>
                                    )
                                }}
                            </form.Field>



                            {/* Hidden fields */}
                            <form.Field name={`attendance[${index}].studentId`}>
                                {(field) => <input type="hidden" value={field.state.value} />}
                            </form.Field>

                            <form.Field name={`attendance[${index}].batchId`}>
                                {(field) => <input type="hidden" value={field.state.value} />}
                            </form.Field>

                            <form.Field name={`attendance[${index}].date`}>
                                {(field) => <input type="hidden" value={field.state.value.toString()} />}
                            </form.Field>

                            <form.Field name={`attendance[${index}].markBy`}>
                                {(field) => <input type="hidden" value={field.state.value} />}
                            </form.Field>

                        </div>
                    ))}
                </div>

                {/* Submit */}
                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        className="h-10 px-6 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition shadow-md cursor-pointer"
                    >
                        {
                            isPending ? "Submit Attendance......." : "Submit Attendance"
                        }
                    </button>
                </div>

            </form>
        </div>
    )
}

export default AttendanceForm