import { getAllSubscriptionPlans } from '@/app/(dashboardLayout)/dashboard/admin/subscription-plan/_actions'

import SubscriptionsCard from '@/components/modules/home/SubscriptionsCard'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
export const dynamic = "force-dynamic";

const SubscriptionPage = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["subscription-plan"],
        queryFn: () => getAllSubscriptionPlans(),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
         <div className='container-c min-h-screen mt-20'>
               <SubscriptionsCard/>
         </div>
        </HydrationBoundary>
    )
}

export default SubscriptionPage