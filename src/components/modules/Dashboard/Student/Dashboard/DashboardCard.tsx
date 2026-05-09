"use client";

import { getStudentDashboardData } from "@/app/(dashboardLayout)/dashboard/student/_actions";
import ErrorState from "@/components/modules/Error/Error";
import Loader from "@/components/modules/Loader/loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  CalendarCheck2,
  CreditCard,
  GraduationCap,
  Trophy,
  Wallet,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const DashboardCardPage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["student-dashboard-data"],
    queryFn: getStudentDashboardData,
  });

  if (isPending) return <Loader length={6} />;

  if (isError) {
    return (
      <ErrorState message="Student Dashboard Card Data Failed" />
    );
  }

  const dashboard = data;

  const cards = [
    {
      title: "Total Exams",
      value: dashboard?.performance?.totalExams,
      icon: GraduationCap,
      iconColor: "text-sky-500",
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
    },
    {
      title: "Average Marks",
      value: dashboard?.performance?.avgMarks,
      icon: Trophy,
      iconColor: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    {
      title: "Attendance",
      value: `${dashboard?.attendance?.percent}%`,
      icon: CalendarCheck2,
      iconColor: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      title: "Paid Fee",
      value: `৳ ${dashboard?.fees?.paidFee}`,
      icon: Wallet,
      iconColor: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      title: "Due Fee",
      value: `৳ ${dashboard?.fees?.dueFee}`,
      icon: CreditCard,
      iconColor: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      title: "Batches",
      value: dashboard?.batches?.length,
      icon: BookOpen,
      iconColor: "text-indigo-500",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-5">
                Welcome Back <Sparkles size={50} className=" text-yellow-300" />
              </h1>

              <p className="text-white/80 mt-2 text-sm md:text-base">
                Track your performance, attendance, and fees
                easily.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20 px-4 py-1">
                {dashboard?.profile?.name}
              </Badge>

              <Badge className="bg-black/20 text-white hover:bg-black/30 px-4 py-1">
                Roll : {dashboard?.profile?.roll}
              </Badge>

              <Badge className="bg-green-500 text-white hover:bg-green-600 px-4 py-1">
                {dashboard?.profile?.status}
              </Badge>
            </div>
          </div>

          <div className="hidden lg:flex h-28 w-28 rounded-full bg-white/10 backdrop-blur-xl items-center justify-center border border-white/20">
            {
                dashboard.profile.image ? (
                    <Image src={dashboard.profile.image} alt="Profile images" width={100} height={100} className="h-14 w-14 "/>
                ):(<GraduationCap className="h-14 w-14 text-white" />)
            }
          </div>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Card
              key={index}
              className={`group relative overflow-hidden rounded-3xl border ${card.border} bg-card/80 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight">
                      {card.value}
                    </h2>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                      Updated recently
                    </div>
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
                  >
                    <Icon
                      className={`h-7 w-7 ${card.iconColor}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* BATCH SECTION */}
      <Card className="rounded-3xl border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Active Batches
              </h2>

              <p className="text-muted-foreground text-sm mt-1">
                Your enrolled coaching batches
              </p>
            </div>

            <Badge variant="secondary" className="px-4 py-1">
              {dashboard?.batches?.length} Batches
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {dashboard?.batches?.map((batch) => (
              <div
                key={batch.id}
                className="group rounded-2xl border bg-muted/30 p-5 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {batch.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
                      Total Students : {batch.total}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCardPage;