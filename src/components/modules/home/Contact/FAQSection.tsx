import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Is there a free demo?", a: "Yes, you can book a free demo anytime." },
  { q: "How long setup takes?", a: "Usually 1–2 days." },
  { q: "Do you provide training?", a: "Yes, full onboarding support included." },
  { q: "Can I import students?", a: "Yes, CSV import supported." },
];

export default function FAQSection() {
  return (
    <Accordion >
      {faqs.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className={"text-xl"}>{item.q}</AccordionTrigger>
          <AccordionContent className={"text-lg"}>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}