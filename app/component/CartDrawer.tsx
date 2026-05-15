"use client";

import { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/hooks/useCart";
import { openWhatsApp } from "@/app/component/openWhatsApp";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, removeFromCart } = useCart();
  const { t } = useLanguage();
  const subtotal = cart.reduce((acc, item) => acc + item.selectedPrice, 0);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleWhatsAppEnquiry = () => {
    if (cart.length === 0) return;
    const itemNames = cart.map(item => `${item.name} (₹${item.selectedPrice})`).join(", ");
    openWhatsApp("Cart Enquiry", `I am interested in: ${itemNames}. Total: ₹${subtotal}`);
  };

  const handleEmailEnquiry = () => {
    if (cart.length === 0) return;
    const itemLines = cart.map(item => `- ${item.name} (₹${item.selectedPrice})`).join("%0A");
    window.location.href = `mailto:concierge@noressence.com?subject=Bag%20Enquiry&body=I%20am%20interested%20in%3A%0A${itemLines}%0A%0ATotal%3A%20%E2%82%B9${subtotal}`;
  };

  const count = cart.length;
  const countLabel = count < 10 ? `0${count}` : `${count}`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-[420px] bg-[#111] z-[201] flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-white">
              {t.cart.yourBag} ({countLabel})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 opacity-30 pt-20">
              <ShoppingBag className="w-10 h-10 stroke-[1]" />
              <p className="text-[10px] uppercase tracking-[0.3em]">{t.cart.empty}</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex gap-4 pb-6 border-b border-white/5 last:border-0">
                <div className="relative w-20 h-20 bg-[#1a1a1a] flex-shrink-0 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-base leading-tight mb-1 truncate">{item.name}</h3>
                      <p className="text-[9px] uppercase tracking-widest text-white/40 truncate">
                        {item.category === "perfume"
                          ? `${item.size} ${t.productDetail.extraitDeParfum}`
                          : t.productDetail.soyWaxCandle}
                      </p>
                    </div>
                    <span className="font-serif text-sm text-[#D4AF37] flex-shrink-0">₹{item.selectedPrice}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="mt-3 text-[9px] uppercase tracking-widest text-white/25 hover:text-[#D4AF37] transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-6 bg-[#0d0d0d] border-t border-white/5 space-y-5">
          {/* Price breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] text-white/40">
              <span className="uppercase tracking-widest">{t.cart.subtotal}</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="uppercase tracking-widest text-white/40">{t.cart.shipping}</span>
              <span className="text-[#D4AF37] uppercase tracking-widest text-[10px]">{t.cart.complimentary}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-3 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold">{t.cart.total}</span>
            <span className="font-serif text-2xl text-[#D4AF37]">₹{subtotal}</span>
          </div>

          {/* CTA buttons */}
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={handleWhatsAppEnquiry}
              disabled={cart.length === 0}
              className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#c9a227] text-black text-[10px] uppercase tracking-[0.2em] font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              {t.cart.enquireWhatsApp}
            </button>
            <button
              onClick={handleEmailEnquiry}
              disabled={cart.length === 0}
              className="w-full py-4 border border-white/15 text-white/70 text-[10px] uppercase tracking-[0.2em] font-bold hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {t.cart.enquireEmail}
            </button>
          </div>

          <p className="text-center text-[8px] uppercase tracking-[0.3em] text-white/20 pt-1">
            {t.cart.tagline}
          </p>
        </div>
      </div>
    </>
  );
}
