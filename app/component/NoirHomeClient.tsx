"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Hero from "./Hero";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const PERFUMES_PREVIEW = [
  { id: 1,  name: "Sabaya",    category: "Extrait De Parfum", price: "₹699", image: "/new/sabya.png" },
  { id: 2,  name: "Seduction", category: "Extrait De Parfum", price: "₹599", image: "/new/4.png" },
  { id: 10, name: "Swag",      category: "Extrait De Parfum", price: "₹899", image: "/new/12.jpeg" },
];

const CANDLES_PREVIEW = [
  { id: 12, name: "Matte Luxe", category: "Soy Wax Candle", price: "₹649", image: "/images/candle-2.jpg" },
  { id: 11, name: "Glass Noir", category: "Gel Wax Candle",  price: "₹599", image: "/images/candle-1.jpg" },
];

export default function NoirHomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] text-white">
      <Hero />

      {/* ── Section 1: Vision ── */}
      <section className="py-20 md:py-36 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="fade-up mb-10 md:mb-16">
            <span className="text-[#D4AF37] tracking-[0.4em] text-[9px] uppercase font-bold border-l-2 border-[#D4AF37] pl-4 block">
              {t.home.visionLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-24 items-start">
            <div className="space-y-10 md:space-y-14">
              <h2 className="fade-up font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-none tracking-tighter">
                {t.home.visionHeading1}<br />
                <em className="text-[#D4AF37] not-italic">{t.home.visionHeading2}</em>.
              </h2>

              <p className="fade-up text-white/55 text-base md:text-lg leading-relaxed font-light max-w-md">
                {t.home.visionQuote}
              </p>

              <div className="fade-up grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                {([
                  { title: t.home.pillar1Title, desc: t.home.pillar1Desc },
                  { title: t.home.pillar2Title, desc: t.home.pillar2Desc },
                ] as const).map((item, i) => (
                  <div key={i} className="space-y-3">
                    <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.35em] font-bold">0{i + 1}</span>
                    <h4 className="text-white text-base md:text-lg font-serif leading-snug">{item.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up relative w-full max-w-[420px] mx-auto lg:mx-0">
              <div className="absolute top-8 left-8 right-0 bottom-0 bg-[#111] border border-[#D4AF37]/10 overflow-hidden">
                <Image src="/images/noir-pouch.png" alt="Noir Pouch" fill
                  className="object-cover opacity-50" sizes="(max-width: 768px) 80vw, 40vw" />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden border border-white/5">
                <Image src="/images/noir-pouch.png" alt="Noir Essence Brand" fill
                  className="object-cover" sizes="(max-width: 768px) 80vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-serif text-2xl text-white/90 leading-snug">{t.home.imageCaption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Fragrances ── */}
      <section className="py-20 md:py-36 bg-[#080808] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-14 md:mb-20">
            <div className="fade-up space-y-3">
              <span className="text-[#D4AF37] tracking-[0.4em] text-[9px] uppercase font-bold block">{t.home.fragranceLabel}</span>
              <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tighter">{t.home.fragranceHeading}</h2>
            </div>
            <Link href="/products?category=perfume"
              className="fade-up flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-[#D4AF37] transition-colors duration-500 group">
              {t.home.viewAllFragrances}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {PERFUMES_PREVIEW.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="fade-up group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-4">
                  <Image src={product.image} alt={product.name} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[#D4AF37] text-[9px] font-bold tracking-widest">{product.price}</span>
                  </div>
                </div>
                <div className="space-y-1 px-1">
                  <p className="text-[8px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">{product.category}</p>
                  <h3 className="font-serif text-xl md:text-2xl group-hover:text-[#D4AF37] transition-colors duration-500">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Candles ── */}
      <section className="py-20 md:py-36">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-24 items-center">
            <div className="space-y-8 md:space-y-10">
              <div className="fade-up space-y-4">
                <span className="text-[#D4AF37] tracking-[0.4em] text-[9px] uppercase font-bold border-l-2 border-[#D4AF37] pl-4 block">
                  {t.home.candleLabel}
                </span>
                <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tighter leading-none">
                  {t.home.candleHeading1}<br />{t.home.candleHeading2}
                </h2>
              </div>
              <p className="fade-up text-white/55 text-base md:text-lg leading-relaxed font-light max-w-md">
                {t.home.candleDesc}
              </p>
              <div className="fade-up grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                {([
                  { label: t.home.soyLabel, desc: t.home.soyDesc },
                  { label: t.home.gelLabel, desc: t.home.gelDesc },
                ] as const).map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-white text-sm md:text-base font-serif">{item.label}</h4>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/products?category=candle"
                className="fade-up inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] border border-[#D4AF37]/30 px-8 py-4 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37] transition-all duration-500 group">
                {t.home.viewAllCandles}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="fade-up grid grid-cols-2 gap-4 md:gap-6">
              {CANDLES_PREVIEW.map((candle, i) => (
                <Link key={candle.id} href={`/products/${candle.id}`} className="group block">
                  <div className={`relative overflow-hidden bg-[#111] mb-3 ${i === 0 ? "aspect-[2/3] translate-y-6" : "aspect-[2/3]"}`}>
                    <Image src={candle.image} alt={candle.name} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 45vw, 20vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1">{candle.category}</p>
                      <p className="font-serif text-lg text-white leading-tight">{candle.name}</p>
                    </div>
                  </div>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 px-1">{candle.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Final CTA ── */}
      <section className="py-28 md:py-44 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <Image src="/images/signature-night.jpg" alt="" fill className="object-cover opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-5 text-center space-y-8 md:space-y-12">
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold border border-[#D4AF37]/20 px-5 py-2 rounded-full inline-block">
            {t.home.ctaLabel}
          </span>
          <h2 className="fade-up font-serif text-5xl md:text-7xl font-light tracking-tighter leading-none">
            {t.home.ctaHeading1}<br />
            <em className="text-[#D4AF37] not-italic">{t.home.ctaHeading2}</em>
          </h2>
          <p className="fade-up text-white/40 text-sm md:text-lg leading-relaxed font-light italic">
            "{t.home.ctaQuote}"
          </p>
          <Link href="/products"
            className="fade-up inline-flex items-center gap-3 text-[#D4AF37] tracking-[0.4em] text-[10px] uppercase font-bold py-4 px-10 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-500 group">
            {t.home.ctaButton}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
