import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  "Student Management",
  "Fee Tracking",
  "Batch Scheduling",
  "Attendance System",
];

export default function ContactInfo() {
  return (
    <div className="relative">

      {/* Badge */}
      <Badge
        variant="secondary"
        className="
          mb-5
          rounded-full
          border border-primary/20
          bg-primary/5
          px-3 py-1.5
          text-xs font-medium
          text-primary
        "
      >
       
        We’re here to help
      </Badge>

      {/* Heading */}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Let’s build a smarter
        <span className="block text-primary">
          coaching experience.
        </span>
      </h2>

      {/* Description */}
      <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
        Have a question, need a demo, or want to learn more about
        EduZen? Our team is ready to help your coaching center
        simplify its daily operations.
      </p>

      {/* Features */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="
              flex items-center gap-3
              rounded-xl
              border border-border/50
              bg-card/50
              px-4 py-3
              transition-all duration-300
              hover:border-primary/30
              hover:bg-primary/5
            "
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CheckCircle2 className="size-4" />
            </div>

            <span className="text-sm font-medium">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Support Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">

        {/* Response */}
        <div
          className="
            rounded-2xl
            border border-border/60
            bg-card
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock3 className="size-5" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Quick Response
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Usually within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Support */}
        <div
          className="
            rounded-2xl
            border border-border/60
            bg-card
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Headphones className="size-5" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Dedicated Support
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Here when you need us
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Trust */}
      <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 text-primary" />

        <span>
          Your information is safe and kept private.
        </span>

        <ArrowUpRight className="ml-auto size-4" />
      </div>
    </div>
  );
}