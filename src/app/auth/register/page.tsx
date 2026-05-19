
import RegisterForm from '@/components/modules/auth/RegisterFrom'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'


const RegisterPage = () => {
  return (
    <div>
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


          <div className="text-sm text-white/70 flex items-center gap-10 justify-center">
            © {new Date().getFullYear()} All rights reserved
            <Button className={"cursor-pointer hover:scale-110 transition-all duration-300"}>
              <Link href={"/"} className="flex items-center gap-2">
                <Home size={18} />
                Home
              </Link>
            </Button>
          </div>
        </div>


        <div className="w-full  flex items-center justify-center min-h-screen ">

          <div className="w-full">

            <RegisterForm />
          </div>

        </div>

      </div>

    </div>
  )
}

export default RegisterPage