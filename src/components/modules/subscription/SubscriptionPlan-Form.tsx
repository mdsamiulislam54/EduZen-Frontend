"use client"
import { createSubscriptionPlan } from "@/app/(dashboardLayout)/dashboard/admin/subscription-create/_actions"
import { Card, CardHeader } from "@/components/ui/card"
import AppField from "@/shared/from/AppField"
import AppSubmitButton from "@/shared/from/SubmitButton"
import { subscriptionPlanSchema, TSubscriptionPlan } from "@/zod/subscription.zod.schema"

import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const SubscriptionPlanForm = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-subscription-plan"],
        mutationFn: (data: TSubscriptionPlan) => createSubscriptionPlan(data),
        onError: (error) => {
            toast.error("Failed to create subscription plan: " + error.message);
        },
        onSuccess: () => {
            toast.success("Subscription Plan Created Successfully");
            form.reset();
        }
    })
    const form = useForm({
        defaultValues: {
            name: "",
            price: 0,
            duration_days: 30,
            max_students: 0,
            max_teachers: 0,
            max_batches: 0,


        },
        onSubmit: async ({ value }) => {
          await mutateAsync(value);
          

        }

    })
    return (
        <div>
            <Card className="w-full p-2">
                <CardHeader>
                    <h1 className="text-2xl font-bold">Create Subscription Plan</h1>
                </CardHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-10"
                >
                    <div className="grid md:grid-cols-2 gap-5">
                        <form.Field
                            name='name'
                            validators={{ onChange: subscriptionPlanSchema.shape.name }}
                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Plan Name'
                                        placeholder='Enter Plan Name'
                                        type="text"
                                        className=""

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='price'
                            validators={{ onChange: subscriptionPlanSchema.shape.price }}
                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Price'
                                        placeholder='Enter Price'
                                        type="number"
                                        className=""

                                    />


                                )
                            }

                        </form.Field>

                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                        <form.Field
                            name='duration_days'
                            validators={{ onChange: subscriptionPlanSchema.shape.duration_days }}
                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Duration (Days)'
                                        placeholder='Enter Duration'
                                        type="number"
                                        className=""

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='max_students'
                            validators={{ onChange: subscriptionPlanSchema.shape.max_students }}
                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Max Students'
                                        placeholder='Enter Max Students'
                                        type="number"
                                        className=""

                                    />


                                )
                            }

                        </form.Field>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">

                        <form.Field
                            name='max_teachers'
                            validators={{ onChange: subscriptionPlanSchema.shape.max_teachers }}
                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Max Teachers'
                                        placeholder='Enter Max Teachers'
                                        type="number"
                                        className=""

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='max_batches'
                            validators={{ onChange: subscriptionPlanSchema.shape.max_batches }}
                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Max Batches'
                                        placeholder='Enter Max Batches'
                                        type="number"
                                        className=""

                                    />


                                )
                            }

                        </form.Field>
                    </div>

                    <form.Subscribe selector={(s) => [s.canSubmit]}>
                        {
                            ([canSubmit]) => (
                                <AppSubmitButton
                                    isPending={isPending}
                                    disabled={!canSubmit || isPending}

                                >
                                    Create Plan
                                </AppSubmitButton>
                            )
                        }
                    </form.Subscribe>

                </form>
            </Card>
        </div>
    )
}

export default SubscriptionPlanForm