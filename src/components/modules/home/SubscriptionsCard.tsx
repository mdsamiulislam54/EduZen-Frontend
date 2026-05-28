"use client";

import {
    getAllSubscriptionPlans,
} from "@/app/(dashboardLayout)/dashboard/admin/subscription-plan/_actions";

import { useQuery } from "@tanstack/react-query";

import Loader from "../Loader/loader";
import ErrorState from "../Error/Error";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {

    CheckCircle2,
    
} from "lucide-react";

import { useRouter } from "next/navigation";

const SubscriptionsCard = () => {
    const router = useRouter();

    const {
        data: subscription,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ["subscription-plan"],
        queryFn: () => getAllSubscriptionPlans(),
    });

    if (isFetching) {
        return <Loader length={3} />;
    }

    if (isError) {
        return (
            <ErrorState message="Subscription plans not found" />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subscription?.map((plan, index) => {
            
                return (
                    <Card
                        key={plan.id}
                        className={`relative overflow-hidden rounded-2xl  bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${index === 1 ? "border-primary" : ""
                            }`}
                    >
                        {/* TOP LINE */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-primary to-purple-500 animate-pulse" />

                        <CardHeader className="p-4 pb-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg font-bold">
                                        {plan.name}
                                    </CardTitle>

                                    <p className="text-xs text-muted-foreground mt-1">
                                        {plan.duration_days} Days Access
                                    </p>
                                </div>

                                <Badge
                                    className={`text-[10px] rounded-full px-2 py-0.5 ${plan.status === "ACTIVE"
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                            : "bg-red-500/10 text-red-500"
                                        }`}
                                >
                                    {plan.status}
                                </Badge>
                            </div>

                            {/* PRICE */}
                            <div className="mt-4 flex items-end gap-1 justify-end">
                                <span className="text-3xl font-black tracking-tight">
                                    ৳{plan.price}
                                </span>

                                <span className="text-xs text-muted-foreground mb-1">
                                    /month
                                </span>
                            </div>
                        </CardHeader>

                        <CardContent className="px-4 pb-4 space-y-4">
                            {/* STATS */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="rounded-xl border bg-muted/40 p-2 text-center">
                                    <p className="text-sm font-bold">
                                        {plan.max_students}
                                    </p>

                                    <p className="text-[10px] text-muted-foreground">
                                        Students
                                    </p>
                                </div>

                                <div className="rounded-xl border bg-muted/40 p-2 text-center">
                                    <p className="text-sm font-bold">
                                        {plan.max_teachers}
                                    </p>

                                    <p className="text-[10px] text-muted-foreground">
                                        Teachers
                                    </p>
                                </div>

                                <div className="rounded-xl border bg-muted/40 p-2 text-center">
                                    <p className="text-sm font-bold">
                                        {plan.max_batches}
                                    </p>

                                    <p className="text-[10px] text-muted-foreground">
                                        Batches
                                    </p>
                                </div>
                            </div>

                            {/* FEATURES */}
                            <div className="space-y-2">
                                {plan.features?.slice(0, 4).map(
                                    (feature: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 text-xs text-muted-foreground"
                                        >
                                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />

                                            <span>{feature}</span>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* BUTTON */}
                            <Button
                                onClick={() => router.push(`/payment/${plan.id}`)}
                                className="w-full rounded-xl h-9 text-sm cursor-pointer"
                            >
                                Buy Now
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default SubscriptionsCard;