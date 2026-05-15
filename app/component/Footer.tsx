"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-32 pb-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand & Contact */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#D4AF37] mb-4">Noir Essence</h2>
              <p className="text-[10px] tracking-widest text-white/40 uppercase">Elt. Archers. Auter — Noir</p>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-light text-white/60">Concierge: +91 94140 82182</p>
              <p className="text-xs font-light text-white/60">Inquiries: maison@noiressence.com</p>
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37]">The House</h4>
            <ul className="space-y-4">
              {["The Jaipur Heritage", "Master Perfumery", "Sustainable Noir", "Alumni"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-xs font-light text-white/50 hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37]">Services</h4>
            <ul className="space-y-4">
              {["Terms of Service", "Shipping & Returns", "Fragrance Registry", "Stockists"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-xs font-light text-white/50 hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
            © 2026 Noir Essence. Established in Jaipur.
          </p>
          <div className="flex gap-8">
            {["Instagram", "Twitter", "Email"].map((link) => (
              <Link key={link} href="#" className="text-[8px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
