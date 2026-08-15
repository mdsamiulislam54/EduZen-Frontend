"use client";

import { getAllSubscriptionPlans } from "@/app/(dashboardLayout)/dashboard/admin/subscription-plan/_actions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    Check,
    Crown,

} from "lucide-react";
import { GraduationCap, Layers3, Users } from "lucide-react";
import Loader from "../Loader/loader";
import ErrorState from "../Error/Error";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
        return <ErrorState message="Subscription plans not found" />;
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {subscription?.map((plan, index) => {
                const isPopular = index === 1;

                return (
                    <Card
                        key={plan.id}
                        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isPopular
                            ? "border-primary/50 shadow-lg shadow-primary/10"
                            : "border-border/60"
                            }`}
                    >
                        {/* Popular Badge */}
                        {isPopular && (
                            <div className="absolute right-5 top-5">
                                <Badge className="gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground shadow-sm">
                                    <Crown className="size-3" />
                                    Most Popular
                                </Badge>
                            </div>
                        )}

                        {/* Top Glow */}
                        {isPopular && (
                            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-violet-500 to-primary" />
                        )}

                        {/* Header */}
                        <CardHeader className="p-6 pb-4">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <GraduationCap className="size-5" />
                            </div>

                          <div className="flex justify-between items-center">
                                <div className="mt-5">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold tracking-tight">
                                            {plan.name}
                                        </h3>

                                        <span
                                            className={`size-2 rounded-full ${plan.status === "ACTIVE"
                                                ? "bg-emerald-500"
                                                : "bg-red-500"
                                                }`}
                                        />
                                    </div>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {plan.duration_days} days access
                                    </p>
                                </div>
                           
                            {/* Price */}
                            <div className="mt-6 flex items-end gap-1">
                                <span className="text-4xl font-black tracking-tight">
                                    ৳{plan.price}
                                </span>

                                <span className="mb-1.5 text-xs text-muted-foreground">
                                    / {plan.duration_days} days
                                </span>
                            </div>
                            </div>
                        </CardHeader>

                        <CardContent className="flex flex-1 flex-col px-6 pb-6">
                            {/* Limits */}
                            <div className="grid grid-cols-3 gap-2 border-y border-border/60 py-5">
                                <div className="text-center">
                                    <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Users className="size-4" />
                                    </div>

                                    <p className="text-sm font-bold">
                                        {plan.max_students}
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                                        Students
                                    </p>
                                </div>

                                <div className="border-x border-border/60 text-center">
                                    <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <GraduationCap className="size-4" />
                                    </div>

                                    <p className="text-sm font-bold">
                                        {plan.max_teachers}
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                                        Teachers
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="mx-auto mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Layers3 className="size-4" />
                                    </div>

                                    <p className="text-sm font-bold">
                                        {plan.max_batches}
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                                        Batches
                                    </p>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mt-6 flex-1">
                                <p className="mb-4 text-sm font-semibold">
                                    {"What's"} included
                                </p>

                                <div className="space-y-3">
                                    {plan.features?.slice(0, 5).map(
                                        (feature: string, idx: number) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-2.5 text-sm text-muted-foreground"
                                            >
                                                <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <Check className="size-2.5" />
                                                </div>

                                                <span>{feature}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Button */}
                            <Button
                                onClick={() => router.push(`/payment/${plan.id}`)}
                                disabled={plan.status !== "ACTIVE"}
                                className={`mt-7 h-11 w-full rounded-xl gap-2 transition-all duration-300 ${isPopular
                                    ? "shadow-md shadow-primary/20"
                                    : ""
                                    }`}
                            >
                                {plan.status === "ACTIVE"
                                    ? "Choose Plan"
                                    : "Currently Unavailable"}

                                {plan.status === "ACTIVE" && (
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default SubscriptionsCard;