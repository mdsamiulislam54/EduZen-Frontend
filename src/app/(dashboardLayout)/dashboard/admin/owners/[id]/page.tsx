import React from 'react'
import { getAllOwnersById } from '../_actions';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import SingleOwnerProfileCard from '@/components/modules/Dashboard/admin/SingleOwnerProfileCard';

const OwnerDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['owner', id],
        queryFn: () => getAllOwnersById(id),
        staleTime: 0,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SingleOwnerProfileCard id={id} />
        </HydrationBoundary>
    )
}

export default OwnerDetailsPage