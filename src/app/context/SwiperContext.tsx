"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { productService } from "@/features/products/api/productService";
import { Product } from "@/types/product";
interface SwiperContextType {
  products: Product[];
  loading: boolean;
}

const SwiperContext = createContext<SwiperContextType | undefined>(undefined);

export function SwiperProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products for swiper:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <SwiperContext.Provider value={{ products, loading }}>
      {children}
    </SwiperContext.Provider>
  );
}

export function useSwiperContext() {
  const context = useContext(SwiperContext);
  if (context === undefined) {
    throw new Error("useSwiperContext must be used within a SwiperProvider");
  }
  return context;
}
