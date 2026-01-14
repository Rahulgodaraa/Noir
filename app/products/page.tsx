"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { openWhatsApp } from "@/app/component/openWhatsApp";

const PRODUCTS = [
  {
    id: 1,
    name: "Signature Night",
    category: "perfume",
    description: "A bold, seductive fragrance with deep woody and amber notes for evenings.",
    image: "/images/signature-night.png",
  },
  {
    id: 2,
    name: "Cool Wave",
    category: "perfume",
    description: "Fresh aquatic notes blended with cool blue accords for daily wear.",
    image: "/images/bottle-blue.png",
  },
  {
    id: 3,
    name: "Classic Blue",
    category: "perfume",
    description: "Timeless masculine freshness with a clean and confident finish.",
    image: "/images/man.png",
  },
  {
    id: 4,
    name: "Noir",
    category: "perfume",
    description: "Dark, intense notes crafted for a mysterious and premium feel.",
    image: "/images/noir-perfume.png",
  },
  {
    id: 5,
    name: "Luxury Candle",
    category: "candle",
    description: "Warm aromatic candle crafted for calm and relaxation.",
    image: "/images/candle.png",
  },
];

const TABS = [
  { label: "All", value: "all" },
  { label: "Perfumes", value: "perfume" },
  { label: "Candles", value: "candle" },
];

export default function ProductsPage() {
  const containerRef = useRef(null);
  const cardsRef = useRef<any[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const view = "grid"; // keep your existing view logic if needed

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

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(query);
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchCategory;
  });

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
      className="min-h-screen bg-black text-white px-6 py-24"
    >
      {/* 🔹 Sticky Search + Tabs */}
      <div className="sticky top-0 z-30 bg-black pb-10">
        <input
          value={query}
          onChange={(e) => updateParam("q", e.target.value)}
          placeholder="Search products..."
          className="
            w-full max-w-md mx-auto block mb-8
            bg-black border border-[#333]
            px-4 py-3 text-sm
            focus:outline-none focus:border-[#d4af37]
          "
        />

        <div className="flex gap-6 justify-center">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => updateParam("category", tab.value)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition
                ${
                  category === tab.value
                    ? "border-[#d4af37] text-[#d4af37]"
                    : "border-gray-600 text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37]"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Products Grid */}
      <div
        className={`max-w-6xl mx-auto grid gap-12 ${
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`border border-[#222] bg-[#070707] transition-all duration-300 ${
              activeEnquiryId === product.id
                ? "border-[#d4af37] ring-1 ring-[#d4af37]/30"
                : ""
            }`}
          >
            {/* Image */}
            <div className="h-72">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif text-[#d4af37] mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {product.description}
                </p>
              </div>

              {/* Actions */}
              {activeEnquiryId !== product.id ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => openWhatsApp(product.name, "")}
                    className="text-[10px] uppercase tracking-widest border border-[#25D366] px-3 py-2 text-[#25D366] hover:bg-[#25D366] hover:text-black transition"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setActiveEnquiryId(product.id)}
                    className="text-[10px] uppercase tracking-widest border border-gray-600 px-3 py-2 text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37] transition"
                  >
                    Email Enquiry
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    autoFocus
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Your Email or Phone"
                    className="bg-black border border-[#333] px-3 py-2 text-xs w-full focus:outline-none focus:border-[#d4af37]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => sendEnquiryEmail(product.name)}
                      disabled={sending}
                      className="flex-1 bg-[#d4af37] text-black text-[10px] uppercase font-bold py-2 disabled:opacity-50"
                    >
                      {sending ? "..." : sent ? "Sent ✓" : "Send Now"}
                    </button>
                    <button
                      onClick={() => {
                        setActiveEnquiryId(null);
                        setContact("");
                      }}
                      className="px-3 py-2 text-xs text-gray-500 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
