"use client";


import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarDays, BookOpen, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMyClassToday } from "@/app/(dashboardLayout)/dashboard/student/my-class/_actions";

const StudentClassScheduleCard = () => {
  const { data: schedule, } = useQuery({
    queryKey: ["student-class-schedule"],
    queryFn: getMyClassToday
  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {schedule?.map((item) => (
        <Card
          key={item.batchId}
          className="rounded-3xl border bg-card/80 dark:bg-zinc-900/60 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all"
        >
          <CardContent className="p-6 space-y-4">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                {item.batchName}
              </h2>

              <Badge className="bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20">
                {item.day}
              </Badge>
            </div>

            {/* Teacher */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              {item.teacherName}
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-green-500" />
              <span>
                {new Date(item.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(item.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                Today Class
              </div>

              <div className="text-xs text-green-500 font-medium">
                Active
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentClassScheduleCard;