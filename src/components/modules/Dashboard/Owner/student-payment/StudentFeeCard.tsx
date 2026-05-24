"use client"

import React from "react"
import Image from "next/image"
import {
  CreditCard,
  User,
  AlertCircle,
  BadgeCheck,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { IStudentPaymentAction } from "@/app/(dashboardLayout)/dashboard/owner/student-payment/_actions"
import { Button } from "@/components/ui/button"



interface Props {
  data: IStudentPaymentAction,
  setOpen: (open: boolean) => void
}

const StudentFeeCard = ({ data, setOpen }: Props) => {
  return (
    <Card className="rounded-2xl border bg-background/70 shadow-sm backdrop-blur transition hover:shadow-md dark:bg-muted/20">
      <CardContent className="p-5">
        {/* Student Info */}
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border bg-muted">
            {data.user.image ? (
              <Image
                src={data.user.image}
                alt={data.user.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-base font-bold">{data.user.name}</h2>
            <p className="text-xs text-muted-foreground">
              {data.user.email}
            </p>
          </div>
        </div>

        {/* Fees List */}
        <div className="mt-5 space-y-3">
          {data.studentFees.map((fee) => {
            const isPaid = fee.paymentStatus === "PAID"
            const isPartial = fee.paymentStatus === "PARTIAL"

            return (
              <div
                key={fee.id}
                className="rounded-xl border bg-muted/30 p-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {fee.batchFee.feeType}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Method: {fee.paymentMethod}
                    </p>
                  </div>

                  <Badge
                    className={cn(
                      "text-[10px] rounded-full px-2 py-1",
                      isPaid &&
                      "bg-green-500/15 text-green-600 dark:text-green-400",
                      isPartial &&
                      "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
                      !isPaid &&
                      !isPartial &&
                      "bg-red-500/15 text-red-600 dark:text-red-400"
                    )}
                  >
                    {fee.paymentStatus}
                  </Badge>
                </div>

                {/* Amounts */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border bg-background p-2">
                    <p className="text-[10px] text-muted-foreground">
                      Total
                    </p>
                    <p className="text-sm font-bold">৳{fee.amount}</p>
                  </div>

                  <div className="rounded-lg border bg-background p-2">
                    <p className="text-[10px] text-muted-foreground">
                      Paid
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      ৳{fee.paidAmount}
                    </p>
                  </div>

                  <div className="rounded-lg border bg-background p-2">
                    <p className="text-[10px] text-muted-foreground">
                      Due
                    </p>
                    <p className="text-sm font-bold text-red-600">
                      ৳{fee.dueAmount}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <p className="text-xs text-muted-foreground">
            Total Fees: {data.studentFees.length}
          </p>

          {data.studentFees.every((f) => f.paymentStatus === "PAID") ? (
            <BadgeCheck className="h-5 w-5 text-green-500" />
          ) : (
            <Button onClick={() => setOpen(true)} size="sm" className="cursor-pointer" >
              Pay Now <AlertCircle className="h-5 w-5 text-red-500" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default StudentFeeCard