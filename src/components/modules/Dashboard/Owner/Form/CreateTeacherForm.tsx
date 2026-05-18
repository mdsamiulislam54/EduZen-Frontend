"use client"
import { getAllSubject } from '@/app/(dashboardLayout)/dashboard/owner/subject/_actions';
import { createTeacher, updateTeacher } from '@/app/(dashboardLayout)/dashboard/owner/teacher/_actions';
import AppField from '@/shared/from/AppField';
import AppSelect from '@/shared/from/AppSelect';
import AppMultiSelect from '@/shared/from/MultiSelect';
import AppSubmitButton from '@/shared/from/SubmitButton';
import { Gender, ITeacher, ITeacherCreate, ITeacherUpdate } from '@/types/teacher.type';
import { teacherCreateSchema } from '@/zod/Teacher.zod.schema';

import { useForm } from '@tanstack/react-form';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getDefaultValues } from '../teacher/GetDefalutValue';
import FileInput from '@/shared/from/FileInput';
interface ICreateTeacherProps {
    onClose: () => void;
    mode?: "create" | "edit",
    initialData?: ITeacher | null
}

const CreateTeacherForm = ({ onClose, mode = "create", initialData }: ICreateTeacherProps) => {
    const queryClient = new QueryClient()
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-teacher"],
        mutationFn: async (data: ITeacherCreate) => createTeacher(data),
        onError: (error) => {
            toast.error("Failed to create teacher: " + error.message);
        },
        onSuccess: () => {
            toast.success("Teacher  Created Successfully");
            onClose();
            queryClient.invalidateQueries({ queryKey: ["teacher"] })
            form.reset();
        }
    })
    const { mutateAsync: updateMutate, isPending: updateIsPending } = useMutation({
        mutationKey: ["update-subject"],
        mutationFn: async (data: Partial<ITeacherUpdate> & { id?: string }) => updateTeacher(data, data.id!),
        onError: (error) => {
            toast.error("Failed to Update teacher: " + error.message);
        },
        onSuccess: () => {
            toast.success("Teacher  Update Successfully");
            onClose()
            form.reset();
        }
    })

    const { data: subject } = useQuery({
        queryKey: ["subject",],
        queryFn: () => getAllSubject()
    })
    const form = useForm({
        defaultValues: getDefaultValues(mode, initialData),
        onSubmit: async ({ value }) => {
            if (mode === "edit") {

                await updateMutate({ ...value, id: initialData?.id })
            } else {
                const teacherData = {
                    subjectIds: value?.subjectIds ?? [],
                    teacherData: {
                        ...value.teacherData,
                        image:value.teacherData.image?? null
                    }
                } as ITeacherCreate
                console.log("create", teacherData)
                await mutateAsync(teacherData);
            }
        }

    })
    return (
        <div className="">

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
                            name='teacherData.name'
                            validators={{ onChange: teacherCreateSchema.shape.teacherData.shape.name }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Teacher Name'
                                        placeholder='Enter Teacher Name'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='teacherData.email'
                            validators={{ onChange: teacherCreateSchema.shape.teacherData.shape.email }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Teacher Email'
                                        placeholder='Enter teacher Email'
                                        type="email"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name='teacherData.education'
                            validators={{ onChange: teacherCreateSchema.shape.teacherData.shape.education }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Eduction'
                                        placeholder='Enter Education Name'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='teacherData.experience'
                            validators={{ onChange: teacherCreateSchema.shape.teacherData.shape.experience }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Experience'
                                        placeholder='Enter Your Experience'
                                        type="number"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name='teacherData.phone'
                            validators={{ onChange: teacherCreateSchema.shape.teacherData.shape.phone }}

                        >
                            {
                                (filed) => (
                                    <AppField
                                        field={filed}
                                        label='Phone '
                                        placeholder='Enter Your Phone 01..............'
                                        type="text"
                                        className="space-y-4"

                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='teacherData.dateOfBirth'
                            validators={{ onChange: teacherCreateSchema.shape.teacherData.shape.dateOfBirth }}

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
                    </div>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <form.Field
                            name='teacherData.image'
                           

                        >
                            {
                                (filed) => (
                                    <FileInput
                                        label="Profile Image"
                                        value={filed.state.value}
                                        onChange={(file) => filed.handleChange(file)}
                                    />


                                )
                            }

                        </form.Field>
                        <form.Field
                            name='teacherData.gender'


                        >
                            {
                                (filed) => (
                                    <AppSelect
                                        field={filed}
                                        label='Gender'
                                        options={[
                                            { label: "Male", value: "MALE" },
                                            { label: "Female", value: "FEMALE" }
                                        ]}

                                    />

                                )
                            }

                        </form.Field>
                    </div>

                    <div className=' border-b border-purple-600'>
                        <form.Field name="subjectIds"
                            validators={{onChange: teacherCreateSchema.shape.subjectIds }}
                        >
                            {(field) => (
                                <AppMultiSelect
                                    field={field}
                                    label=" Subjects"
                                    options={
                                        subject?.data.map((sub) => ({
                                            label: sub.name,
                                            value: sub.id,
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
                                {mode === "create" ? " Create Teacher" : "Update Teacher"}
                            </AppSubmitButton>
                        )
                    }
                </form.Subscribe>

            </form>
        </div>
    )
}

export default CreateTeacherForm