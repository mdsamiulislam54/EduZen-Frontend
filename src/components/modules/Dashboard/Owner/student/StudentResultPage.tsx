"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { IResult } from "@/types/Result.type";


type TStudentResultPageProps = {
  result: IResult;
};

const getGradeColor = (grade: string | null) => {
  switch (grade) {
    case "A+":
      return "bg-green-500";
    case "A":
      return "bg-green-400";
    case "B":
      return "bg-blue-500";
    case "C":
      return "bg-yellow-500";
    case "D":
      return "bg-orange-500";
    case "F":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const StudentResultPage = ({ result }: TStudentResultPageProps) => {
  const totalMarks = result.results.reduce((sum, r) => sum + r.mark, 0);
  const avg = result.results.length
    ? (totalMarks / result.results.length).toFixed(2)
    : 0;

  return (
    <div className="p-4 md:p-8 space-y-6">
    
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="flex items-center gap-4 p-6">
          <Avatar className="h-14 w-14">
            <AvatarFallback>
              {result.student.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-semibold">
              {result.student.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Roll: {result.student.rollNumber || "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Total Subjects</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {result.results.length}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Total Marks</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {totalMarks}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow">
          <CardHeader>
            <CardTitle>Average</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {avg}
          </CardContent>
        </Card>
      </div>

      {/* Result List */}
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Subject Results</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {result.results.map((r) => (
            <div
              key={r.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 border rounded-xl hover:shadow-md transition"
            >
              <div>
                <p className="font-medium text-lg">
                  {r.exam.subject.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {r.exam.name} • {new Date(r.exam.examDate).toDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {r.mark}
                </Badge>

                <Badge
                  className={`text-white ${getGradeColor(r.grade)} px-3 py-1`}
                >
                  {r.grade || "N/A"}
                </Badge>
              </div>
            </div>
          ))}

          {result.results.length === 0 && (
            <p className="text-center text-muted-foreground py-6">
              No results found
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentResultPage;
