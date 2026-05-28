"use client"


import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import AppField from "@/shared/from/AppField"
import AppSelect from "@/shared/from/AppSelect"
import { IStudentPaymentAction, processStudentPayment } from "@/app/(dashboardLayout)/dashboard/owner/student-payment/_actions"
import { toast } from "sonner"
import { useMutation, useQueryClient, } from "@tanstack/react-query"
import { handleAxiosError } from "@/lib/utils"
import { handleError } from "@/lib/error/handleError"

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
            paymentMethod: "CASH",
            fees: data.studentFees.map((fee) => ({
                batchFeeId: fee.batchFeeId,
                amount: fee.amount,
                paidAmount: 0,
                dueAmount: fee.amount,
                title: fee.batchFee.feeType === "COURSE" ? "Course Fee" : fee.batchFee.feeType === "MONTHLY" ? "Monthly Fee" : "Exam Fee"
            })),
        },

        onSubmit: async ({ value }) => {


            try {
                console.log("PAYLOAD:", value)
                await mutateAsync(value)
                toast.success("Payment processed successfully")
                form.reset();
                onOpen(false);
                queryClient.invalidateQueries({ queryKey: ["studentPayment", data.user.id] })
            } catch (error) {
                const  errorMessage = handleError(error)
                toast.error("Failed to process payment: " + errorMessage)
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
            <form.Subscribe selector={(state) => state.values.fees}>
                {(fees) => (
                    <div className={`
                gap-4
                ${fees.length > 1
                            ? "grid md:grid-cols-2 lg:grid-cols-3"
                            : "flex"}
            `}>
                        {fees.map((fee, index) => (
                            <div
                                key={fee.batchFeeId}
                                className="rounded-xl border p-4 space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">
                                        {fee.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground">
                                        Total: ৳{fee.amount}
                                    </p>
                                </div>

                                <form.Field
                                    name={`fees[${index}].paidAmount`}
                                >
                                    {(field) => (
                                        <AppField
                                            field={field}
                                            label="Paid Amount"
                                            type="number"
                                            placeholder="Enter paid amount"
                                        />
                                    )}
                                </form.Field>
                            </div>
                        ))}
                    </div>
                )}
            </form.Subscribe>

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