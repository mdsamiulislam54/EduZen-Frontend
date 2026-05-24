"use client"


import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import AppField from "@/shared/from/AppField"
import AppSelect from "@/shared/from/AppSelect"
import { IStudentPaymentAction, processStudentPayment } from "@/app/(dashboardLayout)/dashboard/owner/student-payment/_actions"
import { toast } from "sonner"
import { useMutation, useQueryClient,  } from "@tanstack/react-query"

interface Props {
    data: IStudentPaymentAction,
    onOpen: (open: boolean) => void
}


const StudentPaymentForm = ({ data, onOpen }: Props) => {
    const queryClient = useQueryClient()
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["studentPayment", data.user.id],
        mutationFn: processStudentPayment,
    })
    const form = useForm({
        defaultValues: {
            studentId: data.studentFees[0]?.studentId || "",
            batchFeeId: data.studentFees.map((feeId) => feeId.batchFeeId),
            paymentMethod: "CASH",
            paidAmount: data.paidAmount,
        },

        onSubmit: async ({ value }) => {
            const totalAmount = parseInt(data.studentFees.map((fee) => fee.amount).join(''), 10)
            if (value.paidAmount > totalAmount) {
                toast.error("Paid amount cannot be greater than total amount")
                return;
            }
            const payload = {
                ...value,
                amount: totalAmount,
            }

            try {
                console.log("PAYLOAD:", payload)
                await mutateAsync(payload)
                toast.success("Payment processed successfully")
                form.reset();
                onOpen(false);
                queryClient.invalidateQueries({ queryKey: ["studentPayment", data.user.id] })
            } catch (error) {
                toast.error("Failed to process payment")
                console.log("ERROR:", error)

            }

        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
            className="space-y-5 rounded-2xl border p-5"
        >
            {/* {JSON.stringify(data)} */}

            {/* Payment Method */}
            <form.Field name="paymentMethod">
                {(field) => (
                    <AppSelect
                        field={field}
                        label="Payment Method"
                        options={[
                            { label: "Cash", value: "CASH" },
                            { label: "Bkash", value: "BKASH" },
                            { label: "Nagad", value: "NAGAD" },
                            { label: "Bank", value: "BANK" },
                        ]}
                    />
                )}
            </form.Field>



            {/* Paid Amount */}
            <form.Field name="paidAmount">
                {(field) => (
                    <AppField
                        field={field}
                        label="Paid Amount"
                        type="number"
                        placeholder="Enter paid amount"
                    />
                )}
            </form.Field>

            {/* Submit */}
            <Button type="submit" className="w-full cursor-pointer">
                {
                    isPending ? "Processing..." : "Process Payment"
                }
            </Button>
        </form>
    )
}

export default StudentPaymentForm