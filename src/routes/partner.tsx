import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Tractor, Building2, Truck, CheckCircle2 } from "lucide-react";
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
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner With Us — Intake Portals | AgriLink Kakuma LLC" },
      {
        name: "description",
        content:
          "Register as a farmer, submit a commercial off-taker inquiry, or apply as a logistics partner with AgriLink Kakuma.",
      },
      { property: "og:title", content: "Partner With Us — AgriLink Kakuma Intake Portals" },
      {
        property: "og:description",
        content:
          "Multi-sided onboarding for producers, commercial buyers and truck owner-operators in Turkana County.",
      },
    ],
  }),
  component: Partner,
});

type PortalKey = "farmer" | "buyer" | "logistics";

const PORTALS: { key: PortalKey; icon: typeof Tractor; title: string; copy: string }[] = [
  {
    key: "farmer",
    icon: Tractor,
    title: "Farmer Registration",
    copy: "Low-bandwidth questionnaire for producers joining the aggregation network.",
  },
  {
    key: "buyer",
    icon: Building2,
    title: "Commercial Buyer Inquiry",
    copy: "Bulk quote requests, volume requirements and delivery frequency.",
  },
  {
    key: "logistics",
    icon: Truck,
    title: "Logistics Partner Application",
    copy: "Truck owner-operator onboarding and route allocation.",
  },
];

const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20, "Phone number is too long");

const farmerSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  phone,
  location: z.string().trim().min(2, "Location is required").max(120),
  cropType: z.string().min(1, "Select a crop type"),
  acreage: z.string().trim().min(1, "Acreage is required").max(20),
  harvestEstimate: z.string().trim().min(1, "Harvest estimate is required").max(40),
});

const buyerSchema = z.object({
  company: z.string().trim().min(2, "Company is required").max(120),
  contactName: z.string().trim().min(2, "Contact name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  commodity: z.string().min(1, "Select a commodity"),
  volume: z.string().trim().min(1, "Volume is required").max(40),
  frequency: z.string().min(1, "Select delivery frequency"),
  notes: z.string().trim().max(1000).optional(),
});

const logisticsSchema = z.object({
  operatorName: z.string().trim().min(2, "Name is required").max(100),
  phone,
  fleetSize: z.string().trim().min(1, "Fleet size is required").max(10),
  vehicleType: z.string().min(1, "Select a vehicle type"),
  routes: z.string().trim().min(2, "Describe your routes").max(500),
  refrigerated: z.string().min(1, "Select an option"),
});

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wider">{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function Partner() {
  const [portal, setPortal] = useState<PortalKey>("farmer");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<PortalKey | null>(null);
  const err = (k: string): string | undefined => errors[k];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const schema =
      portal === "farmer" ? farmerSchema : portal === "buyer" ? buyerSchema : logisticsSchema;
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
    setSubmitted(portal);
    toast.success("Submission received. Our team will respond within one business day.");
    e.currentTarget.reset();
  }

  function switchPortal(key: PortalKey) {
    setPortal(key);
    setErrors({});
    setSubmitted(null);
  }

  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="max-w-4xl font-display text-[clamp(2.1rem,5.5vw,3.8rem)] font-extrabold uppercase leading-[1]">
              Partner with us
            </h1>
            <p className="mt-6 max-w-2xl text-primary-foreground/80">
              Three intake portals, one operations desk. Select the route that matches your role and
              we will route your submission to the right team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {PORTALS.map((p, i) => (
            <Reveal key={p.key} delay={i * 80}>
              <button
                type="button"
                onClick={() => switchPortal(p.key)}
                className={cn(
                  "lift h-full w-full rounded-xl border p-6 text-left",
                  portal === p.key
                    ? "border-accent bg-card shadow-[var(--shadow-elevate)]"
                    : "border-border bg-card/60",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-lg transition-colors",
                    portal === p.key
                      ? "bg-gold text-gold-foreground"
                      : "bg-secondary text-primary",
                  )}
                >
                  <p.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-bold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.copy}</p>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-10">
            {submitted === portal ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" strokeWidth={1.5} />
                <h2 className="mt-5 text-2xl font-extrabold uppercase">Submission received</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                  A reference number has been generated and sent to our intake desk. Expect contact
                  within one business day.
                </p>
                <Button className="mt-6" variant="outline" onClick={() => setSubmitted(null)}>
                  Submit another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <h2 className="text-xl font-extrabold uppercase">
                  {PORTALS.find((p) => p.key === portal)!.title}
                </h2>

                {portal === "farmer" && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" error={err("fullName")}>
                      <Input name="fullName" maxLength={100} placeholder="Ekai Lomeri" />
                    </Field>
                    <Field label="Mobile number" error={err("phone")}>
                      <Input name="phone" inputMode="tel" maxLength={20} placeholder="+254 7.." />
                    </Field>
                    <Field label="Village / location" error={err("location")}>
                      <Input name="location" maxLength={120} placeholder="Kalobeyei Village 3" />
                    </Field>
                    <Field label="Primary crop" error={err("cropType")}>
                      <Select name="cropType">
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Sorghum", "Green grams", "Cowpeas", "Kale", "Tomatoes", "Sesame", "Livestock"].map(
                            (c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Acreage under cultivation" error={err("acreage")}>
                      <Input name="acreage" inputMode="decimal" maxLength={20} placeholder="2.5" />
                    </Field>
                    <Field label="Estimated harvest (per season)" error={err("harvestEstimate")}>
                      <Input name="harvestEstimate" maxLength={40} placeholder="1.2 MT" />
                    </Field>
                  </div>
                )}

                {portal === "buyer" && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company" error={err("company")}>
                      <Input name="company" maxLength={120} placeholder="Nairobi Foods Ltd" />
                    </Field>
                    <Field label="Contact name" error={err("contactName")}>
                      <Input name="contactName" maxLength={100} placeholder="Jane Otieno" />
                    </Field>
                    <Field label="Business email" error={err("email")}>
                      <Input name="email" type="email" maxLength={255} placeholder="procurement@company.com" />
                    </Field>
                    <Field label="Commodity of interest" error={err("commodity")}>
                      <Select name="commodity">
                        <SelectTrigger>
                          <SelectValue placeholder="Select commodity" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Cereals", "Pulses", "Fresh Produce", "Livestock", "Oilseeds", "Specialty"].map(
                            (c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Volume requirement" error={err("volume")}>
                      <Input name="volume" maxLength={40} placeholder="40 MT / month" />
                    </Field>
                    <Field label="Delivery frequency" error={err("frequency")}>
                      <Select name="frequency">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {["One-off", "Weekly", "Fortnightly", "Monthly", "Quarterly contract"].map((f) => (
                            <SelectItem key={f} value={f}>
                              {f}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Specifications & notes" error={err("notes")}>
                        <Textarea
                          name="notes"
                          maxLength={1000}
                          rows={4}
                          placeholder="Grading requirements, packaging, incoterms, delivery point..."
                        />
                      </Field>
                    </div>
                  </div>
                )}

                {portal === "logistics" && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Operator name" error={err("operatorName")}>
                      <Input name="operatorName" maxLength={100} placeholder="Hassan Transporters" />
                    </Field>
                    <Field label="Mobile number" error={err("phone")}>
                      <Input name="phone" inputMode="tel" maxLength={20} placeholder="+254 7.." />
                    </Field>
                    <Field label="Fleet size" error={err("fleetSize")}>
                      <Input name="fleetSize" inputMode="numeric" maxLength={10} placeholder="3" />
                    </Field>
                    <Field label="Vehicle type" error={err("vehicleType")}>
                      <Select name="vehicleType">
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Pickup (1-2T)", "Light truck (3-7T)", "Heavy truck (10T+)", "Reefer truck", "Motorcycle"].map(
                            (v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Refrigeration capability" error={err("refrigerated")}>
                      <Select name="refrigerated">
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Insulated only">Insulated only</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Routes regularly served" error={err("routes")}>
                        <Textarea
                          name="routes"
                          maxLength={500}
                          rows={3}
                          placeholder="Kakuma – Lodwar – Kitale, occasional Lokichoggio runs"
                        />
                      </Field>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Submissions are reviewed by the AgriLink intake desk. No data is shared with
                    third parties.
                  </p>
                  <Button type="submit" variant="gold" size="lg" className="shrink-0">
                    Submit application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
