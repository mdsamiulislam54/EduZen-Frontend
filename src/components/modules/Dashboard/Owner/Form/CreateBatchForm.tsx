"use client"

import { createBatch, updateBatch } from "@/app/(dashboardLayout)/dashboard/owner/batch/_actions";
import { IBatch, IBatchUpdate, ICreateBatchPayload } from "@/types/batch.type";
import { useForm } from "@tanstack/react-form";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getBatchDefaultValues } from "../Batch/GetDefaultValues";
import AppSubmitButton from "@/shared/from/SubmitButton";
import { createBatchSchema } from "@/zod/Batch.schema";
import AppMultiSelect from "@/shared/from/MultiSelect";
import AppField from "@/shared/from/AppField";
import { getAllTeacher } from "@/app/(dashboardLayout)/dashboard/owner/teacher/_actions";
import AppSelect from "@/shared/from/AppSelect";
import { toBdISOString } from "@/lib/utils";
interface ICreateBatchProps {
    onClose: () => void;
    mode?: "create" | "edit",
    initialData?: IBatch | null
}
const CreateBatchForm = ({ onClose, mode = 'create', initialData }: ICreateBatchProps) => {
    const queryClient = new QueryClient()
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-subject"],
        mutationFn: async (data: ICreateBatchPayload) => createBatch(data),
        onError: (error) => {
            toast.error("Failed to create subject: " + error.message);
        },
        onSuccess: () => {
            toast.success("Subject  Created Successfully");
            queryClient.invalidateQueries({ queryKey: ["batch"] })
            onClose()
            form.reset();
        }
    })

    const { data: teachers } = useQuery({
        queryKey: ["teacher"],
        queryFn: async () => await getAllTeacher()
    })
    const { mutateAsync: updateMutate, isPending: updateIsPending } = useMutation({
        mutationKey: ["update-subject"],
        mutationFn: async (data: Partial<IBatchUpdate> & { id?: string }) => updateBatch(data, data.id!),
        onError: (error) => {
            toast.error("Failed to Update subject: " + error.message);
        },
        onSuccess: () => {
            toast.success("Subject  Update Successfully");
            onClose()
            form.reset();
        }
    })
    const form = useForm({
        defaultValues: getBatchDefaultValues(mode, initialData),
        onSubmit: async ({ value }) => {
            if (mode === "edit") {
                await updateMutate({ ...value, id: initialData?.id })
            } else {
                if (!value.batchData.startTime || !value.batchData.endTime) {
                    throw new Error("Start time and end time required")
                }
                const batchData = {
                    amount: value?.amount ?? 0,
                    feeType: value?.feeType ?? [],
                    teacherIds: value?.teacherIds ?? [],
                    batchData: {
                        ...value.batchData,
                        startTime: toBdISOString(value.batchData.startTime),
                        endTime: toBdISOString(value.batchData.endTime)
                    }
                } as ICreateBatchPayload
                console.log(batchData)
                await mutateAsync(batchData);
            }
        }

    })

    const daysOfWeek = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
    ]
    return (
        <div>
            <form

                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="space-y-5 "
            >
                <div className='space-y-4'>

                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name="batchData.batchName"
                            validators={{ onChange: createBatchSchema.shape.batchData.shape.batchName }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Batch Name '
                                        placeholder='Enter Batch Name..'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name="batchData.batchCode"
                            validators={{ onChange: createBatchSchema.shape.batchData.shape.batchCode }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Batch Code '
                                        placeholder='Enter Batch Code...'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>

                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name="batchData.max_students"
                            validators={{ onChange: createBatchSchema.shape.batchData.shape.max_students }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Max Students '
                                        placeholder='Enter max students...'
                                        type="number"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name="batchData.daysOfWeek"
                        // validators={{ onChange: createBatchSchema.shape.batchData.shape.daysOfWeek }}

                        >
                            {(field) => (
                                <AppMultiSelect
                                    field={field}
                                    label=" DaysOfWeek"
                                    options={
                                        daysOfWeek?.map((week) => ({
                                            label: week,
                                            value: week,
                                        })) ?? []
                                    }
                                />
                            )}

                        </form.Field>

                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name="batchData.startTime"

                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Start Time"
                                    placeholder="Select start time"
                                    type="datetime-local"
                                    className="space-y-4"
                                />
                            )}
                        </form.Field>
                        <form.Field
                            name="batchData.endTime"

                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="End Time"
                                    placeholder="Select end time"
                                    type="datetime-local"
                                    className="space-y-4"
                                />
                            )}
                        </form.Field>

                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name="amount"
                            validators={{ onChange: createBatchSchema.shape.amount }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Batch Fee'
                                        placeholder='Enter Your Amount'
                                        type="number"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name="feeType"
                        // validators={{ onChange: createBatchSchema.shape.feeType }}

                        >
                            {(field) => (
                                <AppSelect
                                    field={field}
                                    label="FeeType"
                                    options={[
                                        { label: "MONTHLY", value: "MONTHLY" },
                                        { label: "COURSE", value: "COURSE" },
                                        { label: "ADMISSION", value: "ADMISSION" },
                                        { label: "EXAM", value: "EXAM" }
                                    ]}
                                />
                            )}

                        </form.Field>

                    </div>

                    <div className=' border-b border-purple-600'>
                        <form.Field name="teacherIds"
                            validators={{ onChange: createBatchSchema.shape.teacherIds }}
                        >
                            {(field) => (
                                <AppMultiSelect
                                    field={field}
                                    label=" Teachers"
                                    options={
                                        teachers?.data.map((tec) => ({
                                            label: tec.name,
                                            value: tec.id,
                                        })) ?? []
                                    }
                                />
                            )}
                        </form.Field>
                    </div>

                </div>


                <form.Subscribe selector={(s) => [s.canSubmit]}>
                    {
                        ([canSubmit]) => (
                            <AppSubmitButton
                                isPending={isPending || updateIsPending}
                                disabled={!canSubmit || isPending || updateIsPending}

                            >
                                {mode === "create" ? " Create Batch" : "Update Batch"}
                            </AppSubmitButton>
                        )
                    }
                </form.Subscribe>

            </form>
        </div>
    )
}

export default CreateBatchForm