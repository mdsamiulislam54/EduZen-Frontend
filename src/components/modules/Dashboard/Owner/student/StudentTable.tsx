"use client"

import { deleteStudent, getAllStudents } from "@/app/(dashboardLayout)/dashboard/owner/student/_actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AppPagination from "@/shared/pagination/AppPagination";
import DataTable from "@/shared/Table/DataTable";
import { IStudent } from "@/types/student.type";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { CellContext, ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
import CreateStudentFormPage from "../Form/CreateStudentForm";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const StudentTable = ({ query }: { query?: string }) => {
  const queryClient = new QueryClient();
  const router = useRouter();
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { data: students, isPending } = useQuery({
    queryKey: ["student", query],
    queryFn: async () => await getAllStudents(query)
  });

  const { mutateAsync: deleteMutate } = useMutation({
    mutationKey: ["delete-student"],
    mutationFn: deleteStudent,
  })
  const columns: ColumnDef<IStudent>[] = [
    {
      accessorKey: "image",
      header: "Profile",
      cell: (props: CellContext<IStudent, unknown>) => {
        const image = props.row.getValue("image") as string;
        return image ? <Image src={image} alt="Student Image" width={50} height={50} className="rounded-full" /> : <span>N/A</span>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: (props: CellContext<IStudent, unknown>) => {
        const phone = props.row.getValue("phone") as string
        return <span>{phone ? phone : "N/A"}</span>
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: (props: CellContext<IStudent, unknown>) => {
        const gender = props.row.getValue("gender") as string
        return <span>{gender ? gender : "N/A"}</span>
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props: CellContext<IStudent, unknown>) => {
        const status = props.row.getValue("status") as string;
        return <div>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${status === "ACTIVE" ? "bg-green-100 text-green-800" : status === "INACTIVE" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{status}</span>
        </div>
      }
    },

    {
      id: "actions",
      header: "Actions",
    }
  ]

  const handleStudentDelete = (data: IStudent) => {

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      backdrop: true,
      background: "#000",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      width: "350px",
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
        toast.success("Student deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["student"] });
      }

    });

    console.log("Delete student with ID:", data.id);
  }

  const handleStudentEdit = (data: IStudent) => {
    setSelectedStudent(data);
    setIsViewModalOpen(!isViewModalOpen);
    console.log("Edit student with ID:", data);
  }

  const handleStudentView = (data: IStudent) => {
    router.push(`/dashboard/owner/student/profile/${data.id}`);
    console.log("View student with ID:", data.id);
  }


  return (
    <>
      <DataTable
        data={students?.data || []}
        columns={columns || []}
        emptyMessage="Student Data not available"
        isLoading={isPending}
        caption="Student"
        key={students?.data?.length || 0}
        actions={{
          onDelete: handleStudentDelete,
          onEdit: handleStudentEdit,
          onView: handleStudentView
        }}

      />

      <AppPagination meta={students?.meta ?? {
        totalPages: 0,
        page: 0,
        limit: 0,
        total: 0
      }} />

      {
        isViewModalOpen && (
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="!max-w-3xl overflow-y-scroll ">
              <DialogHeader>
                <DialogTitle>Update Student</DialogTitle>
              </DialogHeader>

              <CreateStudentFormPage mode="edit" initialData={selectedStudent} onClose={() => setIsViewModalOpen(false)} />
            </DialogContent>
          </Dialog>
        )
      }
    </>
  )
}

export default StudentTable