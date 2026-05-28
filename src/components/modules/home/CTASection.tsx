"use client";

import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden ">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-purple-500/10 rounded-3xl" />

      {/* Blur Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/20 blur-3xl " />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl " />
      <div className="absolute left-1/2 top-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size:[40px_40px] opacity-[0.03]" />

      <div className="relative  ">

        {/* Main Card */}
        <Card className="relative overflow-hidden rounded-3xl border-border/50 bg-background/70 backdrop-blur-xl shadow-2xl">

          {/* Glow Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />

          <div className="relative z-10 px-6 py-14 md:px-14 md:py-20 text-center">

            {/* Badge */}
            <Badge
              variant="secondary"
              className="mb-5 px-4 py-1 text-sm"
            >
              Smart Coaching Management Platform
            </Badge>

            {/* Heading */}
            <h2 className="mx-auto max-w-4xl text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Start Managing Your Coaching
              <span className= " gradient bg-clip-text text-transparent">
                {" "}
                Smarter Today
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Automate student management, fee tracking, attendance,
              exams, and reports with one modern platform designed
              for coaching institutes.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

              {/* Primary Button */}
              <Button
                size="lg"
                className="
                  rounded-xl px-7
                  shadow-[0_0_30px_hsl(var(--primary)/0.35)]
                  transition-all duration-300
                  hover:scale-[1.03]
                "
              >
                <Link href="/auth/register" className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              {/* Demo Button */}
              <Button
                variant="secondary"
                size="lg"
                className="rounded-xl px-7"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Book Demo
              </Button>

              {/* Contact Button */}
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-7"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>

            {/* Bottom Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">

              <div>
                <span className="font-semibold text-foreground">
                  500+
                </span>{" "}
                Institutes
              </div>

              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border" />

              <div>
                <span className="font-semibold text-foreground">
                  20K+
                </span>{" "}
                Students Managed
              </div>

              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border" />

              <div>
                <span className="font-semibold text-foreground">
                  99.9%
                </span>{" "}
                Uptime
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}