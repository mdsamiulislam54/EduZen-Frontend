import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getTeacherDashboardCard } from "./_actions"
import DashboardCardPage from "@/components/modules/Dashboard/Teacher/Dashboard-Teacher/DashboardCard"
import ChartData from "@/components/modules/Dashboard/Owner/DashboardCard/ChartData"
import { getOwnerDashboardChartData } from "../owner/_actions"


const TeacherPage = async () => {
  const queryClient = new QueryClient()
  Promise.all([
    await queryClient.prefetchQuery({
      queryKey: ["teacher-dashboard-card"],
      queryFn: async () => await getTeacherDashboardCard()
    }),
    await queryClient.prefetchQuery({
      queryKey: ["ownerDashboardChartData"],
      queryFn: async () => await getOwnerDashboardChartData()
    })

  ])
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardCardPage />
      <ChartData />
    </HydrationBoundary>
  )
}

export default TeacherPage