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
  price?: number;
  quantity?: string;
  size?: string;
  bestFor?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: number;
  quantity?: string;
  size?: string;
  bestFor?: string;
}

const PRODUCTS: Product[] = [
  // ================= PERFUMES =================
  {
    id: 1,
    name: "Sabaya",
    category: "perfume",
    description: "Warm, graceful and timeless with rich yet soft elegance.",
    image: "/new/sabya.png",
    price: 699,
    size: "30ml",
    bestFor: "Evenings, parties, formal dinners",
  },
  {
    id: 2,
    name: "Seduction",
    category: "perfume",
    description: "Bold, intense and irresistibly magnetic.",
    image: "/new/4.png",
    price: 599,
    size: "30ml",
    bestFor: "Date nights, romantic evenings",
  },
  {
    id: 3,
    name: "Ehsaas",
    category: "perfume",
    description: "Delicate, soulful and emotionally captivating.",
    image: "/new/6.jpeg",
    price: 599,
    size: "30ml",
    bestFor: "Weddings, celebrations, special occasions",
  },
  {
    id: 4,
    name: "The Man",
    category: "perfume",
    description: "Strong, refined and commanding modern masculinity.",
    image: "/new/1.jpeg",
    price: 899,
    size: "50ml",
    bestFor: "Office, business meetings, leadership presence",
  },
  {
    id: 5,
    name: "Boss",
    category: "perfume",
    description: "Sharp, bold and unapologetically powerful.",
    image: "/new/10.jpeg",
    price: 899,
    size: "50ml",
    bestFor: "Professional settings, confident personalities",
  },
  {
    id: 6,
    name: "Wanted",
    category: "perfume",
    description: "Mysterious, daring and addictive.",
    image: "/new/8.jpeg",
    price: 599,
    size: "30ml",
    bestFor: "Night outs, celebrations, bold statements",
  },
  {
    id: 7,
    name: "Cool Breeze",
    category: "perfume",
    description: "Fresh, calm and effortlessly soothing.",
    image: "/new/3.png",
    price: 699,
    size: "30ml",
    bestFor: "Daily wear, brunches, summer days",
  },
  {
    id: 8,
    name: "Polo",
    category: "perfume",
    description: "Classic, confident and sophisticated.",
    image: "/new/7.jpeg",
    price: 599,
    size: "30ml",
    bestFor: "Afternoon gatherings, casual elegance",
  },
  {
    id: 9,
    name: "Cool Wave",
    category: "perfume",
    description: "Crisp, elemental and refreshing.",
    image: "/new/2.jpeg",
    price: 899,
    size: "50ml",
    bestFor: "Daytime professional wear, summer evenings",
  },
  {
    id: 10,
    name: "Swag",
    category: "perfume",
    description: "Bold, charismatic and unapologetic.",
    image: "/new/12.jpeg",
    price: 899,
    size: "50ml",
    bestFor: "Nightlife, special events, strong presence",
  },

  // ================= CANDLES =================
  {
    id: 11,
    name: "Classic Glass Candle",
    category: "candle",
    description:
      "Simple • Elegant • Timeless. Crystal-clear premium glass jar.",
    image: "/images/candle-crystal1.jpg",
    price: 599,
    quantity: "180 ml",
  },
  {
    id: 12,
    name: "Matte Luxe Candle",
    category: "candle",
    description: "Minimalist • Modern • Soft-touch finish in elegant colours.",
    image: "/images/candle-matte.jpg",
    price: 649,
    quantity: "200 ml",
  },
  {
    id: 13,
    name: "Diamond Cut Crystal Candle",
    category: "candle",
    description:
      "Royal cut crystal jar with sculpted lid and premium detailing.",
    image: "/images/candle-crystal1.jpg",
    price: 499,
    quantity: "120 ml",
  },
];

const TABS = [
  // { label: "All", value: "all" },
  { label: "Perfumes", value: "perfume" },
  { label: "Candles", value: "candle" },
];

function ProductsContent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedWaxType, setSelectedWaxType] = useState<{
    [key: number]: "gel" | "soya";
  }>({});

  const [selectedFragrance, setSelectedFragrance] = useState<{
    [key: number]: string;
  }>({});

  const router = useRouter();
  const searchParams = useSearchParams();

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "perfume";

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

  const filteredProducts =
    category === "all" ? shuffledCategory(filtered) : filtered;

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
      <div
        className={`sticky top-0 z-30 pb-10 ${isDark ? "bg-black" : "bg-white"}`}
      >
        <input
          value={query}
          onChange={(e) => updateParam("q", e.target.value)}
          placeholder="Search products..."
          className={`w-full max-w-md mx-auto block mb-8 px-4 py-3 text-sm transition focus:outline-none ${
            isDark
              ? "bg-black border border-[#333] text-white"
              : "bg-white border border-gray-300 text-black"
          }`}
        />
        <div className="flex pt-1 gap-6 justify-center">
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
        {filteredProducts.map((product, index) => {
          const waxType = selectedWaxType[product.id] || "gel";
          const finalPrice =
            product.category === "candle"
              ? waxType === "soya"
                ? (product.price ?? 599) - 75
                : (product.price ?? 599)
              : (product.price ?? 799);

          return (
            <div
              key={product.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`group border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                isDark
                  ? "border-[#222] bg-[#0b0b0b] hover:border-[#d4af37]"
                  : "border-gray-200 bg-white hover:border-[#d4af37]"
              }`}
            >
              {/* Image */}
              <div className="relative h-72 bg-gradient-to-b from-black to-[#111] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 space-y-4">
                {/* Name */}
                <h3 className="text-xl font-serif text-[#d4af37] tracking-wide">
                  {product.name}
                </h3>

                {/* Perfume Badge */}
                {product.category === "perfume" && product.size && (
                  <span className="inline-block text-[10px] uppercase tracking-widest border border-[#d4af37] text-[#d4af37] px-2 py-1 rounded">
                    {product.size} Eau De Parfum
                  </span>
                )}

                {/* Description */}
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {product.description}
                </p>

                {/* Best For */}
                {product.category === "perfume" && product.bestFor && (
                  <p className="text-xs text-gray-500">
                    <span className="text-[#d4af37] font-semibold">
                      Best For:
                    </span>{" "}
                    {product.bestFor}
                  </p>
                )}

                {/* Candle Options */}
                {product.category === "candle" && (
                  <>
                    <p className="text-xs text-gray-500">
                      Quantity: {product.quantity}
                    </p>

                    <select
                      value={waxType}
                      onChange={(e) =>
                        setSelectedWaxType({
                          ...selectedWaxType,
                          [product.id]: e.target.value as "gel" | "soya",
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 bg-white text-black"
                    >
                      <option value="gel">Gel Wax</option>
                      <option value="soya">Soya Wax</option>
                    </select>

                    <select
                      onChange={(e) =>
                        setSelectedFragrance({
                          ...selectedFragrance,
                          [product.id]: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 bg-white text-black"
                    >
                      <option value="">Choose Fragrance</option>
                      <option>Sandalwood</option>
                      <option>Melon</option>
                      <option>Peppermint</option>
                      <option>Lemon</option>
                      <option>Orange</option>
                      <option>Rose</option>
                      <option>Lavender</option>
                    </select>
                  </>
                )}

                {/* Price */}
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Price
                  </p>
                  <p className="text-2xl font-bold text-[#d4af37]">
                    ₹{finalPrice}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() =>
                      openWhatsApp(
                        product.name,
                        `Interested in ${product.name} - ₹${finalPrice}`,
                      )
                    }
                    className="flex-1 bg-[#25D366] text-white text-xs uppercase tracking-widest px-4 py-2 rounded-lg"
                  >
                    WhatsApp
                  </button>

                  <button
                    onClick={() => setActiveEnquiryId(product.id)}
                    className="flex-1 border border-[#d4af37] text-[#d4af37] text-xs uppercase tracking-widest px-4 py-2 rounded-lg"
                  >
                    Email
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
