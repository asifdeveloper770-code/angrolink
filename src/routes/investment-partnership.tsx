import { createFileRoute } from "@tanstack/react-router";
import {
  Snowflake,
  Tractor,
  Truck,
  MonitorSmartphone,
  Handshake,
} from "lucide-react";

export const Route = createFileRoute("/investment-partnership")({
  component: InvestmentPartnershipPage,
});

function InvestmentPartnershipPage() {
  const pillars = [
    {
      number: "01",
      title: "Cold Chain Expansion",
      icon: Snowflake,
      description:
        "Funding the deployment of decentralized, solar-powered refrigeration units across high-yield refugee farming sectors to eliminate post-harvest crop spoilage.",
    },
    {
      number: "02",
      title: "Agricultural Mechanization",
      icon: Tractor,
      description:
        "Investing in the procurement of small-scale farm machinery—including solar pumps, drip irrigation kits, and mechanical threshers—to dramatically boost smallholder productivity and secure consistent yield volumes.",
    },
    {
      number: "03",
      title: "Logistics Optimization",
      icon: Truck,
      description:
        "Financing the expansion of our regional aggregation fleet to capture greater wholesale volumes and safely transport larger institutional supply contracts.",
    },
    {
      number: "04",
      title: "Marketplace Platform Enhancements",
      icon: MonitorSmartphone,
      description:
        "Supporting the technical upgrades of our digital inventory, tracking tools, and payment systems to seamlessly connect hundreds of youth and women's cooperatives to global B2B markets.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Handshake className="h-4 w-4 text-accent" />
              Investment & Partnership
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Investment & Partnership Tracks
            </h1>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              We invite visionary investors, impact funds, and development
              partners to join us in scaling our operations across four
              critical, high-yield infrastructure pillars.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.number}
                className="group rounded-2xl border border-border/70 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-accent">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="text-sm font-bold text-muted-foreground/50">
                    {pillar.number}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-bold text-foreground sm:text-2xl">
                  {pillar.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}