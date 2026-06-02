import { Button } from "@/components/ui/button";

export default function HeroContact() {
  return (
    <section className="text-center space-y-4 gradient p-10 rounded-lg ">
      <h1 className="text-3xl font-bold text-white">Get In Touch</h1>
      <p className="text-white  max-w-xl mx-auto">
        Need help, demo, or support? Our team is ready to assist your coaching center.
      </p>

      <div className="flex gap-3 justify-center">
        <Button>Book Demo</Button>
        <Button variant="outline">Contact Support</Button>
      </div>
    </section>
  );
}