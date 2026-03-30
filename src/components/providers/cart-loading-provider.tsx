"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartLoadingContextType {
  isAddingToCart: boolean;
  setIsAddingToCart: (value: boolean) => void;
}

const CartLoadingContext = createContext<CartLoadingContextType | undefined>(
  undefined,
);

export function CartLoadingProvider({ children }: { children: ReactNode }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  return (
    <CartLoadingContext.Provider value={{ isAddingToCart, setIsAddingToCart }}>
      {children}
    </CartLoadingContext.Provider>
  );
}

export function useCartLoading() {
  const context = useContext(CartLoadingContext);
  if (context === undefined) {
    throw new Error("useCartLoading must be used within a CartLoadingProvider");
  }
  return context;
}
