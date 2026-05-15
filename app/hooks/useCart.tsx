"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/app/data/products";

export interface CartItem extends Product {
  cartId: string;
  selectedPrice: number;
  selectedFragrance?: string;
  selectedWax?: string;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product, options?: { price?: number; fragrance?: string; wax?: string }) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Hydrate once from sessionStorage after mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("noir_cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist to sessionStorage and fire event whenever cart changes
  const persist = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    try {
      sessionStorage.setItem("noir_cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {}
  }, []);

  const addToCart = useCallback((product: Product, options?: { price?: number; fragrance?: string; wax?: string }) => {
    const item: CartItem = {
      ...product,
      cartId: `${product.id}-${Date.now()}`,
      selectedPrice: options?.price ?? product.price ?? 0,
      selectedFragrance: options?.fragrance,
      selectedWax: options?.wax,
    };
    setCart(prev => {
      const next = [...prev, item];
      try {
        sessionStorage.setItem("noir_cart", JSON.stringify(next));
        window.dispatchEvent(new Event("cartUpdated"));
      } catch {}
      return next;
    });
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setCart(prev => {
      const next = prev.filter(i => i.cartId !== cartId);
      try {
        sessionStorage.setItem("noir_cart", JSON.stringify(next));
        window.dispatchEvent(new Event("cartUpdated"));
      } catch {}
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    try {
      sessionStorage.removeItem("noir_cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {}
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
