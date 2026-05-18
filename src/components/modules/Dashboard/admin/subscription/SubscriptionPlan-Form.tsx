"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


import { createSubscriptionPlan } from "@/app/(dashboardLayout)/dashboard/admin/subscription-create/_actions";
import { subscriptionPlanSchema, TSubscriptionPlan } from "@/zod/subscription.zod.schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AppField from "@/shared/from/AppField";
import AppSubmitButton from "@/shared/from/SubmitButton";

const SubscriptionPlanForm = () => {

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-subscription-plan"],
        mutationFn: async (data: TSubscriptionPlan) =>
            createSubscriptionPlan(data),
        onError: (error) => {
            toast.error("Failed: " + error.message);
        },
        onSuccess: () => {
            toast.success("Subscription Plan Created Successfully");
            form.reset();
        },
    });

    const form = useForm({
        defaultValues: {
            name: "",
            price: 0,
            duration_days: 30,
            max_students: 0,
            max_teachers: 0,
            max_batches: 0,
            features: '',
        },
        onSubmit: async ({ value }) => {

            const payload = {
                ...value,
                features: value.features.split(",").map((f) => f.trim()) || []
            };

            console.log(payload)
            await mutateAsync(payload);
        },
    });

    return (
        <div className="max-w-4xl mx-auto">
            <Card className="border bg-background">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Create Subscription Plan
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Configure limits and features for plan
                    </p>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-8"
                    >
                        {/* BASIC INFO */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <form.Field
                                name="name"
                                validators={{ onChange: subscriptionPlanSchema.shape.name }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Plan Name"
                                        placeholder="Enter plan name"
                                        type="text"
                                    />
                                )}
                            </form.Field>

                            <form.Field
                                name="price"
                                validators={{ onChange: subscriptionPlanSchema.shape.price }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Price"
                                        placeholder="Enter price"
                                        type="number"
                                    />
                                )}
                            </form.Field>
                        </div>

                        {/* LIMITS */}
                        <div className="grid md:grid-cols-3 gap-5">
                            <form.Field
                                name="duration_days"
                                validators={{
                                    onChange: subscriptionPlanSchema.shape.duration_days,
                                }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Duration (Days)"
                                        type="number"
                                    />
                                )}
                            </form.Field>

                            <form.Field
                                name="max_students"
                                validators={{
                                    onChange: subscriptionPlanSchema.shape.max_students,
                                }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Max Students"
                                        type="number"
                                    />
                                )}
                            </form.Field>

                            <form.Field
                                name="max_teachers"
                                validators={{
                                    onChange: subscriptionPlanSchema.shape.max_teachers,
                                }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Max Teachers"
                                        type="number"
                                    />
                                )}
                            </form.Field>
                        </div>

                        <form.Field
                            name="max_batches"
                            validators={{
                                onChange: subscriptionPlanSchema.shape.max_batches,
                            }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Max Batches"
                                    type="number"
                                />
                            )}
                        </form.Field>

                        <form.Field name="features">
                            {(field) => (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Features</label>

                                    <textarea
                                        value={field.state.value as unknown as string}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder={`Enter features one per line:

                                        SMS System
                                        Exam Management
                                        Attendance Tracking`}
                                        className="w-full min-h-[120px] rounded-md border bg-background px-3 py-2 text-sm"
                                    />

                                    <p className="text-xs text-muted-foreground">

                                    </p>
                                </div>
                            )}
                        </form.Field>

                        {/* SUBMIT */}
                        <form.Subscribe selector={(s) => [s.canSubmit]}>
                            {([canSubmit]) => (
                                <AppSubmitButton
                                    isPending={isPending}
                                    disabled={!canSubmit || isPending}
                                >
                                    Create Plan
                                </AppSubmitButton>
                            )}
                        </form.Subscribe>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SubscriptionPlanForm;