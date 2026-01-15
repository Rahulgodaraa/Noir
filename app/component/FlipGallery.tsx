"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

export default function FlipGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    let ctx: any;

    const initFlip = async () => {
      try {
        // 1. Load GSAP and ScrollTrigger normally
        const gsapModule = await import("gsap");
        const stModule = await import("gsap/ScrollTrigger");
        
        const gsap = gsapModule.gsap;
        const ScrollTrigger = stModule.ScrollTrigger;
        
        // 2. Bypass TypeScript casing check using require + any
        // This is the "Silver Bullet" for the Windows Flip error
        const flipModule: any = require("gsap/flip");
        const Flip = flipModule.Flip;

        gsap.registerPlugin(ScrollTrigger, Flip);

        const gallery = galleryRef.current;
        if (!gallery || !sectionRef.current) return;

        const items = gsap.utils.toArray<HTMLElement>(
          gallery.querySelectorAll(".gallery-item")
        );

        ctx = gsap.context(() => {
          gsap.set(items, { opacity: 1 });

          // Capture FINAL layout state
          gallery.classList.add("gallery--final");
          const state = Flip.getState(items);
          gallery.classList.remove("gallery--final");

          const flipAnim = Flip.to(state, {
            ease: "expoScale(1, 5)",
            simple: true,
            absolute: true,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "center center",
              end: "+=120%",
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.add(flipAnim);

          // Hide non-primary images
          tl.to(items.slice(1), {
            opacity: 0,
            duration: 0.2,
            ease: "power1.out",
          }, ">-0.1");
        }, sectionRef);
      } catch (err) {
        console.warn("GSAP Flip failed to load:", err);
      }
    };

    initFlip();

    return () => ctx?.revert();
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <div
        ref={galleryRef}
        className="gallery grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center w-full h-full px-10"
      >
        <div className="gallery-item z-10">
          <Image
            src="/images/candle-matte.jpg"
            alt="Noir Signature Night Candle"
            width={420}
            height={420}
            className="rounded-xl object-cover shadow-2xl"
          />
        </div>

        <div className="gallery-item">
          <Image
            src="/images/signature-night.jpg"
            alt="Luxury Fragrance Bottle"
            width={420}
            height={420}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="gallery-item">
          <Image
            src="/images/bottle-blue.png"
            alt="Classic Blue Essence"
            width={420}
            height={420}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="gallery-item">
          <Image
            src="/images/candle-glass.jpg"
            alt="Noir Essence Glass Candle"
            width={420}
            height={420}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}