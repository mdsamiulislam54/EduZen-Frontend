import { Button } from "@/components/ui/button";

export default function HeroContact() {
  return (
    <section className="space-y-4  py-10 rounded-lg ">
      <h1 className="text-xl font-bold text-white ">Get In Touch</h1>
      <p className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        Here to help your coaching center grow.
      </p>

      <div className="flex gap-3 ">
        <Button>Book Demo</Button>
        <Button variant="outline">Contact Support</Button>
      </div>
    </section>
  );
}