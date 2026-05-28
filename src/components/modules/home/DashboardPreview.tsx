"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Expand } from "lucide-react";

const data = [
  { title: "Owner Dashboard", img: "/owner.png" },
  { title: "Admin Dashboard", img: "/admin.png" },

  { title: "Student Panel", img: "/student.png" },
  { title: "Result Page", img: "/result.png" },
  { title: "Attendance", img: "/attendance.png" },
  { title: "Payment Report", img: "/payment.png" },
];

export default function DashboardPreview() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <section className="relative">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-xl md:text-5xl font-bold">
          Live Dashboard Preview
        </h2>
        <p className="text-muted-foreground mt-3">
          Explore admin, student, attendance and payment system UI
        </p>
      </div>

      {/* Main Card */}
      <div className=" ">
        <Card className="relative rounded-3xl border border-border/50 bg-background/60 backdrop-blur-xl shadow-xl p-4">
          <div className="relative aspect-video overflow-hidden rounded-2xl group">
            <Image
              src={data[active].img}
              alt={data[active].title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

           
            <button
              onClick={() => setOpen(true)}
              className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white opacity-0 group-hover:opacity-100 transition"
            >
              <Expand size={18} />
            </button>
          </div>

          
          <div className="mt-4 text-center font-medium">
            {data[active].title}
          </div>
        </Card>

     
        <div className="my-8">
          <Carousel className="w-full">
            <CarouselContent>
              {data.map((item, i) => (
                <CarouselItem key={i} className="basis-1/2 md:basis-1/4">
                  <div
                    onClick={() => setActive(i)}
                    className={`cursor-pointer rounded-xl border overflow-hidden transition my-10 p-2
                      ${active === i
                        ? "shadow-2xl scale-105"
                        : "shadow-lg opacity-70"
                      }`}
                  >
                    <div className="relative aspect-video rounded-2xl">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-contain "
                      />
                    </div>
                    <div className="p-2 text-xs text-center">
                      {item.title}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-7xl p-0 overflow-hidden bg-background border-border/50">
          <div className="relative aspect-video">
            <Image
              src={data[active].img}
              alt={data[active].title}
              fill
              className="object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}