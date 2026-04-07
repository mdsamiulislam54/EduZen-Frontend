import SubscriptionPlanCard from "@/components/modules/Dashboard/admin/subscription/subscription-plan-card"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getAllSubscriptionPlans } from "./_actions"


const SubscriptionPlanPage = async () => {
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => getAllSubscriptionPlans()
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SubscriptionPlanCard />
    </HydrationBoundary>
  )
}

export default SubscriptionPlanPage