"use client"

import { createExam, ICreateExam, IUpdateExam, updateExam } from '@/app/(dashboardLayout)/dashboard/owner/exam/_actions';
import { getAllSubject } from '@/app/(dashboardLayout)/dashboard/owner/subject/_actions';
import AppField from '@/shared/from/AppField';
import AppSubmitButton from '@/shared/from/SubmitButton';

import { useForm } from '@tanstack/react-form';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { getExamDefaultValue } from '../Exam/GetExamDefaultValue';
import AppSelect from '@/shared/from/AppSelect';
import { examSchema } from '@/zod/Exam.zod.scema';
import { getAllBatch } from '@/app/(dashboardLayout)/dashboard/owner/batch/_actions';
interface CreateSubjectFormProps {
    onClose: () => void;
    mode?: "create" | "edit",
    initialData?: ICreateExam | null
}

const CreateExamFormPage = ({ onClose, mode = "create", initialData }: CreateSubjectFormProps) => {
    const router = useRouter();
    const queryClient = new QueryClient()
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-exam"],
        mutationFn: async (data: ICreateExam) => createExam(data)

    });

    const { data: subject } = useQuery({
        queryKey: ["subject"],
        queryFn: () => getAllSubject()
    })
    const { data: batch } = useQuery({
        queryKey: ["batch"],
        queryFn: () => getAllBatch()
    })


    const { mutateAsync: updateMutate, isPending: updateIsPending } = useMutation({
        mutationKey: ["update-exam"],
        mutationFn: async (data: Partial<IUpdateExam> & { id?: string }) => updateExam(data.id!, data,),
        
    })
    const form = useForm({
        defaultValues: getExamDefaultValue(mode, initialData as ICreateExam),
        onSubmit: async ({ value }) => {
            try {
                if (mode === "edit") {
                    await updateMutate({ ...value, id: initialData?.id })
                    toast.success("Exam Update Successfully!")
                    onClose()
                    queryClient.invalidateQueries({ queryKey: ["exam"] })
                    router.push(window.location.href)
                } else {
                    console.log(value)
                    await mutateAsync(value);
                    toast.success("Exam Create Successfully!")
                    onClose()
                    queryClient.invalidateQueries({ queryKey: ["exam"] })

                }
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message)
                }
            }
        }

    })
    return (
        <div>
            <form

                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="space-y-5"
            >
                <div className='space-y-5 overflow-y-scroll'>
                    <div className='grid md:grid-cols-2 gap-4 items-center'>
                        <form.Field
                            name='name'
                            validators={{ onChange: examSchema.shape.name }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Exam Name'
                                        placeholder='Enter Subject Name'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='totalMarks'
                            validators={{ onChange: examSchema.shape.totalMarks }}

                        >
                            {
                                (filed) => (

                                    <AppSelect
                                        label='Marks'
                                        field={filed}
                                        options={[
                                            { label: "100", value: 100 },
                                            { label: "80", value: 80 },
                                            { label: "60", value: 60 },
                                            { label: "50", value: 50 },
                                            { label: "30", value: 30 },
                                            { label: "20", value: 20 },
                                        ]}
                                    />


                                )
                            }

                        </form.Field>

                    </div>
                    <div className='grid md:grid-cols-2 gap-4 items-center'>
                        <form.Field
                            name='examDate'
                            validators={{ onChange: examSchema.shape.examDate }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Exam Date'
                                        type="date"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='passMarks'
                            validators={{ onChange: examSchema.shape.passMarks }}

                        >
                            {
                                (filed) => (

                                    <AppSelect
                                        label='PassMarks'
                                        field={filed}
                                        options={[
                                            { label: "33", value: 33 },
                                            { label: "30", value: 30 },
                                            { label: "23", value: 23 },
                                            { label: "20", value: 20 },
                                            { label: "13", value: 13 },
                                            { label: "7", value: 7 },
                                        ]}
                                    />


                                )
                            }

                        </form.Field>

                    </div>

                    <div className='grid md:grid-cols-2 gap-4 items-center'>
                        <form.Field
                            name='startTime'
                            validators={{ onChange: examSchema.shape.startTime }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Start Time'
                                        type="time"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='endTime'
                            validators={{ onChange: examSchema.shape.endTime }}

                        >
                            {
                                (filed) => (

                                    <AppField
                                        field={filed}
                                        label='End Time'
                                        type="time"
                                        className="space-y-4"

                                    />




                                )
                            }

                        </form.Field>

                    </div>
                    <div className='grid md:grid-cols-2 gap-4 items-center'>
                        <div className=' border-b border-purple-600'>
                            <form.Field name="batchId"
                                validators={{ onChange: examSchema.shape.batchId }}
                            >
                                {(field) => (
                                    <AppSelect
                                        field={field}
                                        label=" Batch List"
                                        options={
                                            batch?.data.map((tec) => ({
                                                label: tec.batchName,
                                                value: tec.id,
                                            })) ?? []
                                        }
                                    />
                                )}
                            </form.Field>
                        </div>
                        <div className=' border-b border-purple-600'>
                            <form.Field name="subjectId"
                                validators={{ onChange: examSchema.shape.subjectId }}
                            >
                                {(field) => (
                                    <AppSelect
                                        field={field}
                                        label=" Subject List"
                                        options={
                                            subject?.data.map((tec) => ({
                                                label: tec.name,
                                                value: tec.id,
                                            })) ?? []
                                        }
                                    />
                                )}
                            </form.Field>
                        </div>

                    </div>

                    <form.Field
                        name='status'
                        validators={{ onChange: examSchema.shape.status }}

                    >
                        {
                            (filed) => (

                                <AppSelect
                                    label='Exam Status'
                                    field={filed}
                                    options={[
                                        { label: "UPCOMING", value: "UPCOMING" },
                                        { label: "ONGOING", value: "ONGOING" },
                                        { label: "COMPLETED", value: "COMPLETED" },
                                        { label: "CANCELLED", value: "CANCELLED" },

                                    ]}
                                />


                            )
                        }

                    </form.Field>
                </div>


                <form.Subscribe selector={(s) => [s.canSubmit]}>
                    {
                        ([canSubmit]) => (
                            <AppSubmitButton
                                isPending={isPending || updateIsPending}
                                disabled={!canSubmit || isPending || updateIsPending}

                            >
                                {mode === "create" ? " Create Subject" : "Update"}
                            </AppSubmitButton>
                        )
                    }
                </form.Subscribe>

            </form>
        </div>
    )
}

export default CreateExamFormPage