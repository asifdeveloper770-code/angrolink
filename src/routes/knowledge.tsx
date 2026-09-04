import { useMemo, useState , useEffect} from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, CalendarDays, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { DataPixels } from "@/components/site/DataPixels";
import { cn } from "@/lib/utils";
import { getKnowledgeHub } from "@/lib/supabase";

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


function Knowledge() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);

    try {
      const result = await getKnowledgeHub();

      if (!result.success) {
        console.error("Failed to load knowledge hub:", result.error);
        setPosts([]);
        return;
      }

      setPosts(result.data || []);
    } catch (error) {
      console.error("Failed to load knowledge hub:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  const tags = useMemo(() => {
    const categories = posts
      .map((post) => post.category)
      .filter(Boolean);

    return ["All", ...Array.from(new Set(categories))];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const excerpt = p.excerpt?.toLowerCase() || "";
      const content = p.content?.toLowerCase() || "";

      return (
        (tag === "All" || p.category === tag) &&
        (
          q === "" ||
          title.includes(q) ||
          excerpt.includes(q) ||
          content.includes(q)
        )
      );
    });
  }, [posts, query, tag]);

  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="max-w-4xl font-display text-[clamp(2.1rem,5.5vw,3.8rem)] font-extrabold uppercase leading-none">
              Knowledge hub
            </h1>

            <p className="mt-6 max-w-2xl text-primary-foreground/80">
              Crop reports, market pricing updates, sustainability research
              and stories from the communities we operate alongside.
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
              {tags.map((t) => (
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

        {loading ? (
          <div className="mt-16 text-center text-muted-foreground">
            Loading publications...
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            No publications match that search. Try a different term or filter.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal
                key={p.id}
                delay={(i % 3) * 80}
              >
                <article className="lift group flex h-full flex-col rounded-xl border border-border bg-card p-7 hover:border-accent">
                  <span className="w-fit rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                    {p.category || "General"}
                  </span>

                  <h2 className="mt-4 text-lg font-bold leading-snug">
                    {p.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {p.excerpt || p.content || ""}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />

                      {p.created_at
                        ? new Date(p.created_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}

                      {p.read_time ? ` · ${p.read_time}` : ""}
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
            <h2 className="text-2xl font-extrabold uppercase">
              Subscribe to the weekly brief
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Commodity pricing, corridor status and fragility signals
              delivered every Monday.
            </p>

            <form
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                maxLength={255}
                placeholder="you@organisation.org"
                aria-label="Email"
              />

              <Button
                type="submit"
                variant="gold"
                className="shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  );
}