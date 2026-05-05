"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import Image from "next/image";
import { IMarkCreate, IStudentList } from "@/app/(dashboardLayout)/dashboard/teacher/marks/_actions";
import { PersonStanding } from "lucide-react";
import { toast } from "sonner";


interface Props {
    students: IStudentList[];
    examId: string;
    passMarks: number;
    totalMarks: number;
    onSubmit: (data: IMarkCreate) => void;
    isPending: boolean
}

export default function MarkEntryTable({
    students,
    examId,
    passMarks,
    totalMarks,
    onSubmit,
    isPending
}: Props) {
    const [marks, setMarks] = useState<Record<string, number | "">>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    // handle input
    const handleChange = (studentId: string, value: string) => {

        setMarks((prev) => ({
            ...prev,
            [studentId]: value === "" ? "" : Number(value),
        }));
        setErrors((prev) => ({
            ...prev,
            [studentId]: "",
        }));
    };

    // status calc
    const getStatus = (mark: number | "") => {
        if (mark === "" || mark === undefined) return "ABSENT";
        if (mark >= passMarks) return "PASS";
        return "FAIL";
    };

    // submit payload
    const handleSubmit = () => {
        for (const student of students) {
            const value = marks[student.id];

            if (value === "" || value === undefined) {
                toast.error(`${student.name} mark is required`);
                return;
            }

           
        }
        const payload: IMarkCreate = {
            examId,
            marks: students.map((student) => ({
                studentId: student.id,
                mark: marks[student.id] === "" ? 0 : Number(marks[student.id] || 0),
            })),
        }

        console.log(payload)
        onSubmit(payload);
    };

    return (
        <div className="space-y-6 ">

            <h2 className="text-lg font-semibold mt-4">Mark Entry</h2>
            <Table className="mb-5">
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Mark</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {students.map((student) => {
                        const mark = marks[student.id] ?? "";
                        const status = getStatus(mark);

                        return (
                            <TableRow key={student.id}>
                                {/* Student */}
                                <TableCell className="flex items-center gap-2">
                                    {student.image ? (
                                        <Image src={student.image} alt="Student Profile Image" />
                                    ) : (<PersonStanding />)}
                                    {student.name}
                                </TableCell>

                                {/* Roll */}
                                <TableCell>{student.rollNumber}</TableCell>

                                {/* Mark Input */}
                                <TableCell>
                                    <Input
                                        type="number"
                                        minLength={0}
                                       
                                        required
                                        maxLength={3}
                                        value={mark}
                                        onChange={(e) =>

                                            handleChange(student.id, e.target.value)
                                        }
                                        className="w-24"
                                    />

                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded text-white text-xs ${status === "PASS"
                                            ? "bg-green-500"
                                            : status === "FAIL"
                                                ? "bg-red-500"
                                                : "bg-gray-500"
                                            }`}
                                    >
                                        {status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <div className="flex justify-start  items-center">
                <Button disabled={isPending} variant={"secondary"} className="cursor-pointer mb-4" onClick={handleSubmit}>
                    {isPending ? "Saving..." : "Add Marks"}
                </Button>
            </div>
        </div>
    );
}