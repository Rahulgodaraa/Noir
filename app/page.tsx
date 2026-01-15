"use client";

import { useLayoutEffect, useRef } from "react";
import Hero from "./component/Hero";
import AnimatedSection from "./component/AnimatedSection";
import ProductShowcase from "./component/ProductShowcase";
import NoirHomePreview from "./component/NoirHomePreview";
import Image from "next/image";
import { useTheme } from "./context/ThemeContext";
import SectionDivider from "./component/shared/SectionDivider";

export default function Page() {
  const { theme } = useTheme();
  const universeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  let ctx: any;

  (async () => {
    const gsapModule = await import("gsap");
    const stModule = await import("gsap/ScrollTrigger");
    const gsap = gsapModule.gsap;
    const ScrollTrigger = stModule.ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            immediateRender: false, 
            scrollTrigger: {
              trigger: universeRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
              // Adding markers: true during dev can help you see 
              // if the start/end positions are jumping
            },
          }
        );
      }
    });

    // CRITICAL: Refresh must happen AFTER the context/animations are created
    ScrollTrigger.refresh();
  })();

  return () => ctx?.revert();
}, []);
  return (
    <main className="min-h-screen overflow-x-hidden bg-theme text-theme">

      {/* 1. Hero */}
      <Hero />

      <AnimatedSection />

      {/* 2. Fragrances */}
      <section className="py-2">
        <ProductShowcase />
      </section>

      {/* 3. Product Universe */}
      <section
        ref={universeRef}
        className="max-w-6xl mx-auto mt-20 px-6 py-14 flex flex-col md:flex-row items-center gap-16 md:gap-60"
      >
        {/* ✅ Desktop Logo Only */}
        <div className="hidden md:flex flex-shrink-0">
          <Image
            alt="noir"
            width={200}
            height={200}
            src={
              theme === "dark"
                ? "/images/white-logo.png"
                : "/images/Logo.png"
            }
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="text-center md:text-left">
          {/* ✅ Mobile-only divider */}
          <div className="block md:hidden mb-6">
            <SectionDivider title="NOIR UNIVERSE" />
          </div>

          <h2
            className="text-3xl font-serif mb-4"
            style={{ color: "var(--accent)" }}
          >
            The Noir Universe
          </h2>

          <p className="max-w-2xl text-lg opacity-80">
            From signature fragrances to refined home candles, Noir Essence
            creates sensory experiences designed to elevate both presence and space.
          </p>
        </div>
      </section>

      {/* 4. Candles */}
      <section
        className="py-12"
        style={{
          background: "color-mix(in srgb, var(--background) 95%, black)",
        }}
      >
        <NoirHomePreview />
      </section>

    </main>
  );
}
