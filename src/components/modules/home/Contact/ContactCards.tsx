import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";

const items = [
  {
    icon: Mail,
    title: "Email Support",
    value: "support@eduzen.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1XXX-XXXXXX",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    value: "Available 9AM - 10PM",
  },
];

export default function ContactCards() {
  return (
    <div className="my-10 grid gap-4 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} className="group relative overflow-hidden rounded-2xl border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
            <CardContent className="relative flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-5" />
              </div>

              <div className="flex w-full items-center justify-center gap-1">
                <h3 className="font-semibold">{item.title}</h3>
                <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>

              <p className="mt-2 text-sm text-muted-foreground">{item.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}