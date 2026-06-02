import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Headphones, Monitor } from "lucide-react";

const items = [
  {
    icon: Headphones,
    title: "Fast Support",
    desc: "Quick response from our support team.",
  },
  {
    icon: Monitor,
    title: "Live Demo",
    desc: "Personal walkthrough of the system.",
  },
  {
    icon: Rocket,
    title: "Easy Onboarding",
    desc: "We help you set everything up.",
  },
];

export default function WhyContact() {
  return (
    <div className="grid md:grid-cols-3 gap-4 ">
      {items.map((item, i) => (
        <Card key={i}>
          <CardContent className="p-5 space-y-2">
            <item.icon className="text-primary w-6 h-6" />
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}