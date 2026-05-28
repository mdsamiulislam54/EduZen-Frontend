"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  BookOpen,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Create Institute",
    desc: "Set up your coaching institute profile with branding, settings, and structure in just a few clicks.",
    icon: Building2,
  },
  {
    id: 2,
    title: "Add Students & Teachers",
    desc: "Onboard students and teachers, assign roles, and organize batches efficiently in one dashboard.",
    icon: Users,
  },
  {
    id: 3,
    title: "Manage Classes & Fees",
    desc: "Schedule classes, track attendance, and manage fee collection automatically with reminders.",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Track Reports Easily",
    desc: "Monitor performance, revenue, attendance, and analytics in real time with smart reports.",
    icon: BarChart3,
  },
];

export default function HowItWorksTimeline() {
  return (
    <section className="w-full bg-background">
      <div className="">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How It Works
          </h2>
          <p className="text-muted-foreground mt-3">
            Simple 4-step workflow to manage your institute
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-border -translate-x-1/2" />

          <div className="space-y-14">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "relative md:flex items-center w-full",
                    isLeft ? "md:justify-start" : "md:justify-end"
                  )}
                >
                  {/* Content */}
                  <div className={cn("md:w-[45%]", isLeft ? "md:pr-10" : "md:pl-10")}>
                    <Card className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-lg transition">
                      <div className="flex items-start gap-4">

                        {/* Icon + Number */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>

                          {/* Number badge */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                            {step.id}
                          </div>
                        </div>

                        {/* Text */}
                        <div>
                          <h3 className="text-lg font-semibold">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile version */}
        <div className="md:hidden mt-14 space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card key={step.id} className="p-5 rounded-2xl">
                <div className="flex items-start gap-4">

                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center relative">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] bg-primary text-white rounded-full flex items-center justify-center">
                      {step.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}