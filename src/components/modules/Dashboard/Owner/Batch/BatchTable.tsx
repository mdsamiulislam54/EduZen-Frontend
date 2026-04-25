"use client"

import { deleteBatch, getAllBatch, updateBatch } from "@/app/(dashboardLayout)/dashboard/owner/batch/_actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AppPagination from "@/shared/pagination/AppPagination"
import DataTable from "@/shared/Table/DataTable"
import { IBatch, IBatchUpdate } from "@/types/batch.type"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { CellContext } from "@tanstack/react-table"
import { useState } from "react"
import CreateBatchForm from "../Form/CreateBatchForm"
import Swal from "sweetalert2"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const BatchTablePage = ({ query }: { query?: string }) => {

    const queryClient = new QueryClient();
    const router = useRouter()
    const [selectedBatch, setSelectedBatch] = useState<IBatch | null>(null);
    const [open, setOpen] = useState(false)
    const { data: batch, isPending } = useQuery({
        queryKey: ["batch", query],
        queryFn: async () => await getAllBatch(query)
    })

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteBatch,
        onError: (err) => {
            toast.error(err?.message || "Something went wrong");
        },
        onSuccess: () => {
            toast.success("Batch Delete Successful")
            router.push(window.location.href)
            queryClient.invalidateQueries({ queryKey: ["teacher"] })
        }
    })

    const batchColumns = [
        { accessorKey: "id", header: "Batch ID" },
        {
            accessorKey: "batchName", header: "Batch Name",

            cell: ({ row }: CellContext<IBatch, unknown>) => {
                return row.original.batchName;
            },

        },
        {
            accessorKey: "max_students", header: "Max Students",

            cell: ({ row }: CellContext<IBatch, unknown>) => {
                return row.original.max_students;
            },
        },
        {
            accessorKey: "batchFee",
            header: "Batch Fee",
            cell: ({ row }: CellContext<IBatch, unknown>) => {
                return row.original.batchFee?.[0]?.amount ?? "N/A";
            },

        },
        {

            accessorKey: "status",
            header: "Status",
            cell: (props: CellContext<IBatch, unknown>) => {
                const status = props.row.getValue("status") as string;

                return (
                    <span
                        className={`px-2 py-1 rounded text-xs font-medium ${status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {status}
                    </span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
        },
    ]

    const handleUpdateBatch = async (data: IBatch) => {
        setSelectedBatch(data)
        setOpen(!open)
        console.log(data)
    }

    const handleDeleteBatch = async (data: IBatch) => {
        Swal.fire({
            title: "Are you sure Delete This Batch?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutate(data.id)
            }
        });
    }
    return (
        <>
            <DataTable
                data={batch?.data || []}
                columns={batchColumns}
                emptyMessage="Batch Data not available"
                isLoading={isPending}
                actions={
                    {
                        onDelete: handleDeleteBatch,
                        onEdit: handleUpdateBatch
                    }
                }

            />
            {
                batch?.meta && (
                    <AppPagination meta={{
                        page: batch.meta.page,
                        total: batch.meta.total,
                        totalPages: batch.meta.totalPages,
                        limit: batch.meta.limit,
                    }} />
                )
            }


            {
                open && (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="!max-w-3xl overflow-y-scroll ">
                            <DialogHeader>
                                <DialogTitle>Update Batch</DialogTitle>
                            </DialogHeader>

                            <CreateBatchForm onClose={() => setOpen(false)} mode='edit' initialData={selectedBatch} />
                        </DialogContent>
                    </Dialog>
                )
            }
        </>
    )
}

export default BatchTablePage