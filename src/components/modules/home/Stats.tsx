"use client";

import {
  Users,
  GraduationCap,
  Building2,
  ShieldCheck,
  FileText,
} from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Total Students",
    value: "10K+",
    icon: Users,
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
  },
  {
    id: 2,
    title: "Active Teachers",
    value: "850+",
    icon: GraduationCap,
    gradient: "from-violet-500/20 to-fuchsia-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    id: 3,
    title: "Coaching Centers",
    value: "150+",
    icon: Building2,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    id: 4,
    title: "Success Rate",
    value: "99.9%",
    icon: ShieldCheck,
    gradient: "from-orange-500/20 to-yellow-500/20",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    id: 5,
    title: "Monthly Exams",
    value: "5K+",
    icon: FileText,
    gradient: "from-pink-500/20 to-rose-500/20",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
];

const StatsSection = () => {
  return (
    <section className="relative ">
      {/* Background Blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 inline-flex items-center rounded-full border border-border/50 bg-background/40 px-4 py-1 text-sm text-muted-foreground backdrop-blur">
            Trusted by Modern Coaching Centers
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Powering Smarter Education Management
          </h2>

          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Thousands of students, teachers, and institutes rely on our platform
            every day.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br ${item.gradient} p-[1px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
              >
                {/* Card */}
                <div className="relative flex h-full flex-col rounded-3xl bg-background/70 p-6 backdrop-blur-xl dark:bg-background/40">
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
                  </div>

                  {/* Icon */}
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} backdrop-blur`}
                  >
                    <Icon className={`h-7 w-7 ${item.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold tracking-tight text-foreground">
                      {item.value}
                    </h3>

                    <p className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </p>
                  </div>

                  {/* Bottom line */}
                  <div className="mt-6 h-[2px] w-full overflow-hidden rounded-full bg-border/40">
                    <div
                      className={`h-full w-2/3 rounded-full bg-gradient-to-r ${item.gradient}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;