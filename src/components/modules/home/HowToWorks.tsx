"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  BookOpen,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Create Your Institute",
    desc: "Set up your institute profile, branding, and basic settings in just a few minutes.",
    icon: Building2,
  },
  {
    id: "02",
    title: "Add Your Team & Students",
    desc: "Invite teachers, add students, and organize everything into batches effortlessly.",
    icon: Users,
  },
  {
    id: "03",
    title: "Manage Everything",
    desc: "Handle classes, attendance, fees, exams, routines, and daily operations from one place.",
    icon: BookOpen,
  },
  {
    id: "04",
    title: "Track & Grow",
    desc: "Get clear insights into attendance, revenue, performance, and overall institute growth.",
    icon: BarChart3,
  },
];

export default function HowItWorksTimeline() {
  return (
    <section className="w-full py-20 sm:py-24 lg:py-28">
      <div className="container-c">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            From Setup to Success
            <span className="block text-muted-foreground">
              in just four simple steps.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Everything you need to run your coaching institute efficiently,
            organized into one simple workflow.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="relative hidden md:block">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-border" />

          <div className="space-y-10 lg:space-y-14">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "relative flex w-full items-center",
                    isLeft ? "justify-start" : "justify-end"
                  )}
                >
                  {/* Card */}
                  <Card
                    className={cn(
                      "group relative w-[44%] overflow-hidden rounded-2xl border bg-background p-6 transition-all duration-300",
                      "hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl",
                      isLeft ? "mr-auto" : "ml-auto"
                    )}
                  >
                    {/* Decorative number */}
                    <span className="pointer-events-none absolute -right-2 -top-7 select-none text-8xl font-black text-muted/20">
                      {step.id}
                    </span>

                    <div className="relative flex gap-5">
                      {/* Icon */}
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Step {step.id}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold tracking-tight">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Center node */}
                  <div className="absolute left-1/2 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-sm">
                    <div className="size-3 rounded-full bg-primary ring-4 ring-primary/10" />
                  </div>

                  {/* Connector */}
                  <div
                    className={cn(
                      "absolute top-1/2 h-px w-[6%] -translate-y-1/2 bg-border",
                      isLeft ? "left-[44%]" : "right-[44%]"
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="relative space-y-5 md:hidden">
          {/* Vertical line */}
          <div className="absolute bottom-6 left-5 top-6 w-px bg-border" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative pl-12">
                {/* Timeline node */}
                <div className="absolute left-0 top-6 z-10 flex size-10 items-center justify-center rounded-full border bg-background">
                  <div className="size-2.5 rounded-full bg-primary" />
                </div>

                <Card className="group rounded-2xl border p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                  <div className="flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Step {step.id}
                      </span>

                      <h3 className="mt-1 font-semibold tracking-tight">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}