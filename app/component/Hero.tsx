"use client";

import HeroClient from "./HeroClient";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      
      {/* Background */}
      <div
        className="
          absolute inset-0
          bg-no-repeat bg-center
          bg-contain sm:bg-cover
          /* REMOVED: opacity-40 md:opacity-100 */
        "
        style={{
          backgroundImage: isDark
            ? "var(--hero-mobile-bg-dark)"
            : "var(--hero-mobile-bg-light)",
          // USE STYLE INSTEAD: This prevents the Tailwind class fight
          opacity: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.4 : 1
        }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? "bg-black/35" : "bg-white/20"
        }`}
      />

      <HeroClient />
    </section>
  );
}
