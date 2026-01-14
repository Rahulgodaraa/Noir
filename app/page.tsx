"use client";

import { useLayoutEffect, useRef } from "react";
import Hero from "./component/Hero";
import AnimatedSection from "./component/AnimatedSection";
import ProductShowcase from "./component/ProductShowcase";
import NoirHomePreview from "./component/NoirHomePreview";
import ContactForm from "./component/ContactForm";
import Image from "next/image";
import { useTheme } from "./context/ThemeContext";

export default function Page() {
  const { theme } = useTheme();
  const universeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx;
    let gsap;
    let ScrollTrigger;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");

      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (textRef.current) {
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: universeRef.current,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true, // fades in/out as user scrolls up/down
              },
            }
          );
        }
      });
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
        className="max-w-6xl mx-auto mt-20 px-6 py-14 flex flex-col md:flex-row items-center gap-60"
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          {theme === "dark" ? (
            <Image
              alt="noir"
              width={300}
              height={300}
              src={"/images/white-logo.png"}
            />
          ) : (
            <Image
              alt="noir"
              width={300}
              height={300}
              src={"/images/Logo.png"}
            />
          )}
        </div>

        {/* Text */}
        <div ref={textRef} className=" text-center md:text-left">
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

      {/* 5. Contact */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <ContactForm />
      </section>

    </main>
  );
}
