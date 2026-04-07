"use client";

import { getAllSubscriptionPlans } from "@/app/(dashboardLayout)/dashboard/admin/subscription-plan/_actions";
import SubscriptionSkeletonCard from "@/components/SubscriptionSkeletonCard";
import { Card } from "@/components/ui/card";
import { TSubscriptionPlan } from "@/zod/subscription.zod.schema";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {

    CalendarDays,
    Users,

    Layers,
    UserCheck,
    X,
} from "lucide-react";
import ErrorState from "../../../Error/Error";
import { useState } from "react";
import SubscriptionPlanUpdateFromPage from "./Subscription-plan-update";

const SubscriptionPlanCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<TSubscriptionPlan | null>(null);

    const { data, isPending, isError } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getAllSubscriptionPlans(),
    });


    // 🔥 Delete Mutation
    // const deleteMutation = useMutation({
    //     mutationFn: async (id: string) => {

    //         // await deleteSubscriptionPlan(id)
    //         console.log("Delete:", id);
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
    //     },
    // });

    if (isPending) {
        return <SubscriptionSkeletonCard />;
    }

    if (isError) {
        return (
            <ErrorState
                message="Failed to load subscription plans."
            />
        );
    }

    const handleOpenUpdateForm = (plan?: TSubscriptionPlan) => {
        if (plan) {
            setSelectedPlan(plan);
        }
        setIsOpen(!isOpen);
    }
    return (
        <div className="relative">
            <div className="grid gap-5 sm:grid-cols-3 xl:grid-col-4">
                {data?.map((plan: TSubscriptionPlan) => (
                    <Card
                        key={plan.id}
                        className="h-full flex flex-col p-5 rounded-2xl border hover:shadow-lg transition-all duration-300"
                    >
                        {/* CONTENT */}
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">{plan.name}</h2>

                                <span
                                    className={`text-xs px-2 py-1 rounded ${plan.status === "ACTIVE"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {plan.status}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 text-primary font-bold text-xl">
                                {plan.price}
                            </div>

                            {/* Info */}
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-primary" />
                                    <span>
                                        <span className="font-medium text-foreground">
                                            {plan.duration_days}
                                        </span>{" "}
                                        Days Duration
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span>
                                        Up to{" "}
                                        <span className="font-medium text-foreground">
                                            {plan.max_students}
                                        </span>{" "}
                                        Students
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <UserCheck className="w-4 h-4 text-primary" />
                                    <span>
                                        Up to{" "}
                                        <span className="font-medium text-foreground">
                                            {plan.max_teachers}
                                        </span>{" "}
                                        Teachers
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-primary" />
                                    <span>
                                        <span className="font-medium text-foreground">
                                            {plan.max_batches}
                                        </span>{" "}
                                        Batches
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex flex-col gap-2 mt-5">
                            <Button variant="outline" className="w-full cursor-pointer" onClick={() => handleOpenUpdateForm(plan)}>
                                Edit
                            </Button>

                            <Button variant="destructive" className="w-full cursor-pointer">
                                Delete
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {isOpen && selectedPlan ? (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-50">
                    <SubscriptionPlanUpdateFromPage onOpen={handleOpenUpdateForm} defaultValues={selectedPlan} />
                </div>
            ) : null}
        </div>
    );
};

export default SubscriptionPlanCard;