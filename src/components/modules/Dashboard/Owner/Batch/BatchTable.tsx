"use client"

import { getAllBatch } from "@/app/(dashboardLayout)/dashboard/owner/batch/_actions"
import DataTable from "@/shared/Table/DataTable"
import { IBatch } from "@/types/batch.type"
import { useQuery } from "@tanstack/react-query"
import { CellContext } from "@tanstack/react-table"

const BatchTablePage = () => {
    const { data, isPending } = useQuery({
        queryKey: ["batch"],
        queryFn: async () => await getAllBatch()
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
        console.log(data)
    }
    const handleDeleteBatch = async (data: IBatch) => {
        console.log(data)
    }
    const handleViewBatch = async (data: IBatch) => {
        console.log(data)
    }
    return (
        <>
            <DataTable
                data={data || []}
                columns={batchColumns}
                emptyMessage="Batch Data not available"
                isLoading={isPending}
                actions={
                    {
                        onDelete: handleDeleteBatch,
                        onView: handleViewBatch,
                        onEdit: handleUpdateBatch
                    }
                }

            />
        </>
    )
}

export default BatchTablePage