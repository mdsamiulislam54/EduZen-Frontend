import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  BarChart3,
  UserCheck,
  ClipboardList,
  ClipboardListIcon,
} from "lucide-react";

import { IRoutePage } from "@/types/route.type";

/* ================= ADMIN ================= */
export const adminRoutes: IRoutePage[] = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Owner Management",
    url: "/dashboard/admin/owners",
    icon: Users,
  },
  {
    title: "Subscription Create",
    url: "/dashboard/admin/subscription-create",
    icon: CreditCard,
  },
  {
    title: "Subscription Plan",
    url: "/dashboard/admin/subscription-plan",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    url: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
];

/* ================= OWNER ================= */
export const ownerRoutes: IRoutePage[] = [
  {
    title: "Dashboard",
    url: "/dashboard/owner",
    icon: LayoutDashboard,
  },
  {
    title: "Teachers",
    url: "/dashboard/owner/teachers",
    icon: UserCheck,
  },
  {
    title: "Students",
    url: "/dashboard/owner/students",
    icon: Users,
  },
  {
    title: "Subscription",
    url: "/dashboard/owner/subscription",
    icon: CreditCard,
  },
  {
    title: "Attendance",
    url: "/dashboard/owner/attendance",
    icon: ClipboardListIcon,
  },
  {
    title: "Analytics",
    url: "/dashboard/owner/analytics",
    icon: BarChart3,
  },
  {
    title:" Batches",
    url:"/dashboard/owner/batches",
    icon: BookOpen,
  },
  {
    title:"Subjects",
    url:"/dashboard/owner/subjects",
    icon: BookOpen,
  }
];

/* ================= TEACHER ================= */
export const teacherRoutes: IRoutePage[] = [
  {
    title: "Dashboard",
    url: "/dashboard/teacher",
    icon: LayoutDashboard,
  },
  {
    title: "My Classes",
    url: "/dashboard/teacher/classes",
    icon: BookOpen,
  },
  {
    title: "Students",
    url: "/dashboard/teacher/students",
    icon: Users,
  },
  {
    title: "Attendance",
    url: "/dashboard/teacher/attendance",
    icon: ClipboardList,
  },
];

/* ================= STUDENT ================= */
export const studentRoutes: IRoutePage[] = [
  {
    title: "Dashboard",
    url: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    title: "My Courses",
    url: "/dashboard/student/courses",
    icon: BookOpen,
  },
  {
    title: "Payments",
    url: "/dashboard/student/payments",
    icon: CreditCard,
  },
];