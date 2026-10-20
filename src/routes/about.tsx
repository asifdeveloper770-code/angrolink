import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText, Leaf, Globe2, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { DataPixels } from "@/components/site/DataPixels";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AgriLink EA Ltd. — Empowering East African Agriculture" },
      {
        name: "description",
        content:
          "Welcome to AgriLink EA Ltd: transforming farming into a powerful engine for community development and economic resilience across Kenya and South Sudan.",
      },
      { property: "og:title", content: "About AgriLink EA Ltd." },
      {
        property: "og:description",
        content:
          "Transforming farming into an engine for community development, reducing post-harvest losses by 30% across Kenya and South Sudan.",
      },
    ],
  }),
  component: About,
});

const TEAM = [
  {
    name: "Dr. Akiru Lomorukai",
    role: "Chief Executive Officer",
    creds: "PhD Agricultural Economics, University of Nairobi · Former ASAL policy advisor",
    bio: "Led drought-response market systems programming across three counties before founding AgriLink Kakuma.",
  },
  {
    name: "Hassan Mwikali",
    role: "Director of Logistics",
    creds: "MSc Supply Chain Management, Strathmore Business School",
    bio: "Fifteen years designing cold-chain and cross-border freight networks in East Africa.",
  },
  {
    name: "Dr. Nadia El-Amin",
    role: "Head of Market Intelligence",
    creds: "PhD Climate Data Science, Wageningen University",
    bio: "Builds the forecasting models behind our commodity pricing and fragility indices.",
  },
  {
    name: "Ekai Lodio",
    role: "Producer Network Lead",
    creds: "BSc Agribusiness, Turkana University College",
    bio: "Coordinates 41 producer groups and the field agronomy training curriculum.",
  },
  {
    name: "Prof. Grace Wanjiku",
    role: "Advisory Board — Policy",
    creds: "Professor of Development Policy · County resilience taskforce member",
    bio: "Advises on donor compliance, safeguarding and county-level integration.",
  },
  {
    name: "Samir Okoth",
    role: "Advisory Board — Finance",
    creds: "CFA · Former impact investment principal",
    bio: "Guides blended-finance structuring and institutional reporting standards.",
  },
];

const REPORTS = [
  { title: "Annual Impact Report 2025", meta: "PDF · 4.2 MB · 68 pages" },
  { title: "Turkana Cold-Chain Feasibility Whitepaper", meta: "PDF · 2.1 MB · 34 pages" },
  { title: "Climate Fragility & Market Access Index", meta: "PDF · 1.6 MB · 22 pages" },
  { title: "Smallholder Aggregation Playbook", meta: "PDF · 3.0 MB · 47 pages" },
];

function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs sm:text-sm font-bold text-gold backdrop-blur-sm mb-4">
              <span>Empowering East African Agriculture 🌍✨</span>
            </div>
            <h1 className="max-w-4xl font-display text-[clamp(2.1rem,5.5vw,3.8rem)] font-extrabold uppercase leading-[1] text-balance-tight">
              About AgriLink EA Ltd.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
              Welcome to AgriLink EA Ltd, where we transform farming into a powerful engine for
              community development and economic resilience across East Africa. Scaling our impact
              far beyond arid regions, our footprint extends across the agricultural landscapes of
              Kenya and South Sudan. We are dedicated to empowering smallholder farmers by
              delivering high-quality agricultural inputs and connecting them directly to reliable
              B2B buyers through our integrated digital marketplace. Backed by advanced cold-storage
              facilities, we actively protect regional food security and reduce post-harvest losses
              by 30%, turning sustainable farming into lasting prosperity.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Our Journey & Purpose
            </p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase">
              Our Story: From Kakuma to East Africa 🌾✨
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                At AgriLink EA Ltd, our journey began right at the frontiers of displacement, where
                the critical intersection of environmental volatility and structural fragility
                demands more than traditional humanitarian relief. Founded in the Kakuma region, our
                social enterprise was built on a simple yet transformative premise: farming should
                be used as a powerful engine for community development, rather than just an end in
                itself.
              </p>
              <p>
                Our founder’s deep experience managing large-scale humanitarian programs within the
                UNHCR network exposed a critical systemic gap on the geographic periphery. While
                rural smallholders and displaced communities possessed the determination to
                cultivate land, they were systematically cut off from stable markets, devastated by
                climate shocks, and crippled by post-harvest decay.
              </p>
              <p>
                We set out to build the literal economic plumbing required to stabilize these
                vulnerable food systems. By introducing a technology-driven model, we began
                delivering high-quality agricultural inputs directly to farmers, pairing localized
                resources with modern digital connectivity.
              </p>
              <p>
                Today, AgriLink EA Ltd has scaled from a localized pilot project into a dynamic,
                regional East African enterprise. Our operations span across the vital agricultural
                corridors of Kenya and South Sudan, expanding sustainable energy access and creating
                climate-resilient livelihoods for both rural smallholders and displaced populations.
              </p>
              <p>
                By connecting producers directly to reliable B2B buyers through our integrated
                digital marketplace, and deploying advanced solar-powered cold storage facilities,
                we have successfully engineered a system that cuts post-harvest crop losses by 30%.
                We are proving that even in the most complex state-building environments, robust
                agricultural infrastructure can cut through geopolitical noise, protect critical
                national assets, and secure lasting regional peace from the ground up.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5">
              {[
                {
                  icon: Leaf,
                  title: "Environmental resilience",
                  copy: "Drought-tolerant crop portfolios, water-efficient irrigation clusters and post-harvest loss reduction as a climate strategy.",
                },
                {
                  icon: Globe2,
                  title: "Climate-smart framework",
                  copy: "Every corridor is scored on rainfall variability, rangeland pressure and conflict fragility before we commit capital.",
                },
                {
                  icon: HeartHandshake,
                  title: "Host & refugee integration",
                  copy: "Producer groups deliberately blend host-community and refugee-settlement participation to reduce economic friction.",
                },
              ].map((v) => (
                <div key={v.title} className="lift rounded-xl border border-border bg-card p-6">
                  <v.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  <h3 className="mt-4 font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.copy}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Leadership & advisors
            </p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase">Credentialed, county-rooted</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <article className="lift h-full rounded-xl border border-border bg-card p-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full surface-forest font-display text-sm font-bold">
                      {m.name
                        .split(" ")
                        .filter((w) => !w.endsWith("."))
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-bold">{m.name}</h3>
                      <p className="truncate text-xs font-semibold uppercase tracking-wider text-accent">
                        {m.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-medium text-muted-foreground">{m.creds}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Resources</p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase">Reports & whitepapers</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Published documentation for partners conducting due diligence. Request the full data
            annexes from our contact desk.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {REPORTS.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <div className="lift flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6">
                <div className="flex min-w-0 items-center gap-4">
                  <FileText className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.meta}</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="shrink-0">
                  <Link to="/contact">
                    <Download /> Request
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-10">
            <Button asChild variant="gold" size="lg">
              <Link to="/partner">
                Become a partner <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
