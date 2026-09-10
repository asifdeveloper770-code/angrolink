import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logoAsset from "@/assets/agrilink-logo.jpeg";

export function Footer() {
  return (
    <footer className="surface-forest mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src={logoAsset}
              alt="AgriLink Kakuma LLC logo"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-primary-foreground/25"
            />
            <span className="font-display text-lg font-extrabold uppercase">AgriLink Kakuma</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/75">
            An agtech, logistics and market-intelligence social enterprise building resilient food
            corridors across Turkana County, Kenya.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/about" className="transition-colors hover:text-gold">
                About & Impact
              </Link>
            </li>
            <li>
              <Link to="/services" className="transition-colors hover:text-gold">
                Operational Pillars
              </Link>
            </li>
            <li>
              <Link to="/knowledge" className="transition-colors hover:text-gold">
                Knowledge Hub
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Engage</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/partner" className="transition-colors hover:text-gold">
                Partner With Us
              </Link>
            </li>
            <li>
              <Link to="/shop" className="transition-colors hover:text-gold">
                B2B Commodity Catalog
              </Link>
            </li>
            <li>
              <Link to="/cart" className="transition-colors hover:text-gold">
                Quote Cart
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="transition-colors hover:text-gold">
                Corporate Checkout
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Offices</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>Kakuma Town Trade Yard, Turkana West, Kenya</span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>Juba office ,South Sudan</span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>⁠New York, New York, United States.</span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>partnerships@agrilinkkakuma.co.ke</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>+254 700 482 119</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-primary-foreground/65 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} AgriLink Kakuma LLC. All rights reserved.</p>
          <p>Registered social enterprise · Turkana County, Kenya · New York, New York, USA</p>
        </div>
      </div>
    </footer>
  );
}
