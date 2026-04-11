
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/service/auth.service";
import { IUser } from "@/types/user.type";
import { AppSidebar } from "@/components/modules/Dashboard/sidebar";
import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: IUser | null = await getCurrentUser();
  return (
    <SidebarProvider >
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <DashboardNavbar />
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4">
          <div />
   
            {children}
   
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}