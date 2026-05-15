"use client";

import { getStudentFee } from "@/app/(dashboardLayout)/dashboard/student/payment/_actions";
import ErrorState from "@/components/modules/Error/Error";
import Loader from "@/components/modules/Loader/loader";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CreditCard, User, BookOpen, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

export const StudentFee = () => {
  const router = useRouter();

  const { data: fee, isPending, isError } = useQuery({
    queryKey: ["student-fee"],
    queryFn: getStudentFee,
  });

  if (isPending) return <Loader length={4} />;
  if (isError)
    return <ErrorState message="Student Fee Data not available" />;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
      

          <Badge variant="secondary">
            {fee?.fee?.status}
          </Badge>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* STUDENT INFO */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5" />
                Student Info
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Name:</span> {fee?.student?.name}</p>
              <p><span className="text-muted-foreground">Roll:</span> {fee?.student?.rollNumber}</p>
              <p><span className="text-muted-foreground">Email:</span> {fee?.student?.email}</p>
              <p><span className="text-muted-foreground">Phone:</span> {fee?.student?.phone}</p>
              <p><span className="text-muted-foreground">Batch:</span> {fee?.student?.batchName}</p>
            </CardContent>
          </Card>

          {/* FEE SUMMARY */}
          <Card className="rounded-2xl md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wallet className="w-5 h-5" />
                Fee Summary
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">

                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-muted-foreground text-xs">Total</p>
                  <p className="text-xl font-bold">
                    ৳{fee?.fee?.totalAmount}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-green-500/10">
                  <p className="text-muted-foreground text-xs">Paid</p>
                  <p className="text-xl font-bold text-green-500">
                    ৳{fee?.fee?.paidAmount}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-red-500/10">
                  <p className="text-muted-foreground text-xs">Due</p>
                  <p className="text-xl font-bold text-red-500">
                    ৳{fee?.fee?.dueAmount}
                  </p>
                </div>

              </div>

              {/* PAY BUTTON */}
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => router.push(`/dashboard/student/payment/${fee?.id}`)}
                  className="gap-2"
                  disabled={fee?.fee?.dueAmount === 0}
                >
                  <CreditCard className="w-4 h-4" />
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};