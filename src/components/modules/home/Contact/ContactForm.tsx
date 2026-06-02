"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createContactMessage } from "@/app/(commonLayout)/contact/_actions";
import { toast } from "sonner";

export default function ContactForm() {
    const {mutateAsync, isPending} = useMutation({
        mutationKey: ["contactForm"],
        mutationFn: createContactMessage,
    })
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting form:", form);
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
            toast.error(error instanceof Error ? error.message : "An error occurred while sending the message.");
        } 
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Send Message</h2>

            <Input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
            />

            <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
            />

            <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
            />

            <Input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
            />

            <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
            />

            <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
                {isPending ? "Sending..." : "Send Message"}
            </Button>
        </form>
    );
}