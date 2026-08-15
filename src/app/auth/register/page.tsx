import RegisterForm from "@/components/modules/auth/RegisterFrom";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

const RegisterPage = () => {
  const benefits = [
    "Manage students, teachers & batches",
    "Track attendance, fees & performance",
    "Get smart reports from one dashboard",
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* ================= LEFT ================= */}
          <div className="relative hidden overflow-hidden border-r border-border/60 bg-muted/20 p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">

            {/* Decorative Glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-primary/5 blur-3xl" />

            {/* Brand */}
            <div className="relative">
              <Link
                href="/"
                className="group inline-flex items-center gap-3"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <GraduationCap className="size-6" />
                </div>

                <div>
                  <h1 className="text-lg font-bold tracking-tight">
                    EduZen
                  </h1>

                  <p className="text-[11px] text-muted-foreground">
                    Coaching Management Platform
                  </p>
                </div>
              </Link>
            </div>

            {/* Main Content */}
            <div className="relative my-auto py-16">

              

              {/* Heading */}
              <h2 className="max-w-lg text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
                Build a smarter coaching center,
                <span className="block text-primary">
                  starting today.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                Create your account and get everything you need to
                manage your coaching institute from one simple,
                powerful platform.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3"
                  >
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="size-4" />
                    </div>

                    <span className="text-sm font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

            
            </div>

            {/* Footer */}
            <div className="relative flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                © {new Date().getFullYear()} EduZen
              </span>

              <span className="size-1 rounded-full bg-border" />

              <span>
                Smart Coaching Management
              </span>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
            <div className="w-full max-w-md">

              {/* Mobile Brand */}
              <div className="mb-8 flex flex-col items-center text-center lg:hidden">
                <Link
                  href="/"
                  className="mb-4 flex items-center gap-2.5"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <GraduationCap className="size-5" />
                  </div>

                  <span className="text-lg font-bold">
                    EduZen
                  </span>
                </Link>
              </div>

              {/* Register Form */}
              
              <RegisterForm />

              {/* Back Home */}
              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Back to homepage
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default RegisterPage;