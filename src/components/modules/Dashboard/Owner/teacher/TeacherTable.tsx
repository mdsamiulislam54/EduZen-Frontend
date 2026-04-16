"use client"

import { getAllTeacher } from "@/app/(dashboardLayout)/dashboard/owner/teacher/_actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DataTable from "@/shared/Table/DataTable"
import { ITeacher, ITeacherUpdate } from "@/types/teacher.type"
import { useQuery } from "@tanstack/react-query"
import { CellContext } from "@tanstack/react-table"
import { useState } from "react"
import CreateTeacherForm from "../Form/CreateTeacherForm"
export interface ITeacherProps {
  queryString: string
}
const TeacherTable = ({ queryString }: ITeacherProps) => {
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);
  const { data: teachers, isPending } = useQuery({
    queryKey: ["teacher"],
    queryFn: async () => await getAllTeacher(queryString)
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
    console.log(data)
  }
  const handleEdit = async (data: ITeacher) => {
    setSelectedTeacher(data)
    setOpen(true)
    console.log(data)
  }
  const handleDelete = async (data: ITeacher) => {
    console.log(data)
  }


  return (
    <>
      <DataTable
        data={teachers || []}
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
        open && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="!max-w-3xl overflow-y-scroll ">
              <DialogHeader>
                <DialogTitle>Update Subject</DialogTitle>
              </DialogHeader>

              <CreateTeacherForm onClose={() => setOpen(false)} mode='edit' initialData={selectedTeacher} />
            </DialogContent>
          </Dialog>
        )
      }
    </>
  )
}

export default TeacherTable