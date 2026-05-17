"use client"
import { deleteSubject, getAllSubject } from '@/app/(dashboardLayout)/dashboard/owner/subject/_actions'

import DataTable from '@/shared/Table/DataTable'
import { ISubject } from '@/types/subject.type'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { CellContext } from '@tanstack/react-table'

import { useState } from 'react'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import CreateSubjectForm from '../Form/CreateSubjectForm'

import { DialogContent, DialogHeader, Dialog, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import AppPagination from '@/shared/pagination/AppPagination'

const SubjectTablePage = ({ queryString }: { queryString: string }) => {
    const queryClient = new QueryClient();
    const [open, setOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);
    const router = useRouter()
    const { data: subject, isLoading: subjectLoading } = useQuery({
        queryKey: ["subject", queryString],
        queryFn: async () => await getAllSubject(queryString),
    });

    const { mutateAsync: deleteMutate } = useMutation({
        mutationFn: deleteSubject,
    })


    const handleDeleteSubject = (data: ISubject) => {

        Swal.fire({
            title: "Are you sure",
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
                toast.success("Subject deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["subject"] });
            }

        });

    }
    const handleEditSubject = (data: ISubject) => {
        console.log(data)
        setSelectedSubject(data);
        setOpen(true);
    }



    const subjectColumns = [

        { accessorKey: "name", header: "Subject Name" },

        {

            accessorKey: "status",
            header: "Status",
            cell: (props: CellContext<ISubject, unknown>) => {
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



    ]


    return (
        <>

            <DataTable<ISubject>
                data={subject?.data || []}
                columns={subjectColumns}
                isLoading={subjectLoading}
                emptyMessage='Subject data not available'
                caption='Subject List'
                actions={
                    {
                        onDelete: handleDeleteSubject,
                        onEdit: handleEditSubject
                    }
                }
            />
            {
                subject?.meta && (
                    <AppPagination meta={{
                        page: subject.meta.page,
                        total: subject.meta.total,
                        totalPages: subject.meta.totalPages,
                        limit: subject.meta.limit,
                    }} />
                )
            }
            {
                open && (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Subject</DialogTitle>
                            </DialogHeader>

                            <CreateSubjectForm onClose={() => setOpen(false)} mode='edit' initialData={selectedSubject} />
                        </DialogContent>
                    </Dialog>
                )
            }
        </>
    )
}

export default SubjectTablePage