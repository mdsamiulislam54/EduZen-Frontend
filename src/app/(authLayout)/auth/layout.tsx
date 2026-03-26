export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">


      <div className="hidden md:flex w-full gradient text-white p-10 flex-col justify-between">


        <div>

          <h1 className="text-3xl font-bold">Coaching SaaS</h1>
          <p className="mt-2 text-sm text-white/80">
            Manage students, teachers & payments easily
          </p>
        </div>


        <div className="flex items-center justify-center flex-1">
          <p className="text-lg text-white/80">
            Smart management system for your coaching center
          </p>
        </div>

        {/* Bottom */}
        <div className="text-sm text-white/70">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>


      <div className="w-full  flex items-center justify-center min-h-screen ">

        <div className="w-full">
       
          {children}
        </div>

      </div>

    </div>
  );
}