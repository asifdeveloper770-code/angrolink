import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Search, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/site/Reveal";
import { DataPixels } from "@/components/site/DataPixels";
import { useQuoteCart } from "@/lib/quote-cart";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      {
        title: "B2B Commodity Catalog — AgriLink Kakuma LLC",
      },
      {
        name: "description",
        content:
          "Browse wholesale agricultural commodities from Turkana County: cereals, pulses, fresh produce, livestock, oilseeds and specialty goods.",
      },
      {
        property: "og:title",
        content: "B2B Commodity Catalog — AgriLink Kakuma",
      },
      {
        property: "og:description",
        content:
          "Add graded commodities to a quote cart and run a corporate checkout in minutes.",
      },
    ],
  }),
  component: Shop,
});

type ShopProduct = {
  id: string;
  name: string;
  slug: string | null;
  category_id: string;
  category: string;
  unit: string;
  pricePerUnit: number;
  moq: number;
  origin: string;
  grade: string;
  lead: string;
  blurb: string;
  spec: string[];
  image: string | null;
  active: boolean;
};

function Shop() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(true);

  const { add } = useQuoteCart();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          category_id,
          unit,
          price_per_unit,
          moq,
          origin,
          grade,
          lead,
          blurb,
          spec,
          image,
          active,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq("active", true)
        .order("sort_order", {
          ascending: true,
        })
        .order("name", {
          ascending: true,
        });

      if (error) {
        console.error("Error loading products:", error);
        toast.error("Failed to load products");
        return;
      }

      const mappedProducts: ShopProduct[] = (data || []).map(
        (product: any) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          category_id: product.category_id,
          category:
            product.categories?.name || "Uncategorized",
          unit: product.unit || "unit",
          pricePerUnit: Number(product.price_per_unit || 0),
          moq: Number(product.moq || 1),
          origin: product.origin || "",
          grade: product.grade || "",
          lead: product.lead || "",
          blurb: product.blurb || product.description || "",
          spec: Array.isArray(product.spec)
            ? product.spec
            : [],
          image: product.image || null,
          active: product.active,
        })
      );

      setProducts(mappedProducts);

      const uniqueCategories = Array.from(
        new Set(
          mappedProducts
            .map((product) => product.category)
            .filter(Boolean)
        )
      );

      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  const categoryList = useMemo(
    () => ["All", ...categories],
    [categories]
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((p) => {
      const matchesCategory =
        cat === "All" || p.category === cat;

      const matchesSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, query, cat]);

  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="font-display text-[clamp(2.1rem,5.5vw,3.8rem)] font-extrabold uppercase leading-[1]">
              B2B commodity catalog
            </h1>

            <p className="mt-6 max-w-2xl text-primary-foreground/80">
              Indicative wholesale pricing in USD, ex-Kakuma yard.
              Add commodities to your quote cart — a contract
              specialist confirms final pricing, incoterms and
              delivery windows.
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
                maxLength={80}
                placeholder="Search commodities or origin..."
                className="pl-9"
                aria-label="Search catalog"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categoryList.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                    cat === c
                      ? "border-transparent bg-gold text-gold-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-accent hover:text-primary"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {loading ? (
          <div className="py-20 text-center text-muted-foreground">
            Loading commodities...
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {list.map((p, i) => (
                <Reveal
                  key={p.id}
                  delay={(i % 4) * 70}
                >
                  <article className="lift flex h-full flex-col rounded-xl border border-border bg-card p-6 hover:border-accent">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                        {p.category}
                      </span>

                      {p.grade && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                          {p.grade}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-lg font-bold leading-snug">
                      {p.name}
                    </h2>

                    {p.origin && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {p.origin}
                      </p>
                    )}

                    <p className="mt-3 flex-1 text-sm text-muted-foreground">
                      {p.blurb}
                    </p>

                    <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                      <div>
                        <p className="font-display text-2xl font-extrabold text-primary">
                          $
                          {p.pricePerUnit.toLocaleString()}
                        </p>

                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          per {p.unit} · MOQ {p.moq}
                        </p>
                      </div>

                      <Link
                        to="/shop/$productId"
                        params={{
                          productId: p.id,
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent"
                      >
                        Details
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <Button
                      variant="gold"
                      className="mt-4"
                      onClick={() => {
                        add(p.id, p.moq);

                        toast.success(
                          `${p.name} added to quote cart (${p.moq} ${p.unit}).`
                        );
                      }}
                    >
                      <Plus />
                      Add to quote
                    </Button>
                  </article>
                </Reveal>
              ))}
            </div>

            {list.length === 0 && (
              <p className="mt-16 text-center text-muted-foreground">
                No commodities match that filter.
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
}