"use client";

import Image from "next/image";
import SectionDivider from "./shared/SectionDivider";
import { useTheme } from "../context/ThemeContext";

export default function NoirHomePreview() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`py-1 border-t transition-colors duration-300 ${
        isDark
          ? "bg-black border-white/10"
          : "bg-white border-black/10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-1">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <SectionDivider title="Noir Home" />
          <p
            className={`max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Crafted to elevate your space, Noir Home introduces a refined range
            of luxury candles designed to create warmth, calm, and ambience.
          </p>
        </div>

        {/* Candle Collections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Classic Glass */}
          <div className="group text-center">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/candle-crystal1.jpg"
                alt="Classic Glass Candle"
                width={400}
                height={400}
                className="mx-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-6 text-xl font-serif text-[#d4af37]">
              Classic Glass Collection
            </h3>
            <p
              className={`mt-2 text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Clean, minimal glass candles perfect for hotels, spas, and
              everyday luxury.
            </p>
          </div>

          {/* Matte Luxe */}
          <div className="group text-center">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/candle-matte.jpg"
                alt="Matte Luxe Candle"
                width={400}
                height={400}
                className="mx-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-6 text-xl font-serif text-[#d4af37]">
              Matte Luxe Collection
            </h3>
            <p
              className={`mt-2 text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Soft pastel tones with a modern aesthetic, crafted for refined
              gifting.
            </p>
          </div>

          {/* Crystal Cut */}
          <div className="group text-center">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/candle-crystal1.jpg"
                alt="Crystal Cut Candle"
                width={400}
                height={400}
                className="mx-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-6 text-xl font-serif text-[#d4af37]">
              Crystal Cut Collection
            </h3>
            <p
              className={`mt-2 text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Faceted crystal designs that bring a statement of elegance and
              warmth to any space.
            </p>
          </div>

        </div>

        {/* Soft CTA */}
        <div className="text-center mt-20">
          <p
            className={`mb-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Available in gel wax and soya wax variants with refined fragrances.
          </p>
          <span className="inline-block text-sm tracking-widest text-[#d4af37] uppercase">
            Coming Soon
          </span>
        </div>

      </div>
    </section>
  );
}
