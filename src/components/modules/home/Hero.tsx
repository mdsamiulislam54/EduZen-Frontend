
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden py-12 sm:py-16 lg:py-10 container-c",
        className
      )}
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] sm:h-96 sm:w-96" />

        <div className="absolute -right-20 top-1/2 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ================= LEFT CONTENT ================= */}
          <div className="mx-auto w-full max-w-4xl text-center lg:mx-0 lg:text-left">

         

            {/* Heading */}
           <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-[52px]"> Smarter Coaching. <span className="mt-2 block text-primary"> Better Management. </span> </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
              A complete coaching center management solution to manage
              students, attendance, exams, payments, teachers and daily
              operations from one powerful dashboard.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:justify-start">
              <Button size="lg" >
                <Link href="/subscriptions" className="flex items-center " >
                  Get Started Free
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline"  >
                <Link href="#demo" className="flex items-center " >
                  <Play className="mr-2 size-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs text-muted-foreground sm:text-sm lg:justify-start">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                Student Management
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                Online Payments
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                Exam & Results
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 border-t pt-6 text-center lg:text-left">
              <div className="px-2 sm:px-4 lg:px-0">
                <div className="text-xl font-bold sm:text-2xl">
                  1000+
                </div>

                <div className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  Students Managed
                </div>
              </div>

              <div className="border-x px-2 sm:px-4 lg:px-6">
                <div className="text-xl font-bold sm:text-2xl">
                  99.9%
                </div>

                <div className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  Platform Reliability
                </div>
              </div>

              <div className="px-2 sm:px-4 lg:px-6">
                <div className="text-xl font-bold sm:text-2xl">
                  24/7
                </div>

                <div className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  Access Anywhere
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative mx-auto w-full max-w-xl">

            {/* Decorative glow */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />

            {/* Image wrapper */}
            <div className="relative aspect-square w-full sm:aspect-[5/4] lg:aspect-square">

              <Image
                src="/Office management-pana.png"
                alt="Coaching center management dashboard"
                fill
                priority
                sizes="
                  (max-width: 640px) 90vw,
                  (max-width: 1024px) 55vw,
                  50vw
                "
                className="object-contain"
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

