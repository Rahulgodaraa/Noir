"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function HeroClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: isMobile ? 20 : 0, scale: isMobile ? 1 : 1.05 },
      { opacity: 1, y: 0, scale: 1, duration: isMobile ? 0.8 : 1.8 }
    ).fromTo(
      ".hero-reveal",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
      "-=0.8"
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Ambient — desktop only */}
      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none">
        <Image src="/images/signature-night.jpg" alt="" fill
          className="object-cover opacity-[0.06] blur-3xl scale-110" aria-hidden />
      </div>

      {/* Ghost wordmark — desktop only */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden hidden md:flex">
        <span className="font-serif text-[18vw] font-light text-white/[0.02] tracking-tighter uppercase select-none whitespace-nowrap">
          Noir Essence
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-5 pt-28 pb-10 md:pt-0 md:pb-0">
        <div className="hero-reveal mb-8 md:mb-10">
          <span className="text-[#D4AF37] tracking-[0.5em] text-[7px] md:text-[8px] uppercase font-bold">
            {t.hero.eyebrow}
          </span>
        </div>

        <div ref={imageRef} className="relative w-full max-w-[260px] md:max-w-[420px] aspect-[3/4] z-10">
          <Image
            src="/images/signature-night.jpg"
            alt={t.hero.productName}
            fill
            className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            priority
            sizes="(max-width: 768px) 260px, 420px"
          />
        </div>

        <div className="hero-reveal mt-[-20px] md:mt-[-40px] relative z-20 flex flex-col items-center w-full">
          <h2
            className="font-serif text-3xl md:text-5xl mb-2 md:mb-4"
            style={{
              background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #F9F295 70%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(212,175,55,0.45)) drop-shadow(0 0 60px rgba(212,175,55,0.2))",
            }}
          >
            {t.hero.productName}
          </h2>
          <p className="text-white/35 text-[8px] md:text-[10px] uppercase tracking-[0.35em] font-light mb-8 md:mb-10">
            {t.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full max-w-xs sm:max-w-none sm:w-auto">
            <Link href="/products" className="btn-gold px-10 py-4 text-center text-[10px]">
              {t.hero.discover}
            </Link>
            <Link href="/the-house" className="btn-outline px-10 py-4 text-center text-[10px]">
              {t.hero.theHouse}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 opacity-20">
        <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>
    </div>
  );
}