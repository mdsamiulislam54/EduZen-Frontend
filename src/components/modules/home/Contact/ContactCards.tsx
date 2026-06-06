
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MessageCircle } from "lucide-react";

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
    <div className="grid md:grid-cols-3 gap-4 my-10">
      {items.map((item, i) => (
        <Card key={i} className="hover:shadow-md  hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
            <item.icon className="w-6 h-6 text-blue-500" />
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}