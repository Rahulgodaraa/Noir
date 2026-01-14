"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function HeroClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useLayoutEffect(() => {
    let ctx: any;
    let gsap: any;

    (async () => {
      const gsapModule = await import("gsap");
      gsap = gsapModule.gsap;

      ctx = gsap.context(() => {
        gsap
          .timeline({ delay: 0.3 })
          .from(".hero-line", {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.15,
          })
          .from(
            ".hero-sub",
            {
              y: 20,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.5"
          )
          .from(
            ".hero-btn",
            {
              y: 15,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.4"
          );
      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 h-full w-full flex items-center"
    >
      <div
        className={`
          w-full max-w-6xl mx-auto
          px-6 sm:px-8 md:px-12
          text-center md:text-left
          ${isDark ? "text-white" : "text-black"}
        `}
      >
        {/* Headline */}
        <h1 className="font-light leading-tight">
          <span className="block hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Wrap Yourself
          </span>
          <span className="block hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            in Noir Elegance
          </span>
        </h1>

        {/* Sub text */}
        <p
          className={`
            hero-sub mt-6 mx-auto md:mx-0
            max-w-xl text-base sm:text-lg
            ${isDark ? "text-white/80" : "text-black/70"}
          `}
        >
          A seductive blend of freshness and depth — crafted to elevate
          presence, confidence, and timeless sophistication.
        </p>

        {/* CTA */}
        <div className="hero-btn mt-8 sm:mt-10 flex justify-center md:justify-start">
          <Link
            href="/products"
            className={`
              px-7 sm:px-8 py-3 sm:py-4
              rounded-full border text-sm sm:text-base
              transition-all duration-300
              ${
                isDark
                  ? "border-white/40 hover:bg-white hover:text-black"
                  : "border-black/30 hover:bg-black hover:text-white"
              }
            `}
          >
            View Our Collections →
          </Link>
        </div>
      </div>
    </div>
  );
}
