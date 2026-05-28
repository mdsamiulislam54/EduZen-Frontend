"use client";

import {
  Users2,
  ClipboardCheck,
  CreditCard,
  FileSpreadsheet,
  BellRing,
  CalendarDays,
  BarChart3,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Student Management",
    description:
      "Manage students, admissions, batches, and profiles from one centralized dashboard.",
    icon: Users2,
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-500",
  },
  {
    title: "Attendance System",
    description:
      "Track daily attendance with smart reports and automated student monitoring.",
    icon: ClipboardCheck,
    gradient: "from-violet-500/20 to-fuchsia-500/20",
    iconColor: "text-violet-500",
  },
  {
    title: "Online Payments",
    description:
      "Collect coaching fees online with secure payment tracking and invoice history.",
    icon: CreditCard,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-500",
  },
  {
    title: "Exam & Result",
    description:
      "Create exams, publish results, generate marksheets, and monitor performance.",
    icon: FileSpreadsheet,
    gradient: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "SMS Notifications",
    description:
      "Send instant SMS alerts for fees, attendance, exams, and important notices.",
    icon: BellRing,
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500",
  },
  {
    title: "Routine Management",
    description:
      "Organize class schedules, routines, and timing management with ease.",
    icon: CalendarDays,
    gradient: "from-sky-500/20 to-indigo-500/20",
    iconColor: "text-sky-500",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Visualize coaching performance, income, attendance, and student growth.",
    icon: BarChart3,
    gradient: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-500",
  },
  {
    title: "Teacher Panel",
    description:
      "Dedicated teacher access for attendance, classes, assignments, and reports.",
    icon: GraduationCap,
    gradient: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-500",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden ">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-border/50 bg-background/60 px-4 py-1 text-sm text-muted-foreground backdrop-blur">
            Powerful Features for Modern Coaching Centers
          </div>

          <h2 className="text-xl font-bold tracking-tight text-foreground md:text-5xl">
            Everything You Need to Run Your Coaching Business
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            Simplify student management, automate operations, and grow your
            coaching institute with an all-in-one SaaS platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 cursor-pointer">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br ${feature.gradient} p-[1px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer`}
              >
                <CardContent className="relative flex h-full flex-col rounded-3xl bg-background/80 p-6 backdrop-blur-xl dark:bg-background/40">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                  </div>

                  {/* Top */}
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-background/60 shadow-sm backdrop-blur ${feature.iconColor}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/40 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>

                    <p className="text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Line */}
                  <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-border/40">
                    <div
                      className={`h-full w-2/3 rounded-full bg-gradient-to-r ${feature.gradient}`}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;