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

import { DialogContent, DialogHeader,Dialog,DialogTitle } from '@/components/ui/dialog'


/**
 * 
 * @returns   id:string,
    coachingCenterId: string,
    name:string,
    subject_code: string,
    status: SubjectStatus,
 */

const SubjectTablePage = () => {
    const queryClient = new QueryClient();
    const [open, setOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);
    const { data: subject, isLoading: subjectLoading } = useQuery({
        queryKey: ["subject"],
        queryFn: async () => await getAllSubject(),
    });

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteSubject,
        onError: (err) => {
            toast.error(err?.message || "Something went wrong");
        },
        onSuccess: () => {
            toast.success("Subject Delete Successful")
            queryClient.invalidateQueries({ queryKey: ["subject"] })
        }
    })
    const { } = useQuery({
        queryKey: [""]
    })

    const handleDeleteSubject = async (data: ISubject) => {

        Swal.fire({
            title: "Are you sure Delete This Subject?",
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
    const handleEditSubject = (data: ISubject) => {
        setSelectedSubject(data);
        setOpen(true);
    }



    const subjectColumns = [
        { accessorKey: "id", header: "Subject ID" },
        { accessorKey: "name", header: "Subject Name" },
        { accessorKey: "subject_code", header: "subject_code " },
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
        {
            id: "actions", header: "Actions"
        }


    ]

    return (
        <>
            <DataTable
                data={subject || []}
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