"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/types/brand";
import { Product } from "@/types/product";
import ProductCard from "@/features/products/components/ProductCard";
import { useWindowSize } from "@/app/_hooks/useWindowSize";

interface BrandClientPageProps {
  brand: Brand;
  brandProducts: Product[];
  allProducts: Product[];
}

export default function BrandClientPage({
  brand,
  brandProducts,
  allProducts,
}: BrandClientPageProps) {
  const { isMobile } = useWindowSize();

  // 2. Brand Product Filtering
  const products = brandProducts;

  const isElectronics = useMemo(() => {
    return products.some((p) => p.category?.name === "Electronics");
  }, [products]);

  const saleProducts = useMemo(() => {
    return products
      .filter(
        (p) => p.priceAfterDiscount && p.priceAfterDiscount < (p.price || 0),
      )
      .slice(0, 4);
  }, [products]);

  const relatedProducts = useMemo(() => {
    if (!isElectronics) return [];
    return allProducts
      .filter(
        (p) =>
          p.category?.name === "Electronics" && p.brand?.name !== brand.name,
      )
      .slice(0, 6);
  }, [allProducts, isElectronics, brand.name]);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 1. Full-Width Brand Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-black/5" />
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          className="object-cover opacity-20 blur-xl scale-110"
          priority
          sizes="100vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-gray-50" />

        <div className="container mx-auto px-6 relative z-10 w-full pb-12 flex flex-col items-center md:items-start">
          <div className="relative w-32 h-32 md:w-48 md:h-48 bg-white rounded-full shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden p-6 mb-6">
            <Image
              src={brand.image}
              alt={brand.name}
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-2">
            {brand.name}
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium">
            Official Brand Collection
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8 relative z-20">
        {/* On Sale Section */}
        {saleProducts.length > 0 && (
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-red-700 capitalize">
                {`Sale On ${brand.name}`}
              </h2>
            </div>
            <div className=" gap-6 flex justify-center items-center flex-wrap ">
              {saleProducts.map((product) => (
                <div key={product._id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Brand Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-s-4 border-black ps-4">
            {brand.name} Create with Purpose
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="h-full transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-500 text-lg">
                No products found for this brand.
              </p>
            </div>
          )}
        </div>

        {/* Related Electronics */}
        {isElectronics && relatedProducts.length > 0 && (
          <div className="mb-16 pt-16 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <h2 className="text-3xl font-bold text-gray-900 text-center">
                Related Electronics You Might Like
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-90 hover:opacity-100 transition-opacity duration-300">
              {relatedProducts.map((product) => (
                <div
                  key={product._id}
                  className="h-full scale-95 hover:scale-100 transition-transform duration-300"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
