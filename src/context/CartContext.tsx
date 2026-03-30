"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  addToCart as apiAddToCart,
  getCart,
  removeCartItem,
  updateCartItemCount,
  clearCart,
} from "@/app/api/cart";
import { Product } from "@/types/product";

export interface CartItem {
  count: number;
  _id: string;
  price: number;
  product: Product;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  totalCartPrice: number;
  loading: boolean;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  updateCartCount: () => Promise<void>;
  setCartCount: (count: number) => void;
  addToCart: (productId: string) => Promise<any>;
  removeItem: (productId: string) => Promise<void>;
  updateItemCount: (productId: string, count: number) => Promise<void>;
  clearClientCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const router = useRouter();

  const updateCartCount = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      if (res?.status === "success" || res?.data) {
        const products = res.data?.products || [];
        const count = products.reduce(
          (acc: number, item: any) => acc + item.count,
          0,
        );
        setCartCount(count);
        setCartItems(products);
        setTotalCartPrice(res.data?.totalCartPrice || 0);
      } else {
        setCartCount(0);
        setCartItems([]);
        setTotalCartPrice(0);
      }
    } catch (error) {
      console.error("Failed to update cart count", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const res = await apiAddToCart(productId);
      if (res?.status === "success" || res?.message === "success") {
        await updateCartCount();
        openSidebar();
        return res;
      } else {
        return res;
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      return { status: "error", message: "Something went wrong" };
    }
  };

  const removeItem = async (productId: string) => {
    const toastId = toast.loading("Removing item...");
    try {
      const res = await removeCartItem(productId);
      if (res?.status === "success" || res?.menu === "success" || res?.data) {
        // API consistency check
        toast.success("Item removed", { id: toastId });
        await updateCartCount();
      } else {
        toast.error("Failed to remove item", { id: toastId });
      }
    } catch (error) {
      toast.error("Error removing item", { id: toastId });
    }
  };

  const updateItemCount = async (productId: string, count: number) => {
    if (count < 1) return;
    try {
      const res = await updateCartItemCount(productId, count);
      if (res?.status === "success") {
        await updateCartCount();
      }
    } catch (error) {
      console.error("Error updating count", error);
    }
  };

  const clearClientCart = async () => {
    setCartCount(0);
    setCartItems([]);
    setTotalCartPrice(0);
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        totalCartPrice,
        loading,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        updateCartCount,
        setCartCount,
        addToCart,
        removeItem,
        updateItemCount,
        clearClientCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
