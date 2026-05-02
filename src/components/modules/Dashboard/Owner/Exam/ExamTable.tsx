"use client"

import { ExamStatus, getAllExam, IExam } from "@/app/(dashboardLayout)/dashboard/owner/exam/_actions"
import { Badge } from "@/components/ui/badge"
import AppPagination from "@/shared/pagination/AppPagination"
import DataTable from "@/shared/Table/DataTable"
import { useQuery } from "@tanstack/react-query"
import { CellContext } from "@tanstack/react-table"

interface IExamTableProps {
    queryString?: string
}
const ExamTablePage = ({ queryString }: IExamTableProps) => {

    const { data: exam, isPending } = useQuery({
        queryKey: ["exam", queryString],
        queryFn: () => getAllExam(queryString),
    });
    const columns = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "totalMarks", header: "TotalMarks" },
        { accessorKey: "passMarks", header: "PassMarks" },
        {
            accessorKey: "examDate", header: "ExamDate",

            cell: (props: CellContext<IExam, unknown>) => {
                const startDate = props.getValue() as string
                const date = new Date(startDate);
                return date.toLocaleDateString(); // local time
            },
        },
        {
            accessorKey: "startTime",
            header: "Start Time",
            cell: (props: CellContext<IExam, unknown>) => {
                const startDate = props.getValue() as string
                const date = new Date(startDate);
                return date.toLocaleTimeString(); // local time
            },
        },
        {
            accessorKey: "endTime",
            header: "End Time",
            cell: (props: CellContext<IExam, unknown>) => {
                const endDate = props.getValue() as string
                const date = new Date(endDate);
                return date.toLocaleTimeString();
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: (props: CellContext<IExam, unknown>) => {
                const status = props.getValue() as ExamStatus;
                type BadgeVariant =
                    | "secondary"
                    | "default"
                    | "destructive"
                    | "link"
                    | "outline"
                    | "ghost";

                const statusMap: Record<
                    ExamStatus,
                    { label: string; variant: BadgeVariant, className?: string }
                > = {
                    UPCOMING: { label: "Upcoming", variant: "secondary", className: "bg-purple-800 text-white border-blue-200" },
                    ONGOING: { label: "Ongoing", variant: "ghost", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
                    COMPLETED: { label: "Completed", variant: "outline", className: "bg-green-100 text-green-700 border-green-200" },
                    CANCELLED: { label: "Cancelled", variant: "destructive", className: "bg-red-100 text-red-700 border-red-200" },
                };


                const current = statusMap[status];

                return (
                    <Badge variant={current.variant} className={current.className}>
                        {current.label}
                    </Badge>
                );


            }
        },
        { accessorKey: "actions", header: "Actions" }

    ]



    return (
        <>
            <DataTable
                data={exam?.data || []}
                columns={columns || []}
                isLoading={isPending}
                emptyMessage="Exam data not available"
                caption="Exam Table"
            />

            {
                exam?.meta && (
                    <AppPagination
                        meta={{
                            page: exam.meta.page ?? 0,
                            total: exam.meta.total ?? 0,
                            totalPages: exam.meta.totalPages ?? 0,
                            limit: exam.meta.limit ?? 10,
                        }}
                    />
                )
            }
        </>
    )
}

export default ExamTablePage