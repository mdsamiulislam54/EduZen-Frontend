"use client"

import { getAllBatch } from "@/app/(dashboardLayout)/dashboard/owner/batch/_actions"
import { getAllStudentAttendance, IAttendanceStudent } from "@/app/(dashboardLayout)/dashboard/teacher/attendance/_actions"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import AttendanceForm from "./AttendanceForm"
import AppPagination from "@/shared/pagination/AppPagination"
import Loader from "@/components/modules/Loader/loader"

const NavbarAttendancePage = ({ queryString }: { queryString: string }) => {
    const [selectedBatchId, setSelectedBatchId] = useState("");
    const { data: batch } = useQuery({
        queryKey: ["batch"],
        queryFn: async () => await getAllBatch()
    })

    const { data: students, isPending } = useQuery({
        queryKey: ["student", selectedBatchId, queryString],
        queryFn: async () => await getAllStudentAttendance(selectedBatchId, queryString)
        
    })


  
    return (
        <div>
            <nav>
                <Card>
                    <div className="flex justify-between items-center gap-5 px-2">
                        <Select onValueChange={(value) => setSelectedBatchId(value as string)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Batch" />
                            </SelectTrigger>

                            <SelectContent>
                                {batch?.data.map((opt) => (
                                    <SelectItem key={opt.id} value={opt.id}>
                                        {opt.batchName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button >
                            Add Attendance
                        </Button>
                    </div>
                </Card>
            </nav>

          

            {
                isPending && (
                    <Loader />
                )
            }

            {
                students && (
                    <AttendanceForm students={students?.data} batchId={selectedBatchId} />
                )
            }

            {
                students?.meta && (
                    <AppPagination meta={students?.meta} />
                )
            }
        </div>
    )
}

export default NavbarAttendancePage