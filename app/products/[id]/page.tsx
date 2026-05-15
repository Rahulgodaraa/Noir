"use client";

import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/app/data/products";
import Image from "next/image";
import { ArrowLeft, MessageSquare, Mail, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { openWhatsApp } from "@/app/component/openWhatsApp";
import { useCart } from "@/app/hooks/useCart";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  useGSAP(() => {
    if (!product) return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
    tl.fromTo(".product-image", { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1 })
      .fromTo(".product-info > *", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=1");
  }, { scope: containerRef, dependencies: [id] });

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <h1 className="font-serif text-4xl mb-8">{t.productDetail.notFound}</h1>
        <Link href="/products" className="btn-outline">{t.productDetail.returnToCollection}</Link>
      </div>
    );
  }

  const handleEmailEnquiry = () => {
    const mailto = `mailto:concierge@noressence.com?subject=Enquiry: ${product.name}&body=I am interested in the ${product.name} (₹${product.price}). Please provide more details.`;
    window.location.href = mailto;
  };

  const badges = [
    { icon: ShieldCheck, label: t.productDetail.original },
    { icon: Truck,       label: t.productDetail.shipping },
    { icon: RotateCcw,   label: t.productDetail.returns },
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white pt-24 md:pt-32 pb-24 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-4 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-10 md:mb-16"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
          {t.productDetail.back}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="product-image relative aspect-[4/5] bg-[#111] overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="product-info space-y-8 md:space-y-12">
            <div className="space-y-4">
              <span className="text-[#D4AF37] tracking-[0.4em] text-[9px] uppercase font-bold block">
                {product.category === 'perfume' ? t.productDetail.extraitDeParfum : t.productDetail.soyWaxCandle}
              </span>
              <h1 className="font-serif text-5xl md:text-8xl font-light tracking-tighter leading-none">{product.name}</h1>
              <p className="font-serif text-2xl md:text-3xl text-[#D4AF37] pt-2 md:pt-4">₹{product.price}</p>
            </div>

            <p className="text-white/60 text-base md:text-xl leading-relaxed font-light italic max-w-xl">
              "{product.description}"
            </p>

            {product.category === 'perfume' && product.notes && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 md:py-10 border-y border-white/5">
                {([
                  { label: t.productDetail.topNotes,   val: product.notes.top },
                  { label: t.productDetail.heartNotes, val: product.notes.heart },
                  { label: t.productDetail.baseNotes,  val: product.notes.base },
                ] as const).map((note, i) => (
                  <div key={i} className="border-l border-[#D4AF37]/20 pl-6">
                    <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">{note.label}</h4>
                    <p className="text-sm font-light text-white/70">{note.val}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 btn-gold py-5 text-[10px] md:text-[11px] tracking-widest"
                >
                  {t.productDetail.addToBag}
                </button>
                <button
                  onClick={() => openWhatsApp(product.name, `Interested in ${product.name} - ₹${product.price}`)}
                  className="flex-1 btn-outline py-5 flex items-center justify-center gap-4 text-[10px] tracking-widest"
                >
                  <MessageSquare className="w-4 h-4" />
                  {t.productDetail.whatsapp}
                </button>
              </div>

              <button
                onClick={handleEmailEnquiry}
                className="w-full text-white/30 hover:text-white text-[9px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 py-4"
              >
                <Mail className="w-4 h-4" />
                {t.productDetail.emailConcierge}
              </button>

              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8 border-t border-white/5">
                {badges.map((badge, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3">
                    <badge.icon className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] opacity-50" />
                    <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/30">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
