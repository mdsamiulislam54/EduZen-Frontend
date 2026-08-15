"use client";

import { Bell, ChevronRight, Home, User } from "lucide-react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../DarkThemeButton/DarkMode";

export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">

        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Home */}
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 rounded-xl border-border/60 bg-background shadow-none transition-colors hover:border-primary/30 hover:bg-primary/5"
            render={<Link href="/" />}
            nativeButton={false}
          >
            <Home className="size-4" />
            <span className="sr-only">Home</span>
          </Button>

          {/* Divider */}
          <div className="hidden h-5 w-px bg-border sm:block" />

          {/* Breadcrumb */}
          <Breadcrumb className="min-w-0">
            <BreadcrumbList className="flex-nowrap">
              <BreadcrumbItem className="hidden sm:block">
                <BreadcrumbLink
                  href="/dashboard"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Overview
                </BreadcrumbLink>
              </BreadcrumbItem>

              <ChevronRight className="hidden size-4 text-muted-foreground sm:block" />

              <BreadcrumbItem className="truncate">
                <BreadcrumbPage className="truncate text-sm font-medium">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-1.5">

          {/* Theme */}
          <ModeToggle />

          {/* Notification */}
          <Button
            variant="ghost"
            size="icon"
            className="relative size-9 rounded-xl text-muted-foreground transition-all hover:bg-primary/5 hover:text-foreground"
            render={<Link href="/dashboard/owner/notice" />}
            nativeButton={false}
          >
            <Bell className="size-4" />

            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary ring-2 ring-background" />

            <span className="sr-only">
              Notifications
            </span>
          </Button>

          {/* Divider */}
          <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

          {/* Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-xl border border-transparent bg-muted/40 transition-all hover:border-border/60 hover:bg-muted"
          >
            <User className="size-4" />
            <span className="sr-only">
              Profile
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}