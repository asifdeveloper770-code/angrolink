import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/site/Reveal";
import { DataPixels } from "@/components/site/DataPixels";
import { submitContactForm } from "@/lib/supabase";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AgriLink Kakuma LLC | Kakuma & Nairobi Offices" },
      {
        name: "description",
        content:
          "Reach the AgriLink Kakuma team: corporate contact form, business emails, operational phone lines and office locations in Kakuma and Nairobi.",
      },
      { property: "og:title", content: "Contact AgriLink Kakuma LLC" },
      {
        property: "og:description",
        content: "Corporate enquiries, procurement, logistics and partnerships desks.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  organisation: z.string().trim().max(120).optional(),
  department: z.string().min(1, "Select a department"),
  message: z.string().trim().min(10, "Please add a little more detail").max(1500),
});

const OFFICES = [
  {
    city: "Kakuma — Operations HQ",
    lines: ["Kakuma Town Trade Yard, Plot 118", "Turkana West Sub-County, Kenya"],
    phone: "+254 700 482 119",
    email: "operations@agrilinkkakuma.co.ke",
  },
  {
    city: "Nairobi — Commercial Office",
    lines: ["Westlands Commercial Hub, 4th Floor", "Nairobi, Kenya"],
    phone: "+254 733 908 640",
    email: "commercial@agrilinkkakuma.co.ke",
  },
];

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const err = (k: string): string | undefined => errors[k];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries()) as Record<string, string | undefined>;
    const data = {
      name: String(rawData["name"] ?? "").trim(),
      email: String(rawData["email"] ?? "").trim(),
      organisation: String(rawData["organisation"] ?? "").trim(),
      department: String(rawData["department"] ?? "").trim(),
      message: String(rawData["message"] ?? "").trim(),
    };

    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        if (!next[key]) next[key] = i.message;
      });
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setErrors({});

    const submitResult = await submitContactForm({
      name: data.name,
      email: data.email,
      subject: data.department,
      message: data.message,
      ...(data.organisation ? { phone: data.organisation } : {}),
    });

    if (submitResult.success) {
      setSent(true);
      toast.success("Message sent. We reply within one business day.");
      
    } else {
      toast.error("Failed to send message. Please try again.");
    }
  }

  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="font-display text-[clamp(2.1rem,5.5vw,3.8rem)] font-extrabold uppercase leading-[1]">
              Contact us
            </h1>
            <p className="mt-6 max-w-2xl text-primary-foreground/80">
              Procurement, partnerships, logistics or press — reach the right desk directly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-9">
            {sent ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" strokeWidth={1.5} />
                <h2 className="mt-5 text-2xl font-extrabold uppercase">Message sent</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                  Thank you. Our team will be in touch within one business day.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <h2 className="text-xl font-extrabold uppercase">Corporate enquiry</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider">Full name</Label>
                    <Input name="name" maxLength={100} placeholder="Jane Otieno" />
                    {err("name") && <p className="text-xs text-destructive">{err("name")}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider">Email</Label>
                    <Input name="email" type="email" maxLength={255} placeholder="you@company.com" />
                    {err("email") && <p className="text-xs text-destructive">{err("email")}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider">
                      Organisation
                    </Label>
                    <Input name="organisation" maxLength={120} placeholder="Optional" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider">Department</Label>
                    <Select name="department">
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Procurement", "Partnerships & Donors", "Logistics", "Media & Press", "General"].map(
                          (d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    {err("department") && (
                      <p className="text-xs text-destructive">{err("department")}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">Message</Label>
                  <Textarea name="message" rows={6} maxLength={1500} placeholder="How can we help?" />
                  {err("message") && <p className="text-xs text-destructive">{err("message")}</p>}
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto">
                  Send message
                </Button>
              </form>
            )}
          </div>
        </Reveal>

        <div className="space-y-6">
          {OFFICES.map((o, i) => (
            <Reveal key={o.city} delay={i * 100}>
              <div className="lift rounded-xl border border-border bg-card p-6">
                <h3 className="font-bold uppercase tracking-tight">{o.city}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{o.lines.join(", ")}</span>
                  </li>
                  <li className="flex gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{o.phone}</span>
                  </li>
                  <li className="flex gap-2">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="break-all">{o.email}</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal delay={200}>
            <div className="rounded-xl border border-border bg-secondary/60 p-6">
              <h3 className="flex items-center gap-2 font-bold uppercase">
                <Clock className="h-4 w-4 text-accent" /> Operating hours
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Monday – Friday: 07:30 – 18:00 EAT
                <br />
                Saturday: 08:00 – 13:00 EAT (yard operations only)
                <br />
                Emergency cold-chain line operates 24/7.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
