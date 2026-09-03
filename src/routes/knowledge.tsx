import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, CalendarDays, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { DataPixels } from "@/components/site/DataPixels";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Hub — Crop Reports & Market Intelligence | AgriLink Kakuma" },
      {
        name: "description",
        content:
          "Crop reports, weekly market pricing updates, sustainability whitepapers and community impact stories from Turkana County.",
      },
      { property: "og:title", content: "Knowledge Hub — AgriLink Kakuma" },
      {
        property: "og:description",
        content:
          "Searchable library of crop reports, pricing updates, whitepapers and impact stories.",
      },
    ],
  }),
  component: Knowledge,
});

const TAGS = ["All", "Crop Reports", "Market Pricing", "Sustainability", "Community Impact"];

const POSTS = [
  {
    title: "Sorghum yields hold steady despite delayed long rains",
    tag: "Crop Reports",
    date: "12 Aug 2026",
    read: "6 min",
    excerpt:
      "Field data from 41 producer groups shows drought-tolerant varieties outperforming baseline by 18% across the Tarach belt.",
  },
  {
    title: "Weekly commodity pricing brief — Week 33",
    tag: "Market Pricing",
    date: "10 Aug 2026",
    read: "3 min",
    excerpt:
      "Green gram farm-gate prices firmed 4.2% on Ugandan demand, while tomato crates softened on Lodwar oversupply.",
  },
  {
    title: "Solar cold storage: unit economics after 18 months",
    tag: "Sustainability",
    date: "02 Aug 2026",
    read: "9 min",
    excerpt:
      "Post-harvest losses on leafy greens fell from 34% to 9%, with payback achieved inside two harvest cycles.",
  },
  {
    title: "How Napusimoru's women-led collective doubled income",
    tag: "Community Impact",
    date: "28 Jul 2026",
    read: "5 min",
    excerpt:
      "Aggregated bargaining and guaranteed off-take changed the negotiating position of 120 households.",
  },
  {
    title: "Cross-border freight documentation: a practical guide",
    tag: "Market Pricing",
    date: "21 Jul 2026",
    read: "7 min",
    excerpt:
      "What buyers moving consignments into South Sudan need on file before a truck leaves the Kakuma yard.",
  },
  {
    title: "Climate fragility index: Q3 corridor scoring",
    tag: "Sustainability",
    date: "15 Jul 2026",
    read: "8 min",
    excerpt:
      "Rangeland stress rose in two northern corridors; we adjusted routing and pre-positioned buffer stock.",
  },
  {
    title: "Sesame export grading: meeting buyer specifications",
    tag: "Crop Reports",
    date: "04 Jul 2026",
    read: "6 min",
    excerpt:
      "Oil content, purity thresholds and moisture control practices that unlock export-grade pricing.",
  },
  {
    title: "Transporter earnings after route allocation reform",
    tag: "Community Impact",
    date: "26 Jun 2026",
    read: "4 min",
    excerpt:
      "Owner-operators on the network reported 31% higher utilisation following guaranteed settlement terms.",
  },
];

function Knowledge() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter(
      (p) =>
        (tag === "All" || p.tag === tag) &&
        (q === "" || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
    );
  }, [query, tag]);

  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="max-w-4xl font-display text-[clamp(2.1rem,5.5vw,3.8rem)] font-extrabold uppercase leading-[1]">
              Knowledge hub
            </h1>
            <p className="mt-6 max-w-2xl text-primary-foreground/80">
              Crop reports, market pricing updates, sustainability research and stories from the
              communities we operate alongside.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="relative min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                maxLength={120}
                placeholder="Search reports, briefs and stories..."
                className="pl-9"
                aria-label="Search knowledge hub"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                    tag === t
                      ? "border-transparent bg-gold text-gold-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-accent hover:text-primary",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            No publications match that search. Try a different term or filter.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <article className="lift group flex h-full flex-col rounded-xl border border-border bg-card p-7 hover:border-accent">
                  <span className="w-fit rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                    {p.tag}
                  </span>
                  <h2 className="mt-4 text-lg font-bold leading-snug">{p.title}</h2>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" /> {p.date} · {p.read}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={150}>
          <div className="mt-14 rounded-2xl border border-border bg-secondary/50 p-8 text-center">
            <h2 className="text-2xl font-extrabold uppercase">Subscribe to the weekly brief</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Commodity pricing, corridor status and fragility signals delivered every Monday.
            </p>
            <form
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input type="email" maxLength={255} placeholder="you@organisation.org" aria-label="Email" />
              <Button type="submit" variant="gold" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  );
}
