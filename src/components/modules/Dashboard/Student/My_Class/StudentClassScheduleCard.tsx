"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Clock,
  CalendarDays,
  BookOpen,
  User,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getMyClassToday } from "@/app/(dashboardLayout)/dashboard/student/my-class/_actions";

const StudentClassScheduleCard = () => {
  const {
    data: schedule,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["student-class-schedule"],
    queryFn: getMyClassToday,
  });

  // LOADING (optional simple fallback)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="rounded-3xl h-40 animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  // ERROR STATE
  if (isError) {
    return (
      <Card className="rounded-3xl border border-red-200 dark:border-red-900">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-500" />

          <h2 className="text-lg font-semibold">Something went wrong</h2>

          <p className="text-sm text-muted-foreground">
            Failed to load class schedule
          </p>

          <Button onClick={() => refetch()} variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // EMPTY STATE
  if (!schedule || schedule.length === 0) {
    return (
      <Card className="rounded-3xl border border-dashed">
        <CardContent className="p-10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-3 rounded-full bg-muted">
            <CalendarDays className="w-6 h-6 text-muted-foreground" />
          </div>

          <h2 className="text-lg font-semibold">No Class Schedule Today</h2>

          <p className="text-sm text-muted-foreground max-w-sm">
            You don’t have any classes scheduled for today. Please check back
            later or contact your teacher.
          </p>

          <Button variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  // DATA UI
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {schedule.map((item) => (
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