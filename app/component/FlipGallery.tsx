"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

export default function FlipGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    let ctx: any;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { Flip } = await import("gsap/Flip");

      gsap.registerPlugin(ScrollTrigger, Flip);

      const gallery = galleryRef.current;
      if (!gallery) return;

      const items = gsap.utils.toArray<HTMLElement>(
        gallery.querySelectorAll(".gallery-item")
      );

      ctx = gsap.context(() => {
        // Initial visibility
        gsap.set(items, { opacity: 1 });

        // Capture FINAL layout
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
          },
        });

        tl.add(flipAnim);

        // 🔑 Hide non-primary images AFTER layout settles
        tl.to(
          items.slice(1),
          {
            opacity: 0,
            duration: 0.2,
            ease: "power1.out",
          },
          ">-0.1"
        );
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      <div
        ref={galleryRef}
        id="gallery-8"
        className="gallery grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center"
      >
        <div className="gallery-item z-10">
          <Image
            src="/images/candle-matte.jpg"
            alt="Noir Signature Night"
            width={420}
            height={420}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="gallery-item">
          <Image
            src="/images/signature-night.jpg"
            alt="Cool Wave"
            width={420}
            height={420}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="gallery-item">
          <Image
            src="/images/bottle-blue.png"
            alt="Classic Blue"
            width={420}
            height={420}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="gallery-item">
          <Image
            src="/images/candle-glass.jpg"
            alt="Noir Essence"
            width={420}
            height={420}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
