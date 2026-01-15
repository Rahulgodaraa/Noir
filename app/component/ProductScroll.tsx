"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

export default function ProductScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 1. Explicitly type ctx to avoid build errors
    let ctx: any;
    let mounted = true;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.gsap;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Prevent execution if component unmounted during import
      if (!mounted || !ref.current) return;

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".product-card");

        // 2. Initial state for each specifically
        // Using index to match your logic: Left, Right, Left
        if (cards[0]) gsap.set(cards[0], { x: -200, opacity: 0 });
        if (cards[1]) gsap.set(cards[1], { x: 200, opacity: 0 });
        if (cards[2]) gsap.set(cards[2], { x: -200, opacity: 0 });

        cards.forEach((card) => {
          gsap.to(card, {
            x: 0,
            opacity: 1,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%", // Adjusted from 30% so users see it sooner
              end: "bottom 60%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      }, ref);
    })();

    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={ref} className="space-y-[30vh] pb-20"> 
      {/* Reduced space-y slightly for better flow, added padding bottom */}
      
      {/* Product 1 - Left slide */}
      <div className="product-card flex flex-col items-center text-center px-4">
        <Image
          src="/images/signature-night.jpg"
          alt="Noir Signature Night Fragrance"
          width={450}
          height={600}
          className="rounded-xl shadow-lg object-cover"
        />
        <h3 className="text-2xl font-serif mt-6 text-[#d4af37]">Signature Night</h3>
        <p className="text-gray-300 max-w-md mt-3">
          Deep, sensual, long-lasting night fragrance for the modern connoisseur.
        </p>
      </div>

      {/* Product 2 - Right slide */}
      <div className="product-card flex flex-col items-center text-center px-4">
        <Image
          src="/images/bottle-blue.png"
          alt="Cool Wave Luxury Perfume"
          width={450}
          height={600}
          className="rounded-xl shadow-lg object-cover"
        />
        <h3 className="text-2xl font-serif mt-6 text-[#d4af37]">Cool Wave</h3>
        <p className="text-gray-300 max-w-md mt-3">
          Fresh aquatic fragrance perfect for everyday luxury and summer elegance.
        </p>
      </div>

      {/* Product 3 - Left slide */}
      <div className="product-card flex flex-col items-center text-center px-4">
        <Image
          src="/images/bottle-blue.png"
          alt="Classic Blue Essence"
          width={450}
          height={600}
          className="rounded-xl shadow-lg object-cover"
        />
        <h3 className="text-2xl font-serif mt-6 text-[#d4af37]">Classic Blue</h3>
        <p className="text-gray-300 max-w-md mt-3">
          Elegant, powerful, and timelessly masculine fragrance crafted in Jaipur.
        </p>
      </div>
    </div>
  );
}