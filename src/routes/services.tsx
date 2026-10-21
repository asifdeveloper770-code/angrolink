import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Truck, LineChart, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { DataPixels } from "@/components/site/DataPixels";
import { EA_COUNTRY_PATHS, EA_MAP_VIEWBOX, type EACountryId } from "@/lib/east-africa-map";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Operational Pillars — AgriLink EA Ltd" },
      {
        name: "description",
        content:
          "Agricultural inputs, aggregation, solar cold-chain logistics and market intelligence services across Kenya and South Sudan trade corridors.",
      },
      { property: "og:title", content: "Services & Operational Pillars — AgriLink EA Ltd" },
      {
        property: "og:description",
        content:
          "Input distribution, quality grading, solar cold storage, digital marketplace and real-time commodity intelligence.",
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

type CorridorNode = {
  id: string;
  name: string;
  country: "Kenya" | "South Sudan" | "Uganda";
  x: number;
  y: number;
  type: "hub" | "node" | "exit";
  /** label position + anchor so names never collide on the map */
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
};

// Coordinates are projected onto the same 100 x 92 East Africa map as EA_COUNTRY_PATHS.
const CORRIDORS: CorridorNode[] = [
  {
    id: "juba",
    name: "Juba Hub",
    country: "South Sudan",
    x: 32.8,
    y: 33.8,
    type: "hub",
    lx: 29.6,
    ly: 33.4,
    anchor: "end",
  },
  {
    id: "kakuma",
    name: "Kakuma Hub",
    country: "Kenya",
    x: 52.1,
    y: 40.4,
    type: "hub",
    lx: 55,
    ly: 41.4,
    anchor: "start",
  },
  {
    id: "nairobi",
    name: "Nairobi Hub",
    country: "Kenya",
    x: 63.6,
    y: 69.9,
    type: "hub",
    lx: 66.8,
    ly: 70.7,
    anchor: "start",
  },
  {
    id: "wau",
    name: "Wau",
    country: "South Sudan",
    x: 11.8,
    y: 16.9,
    type: "node",
    lx: 14.2,
    ly: 17.7,
    anchor: "start",
  },
  {
    id: "bor",
    name: "Bor",
    country: "South Sudan",
    x: 32.7,
    y: 25.7,
    type: "node",
    lx: 35,
    ly: 26.5,
    anchor: "start",
  },
  {
    id: "yei",
    name: "Yei",
    country: "South Sudan",
    x: 27.5,
    y: 38.3,
    type: "node",
    lx: 25.2,
    ly: 39.1,
    anchor: "end",
  },
  {
    id: "nimule",
    name: "Nimule",
    country: "South Sudan",
    x: 35.6,
    y: 41.1,
    type: "node",
    lx: 33.3,
    ly: 41.9,
    anchor: "end",
  },
  {
    id: "kapoeta",
    name: "Kapoeta",
    country: "South Sudan",
    x: 44.6,
    y: 34.2,
    type: "node",
    lx: 44.6,
    ly: 31.4,
    anchor: "middle",
  },
  {
    id: "lokichoggio",
    name: "Lokichoggio",
    country: "Kenya",
    x: 49.1,
    y: 37.6,
    type: "node",
    lx: 51.4,
    ly: 37.2,
    anchor: "start",
  },
  {
    id: "lodwar",
    name: "Lodwar",
    country: "Kenya",
    x: 56.5,
    y: 44,
    type: "node",
    lx: 58.8,
    ly: 44.8,
    anchor: "start",
  },
  {
    id: "kitale",
    name: "Kitale",
    country: "Kenya",
    x: 52.9,
    y: 56.3,
    type: "node",
    lx: 50.6,
    ly: 57.1,
    anchor: "end",
  },
  {
    id: "eldoret",
    name: "Eldoret",
    country: "Kenya",
    x: 54.5,
    y: 59.3,
    type: "node",
    lx: 56.8,
    ly: 60.1,
    anchor: "start",
  },
  {
    id: "kampala",
    name: "Kampala Corridor",
    country: "Uganda",
    x: 38.7,
    y: 60.3,
    type: "exit",
    lx: 38.7,
    ly: 64.8,
    anchor: "middle",
  },
  {
    id: "mombasa",
    name: "Mombasa Port",
    country: "Kenya",
    x: 80.4,
    y: 86.1,
    type: "exit",
    lx: 77.8,
    ly: 86.9,
    anchor: "end",
  },
];

const LINKS: [string, string][] = [
  ["mombasa", "nairobi"],
  ["nairobi", "eldoret"],
  ["eldoret", "kitale"],
  ["kitale", "lodwar"],
  ["lodwar", "kakuma"],
  ["kakuma", "lokichoggio"],
  ["lokichoggio", "kapoeta"],
  ["kapoeta", "juba"],
  ["juba", "nimule"],
  ["nimule", "kampala"],
  ["kampala", "eldoret"],
  ["juba", "yei"],
  ["juba", "bor"],
  ["juba", "wau"],
];

const COUNTRY_LABELS: { name: string; x: number; y: number; active?: boolean }[] = [
  { name: "SOUTH SUDAN", x: 17, y: 29, active: true },
  { name: "KENYA", x: 76, y: 55, active: true },
  { name: "UGANDA", x: 31, y: 52 },
  { name: "ETHIOPIA", x: 74, y: 20 },
  { name: "SUDAN", x: 24, y: 4 },
  { name: "TANZANIA", x: 50, y: 86 },
  { name: "DR CONGO", x: 9, y: 60 },
  { name: "SOMALIA", x: 94, y: 70 },
];

const ACTIVE_COUNTRIES = new Set<EACountryId>(["kenya", "south-sudan"]);

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

const DEFAULT_PILLARS: ServicePillar[] = [
  {
    slug: "agricultural-aggregation",
    title: "Agricultural Aggregation",
    intro:
      "Consolidating smallholder harvests across rural East Africa into graded, contract-ready commercial volumes.",
    services: [
      {
        name: "Producer Network Mobilization",
        copy: "Organizing smallholders into structured production groups with transparent quality standards.",
      },
      {
        name: "Decentralized Sorting & Quality Grading",
        copy: "Rigorous sorting, moisture testing, and certified grading at farm-gate trade yards.",
      },
      {
        name: "Direct Input Provision",
        copy: "Supplying certified seeds, soil nutrients, and modern tools directly to farming cooperatives.",
      },
    ],
  },
  {
    slug: "end-to-end-logistics",
    title: "End-to-End Cold-Chain Logistics",
    intro:
      "Preserving harvest freshness and transporting commodities across regional trade corridors.",
    services: [
      {
        name: "Solar-Powered Cold Storage",
        copy: "Decentralized solar cooling units that cut post-harvest losses by 30% right at the farm gate.",
      },
      {
        name: "Scheduled Regional Freight",
        copy: "Temperature-monitored fleet routes moving commodities across Kenya, South Sudan, and border hubs.",
      },
      {
        name: "B2B Fulfillment & Bulk Off-Take",
        copy: "Direct deliveries to institutional buyers, food processors, supermarkets, and wholesale markets.",
      },
    ],
  },
  {
    slug: "market-intelligence",
    title: "Market Intelligence & Digital Marketplace",
    intro:
      "Connecting producers directly to market demand signals, fair pricing, and commercial contracts.",
    services: [
      {
        name: "Live Commodity Pricing",
        copy: "Daily price discovery across East African wholesale markets ensuring fair producer margins.",
      },
      {
        name: "Integrated Digital Marketplace",
        copy: "Real-time crop inventory matching smallholders to commercial B2B procurement tenders.",
      },
      {
        name: "Corridor Fragility & Risk Forecasting",
        copy: "Predictive supply-chain insights tracking weather variability, fuel prices, and transit windows.",
      },
    ],
  },
];

function Services() {
  const [pillars, setPillars] = useState<ServicePillar[]>(DEFAULT_PILLARS);
  const [loadingServices, setLoadingServices] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"];
        const isConfigured = Boolean(supabaseUrl) && !supabaseUrl.includes("placeholder-project");

        if (!isConfigured) {
          setPillars(DEFAULT_PILLARS);
          return;
        }

        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("active", true)
          .order("pillar_slug", { ascending: true })
          .order("sort_order", { ascending: true });

        if (error || !data || data.length === 0) {
          setPillars(DEFAULT_PILLARS);
          return;
        }

        const rows = data as ServiceRow[];

        const grouped = rows.reduce<ServicePillar[]>((acc, row) => {
          let pillar = acc.find((item) => item.slug === row.pillar_slug);

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

        setPillars(grouped.length > 0 ? grouped : DEFAULT_PILLARS);
      } catch {
        setPillars(DEFAULT_PILLARS);
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
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
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

      <section className="mx-auto max-w-7xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
        {loadingServices ? (
          <div className="py-12 text-center text-muted-foreground">Loading services...</div>
        ) : pillars.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No services available.</div>
        ) : (
          pillars.map((pillar, pi) => {
            const Icon = PILLAR_ICONS[pillar.slug as keyof typeof PILLAR_ICONS] ?? Users;

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

                <p className="mt-4 max-w-2xl text-muted-foreground">{pillar.intro}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {pillar.services.map((service, i) => (
                    <Reveal key={service.name} delay={i * 70}>
                      <article className="lift group h-full rounded-xl border border-border bg-card p-6 hover:border-accent">
                        <span className="block h-1 w-10 rounded-full bg-gold transition-all duration-300 group-hover:w-16" />

                        <h3 className="mt-5 font-bold leading-snug">{service.name}</h3>

                        <p className="mt-3 text-sm text-muted-foreground">{service.copy}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            );
          })
        )}
      </section>

      <section className="bg-secondary/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Coverage</p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase">East African trade corridors</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Aggregation hubs, feeder nodes and export corridors across Kenya and South Sudan,
              linked to Uganda and the port of Mombasa.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <div className="overflow-hidden rounded-xl border border-border bg-card p-3 sm:p-4">
                <svg
                  viewBox={EA_MAP_VIEWBOX}
                  className="h-auto w-full"
                  role="img"
                  aria-label="Map of East Africa showing AgriLink EA Ltd trade corridors across Kenya and South Sudan"
                >
                  <defs>
                    <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path
                        d="M5 0 L0 0 0 5"
                        fill="none"
                        stroke="var(--color-border)"
                        strokeWidth="0.15"
                      />
                    </pattern>
                  </defs>
                  {/* sea / background */}
                  <rect
                    width="100"
                    height="92"
                    fill="color-mix(in oklab, var(--color-chart-4) 10%, var(--color-card))"
                  />
                  <rect width="100" height="92" fill="url(#grid)" />

                  {(Object.keys(EA_COUNTRY_PATHS) as EACountryId[]).map((id) => {
                    const active = ACTIVE_COUNTRIES.has(id);
                    return (
                      <path
                        key={id}
                        d={EA_COUNTRY_PATHS[id]}
                        fill={
                          active
                            ? "color-mix(in oklab, var(--color-accent) 32%, var(--color-card))"
                            : "color-mix(in oklab, var(--color-muted-foreground) 10%, var(--color-card))"
                        }
                        stroke={active ? "var(--color-primary)" : "var(--color-muted-foreground)"}
                        strokeOpacity={active ? 0.9 : 0.45}
                        strokeWidth={active ? 0.35 : 0.2}
                        strokeLinejoin="round"
                      />
                    );
                  })}

                  {COUNTRY_LABELS.map((c) => (
                    <text
                      key={c.name}
                      x={c.x}
                      y={c.y}
                      textAnchor="middle"
                      fontSize={c.active ? 2.5 : 2}
                      fontWeight={c.active ? 800 : 600}
                      letterSpacing="0.35"
                      fill={c.active ? "var(--color-primary)" : "var(--color-muted-foreground)"}
                      opacity={c.active ? 0.9 : 0.75}
                    >
                      {c.name}
                    </text>
                  ))}

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
                        strokeWidth="0.55"
                        strokeDasharray="1.6 1.1"
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {CORRIDORS.map((c) => (
                    <g key={c.id}>
                      {c.type === "hub" && (
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r={3.6}
                          fill="var(--color-primary)"
                          opacity={0.18}
                        />
                      )}
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={c.type === "hub" ? 2 : 1.25}
                        fill={c.type === "exit" ? "var(--color-gold)" : "var(--color-primary)"}
                        stroke="var(--color-card)"
                        strokeWidth="0.4"
                      />
                      <text
                        x={c.lx}
                        y={c.ly}
                        textAnchor={c.anchor}
                        fontSize={c.type === "hub" ? 2.4 : 2.1}
                        fontWeight={c.type === "hub" ? 700 : 500}
                        fill="var(--color-foreground)"
                        stroke="var(--color-card)"
                        strokeWidth="0.5"
                        paintOrder="stroke"
                      >
                        {c.name}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-5 rounded-sm border border-primary bg-accent/35" />
                    Operating countries
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Hub / node
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Export corridor
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {CORRIDORS.map((c) => (
                  <li
                    key={c.id}
                    className="lift flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
                  >
                    <MapPin
                      className={
                        "h-4 w-4 shrink-0 " + (c.type === "exit" ? "text-gold" : "text-primary")
                      }
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{c.name}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {c.country}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                      {c.type === "hub" ? "Hub" : c.type === "exit" ? "Export" : "Node"}
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="gold" className="mt-5 w-full">
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
