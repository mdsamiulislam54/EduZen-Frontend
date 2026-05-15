import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getStudentFee } from './_actions';
import { StudentFee } from '@/components/modules/Dashboard/Student/StudentFee/StudentFee';

const StudentFeePage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["student-fee"],
        queryFn: getStudentFee
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StudentFee />
        </HydrationBoundary>
    )
}

export default StudentFeePage