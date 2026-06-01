import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getOwnerSubscription } from "./_actions";
import SubscriptionCard from "@/components/modules/Dashboard/Owner/Subscription/SubscriptionCard";
export const dynamic = "force-dynamic";

const OwnerSubscriptionPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["owner-subscription"],
    queryFn: getOwnerSubscription
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SubscriptionCard />
    </HydrationBoundary>
  )
}

export default OwnerSubscriptionPage