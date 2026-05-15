"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function TheHouseClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sections = gsap.utils.toArray(".fade-in-section");
    sections.forEach((section: any) => {
      gsap.fromTo(section,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%" }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#0A0A0A] pt-32 pb-20 overflow-hidden">

      {/* 1. Intro */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 fade-in-section">
        <div className="space-y-8 order-2 lg:order-1">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter">The House</h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg font-light italic">
            {t.theHouse.intro}
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full order-1 lg:order-2">
          <Image src="/images/signature-night.jpg" alt="The House of Noir" fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
      </section>

      {/* 2. Philosophy */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40 fade-in-section">
        <div className="text-center mb-24">
          <span className="text-[#D4AF37] tracking-[0.4em] text-[10px] uppercase font-bold mb-4 block">{t.theHouse.etherealLabel}</span>
          <h2 className="font-serif text-4xl md:text-6xl">{t.theHouse.philosophy}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-[#111] p-10 md:p-20 flex flex-col justify-center space-y-6">
            <h3 className="font-serif text-3xl text-[#D4AF37]">{t.theHouse.purityTitle}</h3>
            <p className="text-white/50 leading-relaxed font-light">{t.theHouse.purityDesc}</p>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-video">
            <Image src="/images/noir-pouch.png" alt={t.theHouse.purityTitle} fill className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative aspect-[4/3] lg:aspect-video order-2 lg:order-1">
            <Image src="/images/candle-1.jpg" alt={t.theHouse.nocturnalTitle} fill className="object-cover" />
          </div>
          <div className="bg-[#D4AF37]/5 p-10 md:p-20 flex flex-col justify-center space-y-6 order-1 lg:order-2 border border-[#D4AF37]/10">
            <h3 className="font-serif text-3xl text-[#D4AF37]">{t.theHouse.nocturnalTitle}</h3>
            <p className="text-white/50 leading-relaxed font-light">{t.theHouse.nocturnalDesc}</p>
          </div>
        </div>
      </section>

      {/* 3. Timeline */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-40 fade-in-section">
        <span className="text-[#D4AF37] tracking-[0.4em] text-[10px] uppercase font-bold mb-4 block">{t.theHouse.chronicle}</span>
        <h2 className="font-serif text-4xl md:text-6xl mb-20">{t.theHouse.decade}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-16">
            {([
              { label: t.theHouse.inceptionLabel,   desc: t.theHouse.inceptionDesc },
              { label: t.theHouse.refinementLabel,  desc: t.theHouse.refinementDesc },
              { label: t.theHouse.presentLabel,     desc: t.theHouse.presentDesc },
            ] as const).map((item, i) => (
              <div key={i} className="space-y-4 border-l border-[#D4AF37]/30 pl-8 relative">
                <div className="absolute top-0 left-[-4px] w-2 h-2 bg-[#D4AF37] rounded-full" />
                <span className="text-xs tracking-[0.3em] text-[#D4AF37] font-bold">{item.label}</span>
                <p className="text-white/60 leading-relaxed font-light italic">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] translate-y-12">
              <Image src="/images/signature-night.jpg" alt="Process" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4]">
              <Image src="/images/candle-2.jpg" alt="Atelier" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="text-center py-40 fade-in-section px-6">
        <h2
          className="font-serif text-5xl md:text-7xl mb-12 tracking-tighter"
          style={{
            background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #F9F295 70%, #D4AF37 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(212,175,55,0.5)) drop-shadow(0 0 80px rgba(212,175,55,0.2))",
          }}
        >
          {t.theHouse.cta}
        </h2>
        <Link href="/products" className="btn-gold px-12 py-5 inline-block">
          {t.theHouse.exploreCollections}
        </Link>
      </section>
    </div>
  );
}
