"use client"
import { Card, CardHeader } from "@/components/ui/card"
import AppField from "@/shared/from/AppField"
import AppSubmitButton from "@/shared/from/SubmitButton"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {  TUpdateSubscriptionPlan, updateSubscriptionPlanSchema } from '@/zod/subscription.zod.schema';
import { updateSubscriptionPlan } from "@/app/(dashboardLayout)/dashboard/admin/subscription-create/_actions"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Dialog, DialogHeader, } from "@/components/ui/dialog"
interface SubscriptionPlanUpdateFromPageProps {
    onOpen: () => void;
    defaultValues: TUpdateSubscriptionPlan;
}
const SubscriptionPlanUpdateFromPage = ({ onOpen, defaultValues }: SubscriptionPlanUpdateFromPageProps) => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["update-subscription-plan"],
        mutationFn: async ({ planId, data }: { planId: string; data: Partial<TUpdateSubscriptionPlan> }) => updateSubscriptionPlan(planId, data),
        onError: (error) => {
            toast.error("Failed to update subscription plan: " + error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
            toast.success("Subscription Plan Updated Successfully");
            form.reset();
            onOpen();
        }
    })
    const form = useForm({
        defaultValues: {
            name: defaultValues.name,
            price: defaultValues.price,
            duration_days: defaultValues.duration_days,
            max_students: defaultValues.max_students,
            max_teachers: defaultValues.max_teachers,
            max_batches: defaultValues.max_batches,


        },
        onSubmit: async ({ value }) => {
            await mutateAsync({ planId: defaultValues.id!, data: value });

        }

    })
    return (
        <Dialog >

            <div>
                <Button variant="outline" onClick={onOpen} className="absolute top-2 right-2 dark:hover:bg-gray-900 transition-all duration-300 cursor-pointer"><X size={60} /></Button>
            </div>
            <Card className="w-10/12 p-4">
                <DialogHeader>
                    <h1 className="text-xl font-bold">Update Subscription Plan</h1>
                </DialogHeader>

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
                            validators={{ onChange: updateSubscriptionPlanSchema.shape.name }}
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
                            validators={{ onChange: updateSubscriptionPlanSchema.shape.price }}
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
                            validators={{ onChange: updateSubscriptionPlanSchema.shape.duration_days }}
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
                            validators={{ onChange: updateSubscriptionPlanSchema.shape.max_students }}
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
                            validators={{ onChange: updateSubscriptionPlanSchema.shape.max_teachers }}
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
                            validators={{ onChange: updateSubscriptionPlanSchema.shape.max_batches }}
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
                                    pendingLabel="Updating..."

                                >
                                    Update Plan
                                </AppSubmitButton>
                            )
                        }
                    </form.Subscribe>

                </form>
            </Card>
        </Dialog>
    )
}

export default SubscriptionPlanUpdateFromPage