import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Truck, LineChart, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { DataPixels } from "@/components/site/DataPixels";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Operational Pillars — AgriLink Kakuma LLC" },
      {
        name: "description",
        content:
          "Agricultural aggregation, end-to-end cold-chain logistics and market intelligence services across Turkana County trade corridors.",
      },
      { property: "og:title", content: "Services & Operational Pillars — AgriLink Kakuma" },
      {
        property: "og:description",
        content:
          "Crop consolidation, quality grading, solar cold storage, cross-border freight and real-time commodity intelligence.",
      },
    ],
  }),
  component: Services,
});

const PILLAR_ICONS = {
  "agricultural-aggregation": Users,
  "end-to-end-logistics": Truck,
  "market-intelligence": LineChart,
} as const;

const CORRIDORS = [
  { id: "kakuma", name: "Kakuma Hub", x: 30, y: 42, type: "hub" },
  { id: "lodwar", name: "Lodwar", x: 52, y: 58, type: "hub" },
  { id: "kalobeyei", name: "Kalobeyei", x: 24, y: 28, type: "node" },
  { id: "lokichar", name: "Lokichar", x: 60, y: 78, type: "node" },
  { id: "kaikor", name: "Kaikor", x: 44, y: 14, type: "node" },
  { id: "lokichoggio", name: "Lokichoggio", x: 12, y: 18, type: "node" },
  { id: "kitale", name: "Kitale Corridor", x: 82, y: 90, type: "exit" },
  { id: "juba", name: "Juba Corridor", x: 8, y: 6, type: "exit" },
];

const LINKS: [string, string][] = [
  ["kakuma", "kalobeyei"],
  ["kakuma", "lodwar"],
  ["kakuma", "lokichoggio"],
  ["lokichoggio", "juba"],
  ["kalobeyei", "kaikor"],
  ["lodwar", "lokichar"],
  ["lokichar", "kitale"],
];

function point(id: string) {
  const n = CORRIDORS.find((c) => c.id === id)!;
  return { x: n.x, y: n.y };
}

type ServiceRow = {
  id: string;
  pillar_slug: string;
  pillar_title: string;
  pillar_intro: string;
  service_name: string;
  service_copy: string;
  sort_order: number;
  active: boolean;
};

type ServicePillar = {
  slug: string;
  title: string;
  intro: string;
  services: {
    name: string;
    copy: string;
  }[];
};

function Services() {
  const [pillars, setPillars] = useState<ServicePillar[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  
  useEffect(() => {
    async function loadServices() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("active", true)
          .order("pillar_slug", { ascending: true })
          .order("sort_order", { ascending: true });

        if (error) {
          throw error;
        }

        const rows = (data ?? []) as ServiceRow[];

        const grouped = rows.reduce<ServicePillar[]>((acc, row) => {
          let pillar = acc.find(
            (item) => item.slug === row.pillar_slug
          );

          if (!pillar) {
            pillar = {
              slug: row.pillar_slug,
              title: row.pillar_title,
              intro: row.pillar_intro,
              services: [],
            };

            acc.push(pillar);
          }

          pillar.services.push({
            name: row.service_name,
            copy: row.service_copy,
          });

          return acc;
        }, []);

        setPillars(grouped);
      } catch (error) {
        console.error("Error loading services:", error);
        setPillars([]);
      } finally {
        setLoadingServices(false);
      }
    }

    loadServices();
  }, []);
  
  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="max-w-4xl font-display text-[clamp(2.1rem,5.5vw,3.8rem)] font-extrabold uppercase leading-[1]">
              Operational pillars
            </h1>
            <p className="mt-6 max-w-2xl text-primary-foreground/80">
              Three interlocking service lines, one accountable operator. Every engagement is
              contracted with defined SLAs, traceability and reporting.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6 lg:px-8">
        {loadingServices ? (
          <div className="py-12 text-center text-muted-foreground">
            Loading services...
          </div>
        ) : pillars.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No services available.
          </div>
        ) : (
          pillars.map((pillar, pi) => {
            const Icon =
              PILLAR_ICONS[
              pillar.slug as keyof typeof PILLAR_ICONS
              ] ?? Users;

            return (
              <Reveal key={pillar.slug} as="section">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl surface-forest">
                    <Icon className="h-7 w-7" strokeWidth={1.4} />
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                      Pillar 0{pi + 1}
                    </p>

                    <h2 className="text-2xl font-extrabold uppercase sm:text-3xl">
                      {pillar.title}
                    </h2>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-muted-foreground">
                  {pillar.intro}
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {pillar.services.map((service, i) => (
                    <Reveal
                      key={service.name}
                      delay={i * 70}
                    >
                      <article className="lift group h-full rounded-xl border border-border bg-card p-6 hover:border-accent">
                        <span className="block h-1 w-10 rounded-full bg-gold transition-all duration-300 group-hover:w-16" />

                        <h3 className="mt-5 font-bold leading-snug">
                          {service.name}
                        </h3>

                        <p className="mt-3 text-sm text-muted-foreground">
                          {service.copy}
                        </p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            );
          })
        )}
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Coverage</p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase">Turkana trade corridors</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Aggregation hubs, feeder nodes and export corridors currently under active operation.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <div className="overflow-hidden rounded-xl border border-border bg-card p-4">
                <svg viewBox="0 0 100 100" className="h-auto w-full" role="img" aria-label="Map of Turkana County trade corridors">
                  <defs>
                    <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M5 0 L0 0 0 5" fill="none" stroke="var(--color-border)" strokeWidth="0.2" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                  <path
                    d="M18 8 L62 6 L78 34 L70 74 L46 94 L20 78 L10 46 Z"
                    fill="color-mix(in oklab, var(--color-accent) 12%, transparent)"
                    stroke="var(--color-accent)"
                    strokeWidth="0.5"
                  />
                  {LINKS.map(([a, b]) => {
                    const p1 = point(a);
                    const p2 = point(b);
                    return (
                      <line
                        key={`${a}-${b}`}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke="var(--color-gold)"
                        strokeWidth="0.6"
                        strokeDasharray="2 1.5"
                      />
                    );
                  })}
                  {CORRIDORS.map((c) => (
                    <g key={c.id} className="cursor-pointer">
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={c.type === "hub" ? 2.6 : 1.7}
                        fill={c.type === "exit" ? "var(--color-gold)" : "var(--color-primary)"}
                      />
                      <text
                        x={c.x + 3.4}
                        y={c.y + 1.1}
                        fontSize="2.6"
                        fill="var(--color-foreground)"
                        className="font-medium"
                      >
                        {c.name}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="space-y-3">
                {CORRIDORS.map((c) => (
                  <li
                    key={c.id}
                    className="lift flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <MapPin
                      className={
                        "h-4 w-4 shrink-0 " + (c.type === "exit" ? "text-gold" : "text-primary")
                      }
                    />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{c.name}</span>
                    <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                      {c.type === "hub" ? "Hub" : c.type === "exit" ? "Export" : "Node"}
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="gold" className="mt-6 w-full">
                <Link to="/partner">
                  Discuss corridor access <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
