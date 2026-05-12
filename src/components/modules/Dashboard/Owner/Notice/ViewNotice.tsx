"use client";

import { INotice } from "@/types/notice.type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  BellRing,
  AlertTriangle,
  Pin,
} from "lucide-react";

interface IViewNoticePageProps {
  notice: INotice | null;
}

const ViewNoticePage = ({
  notice,
}: IViewNoticePageProps) => {
  if (!notice) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Notice not found
      </div>
    );
  }

  const typeConfig = {
    GENERAL: {
      label: "General",
      className:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    },

    EXAM: {
      label: "Exam",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    },

    HOLIDAY: {
      label: "Holiday",
      className:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    },

    PAYMENT: {
      label: "Payment",
      className:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    },

    CLASS: {
      label: "Class",
      className:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    },
  };

  const priorityConfig = {
    LOW: {
      label: "Low",
      className:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    },

    NORMAL: {
      label: "Normal",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    },

    HIGH: {
      label: "High",
      className:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    },

    URGENT: {
      label: "Urgent",
      className:
        "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    },
  };

  const type =
    typeConfig[
      notice.type as keyof typeof typeConfig
    ] || typeConfig.GENERAL;

  const priority =
    priorityConfig[
      notice.priority as keyof typeof priorityConfig
    ] || priorityConfig.NORMAL;

  return (
    <div className="">
      <div className="overflow-hidden">
        
        {/* Header */}
        <div className="relative overflow-hidden gradient p-6 md:p-8 text-white rounded-md">
          
          <div className="absolute top-0 right-0 opacity-10">
            <BellRing className="w-40 h-40" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              
              <Badge className={type.className}>
                {type.label}
              </Badge>

              <Badge className={priority.className}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {priority.label}
              </Badge>

              {notice?.isPinned && (
                <Badge className="bg-yellow-500 text-white hover:bg-yellow-500">
                  <Pin className="w-3 h-3 mr-1" />
                  Pinned
                </Badge>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              {notice.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-white/80">
              <CalendarDays className="w-4 h-4" />

              {new Date(
                notice.createdAt
              ).toLocaleDateString("en-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Body */}
        <CardContent className=" md:py-4 space-y-6">
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">
              Notice Description
            </h2>

            <div className="rounded-2xl border bg-muted/40 p-5 leading-7 text-muted-foreground">
              {notice.description}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-5 text-sm text-muted-foreground">
            
            <div>
              Published:{" "}
              <span className="font-medium text-foreground">
                {notice.isPublished
                  ? "Yes"
                  : "No"}
              </span>
            </div>

            <div>
              Updated:{" "}
              {new Date(
                notice.updatedAt
              ).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default ViewNoticePage;