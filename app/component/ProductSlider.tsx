"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "./shared/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

export default function ProductTrain() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      if (!track || !trigger) return;

      const getScrollLength = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScrollLength(),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          // Start when the top of the container hits the top of the viewport
          start: "top top", 
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    /* 1. Added -mt-[150px] (adjust value as needed) to pull the section UP.
       2. Added pt-[150px] to keep the content inside visually aligned.
    */
    <div 
      ref={triggerRef} 
      className="overflow-hidden bg-theme -mt-[100px] pt-[100px]"
    >
      <section
        className="relative flex flex-col justify-center w-full"
        style={{ height: "70vh" }}
      >
        {/* Heading: Positioned high up to overlap the previous section */}
        <div className="absolute top-[-5vh] w-full text-center z-20">
          <SectionDivider title=" Our Signature Collection" />
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-24 p-[1vw] will-change-transform"
          style={{ width: "max-content" }}
        >
          {PRODUCTS.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center w-[340px] mt-13"
            >
              <div className="relative w-[340px] h-[350px]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="rounded-xl shadow-2xl object-contain"
                  sizes="340px"
                  priority={i < 2}
                />
              </div>
              <h3 className="mt-8 text-2xl font-serif text-white">{p.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const PRODUCTS = [
  { title: "Signature Night", img: "/images/signature-night.png" },
  { title: "Cool Wave", img: "/images/bottle-blue.png" },
  { title: "Classic Blue", img: "/images/man.png" },
  { title: "Noir", img: "/images/noir-perfume.png" },
  { title: "Noir", img: "/images/noir-perfume.png" },
];