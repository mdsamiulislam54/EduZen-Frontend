import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="text-center space-y-4 rounded-2xl bg-primary/10 p-10">
      <h2 className="text-2xl font-bold">
        Ready to Manage Your Coaching Smarter?
      </h2>

      <p className="text-muted-foreground">
        Start using EduZen today and grow your coaching business.
      </p>

      <div className="flex justify-center gap-3">
        <Button>Start Free Trial</Button>
        <Button variant="outline">Book Demo</Button>
      </div>
    </section>
  );
}