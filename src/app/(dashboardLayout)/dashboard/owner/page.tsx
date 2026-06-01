import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getOwnerDashboardChartData, getOwnerDashboardData } from './_actions';
import OwnerDashboardCardPage from '@/components/modules/Dashboard/Owner/DashboardCard/OwnerDashboardCard';
import ChartData from '@/components/modules/Dashboard/Owner/DashboardCard/ChartData';
export const dynamic = "force-dynamic";
const OwnerPage = async () => {
    const queryClient = new QueryClient();
    Promise.all([
        queryClient.prefetchQuery({
            queryKey: ["ownerDashboardData"],
            queryFn: async () => await getOwnerDashboardData()
        }),
        queryClient.prefetchQuery({
            queryKey: ["ownerDashboardChartData"],
            queryFn: async () => await getOwnerDashboardChartData()
        })
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <OwnerDashboardCardPage />
                <ChartData />
            </div>
        </HydrationBoundary>
    )
}

export default OwnerPage