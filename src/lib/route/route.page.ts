import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  BarChart3,
  UserCheck,
  ClipboardList,
  ClipboardListIcon,
  PenTool,
  Pin,
  PiIcon,
  PinIcon,
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
    url: "/dashboard/owner/teacher",
    icon: UserCheck,
  },
  {
    title: "Students",
    url: "/dashboard/owner/student",
    icon: Users,
  },
  {
    title: "Subscription",
    url: "/dashboard/owner/subscription",
    icon: CreditCard,
  },
  {
    title: "Exam",
    url: "/dashboard/owner/exam",
    icon: BookOpen,
  },
  {
    title: "Attendance",
    url: "/dashboard/owner/attendance",
    icon: ClipboardListIcon,
  },
  {
    title: "Analytics",
    url: "/dashboard/owner/analytic",
    icon: BarChart3,
  },
  {
    title:" Batches",
    url:"/dashboard/owner/batch",
    icon: BookOpen,
  },
  {
    title:"Subjects",
    url:"/dashboard/owner/subject",
    icon: BookOpen,
  },
  {
    title:"Notice",
    url:"/dashboard/owner/notice",
    icon: Pin,
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
    url: "/dashboard/teacher/my-class",
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
  {
    title: "Marks",
    url: "/dashboard/teacher/marks",
    icon: PenTool,
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
    title: "My Class",
    url: "/dashboard/student/my-class",
    icon: BookOpen,
  },
  {
    title: "Payments",
    url: "/dashboard/student/payments",
    icon: CreditCard,
  },
  {
    title: "Notice",
    url: "/dashboard/student/notice",
    icon: PinIcon,
  },
];