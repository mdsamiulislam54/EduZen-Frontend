"use client"
import {

  GraduationCap,

} from "lucide-react";

import {
  Sidebar,
  SidebarContent,

  SidebarGroup,
  SidebarGroupContent,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { USER_ROLE } from "@/constants/role";
import { IUser } from "@/types/user.type";
import React from "react";
import { adminRoutes, ownerRoutes, studentRoutes, teacherRoutes } from "@/lib/route/route.page";
import Link from "next/link";




export const AppSidebar = ({ user }: { user: IUser | null }) => {
  console.log("User...............,", user)
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
      <SidebarHeader className="border-b p-3 py-10">
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

      <SidebarRail />
    </Sidebar>
  );
};


