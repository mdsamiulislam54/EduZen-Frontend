import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getClassSchedule } from './_actions';
import Teacher_Class_SchedulePage from '@/components/modules/Dashboard/Teacher/Teacher_Class_Schedule';

const MyClassPageT = async() => {
    const queryClient =  new QueryClient();

    await queryClient.prefetchQuery({
        queryKey:["class-schedule"],
        queryFn:async()=> await getClassSchedule()
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Teacher_Class_SchedulePage/>
        </HydrationBoundary>
    )
}

export default MyClassPageT