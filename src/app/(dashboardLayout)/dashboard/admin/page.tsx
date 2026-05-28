import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import { adminChartData, adminDashboardActionCards } from './_actions';
import AdminDashboardCard from '@/components/modules/Dashboard/admin/DasboardCard/AdminDashboardCard';
import AdminChart from '@/components/modules/Dashboard/admin/Chart/AdminChart';

const AdminPage = () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ['adminDashboardData'],
    queryFn: async() => await adminDashboardActionCards(),
  });
  queryClient.prefetchQuery({
    queryKey: ['adminDashboardData'],
    queryFn: async() => await adminDashboardActionCards(),
  });
  queryClient.prefetchQuery({
    queryKey: ['adminChartData'],
    queryFn: async() => await adminChartData(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardCard/>
      <AdminChart/>
    </HydrationBoundary>
  )
}

export default AdminPage