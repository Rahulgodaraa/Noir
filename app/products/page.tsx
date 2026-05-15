"use client";

import { useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { openWhatsApp } from "@/app/component/openWhatsApp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Search, MessageSquare } from "lucide-react";
import { PRODUCTS } from "@/app/data/products";
import { useCart } from "@/app/hooks/useCart";
import { useLanguage } from "@/app/context/LanguageContext";

function ProductsContent() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedWaxType, setSelectedWaxType] = useState<{[key: number]: "gel" | "soya"}>({});
  const [selectedFragrance, setSelectedFragrance] = useState<{[key: number]: string}>({});

  const { addToCart } = useCart();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "perfume";

  useGSAP(() => {
    gsap.from(".product-card", {
      y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out",
    });
  }, { scope: containerRef, dependencies: [category, query] });

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(query);
    const matchCategory = category === "all" ? true : p.category === category;
    return matchSearch && matchCategory;
  });

  const TABS = [
    { label: t.products.fragrances, value: "perfume" },
    { label: t.products.homeCandles, value: "candle" },
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-24 px-6 md:px-12">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-20 text-center">
        <span className="text-[#D4AF37] tracking-[0.4em] text-[10px] uppercase font-bold mb-4 block">{t.products.label}</span>
        <h1 className="font-serif text-4xl md:text-7xl mb-12">{t.products.heading}</h1>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border-y border-white/5 py-10">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#D4AF37] transition-colors" />
            <input
              value={query}
              onChange={(e) => updateParam("q", e.target.value)}
              placeholder={t.products.searchPlaceholder}
              className="w-full bg-white/5 border border-white/10 px-12 py-4 text-sm focus:outline-none focus:border-[#D4AF37] transition-all tracking-wide"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => updateParam("category", tab.value)}
                className={`text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-medium transition-all relative py-2 ${
                  category === tab.value ? "text-[#D4AF37]" : "text-white/40 hover:text-white"
                }`}
              >
                {tab.label}
                {category === tab.value && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto grid gap-x-8 gap-y-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const waxType = selectedWaxType[product.id] || "gel";
          const finalPrice = product.category === "candle"
            ? waxType === "soya" ? (product.price ?? 599) - 75 : (product.price ?? 599)
            : (product.price ?? 799);

          return (
            <div key={product.id} className="product-card group flex flex-col">
              <Link href={`/products/${product.id}`} className="relative aspect-[4/5] bg-[#111] overflow-hidden mb-8 block cursor-pointer">
                <Image src={product.image} alt={product.name} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-6 right-6 bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 px-3 py-1">
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">₹{finalPrice}</span>
                </div>
              </Link>

              <div className="flex-1 flex flex-col space-y-4 px-2">
                <div>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
                    {product.category === 'perfume'
                      ? `${product.size} ${t.products.extraitDeParfum}`
                      : `${product.quantity} ${t.products.soyWax}`}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-serif text-3xl group-hover:text-[#D4AF37] transition-colors cursor-pointer">{product.name}</h3>
                  </Link>
                </div>

                <p className="text-[11px] md:text-xs text-white/50 leading-relaxed font-light line-clamp-2">
                  {product.description}
                </p>

                {product.category === "perfume" && product.bestFor && (
                  <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-widest leading-relaxed italic">
                    {t.products.bestFor}: {product.bestFor}
                  </p>
                )}

                {product.category === "candle" && (
                  <div className="flex gap-4 pt-2">
                    <select
                      value={waxType}
                      onChange={(e) => setSelectedWaxType({...selectedWaxType, [product.id]: e.target.value as "gel" | "soya"})}
                      className="flex-1 bg-white/5 border border-white/10 text-[9px] md:text-[10px] uppercase tracking-widest px-3 md:px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="gel">{t.products.gelWax}</option>
                      <option value="soya">{t.products.soyaWax}</option>
                    </select>
                    <select
                      onChange={(e) => setSelectedFragrance({...selectedFragrance, [product.id]: e.target.value})}
                      className="flex-1 bg-white/5 border border-white/10 text-[9px] md:text-[10px] uppercase tracking-widest px-3 md:px-4 py-2 focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="">{t.products.fragrance}</option>
                      {["Sandalwood", "Rose", "Lavender", "Lemon"].map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                )}

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => addToCart(product, { price: finalPrice, wax: waxType, fragrance: selectedFragrance[product.id] })}
                    className="flex-1 btn-gold py-3 text-[10px]"
                  >
                    {t.products.addToBag}
                  </button>
                  <button
                    onClick={() => openWhatsApp(product.name, `Interested in ${product.name} - ₹${finalPrice}`)}
                    className="flex-1 btn-outline py-3 flex items-center justify-center gap-3 text-[10px]"
                  >
                    <MessageSquare className="w-3 h-3" />
                    {t.products.whatsapp}
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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
