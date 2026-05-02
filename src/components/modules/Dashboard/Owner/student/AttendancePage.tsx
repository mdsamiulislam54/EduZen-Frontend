"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Meta } from "@/types/subject.type";
import { IStudentAttendance } from "@/types/attendance.type";
import AppPagination from "@/shared/pagination/AppPagination";

interface AttendancePageProps {
    data: IStudentAttendance[];
    meta: Meta;
}

export default function AttendancePage({
    data,
    meta,
}: AttendancePageProps) {

    return (
        <div className="p-6 space-y-4">



            {/* List */}
            <div className="grid gap-3">
                {data.map((item) => (
                    <Card key={item.studentId + item.date}>
                        <CardContent className="p-4 flex justify-between">

                            {/* Student */}
                            <div>
                                <p className="font-semibold text-lg">
                                    {item.student.name}
                                </p>

                                <p className="text-sm font-bold">
                                    Roll: {item.student.rollNumber}
                                </p>

                                <p className="text-sm">
                                    Batch: {item.batch.batchName}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="text-right">
                                <p
                                    className={`font-bold ${item.status === "PRESENT"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {item.status}
                                </p>

                                <p className="text-lg font-bold">
                                    {new Date(item.date).toLocaleDateString()}
                                </p>
                            </div>

                        </CardContent>
                    </Card>
                ))}
            </div>

            {
                meta && (
                    <AppPagination meta={meta} />
                )
            }

        </div>
    );
}