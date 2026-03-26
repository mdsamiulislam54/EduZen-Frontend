// import Sidebar from "@/components/dashboard/Sidebar";
// import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        {/* <Sidebar /> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="h-16 shadow">
          {/* <Navbar /> */}
        </div>

        {/* Page Content */}
        <div className="p-4 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}