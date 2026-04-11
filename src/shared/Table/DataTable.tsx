"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, CellContext } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import TableSkeleton from "./TableSkeleton"
interface DataTableAction<TData> {
    onView?: (data: TData) => void
    onEdit?: (data: TData) => void
    onDelete?: (data: TData) => void
}
interface DataTableProps<TData> {
    data: TData[],
    columns: ColumnDef<TData>[],
    actions?: DataTableAction<TData>,
    emptyMessage?: string,
    isLoading?: boolean,
    caption?: string
}

const DataTable = <TData,>({ data, columns, actions, emptyMessage, isLoading, caption }: DataTableProps<TData>) => {

    const tableColumns: ColumnDef<TData>[] = actions ? [...columns, {
        id: "actions",
        header: "Actions",
        cell: ((props: CellContext<TData, unknown>) => {
            const data = props.row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant={"ghost"}>
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal size={30} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {
                            actions.onView && (
                                <DropdownMenuItem onClick={() => actions.onView?.(data)}>
                                    view
                                </DropdownMenuItem>
                            )
                        }
                        {
                            actions.onDelete && (
                                <DropdownMenuItem onClick={() => actions.onDelete?.(data)}>
                                    delete
                                </DropdownMenuItem>
                            )
                        }
                        {
                            actions.onEdit && (
                                <DropdownMenuItem onClick={() => actions.onEdit?.(data)}>
                                    edit
                                </DropdownMenuItem>
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )

        })
    }] : columns

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel()
    })

    console.log("DataTable:", table.getRowModel().rows.length)
    return (
        <div className="relative">
            {
                isLoading && (<TableSkeleton />)
            }
            <Table className="shadow-sm">
                <TableCaption>
                    {caption}
                </TableCaption>
                <TableHeader>
                    {
                        table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {
                                    hg.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows.length ? (

                            table.getRowModel().rows.map((row) => (

                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))

                        ) : (


                            <TableRow >
                                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                                    {emptyMessage || "No data available"}
                                </TableCell>
                            </TableRow>


                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default DataTable