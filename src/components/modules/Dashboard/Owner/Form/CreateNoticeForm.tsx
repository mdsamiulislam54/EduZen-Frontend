"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";



import {
    ICreateNotice,
    INotice,
} from "@/types/notice.type";
import { createNotice, updateNotice } from "@/app/(dashboardLayout)/dashboard/owner/notice/_actions";
import { getDefaultValues } from "../Notice/GetDefaultValue";
import AppField from "@/shared/from/AppField";
import AppSelect from "@/shared/from/AppSelect";
import AppSubmitButton from "@/shared/from/SubmitButton";



interface ICreateNoticeFormProps {
    mode: "create" | "edit";
    initialData?: INotice | null;
    onClose: () => void;
}

const CreateNoticeForm = ({
    mode,
    initialData,
    onClose,
}: ICreateNoticeFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: createNotice,
    });

    const { mutateAsync: updateMutate, isPending: updateIsPending } = useMutation({
        mutationFn: ({
            payload,
            id,
        }: {
            payload: Partial<ICreateNotice>;
            id: string;
        }) => updateNotice(payload, id),
    });

    const form = useForm({
        defaultValues: getDefaultValues(
            mode,
            initialData
        ),

        onSubmit: async ({ value }) => {
            try {
                if (mode === "edit" && initialData?.id) {
                    await updateMutate({
                        payload: value,
                        id: initialData.id,
                    });

                    toast.success(
                        "Notice updated successfully!"
                    );
                } else {
                    console.log(value)
                    await mutateAsync(value);
                    toast.success("Notice created successfully!");
                }

                queryClient.invalidateQueries({
                    queryKey: ["notice"],
                });

                onClose();
                router.refresh();
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            }
        },
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-5"
            >
                {/* Title */}
                <form.Field name="title">
                    {(filed) => (
                        <AppField
                            field={filed}
                            label="Notice Title"
                            placeholder="Enter Notice Title"
                            type="text"
                            className="space-y-4"
                        />
                    )}
                </form.Field>

                {/* Description */}
                <form.Field name="description">
                    {(filed) => (
                        <AppField
                            field={filed}
                            label="Description"
                            placeholder="Write Notice Description"
                            type="textarea"
                            className="space-y-4"
                        />
                    )}
                </form.Field>

                {/* Type + Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Type */}
                    <form.Field name="type">
                        {(filed) => (
                            <AppSelect
                                field={filed}
                                label="Notice Type"

                                className="space-y-4"
                                options={[
                                    {
                                        label: "General",
                                        value: "GENERAL",
                                    },

                                    {
                                        label: "Exam",
                                        value: "EXAM",
                                    },

                                    {
                                        label: "Holiday",
                                        value: "HOLIDAY",
                                    },

                                    {
                                        label: "Payment",
                                        value: "PAYMENT",
                                    },

                                    {
                                        label: "Class",
                                        value: "CLASS",
                                    },
                                ]}
                            />
                        )}
                    </form.Field>

                    {/* Priority */}
                    <form.Field name="priority">
                        {(filed) => (
                            <AppSelect
                                field={filed}
                                label="Priority"

                                className="space-y-4"
                                options={[
                                    {
                                        label: "Low",
                                        value: "LOW",
                                    },

                                    {
                                        label: "Normal",
                                        value: "NORMAL",
                                    },

                                    {
                                        label: "High",
                                        value: "HIGH",
                                    },

                                    {
                                        label: "Urgent",
                                        value: "URGENT",
                                    },
                                ]}
                            />
                        )}
                    </form.Field>
                </div>

                {/* Pin + Publish */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Pinned */}
                    <form.Field name="isPinned">
                        {(filed) => (
                            <div className="flex items-center gap-3 rounded-xl border p-4">
                                <input
                                    type="checkbox"
                                    checked={filed.state.value}
                                    onChange={(e) =>
                                        filed.handleChange(
                                            e.target.checked
                                        )
                                    }
                                    className="size-4"
                                />

                                <div>
                                    <p className="font-medium">
                                        Pin Notice
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Show notice at top
                                    </p>
                                </div>
                            </div>
                        )}
                    </form.Field>

                    {/* Published */}
                    <form.Field name="isPublished">
                        {(filed) => (
                            <div className="flex items-center gap-3 rounded-xl border p-4">
                                <input
                                    type="checkbox"
                                    checked={filed.state.value}
                                    onChange={(e) =>
                                        filed.handleChange(
                                            e.target.checked
                                        )
                                    }
                                    className="size-4"
                                />

                                <div>
                                    <p className="font-medium">
                                        Publish Notice
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Visible for students
                                    </p>
                                </div>
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* Submit */}
                <form.Subscribe selector={(s) => [s.canSubmit]}>
                    {
                        ([canSubmit]) => (
                            <AppSubmitButton
                                isPending={isPending || updateIsPending}
                                disabled={!canSubmit || isPending || updateIsPending}

                            >
                                {mode === "create" ? " Create Notice" : "Update Notice"}
                            </AppSubmitButton>
                        )
                    }
                </form.Subscribe>
            </form>
        </div>
    );
};

export default CreateNoticeForm;