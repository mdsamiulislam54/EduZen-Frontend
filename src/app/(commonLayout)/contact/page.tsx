import ContactCards from "@/components/modules/home/Contact/ContactCards";
import ContactSection from "@/components/modules/home/Contact/ContactSection";
import HeroContact from "@/components/modules/home/Contact/HeroContact";


export default function ContactPage() {
  return (
    <div className="space-y-16 container-c ">
      <HeroContact />
      <ContactCards />
      <ContactSection />
  
    </div>
  );
}