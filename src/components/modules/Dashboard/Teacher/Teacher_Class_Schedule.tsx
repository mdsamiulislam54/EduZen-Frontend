"use client"

import { getClassSchedule } from "@/app/(dashboardLayout)/dashboard/teacher/my-class/_actions"
import DataTable from "@/shared/Table/DataTable";
import { useQuery } from "@tanstack/react-query"

const Teacher_Class_SchedulePage = () => {
    const { data: classSchedule, isPending } = useQuery({
        queryKey: ["class-schedule"],
        queryFn: async () => await getClassSchedule()
    });

    const columns = [
        {
            accessorKey: "day", header: "Class Day",

        },
        {
            accessorKey: "batchName", header: "BatchName",

        },

        {
            accessorKey: "startTime", header: "Start_Time",

        },
        {
            accessorKey: "endTime", header: "End_Time",

        }
    ]
    return (
        <>
            <DataTable
                data={classSchedule || []}
                columns={columns}
                isLoading={isPending}
                emptyMessage="Class Schedule Data Not Available"
            />
        </>
    )
}

export default Teacher_Class_SchedulePage