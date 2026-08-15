"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const highlights = [
  {
    icon: Users,
    title: "Student Management",
    description: "Keep students, teachers and batches organized.",
  },
  {
    icon: WalletCards,
    title: "Fee Management",
    description: "Track payments and outstanding fees easily.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Make better decisions with real-time insights.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description: "Built with security and reliability in mind.",
  },
];

const stats = [
  {
    value: "500+",
    label: "Institutes",
  },
  {
    value: "20K+",
    label: "Students",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="container-c">

        {/* ================= HEADER ================= */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <GraduationCap className="size-3.5" />
              About EduZen
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Built to make coaching
              <span className="block text-primary">
                management simpler.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              EduZen is a modern coaching management platform designed
              to help institutes manage their everyday operations from
              one simple and powerful dashboard.
            </p>
          </div>

          {/* CTA */}
          <Button
            
            variant="outline"
            className="group w-fit rounded-xl"
          >
            <Link href="/contact" className="flex items-center">
              Learn More
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT — Mission */}
          <Card className="relative overflow-hidden rounded-3xl border-border/60 bg-card p-7 shadow-sm sm:p-9">

            {/* Glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">

              {/* Icon */}
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Zap className="size-6" />
              </div>

              <h3 className="text-xl font-semibold">
                Our mission
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                We believe coaching institutes should spend less time
                managing spreadsheets, paperwork and repetitive tasks,
                and more time focusing on students and education.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                {"That's"} why EduZen brings student management, attendance,
                fees, exams, reports and daily operations together into
                one streamlined platform.
              </p>

              {/* Trust Points */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Simple to use",
                  "Built for institutes",
                  "Real-time insights",
                  "Scalable platform",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />

                    <span className="text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* RIGHT — Stats */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">

            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="
                  rounded-3xl
                  border-border/60
                  bg-card
                  p-6
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/30
                "
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-3xl font-bold tracking-tight">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>

                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <BarChart3 className="size-5" />
                  </div>
                </div>
              </Card>
            ))}

          </div>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="
                  group
                  rounded-2xl
                  border-border/60
                  bg-card
                  p-5
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/30
                  hover:shadow-md
                "
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5" />
                </div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            );
          })}

        </div>

      </div>
    </section>
  );
}