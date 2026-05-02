import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getAllBatch } from "../../owner/batch/_actions";
import NavbarAttendancePage from "@/components/modules/Dashboard/Teacher/Attendance/Navabar_Attendance";
import { buildQueryString } from "@/lib/utils";
import { getAllStudentAttendance } from "./_actions";


const AttendancePage = async ({ params }: { params: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const queryParams = await params;
    const queryString = buildQueryString(queryParams);
    const queryClient = new QueryClient()

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ["student", queryString],
            queryFn: async () => await getAllStudentAttendance(queryString),
        }),
        queryClient.prefetchQuery({
            queryKey: ["batch"],
            queryFn: async () => await getAllBatch()
        })
    ]);


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NavbarAttendancePage  queryString={queryString}/>
        </HydrationBoundary>
    )
}

export default AttendancePage