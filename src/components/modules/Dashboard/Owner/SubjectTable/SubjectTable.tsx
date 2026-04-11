"use client"
import { getAllSubject } from '@/app/(dashboardLayout)/dashboard/owner/subject/_actions'

import DataTable from '@/shared/Table/DataTable'
import { ISubject } from '@/types/subject.type'
import { useQuery } from '@tanstack/react-query'
import { CellContext } from '@tanstack/react-table'

/**
 * 
 * @returns   id:string,
    coachingCenterId: string,
    name:string,
    subject_code: string,
    status: SubjectStatus,
 */

const SubjectTablePage = () => {

    const { data: subject, isLoading: subjectLoading } = useQuery({
        queryKey: ["subject"],
        queryFn: async () => await getAllSubject(),
    });

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
        }

    ]
    console.log("Subject:", subject)
    return (
        <DataTable
            data={subject || []}
            columns={subjectColumns}
            isLoading={subjectLoading}
            emptyMessage='Subject data not available'
        />
    )
}

export default SubjectTablePage