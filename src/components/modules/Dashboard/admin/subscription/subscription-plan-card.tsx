"use client";

import { deleteSubscriptionPlan, getAllSubscriptionPlans } from "@/app/(dashboardLayout)/dashboard/admin/subscription-plan/_actions";
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
import { toast } from "sonner";

const SubscriptionPlanCard = () => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<TSubscriptionPlan | null>(null);
    const [deleteMutation, setDeleteMutation] = useState("")

    const { data, isPending, isError } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getAllSubscriptionPlans(),
    });



    const { mutateAsync, isPending: isDeleting } = useMutation({
        mutationFn: async (id: string) => {
            setDeleteMutation(id)
            await deleteSubscriptionPlan(id)
        },
        onError: (error) => {
            console.error("Failed to delete subscription plan:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
            toast.success("Subscription Plan Deleted Successfully");
        },
    });

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
                        className="relative flex flex-col justify-between p-6 rounded-2xl border bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* STATUS + TITLE */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{plan.name}</h2>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {plan.duration_days} Days Plan
                                </p>
                            </div>

                            <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${plan.status === "ACTIVE"
                                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                        : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {plan.status}
                            </span>
                        </div>

                        {/* PRICE */}
                        <div className="mt-4">
                            <h1 className="text-3xl font-bold text-primary">
                                ${plan.price}
                                <span className="text-sm text-muted-foreground font-normal">
                                    /month
                                </span>
                            </h1>
                        </div>

                        {/* INFO GRID */}
                        <div className="mt-6 space-y-3 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Students</span>
                                <span className="text-foreground font-medium">
                                    {plan.max_students}
                                </span>
                            </div>

                            <div className="flex justify-between text-muted-foreground">
                                <span>Teachers</span>
                                <span className="text-foreground font-medium">
                                    {plan.max_teachers}
                                </span>
                            </div>

                            <div className="flex justify-between text-muted-foreground">
                                <span>Batches</span>
                                <span className="text-foreground font-medium">
                                    {plan.max_batches}
                                </span>
                            </div>
                        </div>

                        {/* FEATURES */}
                        <div className="mt-5">
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                                Features
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {(plan.features ?? []).slice(0, 5).map((f, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                                    >
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-6 flex flex-col gap-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleOpenUpdateForm(plan)}
                            >
                                Edit Plan
                            </Button>

                            <Button
                                variant="destructive"
                                className="w-full"
                                onClick={async () => await mutateAsync(plan.id as string)}
                            >
                                {isDeleting && deleteMutation === plan.id
                                    ? "Deleting..."
                                    : "Delete"}
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