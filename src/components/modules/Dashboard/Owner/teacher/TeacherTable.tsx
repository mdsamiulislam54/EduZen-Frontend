"use client"

import { deleteTeacher, getAllTeacher, getTeacherById } from "@/app/(dashboardLayout)/dashboard/owner/teacher/_actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DataTable from "@/shared/Table/DataTable"
import { ITeacher, ITeacherUpdate } from "@/types/teacher.type"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { CellContext } from "@tanstack/react-table"
import { useState } from "react"
import CreateTeacherForm from "../Form/CreateTeacherForm"
import AppPagination from "@/shared/pagination/AppPagination"
import ErrorState from "@/components/modules/Error/Error"
import TeacherProfileFull from "./TeacherProfile"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
export interface ITeacherProps {
  queryString: string
}
const TeacherTable = ({ queryString }: ITeacherProps) => {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const router = useRouter()
  const queryClient = new QueryClient()
  const { data: teachers, isPending } = useQuery({
    queryKey: ["teacher", queryString],
    queryFn: async () => await getAllTeacher(queryString)
  })

  const { data: singleTeacher, isError } = useQuery({
    queryKey: ["single-teacher", selectedTeacherId],
    queryFn: () => getTeacherById(selectedTeacherId),
    enabled: !!selectedTeacherId,
  })

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteTeacher,
    onError: (err) => {
      toast.error(err?.message || "Something went wrong");
    },
    onSuccess: () => {
      toast.success("Teacher Delete Successful")
      router.push(window.location.href)
      queryClient.invalidateQueries({ queryKey: ["teacher"] })
    }
  })
  const teacherColumns = [
    { accessorKey: "Image", header: "Image" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "education", header: "Education" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "gender", header: "Gender" },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props: CellContext<ITeacher, unknown>) => {
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
      }

    },
    { id: "actions", header: "Actions" },
  ]

  const handleView = async (data: ITeacher) => {
    setOpenProfile(!openProfile)
    setSelectedTeacherId(data.id)
  }
  const handleEdit = async (data: ITeacher) => {
    setSelectedTeacher(data)
    setOpen(true)
    console.log(data)
  }
  const handleDelete = async (data: ITeacher) => {
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

  if (isError) return <ErrorState message="Single teacher not found" />
  return (
    <>
      <DataTable
        data={teachers?.data || []}
        columns={teacherColumns}
        isLoading={isPending}
        emptyMessage="Teacher is not available"
        actions={{
          onDelete: handleDelete,
          onEdit: handleEdit,
          onView: handleView
        }}

      />

      {
        teachers?.meta && (
          <AppPagination meta={{
            page: teachers.meta.page,
            total: teachers.meta.total,
            totalPages: teachers.meta.totalPages,
            limit: teachers.meta.limit,
          }} />
        )
      }

      {
        open && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="!max-w-3xl overflow-y-scroll ">
              <DialogHeader>
                <DialogTitle>Update Teacher</DialogTitle>
              </DialogHeader>

              <CreateTeacherForm onClose={() => setOpen(false)} mode='edit' initialData={selectedTeacher} />
            </DialogContent>
          </Dialog>
        )
      }
      {
        openProfile && singleTeacher && (
          <Dialog open={openProfile} onOpenChange={setOpenProfile}>
            <DialogContent className="!max-w-5xl !h-screen overflow-y-scroll ">
              {/* <DialogHeader>
                <DialogTitle>Update Subject</DialogTitle>
              </DialogHeader> */}

              <TeacherProfileFull teacher={singleTeacher} />
            </DialogContent>
          </Dialog>
        )
      }

    </>
  )
}

export default TeacherTable