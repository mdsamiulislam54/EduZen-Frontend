"use client"

import { deleteExamById, ExamStatus, getAllExam, IExam } from "@/app/(dashboardLayout)/dashboard/owner/exam/_actions"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AppPagination from "@/shared/pagination/AppPagination"
import DataTable from "@/shared/Table/DataTable"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { CellContext } from "@tanstack/react-table"
import { useState } from "react"
import { toast } from "sonner"
import Swal from "sweetalert2"
import CreateExamFormPage from "../Form/ExamCreateForm"
import { useRouter } from "next/navigation"

interface IExamTableProps {
    queryString?: string
}
const ExamTablePage = ({ queryString }: IExamTableProps) => {
    const queryClient = new QueryClient();
    const router = useRouter()
    const [selectedExam, setSelectedExam] = useState<IExam | null>(null);
    const [isOpen, setIsOpen] = useState(false)
    const { data: exam, isPending } = useQuery({
        queryKey: ["exam", queryString],
        queryFn: () => getAllExam(queryString),
    });
    const { mutateAsync: deleteMutate } = useMutation({
        mutationFn: deleteExamById,
    })
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
        { id: "actions", header: "Actions" }

    ]

    const handleUpdateExam = (data: IExam) => {
        console.log(data)
        setSelectedExam(data);
        setIsOpen(!isOpen)
    }
    const handleDelete = async (data: IExam) => {
        Swal.fire({
            title: "Are you sure Delete This Exam?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    await deleteMutate(data.id);
                    return true;
                } catch (error) {
                    Swal.showValidationMessage(
                        `Delete failed: ${(error as Error).message}`
                    );
                    return false;
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success("Exam deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["exam"] });
                router.push(window.location.href)
            }

        });
    }


    return (
        <>
            <DataTable
                data={exam?.data || []}
                columns={columns || []}
                isLoading={isPending}
                emptyMessage="Exam data not available"
                caption="Exam Table"
                actions={{
                    onEdit: handleUpdateExam,
                    onDelete: handleDelete
                }}
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

            {
                isOpen && selectedExam && (
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent className="!max-w-3xl overflow-y-scroll ">
                            <DialogHeader>
                                <DialogTitle>Update Teacher</DialogTitle>
                            </DialogHeader>

                            <CreateExamFormPage onClose={() => setIsOpen(false)} mode='edit' initialData={selectedExam} />
                        </DialogContent>
                    </Dialog>
                )
            }
        </>
    )
}

export default ExamTablePage