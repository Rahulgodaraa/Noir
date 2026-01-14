"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

export default function NavbarClient() {
  const navRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useLayoutEffect(() => {
    let ctx;
    let gsap;

    (async () => {
      const gsapModule = await import("gsap");
      gsap = gsapModule.gsap;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.from(".nav-logo", {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
          .from(
            ".nav-link",
            {
              y: -20,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.12,
            },
            "-=0.4"
          )
          .from(
            ".nav-cta",
            {
              y: -20,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.3"
          );
      }, navRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-colors"
      style={{
        background: "color-mix(in srgb, var(--background) 85%, transparent)",
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between"
        style={{ color: "var(--foreground)" }}
      >
        {/* Logo */}
        <div className="nav-logo text-xl font-serif tracking-wide">
          {theme === "dark" ? (
            <Image
              alt="noir"
              width={100}
              height={100}
              src={"/images/white-logo.png"}
            />
          ) : (
            <Image
              alt="noir"
              width={100}
              height={100}
              src={"/images/Logo.png"}
            />
          )}
        </div>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide">
          <li className="nav-link">
            <Link href="/">Home</Link>
          </li>
          <li className="nav-link">
            <Link href="/products">Fragrances</Link>
          </li>
          <li className="nav-link">
            <Link href="/about">About</Link>
          </li>
          <li className="nav-link">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-cta flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xs tracking-wide px-4 py-2 rounded-full border transition"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            {theme === "dark" ? "Light Mode" : "Night Mode"}
          </button>

          {/* CTA */}
          <Link
            href="/products"
            className="text-sm px-5 py-2 rounded-full border transition"
            style={{
              borderColor: "var(--border)",
            }}
          >
            Explore
          </Link>
        </div>
      </nav>
    </header>
  );
}
