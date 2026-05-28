import { GraduationCap, Wifi, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  icon?: React.ReactNode;
  heading: string;
  description: string;
  button?: {
    text: string;
    icon?: React.ReactNode;
    url: string;
    className?: string;
  };
  trustText?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

const Hero = ({
  icon = <GraduationCap size={50} className="animate-pulse  text-white " />,
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Create Coaching Center",
    icon: <Zap className="ml-2 size-4" />,
    url: "/subscriptions",
  },
  trustText = "Trusted by 1,000+ students and coaching centers",
  className,
}: HeroProps) => {
  return (
    <section className={cn("overflow-hidden lg:pt-32 pt-10 ", className)}>
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://img.magnific.com/free-vector/abstract-motion-wave-line-gradient-line-background-vector-design_8048-500.jpg?t=st=1779949906~exp=1779953506~hmac=a4f47ff40f22aa327671e071067eacb240c632c6f7318cb0db9977703c8a0ca6&w=1480"
          alt="Hero Background"
          width={400}
          height={400}
          className="min-h-screen w-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      {/* Gradient Blur */}
     

      <div className=" relative ">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute top-1/2 left-1/2 -z-10 mx-auto size-200 rounded-full border border-indigo-500 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-375 md:p-32"
            >
              <div className="size-full rounded-full border border-purple-500 p-16 md:p-32">
                <div className="size-full rounded-full border border-indigo-500">
                   
                </div>
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20 gradient">
              {icon}
            </span>
            <h2 className="mx-auto max-w-5xl text-center  text-xl md:text-3xl  font-medium text-balance lg:text-6xl text-white">
              {heading}
            </h2>
            <p className="mx-auto max-w-3xl text-center md:text-lg text-gray-300">
              {description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <Button size="lg" render={<Link href={button.url}></Link>} nativeButton={false}>{button.text}{button.icon}</Button>
              {trustText && (
                <div className="text-xs text-gray-300">{trustText}</div>
              )}
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default Hero
