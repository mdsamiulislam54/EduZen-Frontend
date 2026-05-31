"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  
} from "react-icons/fa";
import {
    MapPin,
    Phone,
    GraduationCap,
    ArrowRight,
    Mail,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
    product: [
        { title: "Features", href: "#" },
        { title: "Pricing", href: "#" },
        { title: "Dashboard", href: "#" },
        { title: "Analytics", href: "#" },
    ],
    company: [
        { title: "About Us", href: "#" },
        { title: "Contact", href: "#" },
        { title: "Careers", href: "#" },
        { title: "Blog", href: "#" },
    ],
    resources: [
        { title: "Help Center", href: "#" },
        { title: "Documentation", href: "#" },
        { title: "Privacy Policy", href: "#" },
        { title: "Terms & Conditions", href: "#" },
    ],
};

const socialLinks = [
    {
        icon: FaFacebookF,
        href: "https://www.facebook.com/mdsamiulislam2004/",
    },
    {
        icon: FaInstagram,
        href: "https://www.instagram.com/mdsamiulislam2004/",
    },
    {
        icon: FaLinkedinIn,
        href: "https://www.linkedin.com/in/mdshamiulislam-dev/",
    },
    {
        icon: FaGithub,
        href: "https://github.com/mdsamiulislam54",
    },
];

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-border/50 bg-background">
         
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-16 md:px-6">

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

                 
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold tracking-tight">
                                    EduZen
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    Smart Coaching Management SaaS
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                            Simplify student management, attendance, exams, payments,
                            analytics, and communication with an all-in-one coaching
                            management platform.
                        </p>

                  
                        <div className="mt-6 space-y-3">

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                support@coachingcenter.com
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                +880 1700-000000
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                Rangpur, Bangladesh
                            </div>
                        </div>

                    
                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        target="_blank"
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-muted"
                                    >
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

            
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Product
                        </h3>

                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition hover:text-foreground"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Company
                        </h3>

                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition hover:text-foreground"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">
                            Newsletter
                        </h3>

                        <p className="mb-4 text-sm leading-6 text-muted-foreground">
                            Subscribe to get product updates, feature releases, and coaching
                            management tips.
                        </p>

                        <div className="space-y-3">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="h-11 rounded-xl border-border/50 bg-background/60"
                            />

                            <Button className="h-11 w-full rounded-xl gradient text-white hover:opacity-90">
                                Subscribe
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

       
                <div className="my-10 h-px w-full bg-border/50" />

             
                <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Coaching Center SaaS. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-5 text-sm text-muted-foreground">
                        <Link href="#" className="transition hover:text-foreground">
                            Privacy
                        </Link>

                        <Link href="#" className="transition hover:text-foreground">
                            Terms
                        </Link>

                        <Link href="#" className="transition hover:text-foreground">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;