"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BatchStudent, StudentFee } from "@/types/student.type";
import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "@/app/(dashboardLayout)/dashboard/owner/student/_actions";
import ErrorState from "@/components/modules/Error/Error";
import Loader from "@/components/modules/Loader/loader";
import { getAttendanceByStudentId } from "@/app/(dashboardLayout)/dashboard/teacher/attendance/_actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AttendancePage from "./AttendancePage";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getResultByRollNumber } from "@/app/(dashboardLayout)/dashboard/teacher/marks/_actions";
import StudentResultPage from "./StudentResultPage";
import { Button } from "@/components/ui/button";

interface StudentProfileProps {
  id: string,
  queryString?: string
}

export default function StudentProfile({ id }: StudentProfileProps) {

  const params = useSearchParams()

  const queryString = params.toString()

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenResultPage, setIsOpenResultPage] = useState(false)
  const { data: student, isPending, isError } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => await getStudentById(id)
  })
  const { data: result, isPending: resultPending, isError: resultError } = useQuery({
    queryKey: ["result", student?.rollNumber],
    queryFn: async () => await getResultByRollNumber(student?.rollNumber as string),
  })

  const { data: attendance } = useQuery({
    queryKey: ["attendance-student", queryString],
    queryFn: async () => await getAttendanceByStudentId(student?.id as string, queryString),

  });

  if (isPending) return <Loader length={1} />;
  if (isError) return <ErrorState message="Failed to load student data" />;

  if (!student) return <div className="p-6">No student found</div>;

  const fullName = student.name;
  const initials = fullName
    ?.split(" ")
    .map((n: string) => n[0])
    .join("");

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* PROFILE HEADER */}
        <Card className="rounded-2xl shadow-lg overflow-hidden py-0">
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 -mt-16">
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                  <AvatarImage src={student.image || ""} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="text-2xl font-bold">{fullName}</h1>
                  <p className="text-muted-foreground text-sm">
                    Roll: {student.rollNumber || "N/A"}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{student.gender}</Badge>
                    <Badge
                      variant={
                        student.status === "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {student.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 flex-wrap">
                <Button
                  disabled={isPending}
                  onClick={() => setIsOpen(true)}
                >
                  Attendance
                </Button>

                <Button
                  variant="secondary"
                  disabled={resultPending}
                  onClick={() => setIsOpenResultPage(true)}
                >
                  {resultPending ? "Loading..." : "View Result"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PERSONAL INFO */}
          <Card className="rounded-2xl shadow">
            <CardHeader>
              <CardTitle>Personal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="font-medium">Phone:</span> {student.phone || "N/A"}</p>
              <p><span className="font-medium">Address:</span> {student.address || "N/A"}</p>
              <p><span className="font-medium">Blood Group:</span> {student.bloodGroup || "N/A"}</p>
              <p><span className="font-medium">DOB:</span> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
            </CardContent>
          </Card>

          {/* COACHING */}
          <Card className="rounded-2xl shadow">
            <CardHeader>
              <CardTitle>Coaching Center</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>{student.coachingCenter?.name}</p>
              <p className="text-muted-foreground">{student.coachingCenter?.email}</p>
              <p>{student.coachingCenter?.phone}</p>
              <p className="text-muted-foreground">{student.coachingCenter?.address}</p>
            </CardContent>
          </Card>

          {/* FEES */}
          <Card className="rounded-2xl shadow">
            <CardHeader>
              <CardTitle>Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-62.5 overflow-y-auto">
              {student.studentFees?.length ? (
                student.studentFees.map((fee: StudentFee) => (
                  <div
                    key={fee.id}
                    className="flex items-center justify-between p-3 border rounded-xl"
                  >
                    <div className="text-sm">
                      <p>৳ {fee.amount}</p>
                      <p className="text-muted-foreground">
                        Paid: {fee.paidAmount} | Due: {fee.dueAmount}
                      </p>
                    </div>

                    <Badge
                      variant={
                        fee.paymentStatus === "PAID" ? "default" : "destructive"
                      }
                    >
                      {fee.paymentStatus}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No fee records</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* BATCH */}
        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Batches</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-wrap gap-2">
            {student.batchStudents?.length ? (
              student.batchStudents.map((b) => (
                <Badge key={b.id} variant="outline" className="px-3 py-1">
                  {b.batch?.batchName}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No batches</p>
            )}
          </CardContent>
        </Card>
      </div>


      {
        attendance && isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="!max-w-3xl overflow-y-scroll ">
              <DialogHeader>
                <DialogTitle>View Attendance</DialogTitle>
              </DialogHeader>

              <AttendancePage data={attendance?.data} meta={{
                page: attendance.meta?.page ?? 0,
                limit: 2,
                total: attendance.meta?.total ?? 0,
                totalPages: attendance.meta?.totalPages ?? 0
              }} />
            </DialogContent>
          </Dialog>
        )
      }
      {
        isOpenResultPage && (
          <Dialog open={isOpenResultPage} onOpenChange={setIsOpenResultPage}>
            <DialogContent className="!max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Student Result</DialogTitle>
              </DialogHeader>

              {resultPending && <Loader length={1} />}

              {resultError && (
                <ErrorState message="Failed to load result" />
              )}

              {result && <StudentResultPage result={result} />}
            </DialogContent>
          </Dialog>
        )
      }

    </div>
  );
}
