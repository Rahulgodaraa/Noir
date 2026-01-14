"use client";

import HeroClient from "./HeroClient";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />

      {/* Overlay adapts to theme */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          isDark ? "bg-black/35" : "bg-white/20"
        }`}
      />

      {/* Content */}
      <HeroClient />
    </section>
  );
}
