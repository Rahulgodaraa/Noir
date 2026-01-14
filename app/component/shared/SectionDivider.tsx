"use client";

import { useLayoutEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

type SectionDividerProps = {
  title: string;
};

export default function SectionDivider({ title }: SectionDividerProps) {
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    let ctx: any;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.gsap;
      const ScrollTrigger = stModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          [leftLineRef.current, rightLineRef.current],
          { opacity: 0 },
          {
            opacity: 0.3,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            },
          }
        );

        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            },
          }
        );
      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  const lineColor =
    theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";

  const textColor =
    theme === "dark" ? "#d4af37" : "rgba(0,0,0,0.85)";

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center gap-6 my-10 px-6"
    >
      {/* Left Line */}
      <div
        ref={leftLineRef}
        className="flex-1 h-px"
        style={{ backgroundColor: lineColor }}
      />

      {/* Title */}
      <h3
        ref={textRef}
        className="text-xs md:text-sm tracking-widest uppercase whitespace-nowrap"
        style={{ color: textColor }}
      >
        {title}
      </h3>

      {/* Right Line */}
      <div
        ref={rightLineRef}
        className="flex-1 h-px"
        style={{ backgroundColor: lineColor }}
      />
    </div>
  );
}
