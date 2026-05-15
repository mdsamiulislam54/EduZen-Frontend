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
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    CalendarDays,
    Users,
    UserCog,
    Layers3,
    ClipboardCheck,
    MessageSquare,
    FileText,
    CheckCircle2,
    XCircle,
    Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

const SubscriptionsCard = () => {
    const router = useRouter()
    const {
        data: subscription,
        isFetching,
        isError, } = useQuery({
            queryKey: ["subscription-plan"],
            queryFn: () => getAllSubscriptionPlans(),
        });

    if (isFetching) {
        return <Loader length={4} />;
    }

    if (isError) {
        return (
            <ErrorState message="Subscription plans not found" />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {subscription?.map((plan) => {
                const features = [
                    {
                        label: `${plan.max_students} Students`,
                        icon: Users,
                    },
                    {
                        label: `${plan.max_teachers} Teachers`,
                        icon: UserCog,
                    },
                    {
                        label: `${plan.max_batches} Batches`,
                        icon: Layers3,
                    },
                    {
                        label: `${plan.duration_days} Days Access`,
                        icon: CalendarDays,
                    },
                ];

                const extraFeatures = [
                    {
                        label: "Attendance System",
                        enabled: plan.has_attendance,
                        icon: ClipboardCheck,
                    },
                    {
                        label: "SMS Notification",
                        enabled: plan.has_sms,
                        icon: MessageSquare,
                    },
                    {
                        label: "Exam Management",
                        enabled: plan.has_exam,
                        icon: FileText,
                    },
                ];

                return (
                    <Card
                        key={plan.id}
                        className="relative overflow-hidden hover:bg-purple-500/20 hover:cursor-pointer transition-all duration-300"
                    >
                        {/* Top Gradient */}
                        <div className="absolute bottom-0 left-0 h-1 w-full gradient" />

                        <CardHeader className="space-y-2 pb-2 p-4">
                            <div className="flex items-center justify-between">
                                <Badge
                                    variant="secondary"
                                    className="rounded-full px-2 py-0.5 text-[11px]"
                                >
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Plan
                                </Badge>

                                <Badge
                                    className={
                                        plan.status === "ACTIVE"
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400 text-[11px]"
                                            : "bg-red-500/10 text-red-600 dark:text-red-400 text-[11px]"
                                    }
                                >
                                    {plan.status || "ACTIVE"}
                                </Badge>
                            </div>

                            <div>
                                <CardTitle className="text-lg font-semibold tracking-tight flex justify-between items-center">
                                    <span>{plan.name}</span>
                                    <div className="mt-1 flex items-end gap-1">
                                        <span className="text-2xl font-bold">
                                            ৳ {plan.price}
                                        </span>

                                        <span className="text-muted-foreground text-xs mb-0.5">
                                            / month
                                        </span>
                                    </div>
                                </CardTitle>


                            </div>
                        </CardHeader>

                        <CardContent className="space-y-3 p-4 pt-0">
                            {/* Main Features */}
                            <div className="space-y-2">
                                {features.map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 rounded-lg border p-0 bg-muted/30"
                                        >
                                            <div className="rounded-md bg-primary/10 p-1.5">
                                                <Icon className="h-4 w-4 text-primary" />
                                            </div>

                                            <p className="text-xs font-medium">
                                                {item.label}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Extra Features */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-muted-foreground">
                                    Features
                                </h4>

                                {extraFeatures.map((feature, index) => {
                                    const Icon = feature.icon;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg border "
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="rounded-md bg-muted p-1.5">
                                                    <Icon className="h-3.5 w-3.5" />
                                                </div>

                                                <span className="text-xs font-medium">
                                                    {feature.label}
                                                </span>
                                            </div>

                                            {feature.enabled ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-red-500" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Description */}
                            <div className="rounded-xl border bg-muted/30 p-3 text-[11px] text-muted-foreground leading-relaxed">
                                Perfect for coaching centers managing students,
                                teachers, attendance, exams, and communication.
                            </div>
                        </CardContent>


                        <div className="p-2">
                            <Button
                                onClick={() => {
                                    router.push(`/payment/${plan.id}`)
                                }}
                                variant={"outline"} className="w-full h-9 text-sm rounded-xl cursor-pointer">
                                Buy Now
                            </Button>
                        </div>

                    </Card>
                );
            })}
        </div>
    );
};

export default SubscriptionsCard;