import { useState } from "react";
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
} from "@/components/ui/dropdown-menu";
import { useQuoteCart } from "@/lib/quote-cart";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/knowledge", label: "Knowledge Hub" },
  { to: "/contact", label: "Contact" },
] as const;

const LANGS = ["English", "Kiswahili", "العربية"];

const BUY_COMMODITIES = [
  { label: "Onions", id: "onions" },
  { label: "Tomatoes", id: "tomatoes" },
  { label: "Spinach", id: "spinach" },
  { label: "Kales", id: "sukuma-wiki" },
  { label: "Okra", id: "okra" },
  { label: "Wheat Flour", id: "wheat-flour" },
  { label: "Rice", id: "rice" },
  { label: "Cooking Oil", id: "cooking-oil" },
  { label: "Maize", id: "maize" },
  { label: "Beans", id: "beans" },
  { label: "Green Peas", id: "green-peas" },
  { label: "Cow Peas", id: "cowpeas" },
  { label: "Eggs", id: "eggs" },
] as const;

const MACHINERY = [
  { label: "Solar Panels", id: "solar-panels" },
  { label: "Drip Irrigation Kits", id: "drip-irrigation" },
  { label: "Hand Operator Pumps", id: "hand-pumps" },
  { label: "Tractors", id: "tractors" },
  { label: "Solar-Powered Backpack Sprayers", id: "solar-sprayers" },
  { label: "Affordable Smartphones & Tablets", id: "smartphones-tablets" },
] as const;

const PARTNER_OPTIONS = [
  { label: "Farmer Registration", description: "Join our aggregation network" },
  { label: "Commercial Buyer Inquiry", description: "Request bulk quotes" },
  { label: "Logistics Partner", description: "Fleet owner opportunities" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(LANGS[0]);
  const { count } = useQuoteCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        
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
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-border shadow-sm transition-transform duration-200 group-hover:scale-105"
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

            {/* Buy Commodities Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 gap-1.5 px-3 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-primary 2xl:text-sm"
                >
                  Buy Commodities
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-1.5 shadow-lg">
                <DropdownMenuLabel className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Wheat className="h-3.5 w-3.5 text-accent" />
                  Produce & Staples
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />
                <div className="max-h-72 overflow-y-auto pr-1">
                  {BUY_COMMODITIES.map((commodity) => (
                    <DropdownMenuItem key={commodity.id} asChild className="rounded-md">
                      <Link
                        to="/shop"
                        search={{ item: commodity.id }}
                        className="cursor-pointer py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                      >
                        {commodity.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Machinery Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 gap-1.5 px-3 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-primary 2xl:text-sm"
                >
                  Machinery
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-60 p-1.5 shadow-lg">
                <DropdownMenuLabel className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Tractor className="h-3.5 w-3.5 text-accent" />
                  Equipment & Tech
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />
                <div className="max-h-72 overflow-y-auto pr-1">
                  {MACHINERY.map((item) => (
                    <DropdownMenuItem key={item.id} asChild className="rounded-md">
                      <Link
                        to="/shop"
                        search={{ item: item.id }}
                        className="cursor-pointer py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Partner With Us Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 gap-1.5 px-3 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-primary 2xl:text-sm"
                >
                  Partner With Us
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 p-1.5 shadow-lg">
                <DropdownMenuLabel className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Handshake className="h-3.5 w-3.5 text-accent" />
                  Network Opportunities
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />
                {PARTNER_OPTIONS.map((option) => (
                  <DropdownMenuItem key={option.label} asChild className="rounded-md p-2">
                    <Link to="/partner" className="flex flex-col gap-0.5 cursor-pointer hover:bg-secondary">
                      <span className="text-xs font-semibold text-foreground">{option.label}</span>
                      <span className="text-[11px] text-muted-foreground">{option.description}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Action Tools & Badges */}
          <div className="flex items-center gap-1.5 border-l border-border/60 pl-3">
            {/* Language Picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden h-9 gap-1.5 px-2.5 sm:inline-flex">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-semibold">{lang}</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36 p-1 shadow-lg">
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
              </DropdownMenuContent>
            </DropdownMenu>

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

            {/* Mobile Categories - Commodities */}
            <div className="mt-4 border-t border-border/60 pt-3">
              <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Wheat className="h-3.5 w-3.5 text-accent" /> Buy Commodities
              </p>
              <div className="mt-1 grid grid-cols-2 gap-1 px-1">
                {BUY_COMMODITIES.map((commodity) => (
                  <Link
                    key={commodity.id}
                    to="/shop"
                    search={{ item: commodity.id }}
                    onClick={() => setOpen(false)}
                    className="truncate rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    {commodity.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Categories - Machinery */}
            <div className="mt-4 border-t border-border/60 pt-3">
              <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Tractor className="h-3.5 w-3.5 text-accent" /> Machinery
              </p>
              <div className="mt-1 flex flex-col gap-0.5 px-1">
                {MACHINERY.map((item) => (
                  <Link
                    key={item.id}
                    to="/shop"
                    search={{ item: item.id }}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Categories - Partner */}
            <div className="mt-4 border-t border-border/60 pt-3">
              <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Handshake className="h-3.5 w-3.5 text-accent" /> Partner Options
              </p>
              <div className="mt-1 flex flex-col gap-1 px-1">
                {PARTNER_OPTIONS.map((option) => (
                  <Link
                    key={option.label}
                    to="/partner"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <span className="block font-semibold text-foreground">{option.label}</span>
                    <span className="block text-[11px] text-muted-foreground">{option.description}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Language Selector & Call-to-Action */}
            <div className="mt-6 border-t border-border/60 pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between px-2">
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
              </div>

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