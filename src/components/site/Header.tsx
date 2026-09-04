import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  X,
  ShoppingCart,
  Globe,
  ChevronDown,
  Wheat,
  Tractor,
  Handshake,
  Check,
  Sprout,
} from "lucide-react";
import logoAsset from "@/assets/agrilink-logo.jpeg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuoteCart } from "@/lib/quote-cart";
import { supabase } from "@/lib/supabase";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/knowledge", label: "Knowledge Hub" },
  { to: "/contact", label: "Contact" },
] as const;

// const LANGS = ["English", "Kiswahili", "العربية"];


type DropdownProduct = {
  id: string;
  name: string;
  slug: string | null;
  category_id: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

const FARM_ITEMS = [
  {
    label: "Large Plantation",
    id: "large-plantation",
    image: "/images/farm/large-plantation.jpg",
  },
  {
    label: "Other Relevant Farm Items",
    id: "other-farm-items",
    image: "/images/farm/farm-items.jpg",
  },
] as const;

const PARTNER_OPTIONS = [
  { label: "Farmer Registration", description: "Join our aggregation network" },
  { label: "Commercial Buyer Inquiry", description: "Request bulk quotes" },
  { label: "Logistics Partner", description: "Fleet owner opportunities" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  const [commodities, setCommodities] = useState<DropdownProduct[]>([]);
  const [machinery, setMachinery] = useState<DropdownProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const { count } = useQuoteCart();

  useEffect(() => {
    async function fetchDropdownProducts() {
      try {
        setLoadingProducts(true);

        // 1. Fetch the two categories
        const { data: categories, error: categoriesError } = await supabase
          .from("categories")
          .select("id, name, slug")
          .eq("active", true)
          .in("slug", ["commodities", "machinery"]);

        if (categoriesError) {
          console.error("Failed to fetch categories:", categoriesError);
          return;
        }

        if (!categories || categories.length === 0) {
          console.warn("No commodities or machinery categories found.");
          return;
        }

        const commoditiesCategory = categories.find(
          (category) => category.slug === "commodities"
        );

        const machineryCategory = categories.find(
          (category) => category.slug === "machinery"
        );

        // 2. Fetch products belonging to these categories
        const categoryIds = categories.map((category) => category.id);

        const { data: products, error: productsError } = await supabase
          .from("products")
          .select("id, name, slug, category_id")
          .eq("active", true)
          .in("category_id", categoryIds)
          .order("sort_order", { ascending: true })
          .order("name", { ascending: true });

        if (productsError) {
          console.error("Failed to fetch products:", productsError);
          return;
        }

        const allProducts = (products ?? []) as DropdownProduct[];

        // 3. Separate products into the two dropdowns
        setCommodities(
          commoditiesCategory
            ? allProducts.filter(
              (product) =>
                product.category_id === commoditiesCategory.id
            )
            : []
        );

        setMachinery(
          machineryCategory
            ? allProducts.filter(
              (product) =>
                product.category_id === machineryCategory.id
            )
            : []
        );
      } catch (error) {
        console.error("Error loading navigation products:", error);
      } finally {
        setLoadingProducts(false);
      }
    }

    fetchDropdownProducts();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-2.5 ">

        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src={logoAsset}
            alt="AgriLink Kakuma LLC logo"
            width={40}
            height={40}
            className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-border shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-display text-base font-extrabold uppercase tracking-tight sm:text-lg">
              Agri<span className="text-accent">Link</span> Kakuma LLC
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:block">
              Agtech · Logistics · Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-1 xl:gap-2">
          <nav className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary bg-secondary font-semibold" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-md px-3 py-2 text-xs font-medium transition-all hover:bg-secondary hover:text-primary 2xl:text-sm"
              >
                {item.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 gap-1.5 px-3 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-primary 2xl:text-sm"
                >
                  Services
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="w-64 p-1.5 shadow-lg"
              >
                <DropdownMenuLabel className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Wheat className="h-3.5 w-3.5 text-accent" />
                  <a href="/services">Our Services</a>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1" />

                {/* Buy Commodities Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-md text-xs font-medium">
                    <Wheat className="mr-2 h-4 w-4 text-accent" />
                    Buy Commodities
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent className="w-56 p-1.5 shadow-lg">
                    <DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Produce & Staples
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="my-1" />

                    <div className="max-h-72 overflow-y-auto pr-1">
                      {loadingProducts ? (
                        <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                          Loading commodities...
                        </DropdownMenuItem>
                      ) : commodities.length > 0 ? (
                        commodities.map((commodity) => (
                          <DropdownMenuItem
                            key={commodity.id}
                            asChild
                            className="rounded-md"
                          >
                            <Link
                              to="/shop"
                              search={{
                                item: commodity.slug ?? commodity.id,
                              }}
                              className="cursor-pointer py-1.5 text-xs font-medium"
                            >
                              {commodity.name}
                            </Link>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                          No commodities available
                        </DropdownMenuItem>
                      )}
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Machinery Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-md text-xs font-medium">
                    <Tractor className="mr-2 h-4 w-4 text-accent" />
                    Machinery
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent className="w-60 p-1.5 shadow-lg">
                    <DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Equipment & Technology
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="my-1" />

                    {loadingProducts ? (
                      <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                        Loading machinery...
                      </DropdownMenuItem>
                    ) : machinery.length > 0 ? (
                      machinery.map((item) => (
                        <DropdownMenuItem
                          key={item.id}
                          asChild
                          className="rounded-md"
                        >
                          <Link
                            to="/shop"
                            search={{
                              item: item.slug ?? item.id,
                            }}
                            className="cursor-pointer py-1.5 text-xs font-medium"
                          >
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                        No machinery available
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Farm Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="rounded-md text-xs font-medium">
                    <Sprout className="mr-2 h-4 w-4 text-accent" />
                    Farm
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent className="w-72 p-1.5 shadow-lg">
                    <DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Farm Opportunities
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="my-1" />

                    {FARM_ITEMS.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        asChild
                        className="rounded-md"
                      >
                        <Link
                          to="/shop"
                          search={{ item: item.id }}
                          className="cursor-pointer py-2 text-xs font-medium"
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator className="my-1" />

                {/* Investment & Partnership - Direct Link */}
                <DropdownMenuItem asChild className="rounded-md">
                  <Link
                    to="/investment-partnership"
                    className="flex cursor-pointer items-center py-2 text-xs font-medium"
                  >
                    <Handshake className="mr-2 h-4 w-4 text-accent" />
                    Investment & Partnership Tracks
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Action Tools & Badges */}

        </div>
        <div className="flex items-center gap-1.5 border-l border-border/60 pl-3">
          {/* Language Picker */}
          {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden h-9 gap-1.5 px-2.5 sm:inline-flex">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-semibold">{lang}</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button> */}
          {/* </DropdownMenuTrigger> */}
          {/* <DropdownMenuContent align="end" className="w-36 p-1 shadow-lg">
                {LANGS.map((l) => (
                  <DropdownMenuItem
                    key={l}
                    onClick={() => setLang(l)}
                    className="flex items-center justify-between text-xs font-medium cursor-pointer"
                  >
                    {l}
                    {lang === l && <Check className="h-3.5 w-3.5 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent> */}
          {/* </DropdownMenu> */}

          {/* Cart Icon */}
          <Button asChild variant="ghost" size="icon" className="h-9 w-9 relative rounded-full" aria-label="Quote cart">
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[10px] font-extrabold text-gold-foreground shadow-sm animate-in zoom-in-50">
                  {count}
                </span>
              )}
            </Link>
          </Button>

          {/* Mobile Navigation Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 xl:hidden rounded-md"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-lg xl:hidden transition-all animate-in slide-in-from-top-2 duration-200">
          <nav className="mx-auto max-w-7xl max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-primary bg-secondary font-semibold" }}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Services */}
            <div className="mt-4 border-t border-border/60 pt-3">
              <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Wheat className="h-3.5 w-3.5 text-accent" />
                Services
              </p>

              {/* Buy Commodities */}
              <div className="mt-2">
                <p className="px-3 py-1 text-xs font-semibold text-foreground">
                  Buy Commodities
                </p>

                <div className="mt-1 grid grid-cols-2 gap-1 px-1">
                  {loadingProducts ? (
                    <p className="px-3 py-2 text-xs text-muted-foreground">
                      Loading commodities...
                    </p>
                  ) : commodities.length > 0 ? (
                    commodities.map((commodity) => (
                      <Link
                        key={commodity.id}
                        to="/shop"
                        search={{
                          item: commodity.slug ?? commodity.id,
                        }}
                        onClick={() => setOpen(false)}
                        className="truncate rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {commodity.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-xs text-muted-foreground">
                      No commodities available
                    </p>
                  )}
                </div>
              </div>

              {/* Machinery */}
              <div className="mt-4 border-t border-border/40 pt-3">
                <p className="px-3 py-1 text-xs font-semibold text-foreground">
                  Machinery
                </p>

                <div className="mt-1 flex flex-col gap-0.5 px-1">
                  {loadingProducts ? (
                    <p className="px-3 py-2 text-xs text-muted-foreground">
                      Loading machinery...
                    </p>
                  ) : machinery.length > 0 ? (
                    machinery.map((item) => (
                      <Link
                        key={item.id}
                        to="/shop"
                        search={{
                          item: item.slug ?? item.id,
                        }}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-xs text-muted-foreground">
                      No machinery available
                    </p>
                  )}
                </div>
              </div>

              {/* Farm */}
              <div className="mt-4 border-t border-border/40 pt-3">
                <p className="px-3 py-1 text-xs font-semibold text-foreground">
                  Farm
                </p>

                <div className="mt-1 flex flex-col gap-0.5 px-1">
                  {FARM_ITEMS.map((item) => (
                    <Link
                      key={item.id}
                      to="/shop"
                      search={{ item: item.id }}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Investment & Partnership */}
              <div className="mt-4 border-t border-border/40 pt-3">
                <Link
                  to="/investment-partnership"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  <Handshake className="h-4 w-4 text-accent" />
                  Investment & Partnership Tracks
                </Link>
              </div>
            </div>

            {/* Mobile Language Selector & Call-to-Action */}
            <div className="mt-6 border-t border-border/60 pt-4 flex flex-col gap-3">
              {/* <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold text-muted-foreground">Select Language:</span>
                <div className="flex items-center gap-1">
                  {LANGS.map((l) => (
                    <Button
                      key={l}
                      variant={lang === l ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setLang(l)}
                      className="h-7 px-2 text-[11px] font-semibold"
                    >
                      {l}
                    </Button>
                  ))}
                </div>
              </div> */}

              <Button asChild variant="gold" className="w-full shadow-sm">
                <Link to="/partner" onClick={() => setOpen(false)}>
                  Open Partner Portal
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}