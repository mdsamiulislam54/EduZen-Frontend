import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getStudentDashboardData } from "./_actions"
import DashboardCardPage from "@/components/modules/Dashboard/Student/Dashboard/DashboardCard"
export const dynamic = "force-dynamic";
const StudentPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["student-dashboard-data"],
    queryFn: getStudentDashboardData
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardCardPage />
    </HydrationBoundary>
  )
}

export default StudentPage