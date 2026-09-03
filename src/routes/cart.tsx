import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { DataPixels } from "@/components/site/DataPixels";
import { useQuoteCart } from "@/lib/quote-cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Quote Cart — AgriLink Kakuma B2B Catalog" },
      {
        name: "description",
        content:
          "Review the commodities in your AgriLink Kakuma quote cart and proceed to corporate checkout.",
      },
      { property: "og:title", content: "Quote Cart — AgriLink Kakuma" },
      { property: "og:description", content: "Review your wholesale commodity quote request." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, clear } = useQuoteCart();
  const logistics = subtotal > 0 ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + logistics;

  return (
    <>
      <section className="relative isolate overflow-hidden surface-forest">
        <DataPixels tone="light" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold uppercase leading-[1]">
              Quote cart
            </h1>
            <p className="mt-4 max-w-2xl text-primary-foreground/80">
              Indicative figures only. Final pricing is confirmed on contract after volume and
              corridor verification.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {detailed.length === 0 ? (
          <Reveal>
            <div className="rounded-2xl border border-border bg-card px-6 py-20 text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" strokeWidth={1.3} />
              <h2 className="mt-5 text-2xl font-extrabold uppercase">Your quote cart is empty</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                Browse the B2B catalog and add commodities to build a quote request.
              </p>
              <Button asChild variant="gold" size="lg" className="mt-6">
                <Link to="/shop">Browse catalog</Link>
              </Button>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <ul className="space-y-4">
                {detailed.map((line) => (
                  <li
                    key={line.product.id}
                    className="rounded-xl border border-border bg-card p-5 sm:p-6"
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="min-w-0">
                        <Link
                          to="/shop/$productId"
                          params={{ productId: line.product.id }}
                          className="truncate font-bold hover:text-accent"
                        >
                          {line.product.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {line.product.category} · {line.product.grade} · ${line.product.pricePerUnit}{" "}
                          per {line.product.unit}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => remove(line.product.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Decrease"
                          onClick={() => setQty(line.product.id, line.qty - 1)}
                        >
                          <Minus />
                        </Button>
                        <span className="w-14 text-center font-semibold tabular-nums">{line.qty}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Increase"
                          onClick={() => setQty(line.product.id, line.qty + 1)}
                        >
                          <Plus />
                        </Button>
                        <span className="ml-1 text-xs text-muted-foreground">{line.product.unit}</span>
                      </div>
                      <span className="font-display text-lg font-extrabold">
                        ${line.total.toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="mt-4" onClick={clear}>
                Clear cart
              </Button>
            </Reveal>

            <Reveal delay={120}>
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-7">
                <h2 className="text-lg font-extrabold uppercase">Quote summary</h2>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Commodity subtotal</dt>
                    <dd className="font-semibold">${subtotal.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Logistics estimate (8%)</dt>
                    <dd className="font-semibold">${logistics.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <dt className="font-bold uppercase">Indicative total</dt>
                    <dd className="font-display text-xl font-extrabold text-primary">
                      ${total.toLocaleString()}
                    </dd>
                  </div>
                </dl>
                <Button asChild variant="gold" size="lg" className="mt-6 w-full">
                  <Link to="/checkout">
                    Proceed to checkout <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="mt-3 w-full">
                  <Link to="/shop">Continue browsing</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        )}
      </section>
    </>
  );
}
