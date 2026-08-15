"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { createContactMessage } from "@/app/(commonLayout)/contact/_actions";

export default function ContactForm() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["contactForm"],
    mutationFn: createContactMessage,
  });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mutateAsync(form);

      toast.success("Message sent successfully!");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while sending the message."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MessageSquare className="size-5" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight">
          Send us a message
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          Have a question or need help? Tell us what you need and
          our team will get back to you shortly.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-5">

        {/* Name + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium"
            >
              Full Name
            </label>

            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="
                  h-11 rounded-xl pl-10
                  border-border/60
                  bg-background/60
                  transition-all
                  focus:border-primary/50
                  focus:ring-primary/10
                "
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="
                  h-11 rounded-xl pl-10
                  border-border/60
                  bg-background/60
                  transition-all
                  focus:border-primary/50
                  focus:ring-primary/10
                "
              />
            </div>
          </div>
        </div>

        {/* Phone + Subject */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium"
            >
              Phone Number
            </label>

            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+880 1XXXXXXXXX"
                className="
                  h-11 rounded-xl pl-10
                  border-border/60
                  bg-background/60
                  transition-all
                  focus:border-primary/50
                  focus:ring-primary/10
                "
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium"
            >
              Subject
            </label>

            <Input
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              required
              className="
                h-11 rounded-xl
                border-border/60
                bg-background/60
                transition-all
                focus:border-primary/50
                focus:ring-primary/10
              "
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium"
          >
            Message
          </label>

          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us a little more about how we can help..."
            required
            className="
              min-h-[150px]
              resize-none
              rounded-xl
              border-border/60
              bg-background/60
              px-4 py-3
              leading-6
              transition-all
              focus:border-primary/50
              focus:ring-primary/10
            "
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="
          h-11 w-full rounded-xl
          gap-2
          shadow-sm
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-md
          sm:w-auto
          sm:px-8
        "
      >
        {isPending ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="size-4" />
          </>
        )}
      </Button>

      {/* Bottom note */}
      <p className="text-xs leading-5 text-muted-foreground">
        We usually respond within 1 business day. Your information
        is kept private and will only be used to respond to your
        request.
      </p>
    </form>
  );
}