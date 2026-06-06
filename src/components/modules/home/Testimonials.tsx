"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Abdul Karim",
    role: "Owner, ABC Coaching Center",
    image: "/user1.png",
    review:
      "This system made our institute fully automated. Attendance, fees and reports everything is now super easy.",
    rating: 5,
  },
  {
    name: "Rahim Uddin",
    role: "Director, Bright Future Academy",
    image: "/user1.png",
    review:
      "Very smooth and modern dashboard. Managing students and classes has become effortless.",
    rating: 5,
  },
  {
    name: "Sara Ahmed",
    role: "Admin, Scholar Point",
    image: "/user1.png",
    review:
      "Clean UI, fast performance and very easy to use. Perfect for coaching management.",
    rating: 4,
  },
  {
    name: "Samiul Islam",
    role: "Owner, Future Minds Coaching",
    image: "/user1.png",
    review:
      "The best management system I've used. It has everything we need to run our coaching center efficiently.",
    rating: 5,
  },
  {
    name: "Md Akram Mondol",
    role: "Principal, Elite Academy",
    image: "/user1.png",
    review:
      "Highly recommend this system for any coaching institute. It has transformed how we manage our operations.",
    rating: 5,

  }
];

export default function Testimonials() {
  return (
    <section >
      <div >

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground mt-3">
            Trusted by coaching institutes nationwide
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="w-full  my-5">
          <CarouselContent className="-ml-4">

            {reviews.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3 cursor-pointer"
              >
                <Card
                  className={cn(
                    "group relative h-full overflow-hidden",
                    "border border-white/10",
                    "bg-background/60 backdrop-blur-2xl",
                    "rounded-3xl",
                    "transition-all duration-500",
                    "hover:-translate-y-2",
                    "hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.35)]"
                  )}
                >
                  {/* Gradient Border */}
                  <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-red-500/20 to-orange-500/20 via-transparent">
                    <div className="h-full w-full rounded-3xl bg-background/80 backdrop-blur-2xl" />
                  </div>

                  {/* Background Glow */}
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full gradient blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />

                  <div className="relative z-10 p-7">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-4">

                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />

                          <Image
                            src={item.image}
                            alt={item.name}
                            width={58}
                            height={58}
                            className="relative rounded-full border-2 border-primary/20 object-cover"
                          />
                        </div>

                        <div>
                          <h4 className="font-semibold text-base">
                            {item.name}
                          </h4>

                          <p className="text-xs text-muted-foreground">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      {/* Rating Badge */}
                      <div className="flex items-center gap-1 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">
                          {item.rating}.0
                        </span>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="mb-2">
                      <svg
                        className="h-10 w-10 text-primary/20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11 7H6a1 1 0 00-1 1v5a4 4 0 004 4h2V7zm8 0h-5a1 1 0 00-1 1v5a4 4 0 004 4h2V7z" />
                      </svg>
                    </div>

                    {/* Review */}
                    <p className="text-sm leading-7 text-muted-foreground min-h-[96px]">
                      {item.review}
                    </p>

                    {/* Footer */}
                    <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-4">

                      <div className="flex gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      <span className="text-xs text-muted-foreground">
                        Verified User
                      </span>

                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}

          </CarouselContent>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}