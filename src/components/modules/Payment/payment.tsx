"use client";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    BadgeDollarSign,
    ShieldCheck,
    CreditCard,
    Lock,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSubscriptionPlanById } from "@/app/(dashboardLayout)/dashboard/admin/subscription-plan/_actions";
import {
    Landmark,
    Wallet,

} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPayment } from "@/app/(commonLayout)/payment/[id]/_actions";

const PaymentController = ({ id }: { id: string }) => {

    const router = useRouter()
    const { data: subscription } = useQuery({
        queryKey: ['getSubscriptionPlanById', id],
        queryFn: () => getSubscriptionPlanById(id),
    });
    const { mutateAsync: createCheckout, isPending } = useMutation({
        mutationFn: createPayment,
    });
    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!subscription?.id) {
            return toast.error("planId not provided")
        }
        try {
            if (!subscription || !subscription.id) {
                return toast.error("Plan not loaded yet");
            }
            const res = await createCheckout({
                subscriptionId: subscription.id,
            });

            toast.success("Redirecting to payment page...");

            if (res?.checkoutUrl) {
                router.push(res?.checkoutUrl)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        }

    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">



                {/* RIGHT SIDE */}
                <Card className="rounded-3xl border shadow-sm ">
                    <CardHeader className="space-y-3">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-primary" />

                            <CardTitle className="text-2xl font-bold">
                                Card Payment
                            </CardTitle>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Enter your card information to complete your
                            payment.
                        </p>
                    </CardHeader>

                    <CardContent>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {/* SECURITY NOTE */}
                            <div className="flex items-start gap-2 text-muted-foreground">
                                <Lock className="w-4 h-4 mt-0.5" />

                                <p className="text-xs leading-relaxed">
                                    Your card details are securely encrypted
                                    and never stored on our servers.
                                </p>
                            </div>

                            {/* BUTTON */}
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full h-11 rounded-xl text-sm font-semibold"
                            >
                                {isPending
                                    ? "Processing..."
                                    : `Pay Now ৳ ${subscription?.price}`}
                            </Button>

                        </form>

                    </CardContent>

                    {/* Supported Cards */}
                    <div className="flex items-center gap-3 pt-25 flex-wrap justify-center">

                        <div className="h-11 w-16 rounded-2xl border bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white shadow-sm">
                            <CreditCard className="w-5 h-5" />
                            <span className="text-[10px] font-medium">
                                Visa
                            </span>
                        </div>

                        <div className="h-11 w-16 rounded-2xl border bg-gradient-to-br from-orange-500 to-red-500 flex flex-col items-center justify-center text-white shadow-sm">
                            <Wallet className="w-5 h-5" />
                            <span className="text-[10px] font-medium">
                                Master
                            </span>
                        </div>

                        <div className="h-11 w-16 rounded-2xl border bg-gradient-to-br from-cyan-500 to-sky-600 flex flex-col items-center justify-center text-white shadow-sm">
                            <BadgeDollarSign className="w-5 h-5" />
                            <span className="text-[10px] font-medium">
                                Amex
                            </span>
                        </div>

                        <div className="h-11 w-16 rounded-2xl border bg-gradient-to-br from-emerald-500 to-green-600 flex flex-col items-center justify-center text-white shadow-sm">
                            <Landmark className="w-5 h-5" />
                            <span className="text-[10px] font-medium">
                                Discover
                            </span>
                        </div>

                        <div className="h-11 w-16 rounded-2xl border bg-gradient-to-br from-purple-500 to-pink-600 flex flex-col items-center justify-center text-white shadow-sm">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-[10px] font-medium">
                                Secure
                            </span>
                        </div>

                    </div>
                </Card>
                {/* LEFT SIDE */}
                <Card className="rounded-3xl border shadow-sm">
                    <CardHeader className="space-y-3">
                        <div className="flex items-center gap-2">
                            <BadgeDollarSign className="w-5 h-5 text-primary" />

                            <CardTitle className="text-2xl font-bold">
                                Payment Summary
                            </CardTitle>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Complete your subscription payment securely
                            using Stripe payment gateway.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">

                        {/* PLAN INFO */}
                        <div className="rounded-2xl border p-4 space-y-4 bg-muted/30">

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Subscription Name
                                </span>

                                <span className="font-semibold">
                                    {subscription?.name}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Duration
                                </span>

                                <span className="font-medium">
                                    {subscription?.duration_days}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Max Students
                                </span>

                                <span className="font-medium">
                                    {subscription?.max_students}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Has batch
                                </span>

                                <span className="font-medium">
                                    {subscription?.max_batches}
                                </span>
                            </div>

                            <div className="border-t pt-4 flex items-center justify-between">
                                <span className="text-base font-semibold">
                                    Total
                                </span>

                                <span className="text-2xl font-bold">
                                    ৳{subscription?.price}
                                </span>
                            </div>
                        </div>


                        {/* SECURITY */}
                        <div className="rounded-2xl border bg-muted/30 p-4 flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />

                            <div>
                                <h4 className="text-sm font-semibold">
                                    Secure Payment
                                </h4>

                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    Your payment information is encrypted and
                                    securely processed by Stripe.
                                </p>
                            </div>
                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default PaymentController;