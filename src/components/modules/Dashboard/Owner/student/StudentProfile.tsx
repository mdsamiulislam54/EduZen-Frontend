"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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

interface StudentProfileProps {
  id: string,
  queryString?: string
}

export default function StudentProfile({ id }: StudentProfileProps) {

  const params = useSearchParams()
  
  const queryString = params.toString()

  const [isOpen, setIsOpen] = useState(false)
  const { data: student, isPending, isError } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => await getStudentById(id)
  })

  const { data: attendance } = useQuery({
    queryKey: ["attendance-student", queryString],
    queryFn: async () => await getAttendanceByStudentId(student?.id as string , queryString)
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

      {/* {JSON.stringify(attendance)} */}
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {student.image && (
          <Image
            src={student.image}
            alt="banner"
            fill
            className="object-cover opacity-30"
          />
        )}
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-28 h-28 border-4 border-background shadow-xl">
              <AvatarImage src={student.image || ""} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{fullName}</h1>
              <p className="text-muted-foreground">Roll: {student.rollNumber}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{student.gender}</Badge>
                <Badge
                  variant={student.status === "ACTIVE" ? "default" : "destructive"}
                >
                  {student.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4 flex-wrap">
          <button
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">
            View Attendance
          </button>
          <button className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:opacity-90">
            View Results
          </button>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Personal Info */}
          <Card>
            <CardContent className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">Personal Info</h2>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
              <p><strong>Address:</strong> {student.address || "N/A"}</p>
              <p><strong>Blood Group:</strong> {student.bloodGroup || "N/A"}</p>
              <p><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
            </CardContent>
          </Card>

          {/* Coaching Info */}
          <Card>
            <CardContent className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">Coaching Center</h2>
              <p><strong>Owner Name:</strong> {student.coachingCenter?.name}</p>
              <p><strong>Email:</strong> {student.coachingCenter?.email}</p>
              <p><strong>Phone:</strong> {student.coachingCenter?.phone}</p>
              <p><strong>Address:</strong> {student.coachingCenter?.address}</p>
            </CardContent>
          </Card>

          {/* Fee Info */}
          <Card>
            <CardContent className="p-5 space-y-2 overflow-y-scroll">
              <h2 className="text-lg font-semibold">Fees</h2>
              {student.studentFees?.length > 0 ? (
                student.studentFees.map((fee: StudentFee) => (
                  <div
                    key={fee.id}
                    className="border rounded-md p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm">Amount: {fee.amount}</p>
                      <p className="text-sm">Paid: {fee.paidAmount}</p>
                      <p className="text-sm">Due: {fee.dueAmount}</p>
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
                <p>No fee records</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Batch Section */}
        <Card className="mt-6">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold mb-3">Batches</h2>
            <div className="flex flex-wrap gap-2">
              {student.batchStudents?.map((batch: BatchStudent) => (
                <Badge key={batch.id} variant="outline">
                  {batch.id}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {
        attendance && isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="!max-w-3xl overflow-y-scroll ">
              <DialogHeader>
                <DialogTitle>Update Student</DialogTitle>
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

    </div>
  );
}
