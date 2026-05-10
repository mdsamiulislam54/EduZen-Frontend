"use client"

import { getAllNotice } from "@/app/(dashboardLayout)/dashboard/owner/notice/_actions"
import ErrorState from "@/components/modules/Error/Error"
import { Badge } from "@/components/ui/badge"
import AppPagination from "@/shared/pagination/AppPagination"
import DataTable from "@/shared/Table/DataTable"
import { INotice } from "@/types/notice.type"
import { useQuery } from "@tanstack/react-query"
import { CellContext, ColumnDef } from "@tanstack/react-table"



const NoticeTable = ({ queryString }: { queryString: string }) => {


    const { data: notice, isPending, isError } = useQuery({
        queryKey: ["notice", queryString],
        queryFn: async () => await getAllNotice(queryString)

    })

    if (isError) return <ErrorState message="Notice data not available" />

    const columns = [

        {
            accessorKey: "serial",
            header: "Serial",
            cell: (props: CellContext<INotice, unknown>) => props.row.index + 1
        },
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: (props: CellContext<INotice, unknown>) => {
                const value = props.row.getValue("type") as | "GENERAL" | "EXAM" | "HOLIDAY" | "PAYMENT" | "CLASS";
                console.log(value)
                const typeConfig = {
                    GENERAL: {
                        label: "General",
                        className:
                            "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                    },

                    EXAM: {
                        label: "Exam",
                        className:
                            "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
                    },

                    HOLIDAY: {
                        label: "Holiday",
                        className:
                            "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
                    },

                    PAYMENT: {
                        label: "Payment",
                        className:
                            "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
                    },

                    CLASS: {
                        label: "Class",
                        className:
                            "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
                    },
                };


                const config = typeConfig[value] || typeConfig.GENERAL



                return (
                    <div>
                        <Badge className={config.className}>
                            {config.label}
                        </Badge>
                    </div>
                )

            }
        },



        {
            accessorKey: "priority",
            header: "Priority",

            cell: (props: CellContext<INotice, unknown>) => {

                const value = props.row.getValue("priority") as | "LOW" | "NORMAL" | "HIGH" | "URGENT";

                const priorityConfig = {
                    LOW: {
                        label: "Low",
                        className:
                            "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                    },

                    NORMAL: {
                        label: "Normal",
                        className:
                            "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
                    },

                    HIGH: {
                        label: "High",
                        className:
                            "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
                    },

                    URGENT: {
                        label: "Urgent",
                        className:
                            "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
                    },
                };

                const config =
                    priorityConfig[value] ||
                    priorityConfig.NORMAL;



                return (
                    <Badge className={config.className}>
                        {config.label}
                    </Badge>
                );
            },
        },



    ]

    const handleUpdateNotice = (data: INotice) => {
        console.log(data)
    }
    const handleViewNotice = (data: INotice) => {
        console.log(data)
    }
    const handleDeleteNotice = (data: INotice) => {
        console.log(data)
    }


    return (
        <div>

            <DataTable
                data={notice?.data || []}
                columns={columns}
                isLoading={isPending}
                emptyMessage="Notice Not Available"
                caption="Notice Table"

                actions={{
                    onDelete: handleDeleteNotice,
                    onView: handleViewNotice,
                    onEdit: handleUpdateNotice
                }}

            />

            {
                notice?.meta && (
                    <AppPagination meta={{
                        page: notice.meta.page??1,
                        total: notice.meta.total??0,
                        totalPages: notice.meta.totalPages??1,
                        limit: notice.meta.limit??10,
                    }} />
                )
            }
        </div>
    )
}

export default NoticeTable