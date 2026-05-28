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
    image: "/user2.png",
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
    image: "/user2.png",
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
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground mt-3">
            Trusted by coaching institutes nationwide
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">

            {reviews.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3 cursor-pointer"
              >
                <Card
                  className={cn(
                    "p-6  relative overflow-hidden my-4",
                    "bg-background/60 backdrop-blur-xl",
                    "border border-border",
                    "shadow-lg hover:shadow-xl transition"
                  )}
                >
               

                  {/* User */}
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />

                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Review */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {item.review}
                  </p>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
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