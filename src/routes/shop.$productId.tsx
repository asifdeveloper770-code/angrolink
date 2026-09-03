import { useEffect, useState } from "react";
import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShieldCheck,
  Clock,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { DataPixels } from "@/components/site/DataPixels";
import { useQuoteCart } from "@/lib/quote-cart";
import { supabase } from "@/lib/supabase";

type Product = {
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

export const Route = createFileRoute("/shop/$productId")({
  loader: async ({ params }) => {
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
        description,
        spec,
        image,
        active,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq("id", params.productId)
      .eq("active", true)
      .maybeSingle();

    if (error) {
      console.error(
        "Error loading product:",
        error
      );

      throw new Error(
        "Failed to load product"
      );
    }

    if (!data) {
      throw notFound();
    }

    const product: Product = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      category_id: data.category_id,
      category:
        (data.categories as any)?.name ||
        "Uncategorized",
      unit: data.unit || "unit",
      pricePerUnit: Number(
        data.price_per_unit || 0
      ),
      moq: Number(data.moq || 1),
      origin: data.origin || "",
      grade: data.grade || "",
      lead: data.lead || "",
      blurb:
        data.blurb ||
        data.description ||
        "",
      spec: Array.isArray(data.spec)
        ? data.spec
        : [],
      image: data.image || null,
      active: data.active,
    };

    return {
      product,
    };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          {
            title:
              "Commodity unavailable — AgriLink Kakuma",
          },
          {
            name: "robots",
            content: "noindex",
          },
        ],
      };
    }

    const p = loaderData.product;

    return {
      meta: [
        {
          title: `${p.name} — Wholesale ${p.category} | AgriLink Kakuma`,
        },
        {
          name: "description",
          content: p.blurb,
        },
        {
          property: "og:title",
          content: `${p.name} — AgriLink Kakuma B2B Catalog`,
        },
        {
          property: "og:description",
          content: p.blurb,
        },
      ],
    };
  },

  component: ProductView,
});

function ProductView() {
  const { product } =
    Route.useLoaderData();

  const { add } = useQuoteCart();

  const [qty, setQty] = useState(
    product.moq
  );

  useEffect(() => {
    setQty(product.moq);
  }, [product.moq]);

  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to catalog
          </Link>

          <h1 className="mt-6 font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-extrabold uppercase leading-[1]">
            {product.name}
          </h1>

          <p className="mt-3 text-primary-foreground/80">
            {product.category}

            {product.grade &&
              ` · ${product.grade}`}

            {product.origin &&
              ` · ${product.origin}`}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <Reveal>
          <div className="space-y-8">
            {product.image && (
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-auto max-h-[500px] w-full object-cover"
                />
              </div>
            )}

            <p className="text-lg text-muted-foreground">
              {product.blurb}
            </p>

            {product.spec.length > 0 && (
              <div>
                <h2 className="text-lg font-extrabold uppercase">
                  Specification
                </h2>

                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.spec.map(
                    (s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-gold" />
                        {s}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  label: "Grade",
                  value:
                    product.grade ||
                    "Standard",
                },
                {
                  icon: Clock,
                  label: "Lead time",
                  value:
                    product.lead ||
                    "Contact us",
                },
                {
                  icon: Boxes,
                  label: "Minimum order",
                  value: `${product.moq} ${product.unit}`,
                },
              ].map((f) => (
                <div
                  key={f.label}
                  className="lift rounded-xl border border-border bg-card p-5"
                >
                  <f.icon
                    className="h-5 w-5 text-accent"
                    strokeWidth={1.5}
                  />

                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </p>

                  <p className="mt-1 font-semibold">
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-7 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Indicative price
            </p>

            <p className="mt-1 font-display text-4xl font-extrabold text-primary">
              $
              {product.pricePerUnit.toLocaleString()}
              <span className="text-base font-semibold text-muted-foreground">
                {" "}
                / {product.unit}
              </span>
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider">
                Quantity ({product.unit})
              </p>

              <div className="mt-3 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setQty((q) =>
                      Math.max(
                        product.moq,
                        q - 1
                      )
                    )
                  }
                >
                  <Minus />
                </Button>

                <span className="w-16 text-center font-display text-xl font-bold tabular-nums">
                  {qty}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQty(
                      (q) => q + 1
                    )
                  }
                >
                  <Plus />
                </Button>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                Minimum order quantity:{" "}
                {product.moq}{" "}
                {product.unit}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <span className="text-sm text-muted-foreground">
                Line estimate
              </span>

              <span className="font-display text-xl font-extrabold">
                $
                {(
                  product.pricePerUnit *
                  qty
                ).toLocaleString()}
              </span>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="mt-5 w-full"
              onClick={() => {
                add(product.id, qty);

                toast.success(
                  `${qty} ${product.unit} of ${product.name} added to quote cart.`
                );
              }}
            >
              Add to quote cart
            </Button>

            <Button
              asChild
              variant="outline"
              className="mt-3 w-full"
            >
              <Link to="/cart">
                View quote cart
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}