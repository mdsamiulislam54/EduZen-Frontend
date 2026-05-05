"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import AppPagination from "@/shared/pagination/AppPagination"
import Loader from "@/components/modules/Loader/loader"
import { getAllExam, IExam } from "@/app/(dashboardLayout)/dashboard/owner/exam/_actions"
import { createMarks, getStudentByExamId, IMarkCreate } from "@/app/(dashboardLayout)/dashboard/teacher/marks/_actions"
import { toast } from "sonner"
import MarkEntryTable from "./MarksEntryTable"
import TableQueryController from "@/shared/Table/QueryController/TableQueryController"
import { useSearchParams } from "next/navigation"

const MarksNavbarPage = () => {
    const searchParams = useSearchParams()
    const query = searchParams.toString()

    const [selectedExam, setSelectedExam] = useState<IExam | null>(null);
    const { data: exam } = useQuery({
        queryKey: ["exam"],
        queryFn: async () => await getAllExam()
    })

    const { data: students, isFetching ,} = useQuery({
        queryKey: ["get-student-by-examId", selectedExam?.id, query],
        queryFn: async () => {
            if (!selectedExam?.id) return null;
            return await getStudentByExamId(selectedExam.id, query);
        },
        enabled: !!selectedExam?.id,
    });
    const { mutateAsync: submitMarks,isPending } = useMutation({
        mutationFn: createMarks,
        onSuccess: () => {

        },
        onError: () => {

        },
    });



    return (
        <div>
            <nav>
        
                <Card>
                    <div className="flex justify-between items-center gap-5 px-2">
                        <Select onValueChange={(value) => {
                            const examData = exam?.data.find((e) => e.id === value);
                            setSelectedExam(examData || null);
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Exam" />
                            </SelectTrigger>

                            <SelectContent>
                                {exam?.data.map((opt) => (
                                    <SelectItem key={opt.id} value={opt.id} >
                                        {opt.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                       
                    </div>
                </Card>
            </nav>


            {isFetching && (
                <div className="py-10">
                    <Loader />
                </div>
            )}

            {students?.data && (
                <>

                    <div>
                        <TableQueryController
                            searchKey="search"
                        />
                    </div>

                    <MarkEntryTable
                        students={students?.data}
                        examId={selectedExam?.id as string}
                        passMarks={selectedExam?.passMarks as number}
                        totalMarks={selectedExam?.totalMarks as number}
                        onSubmit={async (data: IMarkCreate) => {
                                try {
                                    await submitMarks(data)
                                    toast.success("Marks saved successfully");
                                 
                                } catch (error) {
                                    if (error instanceof Error) {
                                        toast.error(error.message)
                                    }
                                }
                            }} 

                        isPending={isPending}
                    />
                </>
            )}

            {
                students?.meta && (
                    <AppPagination meta={students?.meta} />
                )
            }
        </div>
    )
}

export default MarksNavbarPage