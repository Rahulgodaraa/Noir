"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useLanguage, LANGUAGES, type Language } from "@/app/context/LanguageContext";
import { useCart } from "@/app/hooks/useCart";

export default function NavbarClient() {
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { cart } = useCart();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  const navLinks = [
    { key: "atelier",     path: "/" },
    { key: "collections", path: "/products" },
    { key: "theHouse",    path: "/the-house" },
  ];

  const currentLang = LANGUAGES.find(l => l.code === language)!;
  const cartCount = cart.length;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "py-4 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5"
            : "py-5 md:py-8 bg-transparent"
        }`}
      >
        <nav className="max-w-[1500px] mx-auto px-5 md:px-12 flex items-center justify-between">

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -ml-2 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen
              ? <X className="w-5 h-5 text-white" />
              : <Menu className="w-5 h-5 text-white/70" />
            }
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 z-50">
            <h1 className="font-serif text-base md:text-lg tracking-[0.15em] md:tracking-[0.2em] uppercase text-white hover:text-[#D4AF37] transition-colors duration-500 font-light whitespace-nowrap">
              Noir Essence
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-12">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.path}
                    className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-[#D4AF37] transition-colors duration-500"
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 md:gap-3 relative z-50">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 flex items-center gap-1.5 group"
                aria-label="Select language"
              >
                <Globe className="w-[15px] h-[15px] text-white/50 group-hover:text-[#D4AF37] transition-colors" />
                <span className="hidden md:block text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-[#D4AF37] transition-colors font-bold">
                  {currentLang.code.toUpperCase()}
                </span>
              </button>

              {/* Dropdown */}
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-[100]" onClick={() => setIsLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-44 bg-[#111] border border-white/10 shadow-2xl z-[101] overflow-hidden">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code as Language); setIsLangOpen(false); }}
                        className={`w-full px-5 py-3.5 flex items-center justify-between text-left transition-colors ${
                          language === lang.code
                            ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                        dir={lang.dir}
                      >
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{lang.label}</span>
                        <span className="text-xs opacity-60">{lang.nativeLabel}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5] text-white/60 hover:text-[#D4AF37] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#D4AF37] text-black text-[7px] font-bold flex items-center justify-center rounded-full">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 bg-[#0A0A0A] z-40 lg:hidden flex flex-col items-center justify-center transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.key}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-serif text-4xl text-white/80 hover:text-[#D4AF37] transition-all duration-300 ${
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {t.nav[link.key as keyof typeof t.nav]}
            </Link>
          ))}

          {/* Mobile language switcher */}
          <div className="flex gap-4 pt-4">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as Language)}
                className={`text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-2 border transition-colors ${
                  language === lang.code
                    ? "border-[#D4AF37] text-[#D4AF37]"
                    : "border-white/10 text-white/30 hover:border-white/30 hover:text-white/60"
                }`}
              >
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] border border-[#D4AF37]/30 px-10 py-4 mt-2"
          >
            {t.nav.viewBag} ({cartCount})
          </button>
        </nav>

        <div className="absolute bottom-12 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">The Olfactory Avant-Garde</p>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
