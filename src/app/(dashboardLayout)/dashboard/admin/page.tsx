import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import { adminDashboardActionCards } from './_actions';
import AdminDashboardCard from '@/components/modules/Dashboard/admin/DasboardCard/AdminDashboardCard';

const AdminPage = () => {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ['adminDashboardData'],
    queryFn: async() => await adminDashboardActionCards(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardCard/>
    </HydrationBoundary>
  )
}

export default AdminPage