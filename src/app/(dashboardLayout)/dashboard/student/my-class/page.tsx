import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getMyClassToday } from "./_actions"
import StudentClassScheduleCard from "@/components/modules/Dashboard/Student/My_Class/StudentClassScheduleCard"

const MyClassPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["student-class-schedule"],
    queryFn: getMyClassToday
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudentClassScheduleCard />
    </HydrationBoundary>
  )
}

export default MyClassPage