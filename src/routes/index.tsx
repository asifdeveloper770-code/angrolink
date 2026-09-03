import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Users,
  Truck,
  LineChart,
  Building2,
  ShoppingBasket,
  Tractor,
  ShieldCheck,
  Leaf,
  Radar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { DataPixels } from "@/components/site/DataPixels";
import logoAsset from "@/assets/agrilink-logo.jpeg";
import heroField from "@/assets/hero-field.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriLink Kakuma LLC — Agtech, Logistics & Market Intelligence" },
      {
        name: "description",
        content:
          "AgriLink Kakuma LLC aggregates smallholder harvests, runs cold-chain logistics and publishes market intelligence across Turkana County, Kenya.",
      },
      { property: "og:title", content: "AgriLink Kakuma LLC — Resilient Food Corridors in Turkana" },
      {
        property: "og:description",
        content:
          "Aggregation, end-to-end logistics and market intelligence for institutional partners, commercial buyers and local producers.",
      },
    ],
  }),
  component: Home,
});

const SEGMENTS = [
  {
    icon: Building2,
    title: "For Institutional Partners & Donors",
    copy: "Programme-grade reporting, climate-resilience frameworks and verified impact data.",
    cta: "Review our impact",
    to: "/about" as const,
  },
  {
    icon: ShoppingBasket,
    title: "For Commercial Buyers & Off-Takers",
    copy: "Bulk volumes, graded commodities, contract supply and predictable delivery windows.",
    cta: "Browse the catalog",
    to: "/shop" as const,
  },
  {
    icon: Tractor,
    title: "For Local Producers & Transporters",
    copy: "Guaranteed off-take, fair pricing, training and paid route allocation for fleet owners.",
    cta: "Register with us",
    to: "/partner" as const,
  },
];

const PILLARS = [
  {
    icon: Users,
    title: "Aggregation",
    copy: "Consolidating harvests from thousands of smallholder plots into graded, market-ready lots with solar-powered cold storage at the edge.",
    points: ["Crop consolidation", "Quality grading", "Producer training"],
  },
  {
    icon: Truck,
    title: "Logistics",
    copy: "First and last-mile movement across arid terrain, cold-chain integrity and cross-border freight into regional demand centres.",
    points: ["First / last mile", "Cold-chain", "Cross-border freight"],
  },
  {
    icon: LineChart,
    title: "Market Intelligence",
    copy: "Live commodity pricing, supply and demand forecasting, and climate fragility reporting that de-risks every transaction.",
    points: ["Live pricing", "Demand forecasting", "Fragility reporting"],
  },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <div className="pointer-events-none absolute inset-0 grid-mesh text-primary-foreground/70" aria-hidden />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-36rem w-36rem rounded-full bg-gold/20 blur-[120px]"
          aria-hidden
        />
        <DataPixels tone="light" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-32">
          <div className="min-w-0">
          
          <Reveal delay={90}>
            <h1 className="mt-7 font-display text-[clamp(2.6rem,7.4vw,5.6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] text-balance-tight">
              AGRI<span className="text-gold">LINK</span>
              <br />
              KAKUMA LLC
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-7 h-px w-24 bg-linear-to-r from-gold to-transparent" aria-hidden />
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
              We build the infrastructure that connects arid-land producers to formal markets —
              aggregating harvests, securing cold-chain logistics and publishing the market
              intelligence that makes fragile food systems investable.
            </p>
          </Reveal>
          <Reveal delay={230}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <Link to="/investment-partnership">
                  Partner With Us <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/shop">
                  Buy Commodities <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <Link to="/shop">Request a Quote</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-14 grid gap-4 border-t border-primary-foreground/15 pt-8 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "Traceable, graded supply" },
                { icon: Radar, label: "Live corridor monitoring" },
                { icon: Leaf, label: "Climate-smart sourcing" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 text-sm text-primary-foreground/80">
                  <f.icon className="h-5 w-5 shrink-0 text-gold" />
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="relative mx-auto w-full max-w-xl">
              <div
                className="absolute -inset-8 rounded-[2rem] bg-gold/10 blur-3xl"
                aria-hidden
              />
              <figure className="frame-shadow relative overflow-hidden rounded-[1.75rem] border border-primary-foreground/20">
                <img
                  src={heroField}
                  alt="AgriLink Kakuma team loading graded grain sacks onto a logistics truck in Turkana at golden hour"
                  width={1600}
                  height={1200}
                  fetchPriority="high"
                  className="aspect-4/3 w-full object-cover sm:aspect-5/4 "
                />
                <div
                  className="absolute inset-0 bg-linear-to-r from-primary-deep/90 via-primary-deep/5 to-transparent"
                  aria-hidden
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5 sm:p-6">
                  <img
                    src={logoAsset}
                    alt="AgriLink Kakuma LLC logo"
                    width={56}
                    height={56}
                    className="h-12 w-12 shrink-0 rounded-full bg-background object-cover ring-2 ring-gold/70 sm:h-14 sm:w-14"
                  />
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
                      Corridor 04 · Kakuma → Lodwar
                    </span>
                    <span className="block truncate text-sm text-primary-foreground/85">
                      Aggregated · graded · cold-chain verified
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 section-y sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Start here</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold uppercase sm:text-4xl">
            Tell us who you are
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SEGMENTS.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <Link
                to={s.to}
                className="lift group flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm hover:border-accent"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {s.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 section-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow">Three business pillars</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold uppercase sm:text-4xl">
              One integrated operating system for arid-land trade
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <article className="lift h-full rounded-2xl border border-border bg-card p-8">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-primary/20 text-primary">
                    <p.icon className="h-7 w-7" strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold uppercase">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>

                  <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-[1px] bg-gold" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220}>
            <div className="mt-10">
              <Button asChild variant="forest" size="lg">
                <Link to="/services">
                  Explore operational detail <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-background section-y">
        <DataPixels tone="dark" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow">Live impact metrics</p>
            <h2 className="mt-4 text-3xl font-extrabold uppercase sm:text-4xl">Network at a glance</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { to: 18420, suffix: " MT", label: "Total metric tons aggregated" },
              { to: 6740, suffix: "+", label: "Active farmers in network" },
              { to: 128, suffix: "", label: "Logistics routes secured" },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 110}>
                <div className="lift rounded-2xl border border-border bg-card p-8 text-center">
                  <p className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
                    <Counter to={m.to} suffix={m.suffix} />
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 section-y sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Investment & Partnership</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold uppercase sm:text-4xl">
            Four critical infrastructure pillars
          </h2>
          <p className="mt-6 max-w-2xl text-primary-foreground/60">
            We invite visionary investors, impact funds, and development partners to join us in scaling our operations across these high-yield infrastructure tracks.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[
            {
              title: "Cold Chain Expansion",
              copy: "Funding the deployment of decentralized, solar-powered refrigeration units across high-yield refugee farming sectors to eliminate post-harvest crop spoilage.",
            },
            {
              title: "Agricultural Mechanization",
              copy: "Investing in the procurement of small-scale farm machinery—including solar pumps, drip irrigation kits, and mechanical threshers—to dramatically boost smallholder productivity and secure consistent yield volumes.",
            },
            {
              title: "Logistics Optimization",
              copy: "Financing the expansion of our regional aggregation fleet to capture greater wholesale volumes and safely transport larger institutional supply contracts.",
            },
            {
              title: "Marketplace Platform Enhancements",
              copy: "Supporting the technical upgrades of our digital inventory, tracking tools, and payment systems to seamlessly connect hundreds of youth and women's cooperatives to global B2B markets.",
            },
          ].map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 100}>
              <article className="lift h-full rounded-2xl border border-border bg-card p-8">
                <h3 className="text-xl font-extrabold uppercase text-primary">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pillar.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 section-y sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Our presence</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold uppercase sm:text-4xl">
            Offices
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Kakuma Town",
              country: "Kenya",
              region: "Turkana County",
            },
            {
              name: "Westlands, Nairobi",
              country: "Kenya",
              region: "Capital Office",
            },
            {
              name: "New York",
              country: "United States",
              region: "USA Operations",
            },
          ].map((office, i) => (
            <Reveal key={office.name} delay={i * 90}>
              <div className="lift rounded-2xl border border-border bg-card p-8 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary mx-auto">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold">{office.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{office.country}</p>
                <p className="mt-1 text-xs text-muted-foreground">{office.region}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="surface-forest relative isolate overflow-hidden rounded-2xl px-8 py-14 text-center sm:px-14">
            <DataPixels tone="light" />
            <h2 className="relative text-3xl font-extrabold uppercase sm:text-4xl">
              Ready to move volume with confidence?
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Whether you are underwriting resilience programmes or sourcing containers of graded
              pulses, our team responds within one business day.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <Link to="/partner">Partner With Us</Link>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <Link to="/contact">Talk to our team</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
