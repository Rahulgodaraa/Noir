"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

export default function AnimatedSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    let ctx;
    let gsap, ScrollTrigger;

    let mounted = true;

    (async () => {
      // dynamic imports reduce initial bundle and load only when component mounts
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsap = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!mounted || !rootRef.current) return;

      ctx = gsap.context(() => {
        // fade-up animation for children with class "fade-up"
        gsap.from(".fade-up", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            // toggleActions: "play none none reverse",
          },
        });

        // subtle parallax for image
        gsap.to(".parallax-img", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }, rootRef);

    })();

    return () => {
      mounted = false;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="px-6 py-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="fade-up text-4xl font-serif text-[#d4af37]">Crafted with Precision</h2>
        <p className="fade-up mt-4 text-gray-300">Every fragrance is crafted with meticulous precision, rare ingredients, and a deep understanding of emotions. Our perfumes are more than scents—they are experiences designed to elevate personality, confidence, and presence.</p>
        <ul className="mt-6 space-y-2">
          <li className="fade-up text-gray-300">Timeless French perfumery with Indian sophistication.</li>
          <li className="fade-up text-gray-300">Long lasting projection and balanced formulas.</li>
          <li className="fade-up text-gray-300">Proudly made in Jaipur, India.</li>
        </ul>
      </div>

      <div className="relative">
        <div className="parallax-img will-change-transform">
          <Image src="/images/noir-pouch.png" alt="pouch" width={700} height={700} className="rounded object-cover" />
        </div>
      </div>
    </section>
  );
}
