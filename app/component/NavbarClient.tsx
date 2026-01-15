"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

export default function NavbarClient() {
  const navRef = useRef<HTMLElement | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 🆕 Track mobile menu state

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    let ctx: any;
    (async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.gsap;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.1 });
        tl.from(".nav-logo", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(".nav-link", { y: -20, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.12 }, "-=0.4")
          .from(".nav-cta", { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
      }, navRef);
    })();

    return () => ctx?.revert();
  }, [mounted]);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-colors border-b"
      style={{
        background: "color-mix(in srgb, var(--background) 85%, transparent)",
        borderColor: "color-mix(in srgb, var(--border) 20%, transparent)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Always visible and clickable to go Home */}
        <Link href="/" className="nav-logo block">
          <Image
            alt="Noir"
            width={80}
            height={32}
            src={isDark ? "/images/white-logo.png" : "/images/Logo.png"}
            priority
          />
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <ul className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase">
          <li className="nav-link"><Link href="/" className="hover:text-[#d4af37] transition">Home</Link></li>
          <li className="nav-link"><Link href="/products" className="hover:text-[#d4af37] transition">Fragrances</Link></li>
          <li className="nav-link"><Link href="/contact" className="hover:text-[#d4af37] transition">Contact</Link></li>
        </ul>

        {/* Actions & Mobile Toggle */}
        <div className="nav-cta flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-[10px] uppercase tracking-tighter px-3 py-2 rounded-full border border-gray-500/30 hover:bg-[#d4af37] hover:text-black transition"
          >
            {isDark ? "Light" : "Dark"}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-[60]"
          >
            <span className={`h-0.5 w-6 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-6 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          <Link
            href="/products"
            className="hidden sm:block text-xs uppercase tracking-widest px-5 py-2 rounded-full bg-[#d4af37] text-black font-bold"
          >
            Explore
          </Link>
        </div>
      </nav>

      {/* 🆕 Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 h-screen w-full transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 text-2xl font-serif z-[55] ${
          menuOpen ? "opacity-100 pointer-events-auto backdrop-blur-xl" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "var(--background)" }}
      >
        <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-[#d4af37]">Home</Link>
        <Link href="/products" onClick={() => setMenuOpen(false)} className="hover:text-[#d4af37]">Fragrances</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#d4af37]">Contact</Link>
        <Link 
          href="/products" 
          onClick={() => setMenuOpen(false)}
          className="mt-4 text-sm px-8 py-3 bg-[#d4af37] text-black uppercase tracking-widest font-bold rounded-full"
        >
          Explore Collection
        </Link>
      </div>
    </header>
  );
}