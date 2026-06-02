"use client";

import { Bell, Home, Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../DarkThemeButton/DarkMode";

export default function DashboardNavbar() {
  return (
    <div className="flex items-center justify-between px-4 py-3  bg-background">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 mr-4">

        {/* Home Button */}
        <Link href="/">
          <Button variant="outline" size="icon">
            <Home className="w-4 h-4" />
          </Button>
        </Link>

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Overview</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="hidden md:block" />

            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-10 ">

     
          <ModeToggle />
      

        {/* Notification */}
        <Button variant="ghost" size="icon" className="relative">
          <Link href="/dashboard/owner/notice">
            <Bell className="w-4 h-4" />
          </Link>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* Profile */}
        <Button variant="ghost" size="icon">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}