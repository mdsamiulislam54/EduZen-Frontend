// import Sidebar from "@/components/dashboard/Sidebar";
// import Navbar from "@/components/dashboard/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-red-500">

        <div className="p-4 overflow-y-auto">
          {children}
        </div>

      </div>
  );
}