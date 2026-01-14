"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

export default function ProductScroll() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    let ctx;
    let gsap, ScrollTrigger;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");

      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!ref.current) return;

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray(".product-card");

        // Initial state for all
        gsap.set(cards[0], { x: -200, opacity: 0 }); // Left in
        gsap.set(cards[1], { x: 200, opacity: 0 });  // Right in
        gsap.set(cards[2], { x: -200, opacity: 0 }); // Left in again

        // Single product scroll animation
        cards.forEach((card, i) => {
          gsap.to(card, {
            x: 0,
            opacity: 1,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 30%",
              end: "bottom 60%",
              scrub: true,
            },
          });
        });

      }, ref);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref} className="space-y-[70vh]">
      
      {/* Product 1 - Left slide */}
      <div className="product-card flex flex-col items-center text-center">
        <Image
          src="/images/signature-night.jpg"
          alt="Signature Night"
          width={450}
          height={600}
          className="rounded-xl shadow-lg"
        />
        <h3 className="text-2xl font-serif mt-6 text-[#d4af37]">Signature Night</h3>
        <p className="text-gray-300 max-w-md mt-3">
          Deep, sensual, long-lasting night fragrance.
        </p>
      </div>

      {/* Product 2 - Right slide */}
      <div className="product-card flex flex-col items-center text-center">
        <Image
          src="/images/bottle-blue.png"
          alt="Cool Wave"
          width={450}
          height={600}
          className="rounded-xl shadow-lg"
        />
        <h3 className="text-2xl font-serif mt-6 text-[#d4af37]">Cool Wave</h3>
        <p className="text-gray-300 max-w-md mt-3">
          Fresh aquatic fragrance perfect for everyday luxury.
        </p>
      </div>

      {/* Product 3 - Left slide */}
      <div className="product-card flex flex-col items-center text-center">
        <Image
          src="/images/bottle-blue.png"
          alt="Classic Blue"
          width={450}
          height={600}
          className="rounded-xl shadow-lg"
        />
        <h3 className="text-2xl font-serif mt-6 text-[#d4af37]">Classic Blue</h3>
        <p className="text-gray-300 max-w-md mt-3">
          Elegant, powerful, and timelessly masculine.
        </p>
      </div>

    </div>
  );
}
