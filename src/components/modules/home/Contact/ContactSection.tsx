import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactSection() {
  return (
    <section className="relative py-10">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        
        {/* Left: Contact Form */}
        <div className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl shadow-sm transition hover:shadow-md">
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight">
              Send us a message
            </h2>
            <p className="text-sm text-muted-foreground">
              We usually respond within 24 hours
            </p>
          </div>

          <ContactForm />
        </div>

        {/* Right: Contact Info */}
        <div className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl shadow-sm transition hover:shadow-md">
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight">
              Contact Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Quick support & demo booking for your coaching center
            </p>
          </div>

          <ContactInfo />
        </div>
      </div>
    </section>
  );
}