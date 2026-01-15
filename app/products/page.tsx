"use client";

import { useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { openWhatsApp } from "@/app/component/openWhatsApp";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

// Define a Product interface for strict typing
interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Signature Night", category: "perfume", description: "A bold, seductive fragrance with deep woody and amber notes for evenings.", image: "/images/signature-night.png" },
  { id: 2, name: "Cool Wave", category: "perfume", description: "Fresh aquatic notes blended with cool blue accords for daily wear.", image: "/images/bottle-blue.png" },
  { id: 3, name: "Classic Blue", category: "perfume", description: "Timeless masculine freshness with a clean and confident finish.", image: "/images/man.png" },
  { id: 4, name: "Noir", category: "perfume", description: "Dark, intense notes crafted for a mysterious and premium feel.", image: "/images/noir-perfume.png" },
  { id: 5, name: "Luxury Candle", category: "candle", description: "Warm aromatic candle crafted for calm and relaxation.", image: "/images/candle-image.png" },
  { id: 6, name: "Luxury Candle", category: "candle", description: "Warm aromatic candle crafted for calm and relaxation.", image: "/images/candle-matte.jpg" },
  { id: 7, name: "Luxury Candle", category: "candle", description: "Warm aromatic candle crafted for calm and relaxation.", image: "/images/candle-matte1.jpg" },
  { id: 8, name: "Luxury Candle", category: "candle", description: "Warm aromatic candle crafted for calm and relaxation.", image: "/images/candle-crystal.jpg" },
  { id: 9, name: "Luxury Candle", category: "candle", description: "Warm aromatic candle crafted for calm and relaxation.", image: "/images/candle-glass.jpg" },
];

const TABS = [
  { label: "All", value: "all" },
  { label: "Perfumes", value: "perfume" },
  { label: "Candles", value: "candle" },
];

function ProductsContent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "all";

  const [activeEnquiryId, setActiveEnquiryId] = useState<number | null>(null);
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const shuffledCategory = (arr: Product[]) => {
    const perfumes = arr.filter((item) => item.category === "perfume");
    const candles = arr.filter((item) => item.category === "candle");

    const result: Product[] = [];
    let p = 0;
    let c = 0;

    while (p < perfumes.length || c < candles.length) {
      for (let i = 0; i < 2 && p < perfumes.length; i++) {
        result.push(perfumes[p]);
        p++;
      }
      for (let i = 0; i < 2 && c < candles.length; i++) {
        result.push(candles[c]);
        c++;
      }
    }
    return result;
  };

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(query);
    const matchCategory = category === "all" ? true : p.category === category;
    return matchSearch && matchCategory;
  });

  const filteredProducts = category === "all" ? shuffledCategory(filtered) : filtered;

  const sendEnquiryEmail = async (productName: string) => {
    if (!contact.trim()) return alert("Please enter email or phone number");
    setSending(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Product Enquiry",
          email: contact.includes("@") ? contact : "no-reply@website.com",
          message: `Product: ${productName}\nCustomer Contact: ${contact}`,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setActiveEnquiryId(null);
        setContact("");
      }, 2000);
    } catch {
      alert("Failed to send enquiry");
    } finally {
      setSending(false);
    }
  };

  return (
    <main
      ref={containerRef}
      className={`min-h-screen px-6 py-24 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className={`sticky top-0 z-30 pb-10 ${isDark ? "bg-black" : "bg-white"}`}>
        <input
          value={query}
          onChange={(e) => updateParam("q", e.target.value)}
          placeholder="Search products..."
          className={`w-full max-w-md mx-auto block mb-8 px-4 py-3 text-sm transition focus:outline-none ${
            isDark ? "bg-black border border-[#333] text-white" : "bg-white border border-gray-300 text-black"
          }`}
        />
        <div className="flex gap-6 justify-center">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => updateParam("category", tab.value)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition ${
                category === tab.value
                  ? "border-[#d4af37] text-[#d4af37]"
                  : isDark
                  ? "border-gray-600 text-gray-400"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
           ref={(el) => { cardsRef.current[index] = el; }}
            className={`border transition p-4 ${isDark ? "border-[#222] bg-[#070707]" : "border-gray-200 bg-gray-50"}`}
          >
            <div className="relative h-72 overflow-hidden bg-[#111]">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] opacity-[0.2]">
                  <Image
                    src={isDark ? "/images/white-logo.png" : "/images/Logo.png"}
                    alt="Noir watermark"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
              <img src={product.image} alt={product.name} className="relative z-10 w-full h-full object-cover px-2" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-serif text-[#d4af37] mb-3">{product.name}</h3>
              <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{product.description}</p>
              {activeEnquiryId !== product.id ? (
                <div className="flex gap-2">
                  <button onClick={() => openWhatsApp(product.name, "")} className="text-[10px] uppercase tracking-widest border border-[#25D366] px-3 py-2 text-[#25D366]">WhatsApp</button>
                  <button onClick={() => setActiveEnquiryId(product.id)} className="text-[10px] uppercase tracking-widest border px-3 py-2">Email Enquiry</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Your Email or Phone"
                    className={`px-3 py-2 text-xs w-full ${isDark ? "bg-black border border-[#333] text-white" : "bg-white border border-gray-300 text-black"}`}
                  />
                  <button onClick={() => sendEnquiryEmail(product.name)} className="w-full bg-[#d4af37] text-black text-[10px] uppercase font-bold py-2">
                    {sending ? "Sending..." : sent ? "Sent ✓" : "Send Now"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// 🔑 IMPORTANT: useSearchParams() requires a Suspense boundary for Next.js builds
export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ProductsContent />
    </Suspense>
  );
}