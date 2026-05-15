

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getSubscriptionPlanById } from '@/app/(dashboardLayout)/dashboard/admin/subscription-plan/_actions';
import PaymentController from '@/components/modules/Payment/payment';
import { Elements } from '@stripe/react-stripe-js';
import StripeProvider from '@/provider/StripeProvider';

const PaymentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['getSubscriptionPlanById', id],
        queryFn: () => getSubscriptionPlanById(id),
        staleTime: 0,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StripeProvider>
                <PaymentController id={id} />
            </StripeProvider>


        </HydrationBoundary>
    )
}

export default PaymentPage