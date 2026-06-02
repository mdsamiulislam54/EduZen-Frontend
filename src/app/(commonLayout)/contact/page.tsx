import ContactCards from "@/components/modules/home/Contact/ContactCards";
import ContactSection from "@/components/modules/home/Contact/ContactSection";
import CTASection from "@/components/modules/home/Contact/CTASection";
import FAQSection from "@/components/modules/home/Contact/FAQSection";
import HeroContact from "@/components/modules/home/Contact/HeroContact";
import WhyContact from "@/components/modules/home/Contact/WhyContact";

export default function ContactPage() {
  return (
    <div className="space-y-16 px-4 ">
      <HeroContact />
      <ContactCards />
      <ContactSection />
      <WhyContact />
      <FAQSection />
      <CTASection/>
    </div>
  );
}