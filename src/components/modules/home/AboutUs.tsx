"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Target,
    Eye,
    Users,
    GraduationCap,
    BarChart3,
    ShieldCheck,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import Image from "next/image";

const stats = [
    { value: "10K+", label: "Students" },
    { value: "500+", label: "Teachers" },
    { value: "150+", label: "Institutes" },
    { value: "99.9%", label: "Uptime" },
];

const features = [
    {
        title: "Student Management",
        icon: Users,
        desc: "Manage admissions, profiles, and academic records efficiently.",
    },
    {
        title: "Attendance Tracking",
        icon: GraduationCap,
        desc: "Track daily attendance with automated reporting.",
    },
    {
        title: "Exam & Results",
        icon: BarChart3,
        desc: "Generate results and performance analytics instantly.",
    },
    {
        title: "Online Payments",
        icon: ShieldCheck,
        desc: "Secure fee collection and payment monitoring.",
    },
    {
        title: "Teacher Management",
        icon: Users,
        desc: "Manage teachers, schedules, and responsibilities.",
    },
    {
        title: "Analytics Dashboard",
        icon: Sparkles,
        desc: "Powerful reports and real-time business insights.",
    },
];

const values = [
    {
        title: "Innovation",
        desc: "We continuously improve our platform with modern technology.",
    },
    {
        title: "Trust",
        desc: "Your institute data is secure and reliable.",
    },
    {
        title: "Growth",
        desc: "Helping coaching centers scale smarter and faster.",
    },
];

export default function AboutUsPage() {
    return (
        <main className="relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
            </div>

            {/* HERO */}
            <section className="container py-20 md:py-32">
                <div className="grid items-center gap-12 lg:grid-cols-2">

                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-sm backdrop-blur">
                            <Sparkles className="h-4 w-4" />
                            About Our Platform
                        </div>

                        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                            Empowering Coaching Centers With Smart Technology
                        </h1>

                        <p className="mb-8 max-w-xl text-lg text-muted-foreground">
                            Our platform helps coaching institutes manage students,
                            attendance, exams, fees, teachers, and reports from one
                            powerful dashboard.
                        </p>

                        <Button size="lg">
                            Start Free Trial
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="aspect-video rounded-3xl border border-border/50 bg-muted/40 backdrop-blur-xl">
                            <Image
                                src="/about.png"
                                alt="About Us"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* MISSION & VISION */}
            <section className="container py-10">
                <div className="grid gap-6 md:grid-cols-2">

                    <Card className="rounded-3xl border-border/50">
                        <CardContent className="p-8">
                            <Target className="mb-5 h-10 w-10 text-primary" />

                            <h3 className="mb-3 text-2xl font-semibold">
                                Mission
                            </h3>

                            <p className="text-muted-foreground">
                                Simplify educational management through affordable,
                                scalable and innovative technology solutions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-border/50">
                        <CardContent className="p-8">
                            <Eye className="mb-5 h-10 w-10 text-primary" />

                            <h3 className="mb-3 text-2xl font-semibold">
                                Vision
                            </h3>

                            <p className="text-muted-foreground">
                                Become the most trusted coaching management platform
                                used by institutes worldwide.
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="container py-10">
                <div className="mb-14 text-center">
                    <h2 className="text-4xl font-bold">
                        Why Choose Us
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <Card
                                key={feature.title}
                                className="group rounded-3xl border-border/50 transition-all hover:-translate-y-2"
                            >
                                <CardContent className="p-8">
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>

                                    <h3 className="mb-3 text-xl font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p className="text-muted-foreground">
                                        {feature.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>



            {/* VALUES */}
            <section className="container py-10">
                <div className="mb-14 text-center">
                    <h2 className="text-4xl font-bold">
                        Our Core Values
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {values.map((value) => (
                        <Card key={value.title} className="rounded-3xl">
                            <CardContent className="p-8">
                                <h3 className="mb-3 text-xl font-semibold">
                                    {value.title}
                                </h3>

                                <p className="text-muted-foreground">
                                    {value.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* TEAM */}
            <section className="container py-10">
                <div className="mb-14 text-center">
                    <h2 className="text-4xl font-bold">
                        Meet Our Team
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {[1, 2, 3, 4].map((member) => (
                        <Card key={member} className="rounded-3xl">
                            <CardContent className="p-5">

                                <div className="mb-5 aspect-square rounded-2xl bg-muted">
                                    <Image 
                                    src={"/team.png"}
                                    alt="Team Member"
                                    width={400}
                                    height={400}
                                    className="object-cover"
                                    />
                                </div>

                                <h3 className="font-semibold">
                                    Team Member
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Frontend Developer
                                </p>

                            </CardContent>
                        </Card>
                    ))}

                </div>
            </section>

            {/* CTA */}
            <section className="container py-10">
                <Card className="overflow-hidden rounded-[32px] border-border/50 bg-gradient-to-r from-primary/10 via-background to-violet-500/10">
                    <CardContent className="p-10 text-center md:p-16">

                        <h2 className="mb-4 text-4xl font-bold">
                            Ready To Transform Your Coaching Center?
                        </h2>

                        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                            Join hundreds of institutes already using our platform
                            to streamline operations and improve productivity.
                        </p>

                        <Button size="lg">
                            Get Started Today
                        </Button>

                    </CardContent>
                </Card>
            </section>

        </main>
    )
}
