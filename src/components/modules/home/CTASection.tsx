"use client";

import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  MessageCircle,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const benefits = [
  "No credit card required",
  "Easy setup",
  "Built for coaching institutes",
];

export default function CTASection() {
  return (
    <section className="w-full ">
      <div className="container-c">
        <Card className="relative overflow-hidden rounded-3xl border bg-background">
          {/* Background glow */}
          <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-32 size-96 rounded-full bg-primary/10 blur-3xl" />

          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-20 lg:py-24">
            {/* Label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary" />
              Built for modern coaching institutes
            </div>

            {/* Heading */}
            <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              Run Your Coaching Center
              <span className="block gradient bg-clip-text text-transparent">
                Smarter From Day One
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base lg:text-lg">
              Manage students, teachers, attendance, fees, exams, and reports
              from one simple platform designed to save time and keep your
              institute organized.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-xl px-7 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
              >
                <Link href="/auth/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-xl px-7"
              >
                <PlayCircle className="mr-2 size-4" />
                See How It Works
              </Button>
            </div>

            {/* Benefits */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm"
                >
                  <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-2.5" />
                  </span>
                  {benefit}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-auto mt-10 h-px max-w-2xl bg-border/70" />

            {/* Bottom trust */}
            <div className="mt-7 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
              <div>
                <span className="font-semibold text-foreground">500+</span>{" "}
                Institutes
              </div>

              <span className="hidden size-1 rounded-full bg-border sm:block" />

              <div>
                <span className="font-semibold text-foreground">20K+</span>{" "}
                Students Managed
              </div>

              <span className="hidden size-1 rounded-full bg-border sm:block" />

              <div>
                <span className="font-semibold text-foreground">99.9%</span>{" "}
                Platform Uptime
              </div>
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <MessageCircle className="size-3.5" />
              Have questions? Talk to our team
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}