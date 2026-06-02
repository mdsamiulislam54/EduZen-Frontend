"use client"
import {
  BarChart3,
  ClipboardList,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/service/auth.service";
import { USER_ROLE } from "@/constants/role";
import { IUser } from "@/types/user.type";
import React from "react";
import { adminRoutes, ownerRoutes, studentRoutes, teacherRoutes } from "@/lib/route/route.page";
import Link from "next/link";
import Image from "next/image";


type NavItem = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  isActive?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  logo: {
    src: string;
    alt: string;
    title: string;
    description: string;
  };
  navGroups: NavGroup[];
  footerGroup: NavGroup;
};

// const sidebarData: SidebarData = {
//   logo: {
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo.svg",
//     alt: "Shadcnblocks",
//     title: "Shadcnblocks",
//     description: "Build your app",
//   },
//   navGroups: [
//     {
//       title: "Overview",
//       items: [
//         {
//           label: "Dashboard",
//           icon: LayoutDashboard,
//           href: "/dashboard",
//           isActive: true,
//         },
//         { label: "Tasks", icon: ClipboardList, href: "/tasks" },
//         { label: "Roadmap", icon: BarChart3, href: "/roadmap" },
//       ],
//     },
//   ],
//   footerGroup: {
//     title: "Support",
//     items: [
//       { label: "Help Center", icon: HelpCircle, href: "#" },
//       { label: "Settings", icon: Settings, href: "#" },
//     ],
//   },
// };

const SidebarLogo = ({ logo }: { logo: SidebarData["logo"] }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary">
            <Image
              src={logo.src}
              alt={logo.alt}
              className="size-6 text-primary-foreground invert dark:invert-0"
            />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">{logo.title}</span>
            <span className="text-xs text-muted-foreground">
              {logo.description}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export const AppSidebar = ({ user }: { user: IUser | null }) => {
  const navItem = React.useMemo(() => {
    switch (user?.role) {
      case USER_ROLE.ADMIN:
        return adminRoutes;
      case USER_ROLE.OWNER:
        return ownerRoutes;
      case USER_ROLE.STUDENT:
        return studentRoutes;
      case USER_ROLE.TEACHER:
        return teacherRoutes;
      default:
        return adminRoutes
    }
  }, [user?.role])



  return (
    <Sidebar >
      <SidebarHeader className="border-b p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full gradient shadow-sm">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold">EduZen</h2>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {navItem.map((item) => (
          <SidebarGroup key={item.title}>

            <SidebarGroupContent>
              <SidebarMenu>

                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.isActive} render={<Link href={item.url}></Link>}>
                    {item.icon && <item.icon className="size-4" />}
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>{sidebarData.footerGroup.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.footerGroup.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />}>{item.title}</SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
};


