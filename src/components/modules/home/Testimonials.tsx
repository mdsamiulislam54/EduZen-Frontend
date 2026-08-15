"use client";

import Image from "next/image";
import { Quote, Star, ArrowUpRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card } from "@/components/ui/card";

const reviews = [
  {
    name: "Abdul Karim",
    role: "Owner, ABC Coaching Center",
    image: "/user1.png",
    review:
      "This system made our institute fully automated. Attendance, fees and reports are now super easy to manage.",
    rating: 5,
  },
  {
    name: "Rahim Uddin",
    role: "Director, Bright Future Academy",
    image: "/user1.png",
    review:
      "The dashboard is smooth, modern, and easy to use. Managing students and classes has become effortless.",
    rating: 5,
  },
  {
    name: "Sara Ahmed",
    role: "Admin, Scholar Point",
    image: "/user1.png",
    review:
      "Clean UI, fast performance, and very easy to use. Perfect for managing a modern coaching institute.",
    rating: 4,
  },
  {
    name: "Samiul Islam",
    role: "Owner, Future Minds Coaching",
    image: "/user1.png",
    review:
      "The best management system I've used. Everything we need to run our coaching center is available in one place.",
    rating: 5,
  },
  {
    name: "Md Akram Mondol",
    role: "Principal, Elite Academy",
    image: "/user1.png",
    review:
      "Highly recommended for coaching institutes. It has completely transformed the way we manage our daily operations.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="w-full  ">
      <div className="container-c">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </span>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Loved by{" "}
            <span className="text-primary">Coaching Institutes</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            See how coaching center owners and administrators are simplifying
            their daily operations with our platform.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-5 my-10 mx-2">
            {reviews.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-5 sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                  {/* Top accent */}
                  <div className="absolute left-0 top-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />

                  {/* Quote icon */}
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Quote className="size-5 fill-primary/10" />
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-muted/60 px-3 py-1.5">
                      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">
                        {item.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Review */}
                  <blockquote className="flex-1">
                    <p className="text-[15px] leading-7 text-foreground/80">
                      “{item.review}”
                    </p>
                  </blockquote>

                  {/* Divider */}
                  <div className="my-6 h-px w-full bg-border" />

                  {/* User */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="size-12 rounded-full border object-cover"
                      />

                      <div>
                        <h3 className="text-sm font-semibold">
                          {item.name}
                        </h3>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>

      
      </div>
    </section>
  );
}