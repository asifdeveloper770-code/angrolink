import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, ShieldCheck } from "lucide-react";
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
import { useQuoteCart } from "@/lib/quote-cart";
import { cn } from "@/lib/utils";
import { submitCheckoutOrder } from "@/lib/supabase";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Corporate Checkout — AgriLink Kakuma B2B Catalog" },
      {
        name: "description",
        content:
          "Complete your wholesale quote request with company details, delivery terms and payment preferences.",
      },
      { property: "og:title", content: "Corporate Checkout — AgriLink Kakuma" },
      {
        property: "og:description",
        content: "Simulated corporate checkout for wholesale agricultural commodity quotes.",
      },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  company: z.string().trim().min(2, "Company name is required").max(120),
  contact: z.string().trim().min(2, "Contact name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  destination: z.string().trim().min(2, "Delivery destination is required").max(160),
  incoterm: z.string().min(1, "Select an incoterm"),
  payment: z.string().min(1, "Select a payment term"),
  notes: z.string().trim().max(1000).optional(),
});

const STEPS = ["Company", "Delivery", "Review"];

function Checkout() {
  const { detailed, subtotal, clear } = useQuoteCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const err = (k: string): string | undefined => errors[k];

  const logistics = subtotal > 0 ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + logistics;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        if (!next[key]) next[key] = i.message;
      });
      setErrors(next);
      setStep(next["company"] || next["contact"] || next["email"] || next["phone"] ? 0 : 1);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setErrors({});
    
    // Submit order to Supabase
    const submitResult = await submitCheckoutOrder({
      customer_name: String(data.company),
      email: String(data.email),
      phone: String(data.phone),
      address: String(data.destination),
      city: String(data.incoterm),
      country: String(data.payment),
      items: JSON.stringify(detailed),
      total_amount: total,
    });
    
    if (submitResult.success) {
      const ref = `AGL-${Math.floor(100000 + Math.random() * 899999)}`;
      setDone(ref);
      clear();
      toast.success("Quote request submitted.");
    } else {
      toast.error("Failed to submit order. Please try again.");
    }
  }

  if (done) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <Reveal>
          <CheckCircle2 className="mx-auto h-14 w-14 text-accent" strokeWidth={1.4} />
          <h1 className="mt-6 text-3xl font-extrabold uppercase">Quote request submitted</h1>
          <p className="mt-4 text-muted-foreground">
            Your reference number is{" "}
            <span className="font-display font-bold text-primary">{done}</span>. A contract
            specialist will confirm pricing, availability and delivery windows within one business
            day.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <Link to="/shop">Back to catalog</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact the desk</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    );
  }

  if (detailed.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold uppercase">Nothing to check out</h1>
        <p className="mt-4 text-muted-foreground">
          Add commodities to your quote cart before starting corporate checkout.
        </p>
        <Button className="mt-8" variant="gold" size="lg" onClick={() => navigate({ to: "/shop" })}>
          Browse the catalog
        </Button>
      </section>
    );
  }

  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold uppercase leading-[1]">
              Corporate checkout
            </h1>
            <p className="mt-4 max-w-2xl text-primary-foreground/80">
              A simulated procurement flow. No payment is taken — submissions are routed to our
              contracts desk.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-9">
            <ol className="mb-8 grid grid-cols-3 gap-2">
              {STEPS.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    className="w-full text-left"
                  >
                    <span
                      className={cn(
                        "block h-1 rounded-full transition-colors",
                        i <= step ? "bg-gold" : "bg-border",
                      )}
                    />
                    <span
                      className={cn(
                        "mt-2 block text-[11px] font-bold uppercase tracking-wider",
                        i <= step ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {i + 1}. {s}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <div className={cn("grid gap-5 sm:grid-cols-2", step !== 0 && "hidden")}>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">Company</Label>
                  <Input name="company" maxLength={120} placeholder="Nairobi Foods Ltd" />
                  {err("company") && <p className="text-xs text-destructive">{err("company")}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">Contact name</Label>
                  <Input name="contact" maxLength={100} placeholder="Jane Otieno" />
                  {err("contact") && <p className="text-xs text-destructive">{err("contact")}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">Business email</Label>
                  <Input name="email" type="email" maxLength={255} placeholder="procurement@company.com" />
                  {err("email") && <p className="text-xs text-destructive">{err("email")}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">Phone</Label>
                  <Input name="phone" inputMode="tel" maxLength={20} placeholder="+254 7.." />
                  {err("phone") && <p className="text-xs text-destructive">{err("phone")}</p>}
                </div>
              </div>

              <div className={cn("grid gap-5 sm:grid-cols-2", step !== 1 && "hidden")}>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">
                    Delivery destination
                  </Label>
                  <Input name="destination" maxLength={160} placeholder="Industrial Area, Nairobi" />
                  {err("destination") && (
                    <p className="text-xs text-destructive">{err("destination")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">Incoterm</Label>
                  <Select name="incoterm">
                    <SelectTrigger>
                      <SelectValue placeholder="Select incoterm" />
                    </SelectTrigger>
                    <SelectContent>
                      {["EXW Kakuma", "FCA Lodwar", "DAP Nairobi", "DAP Juba", "CIF Mombasa"].map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {err("incoterm") && <p className="text-xs text-destructive">{err("incoterm")}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">Payment terms</Label>
                  <Select name="payment">
                    <SelectTrigger>
                      <SelectValue placeholder="Select terms" />
                    </SelectTrigger>
                    <SelectContent>
                      {["50% deposit / 50% on delivery", "Net 30 (approved accounts)", "Letter of credit", "Escrowed milestones"].map(
                        (t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  {err("payment") && <p className="text-xs text-destructive">{err("payment")}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider">
                    Additional requirements
                  </Label>
                  <Textarea name="notes" rows={4} maxLength={1000} placeholder="Packaging, inspection, documentation..." />
                </div>
              </div>

              <div className={cn(step !== 2 && "hidden")}>
                <h2 className="text-lg font-extrabold uppercase">Review your request</h2>
                <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
                  {detailed.map((l) => (
                    <li key={l.product.id} className="flex items-center justify-between gap-4 p-4">
                      <span className="min-w-0 truncate text-sm">
                        {l.product.name} · {l.qty} {l.product.unit}
                      </span>
                      <span className="shrink-0 text-sm font-semibold">
                        ${l.total.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Submitting sends an encrypted quote request to our contracts desk. No card details
                  are collected.
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  Back
                </Button>
                {step < 2 ? (
                  <Button type="button" variant="gold" onClick={() => setStep((s) => s + 1)}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" variant="gold" size="lg">
                    Submit quote request
                  </Button>
                )}
              </div>
            </form>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-7">
            <h2 className="text-lg font-extrabold uppercase">Order summary</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {detailed.map((l) => (
                <li key={l.product.id} className="flex justify-between gap-3">
                  <span className="min-w-0 truncate text-muted-foreground">
                    {l.product.name} × {l.qty}
                  </span>
                  <span className="shrink-0 font-semibold">${l.total.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-semibold">${subtotal.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Logistics estimate</dt>
                <dd className="font-semibold">${logistics.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <dt className="font-bold uppercase">Indicative total</dt>
                <dd className="font-display text-xl font-extrabold text-primary">
                  ${total.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>
    </>
  );
}
