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
    { title: "Features", href: "#features" },
    { title: "Pricing", href: "#pricing" },
    { title: "Dashboard", href: "/dashboard" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Careers", href: "/careers" },
  ],
  resources: [
    { title: "How It Works", href: "#how-it-works" },
    { title: "Testimonials", href: "#testimonials" },
    { title: "Help Center", href: "/help" },
  ],
};

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/mdsamiulislam2004/",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/mdsamiulislam2004/",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/mdshamiulislam-dev/",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com/mdsamiulislam54",
    label: "GitHub",
  },
];

const Footer = () => {
  return (
    <footer className="relative w-full border-t bg-background">
      <div className="container-c">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="size-6" />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  EduZen
                </h2>

                <p className="text-xs text-muted-foreground">
                  Coaching Management Platform
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              A simple and powerful platform to manage students, teachers,
              classes, attendance, fees, exams, and reports from one place.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:support@coachingcenter.com"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-primary" />
                support@coachingcenter.com
              </a>

              <a
                href="tel:+8801700000000"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="size-4 text-primary" />
                +880 1700-000000
              </a>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                Rangpur, Bangladesh
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <Icon className="size-3.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <FooterColumn title="Product" links={footerLinks.product} />

          {/* Company */}
          <FooterColumn title="Company" links={footerLinks.company} />

          {/* Resources */}
          <FooterColumn title="Resources" links={footerLinks.resources} />

          {/* Newsletter */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-semibold">
              Stay in the loop
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Get product updates, useful tips, and coaching management
              insights directly in your inbox.
            </p>

            <div className="mt-5 space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="h-10 rounded-lg"
              />

              <Button
                className="h-10 w-full rounded-lg"
                type="button"
              >
                Subscribe
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>

            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground sm:text-sm">
            © {new Date().getFullYear()} EduZen. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-muted-foreground sm:text-sm">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <div className="lg:col-span-1">
      <h3 className="text-sm font-semibold">{title}</h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.title}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;