import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./catalog";

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: { product: Product; qty: number; total: number }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "agrilink-quote-cart";

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((id: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const detailed = useMemo(
    () =>
      lines
        .map((l) => {
          const product = PRODUCTS.find((p) => p.id === l.id);
          return product ? { product, qty: l.qty, total: product.pricePerUnit * l.qty } : null;
        })
        .filter(Boolean) as { product: Product; qty: number; total: number }[],
    [lines],
  );

  const value: CartContextValue = {
    lines,
    add,
    setQty,
    remove,
    clear,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: detailed.reduce((s, l) => s + l.total, 0),
    detailed,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useQuoteCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useQuoteCart must be used within QuoteCartProvider");
  return ctx;
}
