import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getOwnerDashboardData } from './_actions';
import OwnerDashboardCardPage from '@/components/modules/Dashboard/Owner/DashboardCard/OwnerDashboardCard';

const OwnerPage = () => {
    const queryClient = new QueryClient();
    queryClient.prefetchQuery({
        queryKey: ['owner-dashboard-data'],
        queryFn: async () => await getOwnerDashboardData()
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
               <OwnerDashboardCardPage/>
            </div>
        </HydrationBoundary>
    )
}

export default OwnerPage