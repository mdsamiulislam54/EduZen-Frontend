"use client";

import { getOwnerSubscription } from "@/app/(dashboardLayout)/dashboard/owner/subscription/_actions";
import ErrorState from "@/components/modules/Error/Error";
import Loader from "@/components/modules/Loader/loader";
import { useQuery } from "@tanstack/react-query";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
    CheckCircle2,
    CalendarDays,
    Crown,
    Building2,
} from "lucide-react";

const SubscriptionCard = () => {
    const { data, isPending, isError } = useQuery({
        queryKey: ["owner-subscription"],
        queryFn: getOwnerSubscription,
    });

    if (isPending) return <Loader length={1} />;
    if (isError)
        return <ErrorState message="owner subscription card not found" />;

    const subscription = data?.subscription;
    const center = data?.coachingCenter;

    if (!subscription) {
        return (
            <Card className="p-5 text-center">
                <p className="text-sm text-muted-foreground">
                    No active subscription found
                </p>
            </Card>
        );
    }

    return (
        <Card className="max-w-sm">
            <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        {subscription.plan.name}
                    </CardTitle>

                    <Badge
                        className={
                            subscription.status === "ACTIVE"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-red-500/10 text-red-500"
                        }
                    >
                        {subscription.status}
                    </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5" />
                    {center?.name}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* PRICE */}
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-2xl font-bold">
                            ৳ {subscription.plan.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            per month
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(subscription.endDate).toLocaleDateString()}
                    </div>
                </div>

                <Separator />

                {/* FEATURES */}
                <div className="space-y-2">
                    {subscription.plan.features.slice(0, 5).map(
                        (feature: string, idx: number) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 text-xs"
                            >
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                <span className="text-muted-foreground">
                                    {feature}
                                </span>
                            </div>
                        )
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default SubscriptionCard;