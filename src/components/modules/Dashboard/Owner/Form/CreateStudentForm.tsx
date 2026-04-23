"use client";
import { createStudent, updateStudent } from '@/app/(dashboardLayout)/dashboard/owner/student/_actions';
import { BloodGroup, GenderType, ICreateStudent, IStudent, IStudentUpdate, StudentStatus } from '@/types/student.type';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getDefaultValueStudent } from '../student/GetDeafultvalueStudent';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import AppField from '@/shared/from/AppField';
import { createStudentSchema } from '@/zod/students.zod';
import AppSelect from '@/shared/from/AppSelect';
import FileInput from '@/shared/from/FileInput';
import { Card } from '@/components/ui/card';
import AppSubmitButton from '@/shared/from/SubmitButton';
import { getAllBatch } from '@/app/(dashboardLayout)/dashboard/owner/batch/_actions';
import AppMultiSelect from '@/shared/from/MultiSelect';
import { toBdISOString } from '@/lib/utils';
import { on } from 'events';
interface CreateStudentFormPageProps {
    onClose?: () => void;
    mode?: 'create' | 'edit';
    initialData?: IStudent | null;
}
const CreateStudentFormPage = ({ mode = "create", initialData, onClose }: CreateStudentFormPageProps) => {
    const queryClient = new QueryClient()
    const router = useRouter()
    const { mutateAsync: createStudentMutate, isPending } = useMutation({
        mutationKey: ["create-student"],
        mutationFn: async (payload: ICreateStudent) => createStudent(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["student"] })
            toast.success("Student created successfully");
            onClose?.()

        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to create student");
        }
    })

    const { mutateAsync: updateStudentMutate, isPending: updateIsPending } = useMutation({
        mutationKey: ["update-student"],
        mutationFn: async (data: Partial<IStudentUpdate> & { id?: string }) => updateStudent(data.id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["student"] })
            toast.success("Student updated successfully");
            onClose?.()
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to update student");
        }
    })

    

    const { data: batch } = useQuery({
        queryKey: ["batch"],
        queryFn: async () => await getAllBatch()
    })

    const form = useForm({
        defaultValues: getDefaultValueStudent(mode, initialData ?? undefined),
        onSubmit: async ({ value }) => {
            if (mode === "edit" && initialData) {
                const payload: Partial<IStudentUpdate> & { id?: string } = {
                    batchIds: value.batchIds ?? [],
                    studentData: {
                        ...value.studentData,
                        image: value.image ?? null,
                        fatherName: value.fatherName ?? "",
                        matherName: value.matherName ?? "",
                        age: value.age ?? 0,
                        address: value.address ?? "",
                        dateOfBirth: new Date(toBdISOString(value?.dateOfBirth) )?? null,
                    }
                }
                await updateStudentMutate({
                    ...payload,
                    id: initialData.id
                })
                router.push(window.location.href)
            } else {
                const payload: ICreateStudent = {
                    batchId: value.batchIds ?? [],
                    studentData: {
                        name: value.studentData?.name ?? "",
                        fatherName: value.fatherName ?? "",
                        matherName: value.matherName ?? "",
                        age: value.age ?? 0,
                        address: value.address ?? "",
                        email: value.email ?? "",
                        phone: value.studentData?.phone ?? "",
                        image: value.studentData?.image ?? null,
                        dateOfBirth: toBdISOString(value?.studentData?.dateOfBirth) ?? null,
                        gender: value.gender ?? "OTHER",
                        bloodGroup: value.bloodGroup ?? BloodGroup.O_POSITIVE
                    }


                }
                console.log("Value, ", value)
                console.log("payload, ", payload)
                await createStudentMutate(payload);
            }
        }
    })

    return (
        <Card className=''>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="space-y-5 "

            >
                <div className='space-x-4 space-y-6 '>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name='studentData.name'
                            validators={{ onChange: createStudentSchema.shape.studentData.shape.name }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Student Name'
                                        placeholder='Enter Student Name'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        {mode === "create" && (
                            <form.Field
                                name='email'
                                validators={{ onChange: createStudentSchema.shape.studentData.shape.email }}

                            >
                                {
                                    (filed) => (
                                        <AppField
                                            field={filed}
                                            label='Email'
                                            placeholder='Enter Student Email'
                                            type="email"
                                            className="space-y-4"

                                        />


                                    )
                                }

                            </form.Field>
                        )}
                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name='fatherName'

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Father Name'
                                        placeholder='Enter Father Name'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>

                        <form.Field
                            name='matherName'

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Mother Name'
                                        placeholder='Enter Mother Name'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>

                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name='age'

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Age'
                                        placeholder='Enter Age'
                                        type="number"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>

                        <form.Field
                            name='address'

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Address'
                                        placeholder='Enter Address exp: 123 Street, City'
                                        type="text"
                                        className="space-y-4"

                                    />
                                )
                            }

                        </form.Field>

                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name='studentData.phone'
                            validators={{ onChange: createStudentSchema.shape.studentData.shape.phone }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Student Phone'
                                        placeholder='Enter Student Phone'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='studentData.BloodGroup'

                        >
                            {
                                (filed) => (
                                    <AppSelect
                                        field={filed}
                                        label='Blood Group'
                                        options={[
                                            { label: "A_POSITIVE", value: "A_POSITIVE" }
                                            , { label: "A_NEGATIVE", value: "A_NEGATIVE" }
                                            , { label: "B_POSITIVE", value: "B_POSITIVE" }
                                            , { label: "B_NEGATIVE", value: "B_NEGATIVE" }
                                            , { label: "AB_POSITIVE", value: "AB_POSITIVE" }
                                            , { label: "AB_NEGATIVE", value: "AB_NEGATIVE" }
                                            , { label: "O_POSITIVE", value: "O_POSITIVE" }
                                            , { label: "O_NEGATIVE", value: "O_NEGATIVE" }

                                        ]}
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name='studentData.image'


                        >
                            {
                                (filed) => (
                                    <FileInput

                                        label="Student Image"
                                        value={filed.state.value}
                                        onChange={(file) => filed.handleChange(file)}
                                    />


                                )
                            }

                        </form.Field>
                        {
                            mode === "create" && (
                                <form.Field
                                    name='gender'
                                    validators={{
                                        onSubmit: (value) => {
                                            if (!value) return "Gender is required";
                                            return undefined;
                                        }
                                    }}
                                >
                                    {
                                        (filed) => (
                                            <AppSelect
                                                field={filed}
                                                label='Gender'
                                                options={[
                                                    { label: "Male", value: "MALE" }
                                                    , { label: "Female", value: "FEMALE" }
                                                    , { label: "Other", value: "OTHER" }
                                                ]}
                                                className="space-y-4"

                                            />


                                        )
                                    }

                                </form.Field>
                            )
                        }



                    </div>


                    <div className='  grid md:grid-cols-2 gap-4 pb-4'>
                        <form.Field
                            name='studentData.dateOfBirth'


                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='DateOfBirth'
                                        placeholder='Enter Your DateOfBirth'
                                        type="date"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field name="batchIds"
                            validators={{ onChange: createStudentSchema.shape.batchId }}
                        >
                            {(field) => (
                                <AppMultiSelect
                                    field={field}
                                    label="Batches"
                                    options={
                                        batch?.data.map((bat) => ({
                                            label: bat.batchName,
                                            value: bat.id,
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
                                {mode === "create" ? " Create Student" : "Update Student"}
                            </AppSubmitButton>
                        )
                    }
                </form.Subscribe>

            </form>
        </Card>
    )
}

export default CreateStudentFormPage